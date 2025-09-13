import { ChangeEvent, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';


export function useInputField<T = any, E = ChangeEvent<any>>(
	defaultValue: T,
): [T, (event: E) => void, Dispatch<SetStateAction<T>>] {
	const [value, setValue] = useState<T>(defaultValue);

	function handleChange(event: E | any): void {
		setValue(event.target.value.replace(/^\s+/, ''));
	}

	return [value, handleChange, setValue];
}