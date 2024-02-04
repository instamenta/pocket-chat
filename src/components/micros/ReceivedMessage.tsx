import React, { useState } from 'react';
import { I_Message, I_UserSchema } from '@/lib/types';

const ReceivedMessage = ({
  message,
  recipient,
}: {
  message: I_Message;
  recipient: I_UserSchema | null;
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div
      className={`flex self-start transition-all ${toggle ? 'mb-6' : 'mb-3'}`}
      style={{ maxWidth: '70%' }}
    >
      <div className="aspect-h-1 -ml-4 mr-2 aspect-square h-8 w-8 self-end">
        <img
          alt="pic"
          src={recipient?.picture ?? ''}
          className="aspect-square h-8 w-8 overflow-hidden rounded-full"
        />
      </div>
      <div className="relative mb-3 self-start">
        <div
          onClick={() => setToggle((prev) => !prev)}
          className={`rounded-2xl rounded-bl-none border-t border-gray-200 px-4 pb-3 pt-2 drop-shadow-xl transition-all ${
            toggle ? 'bg-slate-300' : 'bg-white '
          }`}
        >
          <span className="break-words">{message.content}</span>
        </div>
        <div
          className={`absolute rounded-full text-sm font-light transition-all ${
            toggle ? 'text-gray-500' : ' hidden text-white'
          }`}
          style={{ left: '5px', bottom: '-21px' }}
        >
          {new Date(message.created_at)
            .toLocaleDateString()
            .replaceAll('/', '.')}
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessage;
