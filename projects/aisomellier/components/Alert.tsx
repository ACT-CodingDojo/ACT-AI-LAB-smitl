import React from 'react'

type AlertType = 'info' | 'success' | 'warning' | 'error'

interface AlertProps {
  type: AlertType
  title?: string
  message: string
  onClose?: () => void
  className?: string
}

const typeStyles: Record<AlertType, { bg: string; border: string; text: string; icon: string }> = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'ℹ️',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: '✓',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: '⚠️',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: '✕',
  },
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  className = '',
}) => {
  const styles = typeStyles[type]

  return (
    <div
      className={`${styles.bg} border ${styles.border} ${styles.text} px-4 py-4 rounded-lg flex items-start gap-3 ${className}`}
      role="alert"
    >
      <span className="text-xl flex-shrink-0">{styles.icon}</span>
      <div className="flex-grow">
        {title && <h3 className="font-semibold mb-1">{title}</h3>}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 text-lg hover:opacity-70"
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  )
}
