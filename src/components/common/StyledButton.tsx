import { ReactElement } from 'react';

interface Props {
  children: React.ReactNode;
  buttonColor?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick?: () => void;
}

export default function StyledButton({
  children,
  buttonColor = 'primary',
  size = 'medium',
  fullWidth = true,
  onClick,
}: Props): ReactElement {
  return (
    <button
      onClick={onClick}
      className={`btn ${buttonColor} ${size} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  );
}
