import { InspectOptions, inspect } from 'util';

export function ins(data: any, options?: InspectOptions): string {
	return inspect(data, { colors: true, compact: false, ...options });
}