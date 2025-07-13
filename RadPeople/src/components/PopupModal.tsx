import React from 'react';

interface PopupModalProps {
  open: boolean;
  onClose: () => void;
  text: string;
  width?: string | number;
  height?: string | number;
  color?: 'red' | 'black';
}

const PopupModal: React.FC<PopupModalProps> = ({
  open,
  onClose,
  text,
  width = 320,
  height, // not used for the modal box, let it grow
  color = 'black',
}) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.2)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          border: '1px solid #000',
          borderRadius: 0,
          width,
          minHeight: 100,
          maxWidth: '90vw',
          maxHeight: '80vh',
          position: 'relative',
          boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto', // allow scrolling if content is too tall
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 36,
            height: 36,
            background: 'none',
            border: 'none',
            fontSize: 22,
            fontWeight: 200,
            cursor: 'pointer',
            color: '#000',
            zIndex: 2,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Close"
        >
          x
        </button>
        <div style={{ width: '100%', height: 1, background: '#000', marginTop: 36 }} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color === 'red' ? '#d32f2f' : '#000',
            fontWeight: 400,
            fontSize: 14,
            padding: 24,
            fontFamily: 'Sequel Sans Regular',
            textAlign: 'center',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;