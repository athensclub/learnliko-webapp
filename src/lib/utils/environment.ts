import { PUBLIC_APP_ENV } from '$env/static/public';

export const isOnProduction = function () {
	return PUBLIC_APP_ENV === 'production';
};
