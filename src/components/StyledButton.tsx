// app/components/StyledButton.tsx
import React, { ReactElement, ButtonHTMLAttributes } from 'react'
import styles from '@/styles/StyledButton.module.css'  // CSS module

// Props interface
interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonColor?: 'primary' | 'secondary' | 'danger'
  appendClassName?: string
  minWidth?: string | number
  // brand?: string  // optional brand identifier
}

export default function StyledButton({
  children,
  // brand,
  buttonColor = 'primary',
  appendClassName = '',
  minWidth,
  ...props
}: StyledButtonProps): ReactElement {
  const buttonColorStyle = styles[buttonColor] || styles['primary']

  return (
    <button
      className={`${buttonColorStyle} ${appendClassName}`}
      style={{ minWidth }}
      {...props}
    >
      {children}
    </button>
  )
}
