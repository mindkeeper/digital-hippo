'use client';

import { Input, InputProps } from '../ui/input';
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useFormContext } from 'react-hook-form';

export interface InputItemProps extends InputProps {
	label?: string;
	name: string;
	type?: 'text' | 'number' | 'password';
}

export default function InputItem({ label, name, type = 'text', className, ...rest }: InputItemProps) {
	const { control } = useFormContext();
	return (
		<FormField
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<FormItem>
					{!label ? null : <FormLabel htmlFor={name}>{label}</FormLabel>}
					<FormControl>
						<Input className={className} placeholder="Password" type={type} {...{ ...field, ...rest }} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
