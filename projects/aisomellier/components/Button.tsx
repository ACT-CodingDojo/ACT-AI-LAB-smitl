import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  outline:
    'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 active:bg-purple-100',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className = '',
  disabled = false,
  children,
  ...props
}) => {
  const baseStyles =
    'font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const variantStyle = variantStyles[variant]
  const sizeStyle = sizeStyles[size]
  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}
