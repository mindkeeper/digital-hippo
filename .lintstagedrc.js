const path = require('path');

const getFiles = (filenames) => {
	return `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;
};

module.exports = {
	'**/*.{ts,tsx}': [getFiles],
	'**/*.{js,cjs,ts,tsx,json,md}': 'prettier --write',
};
