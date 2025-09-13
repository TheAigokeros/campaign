import { ResponseApi } from "common/interface/global.interface";
import { ins } from "./utils";

export function api(apiPath: string): string {
	const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
	console.log("load env base url" + baseApiUrl)
	if (baseApiUrl) return `${baseApiUrl}${apiPath}`;
	return apiPath;
}
  

export async function fetcher<T = any>(
	url: string,
	init?: RequestInit,
): Promise<ResponseApi<T>> {
	try {
		console.log('go in fetcher')
		let apiUrl = url;		
		apiUrl = api(apiUrl);

		if (process.env.NODE_ENV === 'development') {
			console.log({
				apiUrl,
				// headers,
				init,
			});
		}
		const res = await fetch(apiUrl, {			
			...init,
		});
		const json = res.json();
		return json;
	} catch (error: any) {
		console.error(ins(error));
		return error;
	}
}