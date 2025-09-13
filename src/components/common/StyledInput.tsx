import clsx from 'clsx';
import { ChangeEvent, ReactElement, KeyboardEvent } from 'react';

interface Props {
  id?: string;
  value: string;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;  // I'm using form instead
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fullWidth?: boolean;
  appendClassName?: string;
}

export default function StyledInput({
  id,
  value,
  setValue,
  onChange,
  onKeyDown,
  placeholder = '',
  fullWidth = true,
  appendClassName,
}: Props): ReactElement {

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
		setValue(e);
		onChange?.(e);
	}

  return (
    <input
      id={id}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      // className={`input ${fullWidth ? 'w-full' : ''}`}
      className={clsx("input", appendClassName)}
    />
  );
}
