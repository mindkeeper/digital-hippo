import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	port: 465,
	secure: true,
	host: 'smtp.resend.com',
	auth: {
		user: 'resend',
		pass: process.env.RESEND_API_KEY!,
	},
});
