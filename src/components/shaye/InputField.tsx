import React from 'react'

interface InputFieldProps {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  type?: string
}

export function InputField({ label, name, placeholder, required, type = 'text' }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-xs text-sub block mb-1.5">
        {label} {required && '*'}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border-[1.5px] border-border rounded-input text-sm font-sans outline-none bg-card focus:border-primary transition-colors"
      />
    </div>
  )
}
