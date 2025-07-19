import { Omit, useTransition } from '@react-spring/web';
import { useState } from "react";
import { Notify } from '.';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { isEnvBrowser } from '@app/utils/misc';
import { useNuiMessage } from '@app/hooks/useNuiMessage';

export type NotifyProps = {
  type: 'success' | 'warn' | 'error';
  message: string;
  color?: string;
  timeout?: number;
  style?: any;
  id: string;
};

export function Notifier() {
  const [notifys, setNotify] = useState<NotifyProps[]>(
    isEnvBrowser()
      ? [
        {
          id: Math.random().toString(),
          type: 'error',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec',
          color: '#a12828',
          timeout: 5000,
        },
        {
          id: Math.random().toString(),
          type: 'warn',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec',
          color: '#a18528',
          timeout: 5000,
        },
        {
          id: Math.random().toString(),
          type: 'success',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec',
          color: '#3ca128',
          timeout: 5000,
        }
      ]
      : [],
  );

  const transitionTable = useTransition(notifys, {
    keys: (item) => item.id,
    from: { opacity: 0, transform: 'translateY(1.25rem)', scale: 0 },
    enter: { opacity: 1, transform: 'translateY(0rem)', scale: 1 },
    leave: { opacity: 0, transform: 'translateY(1.25rem)', scale: 0 },
    config: { duration: 350 },
    trail: 80,
  });

  useNuiMessage('sendNotify', (data: Omit<NotifyProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);

    setNotify((prevState) => [...prevState, { ...data, id }]);

    setTimeout(() => {
      setNotify((prevState) => prevState.filter((item) => item.id !== id));
    }, data.timeout || 5000);
  });

  return createPortal(
    <div
      className={clsx(
        'fixed right-4 z-[9999] pointer-events-none w-[20rem] bottom-[15rem] rounded-[.625rem] flex pr-[.3125rem] pl-[.9375rem] transition-all duration-300 flex-col-reverse gap-2',
      )}
    >
      {transitionTable((style, item) => (
        <Notify
          message={item.message}
          type={item.type}
          color={item.color}
          style={style}
          id={item.id}
        />
      ))}
    </div>,
    document.getElementById('root')!,
  );
}