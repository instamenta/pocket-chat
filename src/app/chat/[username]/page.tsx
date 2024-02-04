'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { I_Message, I_UserSchema } from '@/lib/types';
import useUser from '@/lib/store';
import { getUserByUsername } from '@/lib/queries/user';
import { socket_url } from '@/lib/variables';
import { blob_to_json } from '@/lib/utilities';
import { listMessagesByUsers } from '@/lib/queries/messages';
import { FaChevronLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { MdInfoOutline, MdOutlinePhoneInTalk } from 'react-icons/md';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import { GrSend } from 'react-icons/gr';
import { BsEmojiGrin } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';
import ReceivedMessage from '@/components/micros/ReceivedMessage';
import SentMessage from '@/components/micros/SentMessage';
import Link from 'next/link';

// TODO ADD SUPPORT FOR ALL EMOJIS AND USE THE APPLE FONT

export default function Chat({
  params: { username },
}: {
  params: { username: string };
}) {
  const router = useRouter();

  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<I_Message[]>([]);
  const [pickerState, setPickerState] = useState<boolean>(false);

  const [user, setUser] = useState<I_UserSchema | null>(null);
  const [recipient, setRecipient] = useState<I_UserSchema | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useState(() => {
    let socket: WebSocket;
    void (async function initialize() {
      const userData = await useUser
        .getState()
        .getUser()
        .then((d) => {
          setUser(d);
          return d;
        });
      if (!userData) return console.log('User not found');

      const recipientData = await getUserByUsername(username);
      if (!recipientData) {
        console.error(
          `Failed to get recipient with username ${username}`,
        );
        throw new Error(
          `Failed to get recipient with username ${username}`,
        );
      }
      setRecipient(recipientData);

      const conversationMessages = await listMessagesByUsers(
        userData!.id,
        recipientData.id,
      );
      setMessages(conversationMessages);
      socket = new WebSocket(socket_url);
      socketRef.current = socket;

      socket.onopen = () => console.log('Connected to socket');
      socket.onerror = (error) => console.error('WebSocket Error:', error);
      socket.onmessage = (event: MessageEvent) => {
        blob_to_json<I_Message>(event.data, (data) => {
          if (!data) return console.log('Fail :///');
          setMessages((prev) => [data, ...prev]);
        });
      };
    })();

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  });

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
    socketRef.current?.send(
      JSON.stringify({
        sender: user!.id,
        recipient: recipient?.id,
        content: message,
        date: new Date().toISOString(),
      }),
    );
    setMessage('');
    setPickerState(false);
  };

  const insertEmoji = ({ emoji }: { emoji: string }) => {
    console.log(emoji);
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
            <button
              className="flex justify-center align-middle"
              onClick={() => router.push('/chat')}
            >
              <FaChevronLeft className="h-7 w-10 transition-all hover:scale-125 hover:scale-x-150 hover:fill-blue-600" />
            </button>

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
          <VscDeviceCameraVideo className="h-8 w-8 rounded-full transition-all hover:bg-green-300" />
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
        className="top-shadow fixed bottom-0 z-40 flex w-full flex-row rounded-t-3xl px-5 pb-3 pt-2"
        onSubmit={sendMessage}
      >
        {/* Message Input */}
        <textarea
          className="fancy-text mt-2 h-8 w-full content-center overflow-y-hidden rounded-3xl
            border-2 border-gray-300 bg-white pl-4 text-left font-medium text-black outline-none transition-all focus:h-16 "
          placeholder="Type here..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          ref={textRef}
        />

        {/* Options Container */}
        <div className="m-auto flex flex-row gap-4 pl-5">
          {/* Emoji Picker Icon */}
          <div style={{ position: 'fixed', bottom: '65px', right: 0 }}>
            <EmojiPicker open={pickerState} onEmojiClick={insertEmoji} />
          </div>
          <button
            className="rounded-full transition-all hover:bg-yellow-200 hover:fill-white"
            type="button"
            onClick={() => setPickerState((prev) => !prev)}
          >
            <BsEmojiGrin className="h-8 w-8" />
          </button>

          {/* Send Message Icon */}
          <button
            className="rounded-full transition-all hover:bg-blue-300  hover:fill-white"
            type="submit"
          >
            <GrSend className="h-8 w-8" />
          </button>
        </div>
      </form>
    </div>
  );
}

// useEffect(() => {
//   const textarea = textRef.current;
//   textarea!.style.height = 'auto';
//   textarea!.style.height = textarea!.scrollHeight + 'px';
// }, [message]);
//
// useEffect(() => {
//   const $el = chatContainerRef.current;
//   $el.scrollTop = $el.scrollHeight;
// }, []);
