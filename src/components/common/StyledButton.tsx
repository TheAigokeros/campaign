import { ButtonHTMLAttributes, ReactElement } from 'react';
// import styles from '@/styles/components/common/StyledButton.css'
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonColor?: 'primary' | 'secondary' | 'tertiary';
  fullWidth?: boolean;
  appendClassName?: string;
}

export default function StyledButton({
  children,
  buttonColor = 'primary',
  fullWidth = true,
  appendClassName,
  ...props
}: Props): ReactElement {
    // const buttonColorStyle = styles[buttonColor] || styles['primary'];    
    return (
        <button
          className={clsx(buttonColor, appendClassName)}
          
          {...props}
        >
          {children}
        </button>
    );
}
