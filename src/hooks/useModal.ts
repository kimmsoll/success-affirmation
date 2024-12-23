import { useState } from 'react';

export type ModalType = 'confirm' | 'error';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('confirm');

  const openModal = (type: ModalType) => {
    setModalType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalType('confirm');
    setIsOpen(false);
  };

  const toggleModal = (type?: ModalType) => {
    setModalType((prevType) => (isOpen ? 'confirm' : type || prevType));
    setIsOpen((prev) => !prev);
  };

  return { isOpen, modalType, openModal, closeModal, toggleModal };
}
