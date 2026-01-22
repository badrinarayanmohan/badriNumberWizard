import React from 'react';

interface InfoBannerProps {
  message: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  onClose?: () => void;
}

export const InfoBanner: React.FC<InfoBannerProps> = ({ message, type = 'info', onClose }) => {
  const bgColors = {
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200'
  };

  const textColors = {
    info: 'text-blue-800',
    warning: 'text-yellow-800',
    success: 'text-green-800',
    error: 'text-red-800'
  };

  const icons = {
    info: '💡',
    warning: '⚠️',
    success: '✓',
    error: '✕'
  };

  return (
    <div className={`${bgColors[type]} border rounded-lg p-4 mb-4 flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{icons[type]}</span>
        <p className={`${textColors[type]} text-sm font-medium`}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`${textColors[type]} hover:opacity-70 transition-opacity`}
          aria-label="Close banner"
        >
          ×
        </button>
      )}
    </div>
  );
};
