import { MouseEvent, MouseEventHandler, useRef } from 'react';

type Props = {
  children?: JSX.Element | JSX.Element[];
  isOpen: boolean;
  closeModal: () => void;
  onClose: () => void;
};

function Modal({ children, isOpen, closeModal, onClose }: Props) {
  if (!isOpen) {
    return null;
  }

  const modalRef = useRef(null);

  const handleCloseModal = (e: MouseEvent) => {
    if (modalRef.current === e.target) {
      closeModal();
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen py-8 bg-white z-10 flex bg-opacity-75 overflow-auto"
      onClick={handleCloseModal}
      ref={modalRef}
    >
      {children}
    </div>
  );
}

export default Modal;
