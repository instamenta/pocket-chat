'use client';

import React from 'react';

const initialState = [
  {
    sender: 'sender',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type an',
  },
  {
    sender: 'user',
    text: ' has survived not only five centuries, but also the leap into electronic typesetting, remaining essential',
  },
  {
    sender: 'sender',
    text: '300000010000001000000100000010000001000000100000010000001000000',
  },
  { sender: 'sender', text: '4000000' },
  { sender: 'sender', text: '\'Content here, content here\', making' },
  { sender: 'user', text: '6000000' },
  { sender: 'sender', text: '7000000' },
  { sender: 'sender', text: '8000000' },
  {
    sender: 'user',
    text: '300000010000001000000100000010000001000000100000010000001000000',
  },
  { sender: 'sender', text: '8000000' },
  { sender: 'sender', text: '8000000' },
  { sender: 'sender', text: '8000000' },
  {
    sender: 'sender',
    text: 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its ',
  },
  { sender: 'sender', text: '8000000' },
  {
    sender: 'sender',
    text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,',
  },
  { sender: 'sender', text: '8000000' },
  { sender: 'sender', text: '8000000' },
  { sender: 'sender', text: '11208000000' },
];

interface Message {
  sender: string;
  text: string;
}

export default function Chat(): React.JSX.Element {
  const [text, setText] = React.useState<string>('');
  const [messages /*setMessages*/] = React.useState<Message[]>(initialState);

  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const $el = chatContainerRef.current;
    if (!$el) return;
    const isElementAtBottom =
      $el.scrollHeight - $el.scrollTop === $el.clientHeight;
    !isElementAtBottom
      ? ($el.style.overflowY = 'hidden')
      : ($el.style.overflowY = 'auto');
  };

  React.useEffect(() => {
    const $el = chatContainerRef.current;
    if ($el) $el.scrollTop = $el.scrollHeight;
  }, [messages]);

  return (
    <>
      {/* Navigation Container*/}
      <nav
        className="flex h-full w-full flex-row justify-between rounded-b-3xl
                      border-b-4 border-gray-300 px-5 py-5 pt-6 shadow-xl"
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
            <div className="ml-4 h-12 w-12 rounded-full bg-red-950" />
          </div>

          <div className="flex w-full flex-col truncate pl-4">
            <p className="truncate font-bold text-gray-800">
              Sebastininian Dragovich The Second
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
        </div>
      </nav>

      {/* CHAT MESSAGES SECTION */}
      <section
        className="flex max-h-screen w-full bg-blue-100"
        style={{ height: 'calc(100vh - 183px)' }}
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        <article className="scrollbar-xs flex w-full flex-col-reverse overflow-y-scroll p-6">
          {messages.map((message, index) => (
            <div
              style={{ maxWidth: '70%' }}
              key={index}
              className={`mb-3 ${
                message.sender === 'user' ? 'self-start' : 'self-end'
              }`}
            >
              <div
                className={`rounded-2xl bg-white px-4 pb-4 pt-2 ${
                  message.sender === 'user'
                    ? 'rounded-br-none'
                    : 'rounded-bl-none'
                }`}
              >
                <span className="break-words">{message.text}</span>
              </div>
            </div>
          ))}
        </article>
      </section>

      {/* SEND MESSAGE CONTAINER */}
      <section className="top-shadow fixed bottom-0 flex w-full flex-row rounded-t-3xl p-5 ">
        {/* Message Input */}
        <textarea
          className="h-auto w-full overflow-y-hidden pl-4 outline-none"
          placeholder="Type here..."
          onChange={(event) => setText(event.target.value)}
          value={text}
          ref={textRef}
        />
        {/* Options Container */}
        <div className="m-auto flex flex-row gap-3 pl-6">
          {/* Emoji Picker Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 512 512"
          >
            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
          {/* Send Message Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 512 512"
          >
            <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
          </svg>
        </div>
      </section>
    </>
  );
}

// React.useEffect(() => {
//   const textarea = textRef.current;
//   textarea!.style.height = 'auto';
//   textarea!.style.height = textarea!.scrollHeight + 'px';
// }, [text]);
//
// React.useEffect(() => {
//   const $el = chatContainerRef.current;
//   $el.scrollTop = $el.scrollHeight;
// }, []);
