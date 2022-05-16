import React from 'react'

type Props = {
  title?: string;
  message?: string;
  handleValidate: () => void;
  onClose: () => void;
  validateLabel: string;
  denyLabel: string;
}

function ConfirmationPopup({ title, message, handleValidate, onClose, validateLabel, denyLabel }: Props) {
  return (
    <div>
      <h1 className=' bg-naplesYellow pl-2 py-4 rounded-t-lg'>{title}</h1>
      <div className='border-2 border-naplesYellow rounded-b-lg bg-white'>
        <p className='my-8 text-center'>{message}</p>
        <button onClick={onClose} className='border rounded-lg bg-naplesYellow p-4 m-8' >{denyLabel}</button>
        <button
          onClick={async () => {
            try {
              handleValidate()
            } catch (error) {
              console.error(error)
            } finally {
              onClose();
            }
          }}
          className='border rounded-lg bg-naplesYellow p-4 m-8'
        >
          {validateLabel}
        </button>
      </div>
    </div>
  )
}

export default ConfirmationPopup