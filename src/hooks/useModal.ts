import { useState } from 'react';

type ModalType = 'error' | 'confirm' | null;

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalType(null);
    setIsOpen(false);
  };

  const toggleModal = (type?: ModalType) => {
    setModalType((prevType) => (isOpen ? null : type || prevType));
    setIsOpen((prev) => !prev);
  };

  return { isOpen, modalType, openModal, closeModal, toggleModal };
}
