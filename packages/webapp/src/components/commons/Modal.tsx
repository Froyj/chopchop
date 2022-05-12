import { useRef } from 'react';

type Props = {
  children?: JSX.Element | JSX.Element[]
  setIsModalOpen: (boolean) => void
}

function Modal({ children, setIsModalOpen }: Props) {
  const modalRef = useRef(null);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setIsModalOpen(false);
    }
  }

  return (
    <div className='fixed top-0 left-0 w-screen h-screen py-8 bg-white z-10 flex bg-opacity-75 overflow-auto' onClick={closeModal} ref={modalRef}>
      {children}
    </div>
  )
}

export default Modal