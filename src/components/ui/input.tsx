import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex w-full rounded-md border round border-clay/60 focus:outline-none focus:ring-2 focus:ring-marigold px-3 py-2.5 text-sm text-ink shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted/70 disabled:cursor-not-allowed disabled:opacity-50 bg-secondary/60',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

export { Input };
