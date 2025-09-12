'use client';
import { ReactElement, useState } from 'react';
import dynamic from 'next/dynamic';
import { MERGE_TAGS } from '@/constants/mergeTags';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export default function StyledRichTextEditor({ value, setValue }: Props): ReactElement {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInsertTag = (tag: string) => {
    setValue(`${value} <$${tag}>`);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <ReactQuill value={value} onChange={setValue} />
      <button type="button" onClick={() => setShowDropdown(!showDropdown)}>
        Insert Tag
      </button>
      {showDropdown && (
        <div className="absolute border bg-white p-2 mt-1">
          {MERGE_TAGS.map((tag) => (
            <div
              key={tag}
              className="cursor-pointer hover:bg-gray-100 p-1"
              onClick={() => handleInsertTag(tag)}
            >
              ::{tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
