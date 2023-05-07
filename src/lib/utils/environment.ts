import { PUBLIC_APP_ENV } from '$env/static/public';

export const isOnProduction = function () {
	console.log('Node env: ', process.env.NODE_ENV);
	return process.env.NODE_ENV === 'production' && PUBLIC_APP_ENV === 'production';
};
