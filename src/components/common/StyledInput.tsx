import clsx from 'clsx';
import { ChangeEvent, ReactElement, KeyboardEvent } from 'react';

interface Props {
  id?: string;
  value: string;
  errorText?: string;
  error?: boolean;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
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
  // onKeyDown,
  placeholder = '',
  errorText,
  error,
  appendClassName,
}: Props): ReactElement {

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
		setValue(e);
		onChange?.(e);
	}

  return (
    <div>
      <input
        id={id}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}        
        className={clsx("input", appendClassName)}
      />
      {error && (<label className="text-red-800 font-small text-xs"> {errorText} </label>)}      
    </div>
  );
}
