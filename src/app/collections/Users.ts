import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
	slug: 'users',
	auth: true,
	access: {
		read: () => true,
		create: () => true,
	},

	fields: [
		{
			name: 'role',
			type: 'select',
			required: true,
			defaultValue: 'user',
			options: [
				{ label: 'Admin', value: 'admin' },
				{ label: 'User', value: 'user' },
			],
		},
	],
};

export default Users;
