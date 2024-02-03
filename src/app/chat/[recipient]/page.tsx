'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { I_Message, I_UserSchema } from '@/lib/types';
import useUser from '@/lib/store';
import { getUserByUsername } from '@/lib/queries/user';
import { socket_url } from '@/lib/variables';
import { blob_to_json } from '@/lib/utilities';
import { listMessagesByUsers } from '@/lib/queries/messages';

export default function Chat({
  params: { recipient: recipient_username },
}: {
  params: { recipient: string };
}) {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<I_Message[]>([]);

  const [user, setUser] = useState<I_UserSchema | null>(null);
  const [recipient, setRecipient] = useState<I_UserSchema | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const $el = chatContainerRef.current;
    if (!$el) return;
    const isElementAtBottom =
      $el.scrollHeight - $el.scrollTop === $el.clientHeight;
    !isElementAtBottom
      ? ($el.style.overflowY = 'hidden')
      : ($el.style.overflowY = 'auto');
  };

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

      const recipientData = await getUserByUsername(recipient_username);
      if (!recipientData) {
        console.error(
          `Failed to get recipient with username ${recipient_username}`,
        );
        throw new Error(
          `Failed to get recipient with username ${recipient_username}`,
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

          console.log(data);
          console.log(data.sender_id);
          console.log(userData!.id);

          console.log(data.sender_id === userData?.id);
        });
      };
    })();

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  });

  useEffect(() => {
    const $el = chatContainerRef.current;
    if ($el) $el.scrollTop = $el.scrollHeight;
  }, [messages]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      socketRef.current?.send(
        JSON.stringify({
          sender: user!.id,
          recipient: recipient?.id,
          content: message,
          date: new Date().toISOString(),
        }),
      );

      setMessages((prev) => prev);
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Navigation Container*/}
      <nav
        className="flex h-full w-full flex-row justify-between rounded-b-3xl
                   border-b-4 border-gray-300 px-5 py-5 pt-3 shadow-xl"
      >
        {/* Information Navigation Container */}
        <div className="flex flex-row" style={{ width: '75%' }}>
          <div className="ml-6 flex h-full flex-row content-center items-center">
            <svg
              className="transition-transform hover:-translate-x-3 hover:scale-x-150 hover:scale-y-125"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20"
              height="26"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
            {/* Recipient Profile Image */}
            <div className="ml-4 h-12 w-12 rounded-full bg-red-950 overflow-hidden">
              <img src={recipient?.picture ?? ''} alt="profile pic" />
            </div>
          </div>

          <div className="flex w-full flex-col truncate pl-4">
            <p className="truncate font-bold text-gray-800">
              {recipient?.first_name + ' ' + recipient?.last_name}
            </p>
            <p className="font-normal text-blue-500">Active</p>
          </div>
        </div>

        {/* Operations Icons Navigation Container */}
        <div className="m-auto flex flex-row gap-4 pl-6">
          {/* Video Chat Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32"
            width="32"
            viewBox="0 0 576 512"
          >
            <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
          </svg>
          {/* Voice Call Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32"
            width="25"
            viewBox="0 0 512 512"
          >
            <path d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z" />
          </svg>

          {/* Info Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 50 50"
          >
            <path d="M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z"></path>
          </svg>
        </div>
      </nav>

      {/* CHAT MESSAGES SECTION */}
      <section
        className="flex max-h-screen w-full bg-gray-700"
        style={{ height: 'calc(100vh - 172px)' }}
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        <article className="scrollbar-xs flex w-full flex-col-reverse overflow-y-scroll p-6">
          {messages.map((message, index) => (
            <div
              style={{ maxWidth: '70%' }}
              key={index}
              className={`mb-3 ${
                message.sender_id !== user?.id 
                  ? 'self-start' 
                  : 'self-end'
              }`}
            >
              <div
                className={`rounded-2xl  px-4 pb-4 pt-2 ${
                  message.sender_id !== user?.id
                    ? 'rounded-br-none bg-white'
                    : 'rounded-bl-none bg-gray-600'
                }`}
              >
                <span className="break-words">{message.content}</span>
              </div>
            </div>
          ))}
        </article>
      </section>

      {/* SEND MESSAGE CONTAINER */}
      <form
        className="top-shadow fixed bottom-0 flex w-full flex-row rounded-t-3xl px-5 py-2"
        onSubmit={sendMessage}
      >
        {/* Message Input */}
        <textarea
          className="h-auto w-full overflow-y-hidden pl-4 outline-none bg-black text-white font-medium
          text-left content-center mt-2 rounded-3xl"
          placeholder="Type here..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          ref={textRef}
        />
        {/* Options Container */}
        <div className="m-auto flex flex-row gap-3 pl-6">
          {/* Emoji Picker Icon */}
          <button
            className="rounded-full p-2 transition-all hover:bg-gray-600 hover:fill-white"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              width="30"
              viewBox="0 0 512 512"
            >
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
          </button>
          {/* Send Message Icon */}
          <button
            className="rounded-full p-2 transition-all hover:bg-gray-600  hover:fill-white"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              width="30"
              viewBox="0 0 512 512"
            >
              <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
            </svg>
          </button>
        </div>
      </form>
    </>
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
