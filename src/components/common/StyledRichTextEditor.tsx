import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { MERGE_TAGS } from '@/constants/mergeTags.constant';

export default function MergeTagInput() {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filter, setFilter] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    // detect "::" and show dropdown
    const match = val.match(/::(\w*)$/);
    if (match) {
      setFilter(match[1].toUpperCase());
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  const selectTag = (tag: string) => {
    // replace "::filter" with the tag
    const newValue = value.replace(/::\w*$/, `<$${tag}>`);
    setValue(newValue);
    setTags([...tags, tag]);
    setDropdownVisible(false);
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    setValue(value.replace(`<$${tag}>`, ''));
  };

  const filteredTags = MERGE_TAGS.filter((t) => t.includes(filter));

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap gap-1 border p-2 rounded">
        {tags.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
            {tag}
            <button onClick={() => removeTag(tag)}>×</button>
          </span>
        ))}

        <input
          value={value}
          onChange={handleChange}
          placeholder="Type :: to insert merge tag"
          className="flex-1 outline-none"
        />
      </div>

      {dropdownVisible && filteredTags.length > 0 && (
        <ul className="absolute bg-white border mt-1 rounded shadow w-full z-10">
          {filteredTags.map((tag) => (
            <li
              key={tag}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => selectTag(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
