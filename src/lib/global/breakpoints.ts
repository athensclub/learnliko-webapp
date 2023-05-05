import { useMediaQuery } from 'svelte-breakpoints';
import { browser } from '$app/environment';
import { readable } from 'svelte/store';

/**
 * The width (in pixels) at which going above the number will not be considered as is mobile.
 */
export const MOBILE_BREAKPOINT_WIDTH = 600;

/**
 * A query string to check for is mobile. It is implemented as `(max-width: ${MOBILE_BREAKPOINT_WIDTH}px)`
 */
export const MOBILE_BREAKPOINT_WIDTH_QUERY = `(max-width: ${MOBILE_BREAKPOINT_WIDTH}px)`;

export const isMobile = browser ? useMediaQuery(MOBILE_BREAKPOINT_WIDTH_QUERY) : readable(false);