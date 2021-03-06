import React, { useCallback, useState, createContext } from 'react';
import { ToastMessageList } from '../components/ToastMessagesList/ToastMessageList';

export interface ToastMessageInterface {
  id: number;
  value: string;
}

export interface ToastMessageContextType {
  messages: ToastMessageInterface[];
  addToastMessage: (message: string) => void;
}

export const ToastMessageContext = createContext<ToastMessageContextType | null>(null);

export const ToastMessageContextProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessageInterface[]>([]);

  const addToastMessage = useCallback(
    (message: string) => {
      const toast = {
        id: new Date().getTime(),
        value: message
      };
      setMessages((messages) => [...messages, toast]);
      setTimeout(() => setMessages((toasts) => toasts.slice(1)), 5000);
    },
    [setMessages]
  );

  return (
    <ToastMessageContext.Provider value={{ messages, addToastMessage }}>
      {children}
      <ToastMessageList messages={messages} />
    </ToastMessageContext.Provider>
  );
};
