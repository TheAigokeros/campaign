import { SelectChangeEvent } from '@mui/material';
import { DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import { isNil } from 'lodash';
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

export function useSelectMultiple(
	defaultValue: string[],
): [string[], (event: SelectChangeEvent<string[]>) => void, () => void] {
	const [values, setValues] = useState<string[]>(defaultValue);

	function handleChange(event: SelectChangeEvent<string[]>): void {
		event.preventDefault();
		const eventTargetValue = event.target.value as string[];
		setValues(eventTargetValue?.filter((v) => !isNil(v)) || []);
	}

	function clearValues(): void {
		setValues([]);
	}

	return [values, handleChange, clearValues];
}

