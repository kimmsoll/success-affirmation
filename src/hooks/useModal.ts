import { useState } from 'react';

export type ModalType = 'confirm' | 'error';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('confirm');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openModal = (type: ModalType, errorMessage?: string) => {
    setModalType(type);
    setIsOpen(true);
    setErrorMessage(errorMessage as string);
  };

  const closeModal = () => {
    setModalType('confirm');
    setIsOpen(false);
    setErrorMessage(null);
  };

  const toggleModal = (type?: ModalType) => {
    setModalType((prevType) => (isOpen ? 'confirm' : type || prevType));
    setIsOpen((prev) => !prev);
  };

  return { isOpen, modalType, errorMessage, openModal, closeModal, toggleModal };
}
