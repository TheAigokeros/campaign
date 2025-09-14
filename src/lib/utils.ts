import { InspectOptions, inspect } from 'util';
import { Node, mergeAttributes } from '@tiptap/core';

export function ins(data: any, options?: InspectOptions): string {
	return inspect(data, { colors: true, compact: false, ...options });
}

export const MergeTag = Node.create({
  name: 'mergeTag',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return {
      tag: { default: '' },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span[data-merge-tag]',
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-merge-tag': node.attrs.tag,
        class:
          'bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-flex items-center gap-1',
      }),
      node.attrs.tag,
    ];
  },
});
