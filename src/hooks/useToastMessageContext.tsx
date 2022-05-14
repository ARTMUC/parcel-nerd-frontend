import { useContext } from 'react';
import { ToastMessageContext } from '../context/ToastMessageContext';

export const useToastMessageContext = () => {
  const toastContext = useContext(ToastMessageContext);

  if (!toastContext) {
    throw new Error('Missing ToastMessageContext data');
  }

  return toastContext;
};
