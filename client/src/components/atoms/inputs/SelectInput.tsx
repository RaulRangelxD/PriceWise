interface SelectInputProps {
  value?: string | number
  className?: string
  onChange?: (value: string) => void
  options?: Array<{ value: string | number; name: string }>
  placeholder?: string
}

export const SelectInput = ({ value, className = '', onChange, options = [], placeholder }: SelectInputProps) => (
  <select value={value} onChange={(e) => onChange?.(e.target.value)} className={`input-form ${className}`}>
    {placeholder && (
      <option className='hidden' value=''>
        {placeholder}
      </option>
    )}
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.name}
      </option>
    ))}
  </select>
)
