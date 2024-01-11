import dontenv from 'dotenv';
import path from 'path';
import payload, { Payload } from 'payload';
import type { InitOptions } from 'payload/config';

import nodemailer from 'nodemailer';
import { google } from 'googleapis';

dontenv.config({ path: path.resolve(__dirname, '../.env') });

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2({
	clientId: process.env.GOOGLE_CLIENT_ID!,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
	redirectUri: 'https://developers.google.com/oauthplayground',
});

oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN! });
let cached = (global as any).payload;

const transporter = nodemailer.createTransport({
	auth: {
		user: 'fcb.nyak@gmail.com',
		type: 'OAuth2',
		clientId: process.env.GOOGLE_CLIENT_ID!,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		refreshToken: process.env.GOOGLE_REFRESH_TOKEN!,
		accessToken: process.env.GOOGLE_ACCESS_TOKEN!,
	},
	service: 'gmail',
});

if (!cached) {
	cached = (global as any).payload = { client: null, promise: null };
}

interface Args {
	initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
	if (!process.env.PAYLOAD_SECRET) throw new Error('PAYLOAD_SECRET is missing!');

	if (cached.client) {
		return cached.client;
	}

	if (!cached.promise) {
		cached.promise = payload.init({
			email: {
				transport: transporter,
				fromAddress: 'fcb.nyak@gmail.com',
				fromName: 'Digital Hippo',
			},
			secret: process.env.PAYLOAD_SECRET,
			local: initOptions?.express ? false : true,
			...(initOptions || {}),
		});
	}

	try {
		cached.client = await cached.promise;
	} catch (error: unknown) {
		cached.promise = null;
		throw error;
	}

	return cached.client;
};
