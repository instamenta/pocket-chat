'use client';

import { Bounce, toast, ToastContentProps, ToastOptions } from 'react-toastify';
import React from 'react';

type NotificationData = {
  content: string;
  outline?: 'green' | 'red' | 'blue';
  buttons?: Array<{
    content: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    color?: 'green' | 'red' | 'blue';
  }>;
};

type T_Positions =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export const useInfoNotification = (
  content: string,
  config?: {
    position: T_Positions;
  },
) => {
  toast.info(content, {
    theme: 'colored',
    position: config?.position || 'top-center',
  });
};

export const useSuccessNotification = (
  content: string,
  config?: {
    position: T_Positions;
  },
) => {
  toast.success(content, {
    theme: 'colored',
    position: config?.position || 'top-center',
  });
};

export const useErrorNotification = (
  content: string,
  config?: {
    position: T_Positions;
  },
) => {
  toast.error(content, {
    theme: 'colored',

    position: config?.position || 'top-center',
  });
};

export const useWarnNotification = (
  content: string,
  config?: {
    position: T_Positions;
  },
) => {
  toast.warn(content, {
    theme: 'colored',

    position: config?.position || 'top-center',
  });
};

export function useCustomNotification(
  data: NotificationData,
  timeout?: number,
) {
  const config = toast_config;

  if (timeout) config!.autoClose = timeout;

  toast((t) => <CustomToasts {...t} data={data} />, config);
}

export const toast_config: ToastOptions<unknown> | undefined = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Bounce,
};

const CustomToasts = ({
  closeToast,
  data,
}: ToastContentProps<NotificationData>) => {
  return (
    <div className="">
      <p className="mx-auto text-center font-bold">{data.content}</p>
      <div className={`flex flex-col gap-2 ${data.buttons ? 'mt-3' : ''}`}>
        {data.buttons?.map((buttonProps, index) => (
          <button
            key={index}
            className={`mx-auto w-1/2 shadow-inner outline outline-1 transition-all hover:text-white ${
              buttonProps.color === 'red'
                ? 'bg-slate-800 text-red-600  outline-red-600 hover:bg-red-600'
                : buttonProps.color === 'blue'
                  ? 'bg-slate-800 text-blue-600  outline-blue-600 hover:bg-blue-600'
                  : buttonProps.color === 'green'
                    ? 'bg-slate-800 text-green-600  outline-green-600 hover:bg-green-600'
                    : 'bg-slate-800 text-blue-600  outline-blue-600 hover:bg-blue-600 '
            }`}
            onClick={(event) =>
              buttonProps.onClick
                ? buttonProps.onClick(event)
                : () => closeToast()
            }
          >
            {buttonProps.content}
          </button>
        ))}
      </div>
    </div>
  );
};
export default CustomToasts;
