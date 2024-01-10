'use client';

import { Icons } from '@/components/Icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Form } from '@/components/ui/form';
import InputItem from '@/components/core/inputItem';
import { useRegister } from './hooks/useRegister';

export default function Page() {
	const { form, isLoading, onSubmit, formItems } = useRegister();
	return (
		<>
			<div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col items-center space-y-2 text-center">
						<Icons.logo className="h-20 w-20" />
						<h1 className="text-2xl font-bold">Create an account</h1>
						<Link
							href="sign-in"
							className={buttonVariants({
								variant: 'link',
								className: 'gap-1.5',
							})}
						>
							Already have an account? sign-in
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>
					<div className="grid gap-6">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className="grid gap-2">
									{formItems.map((form) => (
										<div className="grid gap-1 py-2" key={form.name}>
											<InputItem
												label={form.label}
												className={form.className}
												name={form.name}
												placeholder={form.placeholder}
												type={form.type}
											/>
										</div>
									))}

									<Button disabled={isLoading}>
										{isLoading ? <RotateCcw className="mr-2 h-4 w-4 animate-spin" /> : null}
										Sign up
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
}
