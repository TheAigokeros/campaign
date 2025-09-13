'use client';

import { ReactElement, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
// import Typography from '@flowbite/flowbite-typography';

interface Props {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

export default function StyledRichTextEditor({
  value = '',
  onChange,
  placeholder = 'Write your email content...',
}: Props): ReactElement {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      // Typography,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      <EditorContent editor={editor} />
    </div>
  )
}
