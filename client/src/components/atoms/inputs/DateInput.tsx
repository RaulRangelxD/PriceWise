import { SetStateAction } from 'react'

interface DateInputProps {
  placeholder: string
  type?: string
  value?: string | number
  className?: string
  onChange?: (value: SetStateAction<string>) => void
  onBlur?: (any: string) => void
}

export const DateInput = ({ placeholder, type = 'date', value, className = '', onChange, onBlur }: DateInputProps) => (
  <input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    onBlur={(e) => {
      onBlur?.(e.target.value)
    }}
    className={`input-form ${className}`}
  />
)
