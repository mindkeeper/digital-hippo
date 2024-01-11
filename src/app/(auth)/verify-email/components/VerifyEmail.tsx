'use client';
import { buttonVariants } from '@/components/ui/button';
import { trpc } from '@/trpc/client';
import { Loader2, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function VerifyEmail({ token }: { token: string }) {
	const { data, isError, isLoading } = trpc.auth.verifyEmail.useQuery({ token });

	if (isLoading)
		return (
			<div className="flex flex-col items-center gap-2">
				<Loader2 className="animate-spin h-8 w-8 text-zinc-300" />
				<h3 className="font-semibold text-xl ">Verifying...</h3>
				<p className="text-muted-foreground text-sm">This wont&apos;t take long.</p>
			</div>
		);

	if (isError)
		return (
			<div className="flex flex-col items-center gap-2">
				<XCircle className="w-8 h-8 text-red-600" />
				<h3 className="font-semibold text-xl">There was a problem </h3>
				<p className="text-muted-foreground text-sm">This token is not valid or might be expired. please try again</p>
			</div>
		);
	if (data?.success)
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<div className="relative mb-4 h-60 w-60 to-muted-foreground">
					<Image src="/hippo-email-sent.png" alt="email was sent" fill />
				</div>
				<h3 className="font-semibold text-2xl">you&apos;re all set</h3>
				<p className="text-muted-foreground mt-1 text-center">Thank you for verifying your email.</p>
				<Link href="sign-in" className={buttonVariants({ className: 'mt-4' })}>
					Sign-in
				</Link>
			</div>
		);
}
