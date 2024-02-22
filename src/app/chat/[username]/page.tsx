'use client';

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { I_Friendship, I_Message, I_UserSchema } from '@/lib/types';
import { listMessagesByUsers } from '@/lib/queries/message';
import { FaChevronLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { MdInfoOutline, MdOutlinePhoneInTalk } from 'react-icons/md';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import EmojiPicker from 'emoji-picker-react';
import ReceivedMessage from '@/components/micros/ReceivedMessage';
import SentMessage from '@/components/micros/SentMessage';
import Link from 'next/link';
import { getBySenderAndRecipient } from '@/lib/queries/friend';
import { useRecipient } from '@/lib/hooks';
import { useUserContext } from '@/lib/context/UserContext';
import { useWebSocket } from '@/lib/context/WebsocketContext';
import { useEdgeStore } from '@/lib/store/edgestore';
import { importImages } from '@/lib/utilities/files';
import VoiceRecorder from '@/components/functional/VoiceRecording';
import { GrGallery } from 'react-icons/gr';

export default function Chat({
  params: { username },
}: {
  params: { username: string };
}) {
  const { webSocket: ws, emitter } = useWebSocket();
  const router = useRouter();
  const { user } = useUserContext();
  const { edgestore } = useEdgeStore();

  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<I_Message[]>([]);
  const [images, setImages] = useState<FileList | null>(null);
  const [pickerState, setPickerState] = useState<boolean>(false);

  const [recipient, setRecipient] = useState<I_UserSchema | null>(null);
  const [friendship, setFriendship] = useState<I_Friendship | null>(null);

  const textRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useRecipient(username, 'username', setRecipient).then(async (data) => {
      await Promise.all([
        listMessagesByUsers(user.id, data!.id).then(setMessages),
        getBySenderAndRecipient(user.id, data!.id).then(setFriendship),
      ]);
    });
  }, []);

  useEffect(() => {
    if (!emitter) return;

    function handleMessage(data: I_Message) {
      console.log(`Message: "${data.content}"`);
      setMessages((prev) => [data, ...prev]);
    }

    emitter.on('message', handleMessage);
    return () => emitter.off('message', handleMessage);
  }, [emitter]);

  const handleScroll = () => {
    const $el = chatContainerRef.current;
    if (!$el) return;
    const isElementAtBottom =
      $el.scrollHeight - $el.scrollTop === $el.clientHeight;
    !isElementAtBottom
      ? ($el.style.overflowY = 'hidden')
      : ($el.style.overflowY = 'auto');
  };

  useEffect(() => {
    const $el = chatContainerRef.current;
    if ($el) $el.scrollTop = $el.scrollHeight;
  }, [messages]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let imageUrls: string[] = [];
    if (images?.length) {
      imageUrls = await importImages(edgestore, images);
    }

    ws!.send(
      JSON.stringify({
        type: 'message',
        sender: user.id,
        recipient: recipient?.id,
        content: message,
        date: new Date().toISOString(),
        images: imageUrls,
      }),
    );
    setMessage('');
    setImages(null);
    setPickerState(false);
  };

  const insertEmoji = ({ emoji }: { emoji: string }) => {
    const textarea = textRef.current as HTMLTextAreaElement;
    const cursorPos = textarea.selectionStart;
    if (message !== '') {
      setMessage(
        (prev) =>
          `${prev.substring(0, cursorPos)}${emoji}${prev.substring(cursorPos)}`,
      );
    } else {
      setMessage(emoji);
    }
  };

  const initiateVideoCall = async () => {
    const videoCallRequest = {
      type: 'video-call-invite',
      sender: user?.id,
      recipient: recipient?.id,
      room: friendship?.id,
    };

    ws!.send(JSON.stringify(videoCallRequest));

    router.push(`/chat/video/${friendship!.id.toString()}`);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImages(event.target.files);
    }
  };

  const handleAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('voice', audioBlob, 'voiceRecording.wav');
    try {
      const response = await fetch('http://localhost:3005/upload-audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Upload failed:', await response.text());
      }

      const { id }: { id: string } = await response.json();

      ws!.send(
        JSON.stringify({
          type: 'message',
          sender: user.id,
          recipient: recipient?.id,
          content: '',
          date: new Date().toISOString(),
          images: [],
          files: [id],
        }),
      );
      console.log(`Voice message send ID: ${id}`);
    } catch (error) {
      console.error('Error uploading the audio:', error);
    }
  };

  return (
    <div className="bg-slate-100">
      {/* Navigation Container*/}
      <nav
        className="flex h-full w-full flex-row justify-between rounded-b-3xl
                   border-gray-300 bg-white px-5 py-3 shadow-xl"
      >
        {/* Information Navigation Container */}
        <div className="flex flex-row" style={{ width: '75%' }}>
          <div className="flex h-full flex-row content-center items-center">
            <Link href="/chat" className="flex justify-center align-middle">
              <FaChevronLeft className="h-7 w-10 transition-all hover:scale-125 hover:scale-x-150 hover:fill-blue-600" />
            </Link>

            <Link href={`/profile/${username}`} className="flex flex-row">
              <div className="relative ml-2">
                <img
                  style={{ minWidth: '40px', minHeight: '40px' }}
                  className="h-10 w-10 rounded-full"
                  src={recipient?.picture ?? ''}
                  alt="profile pic"
                />
                <span className="absolute bottom-0 left-7 h-3.5 w-3.5 rounded-full border border-white bg-green-400 dark:border-gray-800"></span>
              </div>

              <div className="flex w-full flex-col truncate pl-4">
                <p className="truncate font-bold text-gray-800">
                  {recipient?.first_name + ' ' + recipient?.last_name}
                </p>
                <p className="text-sm font-normal text-gray-500">Active</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Operations Icons Navigation Container */}
        <div className="m-auto flex flex-row gap-4 pl-6">
          <VscDeviceCameraVideo
            onClick={initiateVideoCall}
            className="h-8 w-8 rounded-full transition-all hover:bg-green-300"
          />
          <MdOutlinePhoneInTalk className="h-8 w-8 rounded-full fill-gray-800 transition-all hover:bg-purple-300" />
          <MdInfoOutline className="h-8 w-8 rounded-full transition-all hover:bg-blue-300" />
        </div>
      </nav>
      {/* CHAT MESSAGES SECTION */}
      <section
        style={{ height: 'calc(100vh - 132px)' }}
        className="flex max-h-screen w-full"
        onScroll={handleScroll}
        ref={chatContainerRef}
      >
        <article className="scrollbar-xs flex w-full flex-col-reverse overflow-y-scroll p-6">
          {messages.map((message, index) =>
            message.sender_id !== user?.id ? (
              <ReceivedMessage
                key={index}
                message={message}
                recipient={recipient}
              />
            ) : (
              <SentMessage key={index} message={message} />
            ),
          )}
        </article>
      </section>

      {/* SEND MESSAGE CONTAINER */}
      <form
        className="top-shadow fixed bottom-0 z-40 flex w-full flex-row px-5 pb-3 pt-1 align-middle"
        onSubmit={sendMessage}
      >
        {/* Message Input */}
        <textarea
          className="fancy-text mt-2 h-8 w-full content-center overflow-y-hidden rounded-md
            border-2 border-gray-300 bg-white pl-4 text-left font-medium text-black outline-none transition-all focus:h-16 "
          placeholder="Type here..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          ref={textRef}
        />

        {/* Options Container */}
        <div className="m-auto flex h-full flex-row gap-4 pl-5">
          {/* Emoji Picker Icon */}
          <div style={{ position: 'fixed', bottom: '65px', right: 0 }}>
            <EmojiPicker open={pickerState} onEmojiClick={insertEmoji} />
          </div>

          <label
            className="rounded-full transition-all hover:bg-purple-200 hover:fill-white"
            htmlFor="image_picker"
          >
            <input
              id="image_picker"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              multiple
            />
            <GrGallery className="h-6 w-6 fill-purple-600 " />
            <span className="sr-only">Upload image</span>
          </label>

          <VoiceRecorder handleAudio={handleAudio} />

          <button
            className="rounded-full transition-all hover:bg-yellow-200 hover:fill-white"
            type="button"
            onClick={() => setPickerState((prev) => !prev)}
          >
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
              />
            </svg>
            <span className="sr-only">Add emoji</span>
          </button>
          {/* Send Message Icon */}
          <button
            className="rounded-full transition-all hover:bg-blue-300  hover:fill-white"
            type="submit"
          >
            <svg
              className="h-6 w-6 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
  );
}
