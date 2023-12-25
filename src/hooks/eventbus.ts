export const on = (event: string, callback: (data: any) => void) => {
	document.addEventListener(event, (e) => callback((e as CustomEvent).detail));
};

export const dispatch = (event: string, data: any) => {
	document.dispatchEvent(new CustomEvent(event, { detail: data }));
};

export const remove = (event: string, callback: () => void) => {
	document.removeEventListener(event, callback);
};
