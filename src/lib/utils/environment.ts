import { PUBLIC_APP_ENV } from '$env/static/public';

export const isOnProduction = function () {
	return process.env.NODE_ENV === 'production' && PUBLIC_APP_ENV === 'production';
};
