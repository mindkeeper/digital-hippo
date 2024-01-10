import { InputItemProps } from '@/components/core/inputItem';
import { cn } from '@/lib/utils';
import { AuthCredentialValidator, TAuthCredentialValidator } from '@/lib/validators/account-credentials-validator';
import { trpc } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useRegister() {
	const form = useForm<TAuthCredentialValidator>({
		resolver: zodResolver(AuthCredentialValidator),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { getFieldState } = form;
	const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
		onSuccess() {
			form.reset();
			toast.success('Account created succesfully');
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	const onSubmit = useCallback(
		({ email, password }: TAuthCredentialValidator) => {
			mutate({ email, password });
		},
		[mutate],
	);

	const formItems: InputItemProps[] = [
		{
			label: 'Email',
			name: 'email',
			type: 'text',
			placeholder: 'you@example.com',
			className: cn({ 'focus-visible:ring-red-500': getFieldState('email').error }),
		},
		{
			label: 'Password',
			name: 'password',
			placeholder: 'Password',
			type: 'password',
			className: cn({ 'focus-visible:ring-red-500': getFieldState('password').invalid }),
		},
	];

	return { form, isLoading, onSubmit, formItems };
}
