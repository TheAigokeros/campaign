import { InspectOptions, inspect } from 'util';
import { Node, mergeAttributes, Command } from '@tiptap/core'

export function ins(data: any, options?: InspectOptions): string {
	return inspect(data, { colors: true, compact: false, ...options });
}

export const MergeTag = Node.create({
  name: 'mergeTag',
  group: 'inline',
  inline: true,
  atom: true, // treat as single unit
  addAttributes() {
    return {
      tag: {
        default: '',
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span[data-merge-tag]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-merge-tag': HTMLAttributes.tag,
        class: 'bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full',
      }),
      `<$${HTMLAttributes.tag}>`, // this is what gets serialized
    ];
  },
});

// export function editorBodyToBackend(html: string) {
//   return html.replace(/<span data-merge-tag="(\w+)">.*?<\/span>/g, '<$$1>');
// }

export function editorBodyToBackend(html: string) {
  return html.replace(
    /<span[^>]*data-merge-tag="(\w+)"[^>]*>.*?<\/span>/gi,
    (_, tag) => `<$${tag}>`
  );
}