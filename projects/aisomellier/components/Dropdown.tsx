import React from 'react'

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: DropdownOption[]
  error?: string
  helperText?: string
}

export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, options, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors bg-white ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-gray-500 mt-1">{helperText}</p>
        )}
      </div>
    )
  }
)

Dropdown.displayName = 'Dropdown'
