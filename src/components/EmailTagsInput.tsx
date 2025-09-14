'use client';
import { useState, KeyboardEvent, ChangeEvent, ReactElement } from 'react';

interface EmailTagsInputProps {
  emails: string[];
  errorText?: string;
  setEmails: (emails: string[]) => void;
}

export default function EmailTagsInput({
  emails,
  setEmails,
  // errorText,
}: EmailTagsInputProps): ReactElement {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>();

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function addEmail() {
    const newEmail = inputValue.trim().replace(/,$/, '');
    if (newEmail && isValidEmail(newEmail) && !emails.includes(newEmail)) {
      setError(null);
      setEmails([...emails, newEmail]);
      setInputValue('');
    } else if (newEmail) {
      setInputValue('');
      setError(`Invalid email: ${newEmail}`);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      e.preventDefault();
      addEmail();
    }
  }

  function handleDelete(email: string) {
    setEmails(emails.filter((e) => e !== email));
  }

  // const displayError = errorText || error;

  return (
    <div>
      <div className="flex items-center gap-2 border rounded-lg p-2 bg-white">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {emails.map((email) => (
            <span
              key={email}
              className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {email}
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(email)}
              >
                ×
              </button>
            </span>
          ))}

          <input
            type="text"
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Type email and press Enter"
            className="flex-1 min-w-[150px] border-none outline-none text-sm"
          />
        </div>
      
        <button
          type="button"
          onClick={addEmail}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      
      {error && (
        <label className="text-red-800 text-sm">{error}</label>
      )}
    </div>
  );
}
