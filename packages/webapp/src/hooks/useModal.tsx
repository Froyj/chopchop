import { useState } from 'react';

function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return { isOpen: isOpen, toggle, openModal, closeModal };
}

export default useModal