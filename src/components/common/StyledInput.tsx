import { ChangeEvent, ReactElement } from 'react';

interface Props {
  value: string;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

export default function StyledInput({
  value,
  setValue,
  placeholder = '',
  fullWidth = true,
}: Props): ReactElement {
  return (
    <input
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      className={`input ${fullWidth ? 'w-full' : ''}`}
    />
  );
}
