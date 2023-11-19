import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const convertFileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (typeof reader.result === 'string') {
				const base64Img = reader.result;
				resolve(base64Img); // Resolve the promise with the Base64 data
			} else {
				console.error('Error reading the file.');
				reject(new Error('Error reading the file'));
			}
		};

		reader.onerror = () => {
			console.error('File read error.');
			reject(new Error('File read error'));
		};

		reader?.readAsDataURL(file);
	});
};
