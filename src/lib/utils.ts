import { InspectOptions, inspect } from 'util';
import { Node, mergeAttributes, Command, RawCommands } from '@tiptap/core'

export function ins(data: any, options?: InspectOptions): string {
	return inspect(data, { colors: true, compact: false, ...options });
}

export const MergeTag = Node.create({
  name: 'mergeTag',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: false,
  addAttributes() {
    return {
      tag: { default: '' },
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-merge-tag]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    const tag = node.attrs.tag || '';
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-merge-tag': tag,
        class: 'bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full',
      }),
      tag,
    ];
  },
  addProseMirrorPlugins() {
    return [];
  },
});


export function editorBodyToBackend(html: string) {
  return html.replace(
    /<span[^>]*data-merge-tag="([^"]+)"[^>]*>.*?<\/span>/gi,
    (_, tag) => `<$${tag}>`
  );
}
