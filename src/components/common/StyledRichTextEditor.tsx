import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { MergeTag } from '@/lib/utils';
import { MERGE_TAGS } from '@/constants/mergeTags.constant';
import { useState } from 'react';

export default function StyledRichTextEditorWithMergeTag({ value = '', onChange }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filter, setFilter] = useState('');

  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: 'Write your email...' }), MergeTag],
    content: value,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.(html);
    },
    immediatelyRender: false,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!editor) return;

    const selection = editor.state.selection;
    const textBefore = editor.state.doc.textBetween(0, selection.from, '\n');
    const match = textBefore.match(/::(\w*)$/);
    if (match) {
      setFilter(match[1].toUpperCase());
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  const insertMergeTag = (tag: string) => {
    if (!editor) return
  
    const { from } = editor.state.selection
    const textBefore = editor.state.doc.textBetween(0, from, '\n')
    const match = textBefore.match(/::(\w*)$/)
  
    if (!match) return
  
    const startPos = from - match[0].length // position where '::CAMPAIGN' starts
  
    editor
      .chain()
      .focus()
      .deleteRange({ from: startPos, to: from }) // remove the ::TAG text
      .insertContent({ type: 'mergeTag', attrs: { tag } }) // insert styled tag
      .run()
  
    setDropdownVisible(false)
  }

  return (
    <div className="relative">
      <EditorContent
        editor={editor}
        onKeyDown={handleKeyDown}
        className="border p-2 rounded min-h-[150px]"
      />

      {dropdownVisible && (
        <ul className="absolute bg-white border mt-1 rounded shadow w-40 z-10">
          {MERGE_TAGS.filter((t) => t.includes(filter)).map((tag) => (
            <li
              key={tag}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => insertMergeTag(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
