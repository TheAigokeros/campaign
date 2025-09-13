'use client';
import { useState, KeyboardEvent, ChangeEvent } from 'react';
import clsx from 'clsx';
import StyledInput from './common/StyledInput';

interface EmailTagsInputProps {
  emails: string[];
  setEmails: (emails: string[]) => void;
}

export default function EmailTagsInput({ emails, setEmails }: EmailTagsInputProps) {
  const [inputValue, setInputValue] = useState('');

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      e.preventDefault();
      const newEmail = inputValue.trim().replace(/,$/, '');
      if (newEmail && isValidEmail(newEmail) && !emails.includes(newEmail)) {
        setEmails([...emails, newEmail]);
        setInputValue('');
      }
    }
  }

  // ✅ Delete tag
  function handleDelete(email: string) {
    setEmails(emails.filter((e) => e !== email));
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border rounded-lg p-2 bg-white">
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
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type email and press Enter"
        className={clsx(
          'flex-1 min-w-[150px] border-none outline-none text-sm',
        )}
      />
      {/* <StyledInput
          id="emails"
          value={inputValue}
          setValue={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          appendClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Emails (comma separated)"
        /> */}
    </div>
  );
}
