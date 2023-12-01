import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';

  return (
    <div
      className={`${modalClasses} z-10 bg-opacity-50 bg-black backdrop-blur transition-all duration-700 p-4`}
      onClick={onClose}
    >
      <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-[400px]" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
