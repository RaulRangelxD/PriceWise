import { SetStateAction } from 'react'

interface InputFormProps {
  placeholder: string
  type?: string
  value?: string | number
  className?: string
  onChange?: (value: SetStateAction<string>) => void
  onBlur?: (any: string) => void
}

export const InputForm = ({ placeholder, type = 'text', value, className = '', onChange, onBlur }: InputFormProps) => (
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
