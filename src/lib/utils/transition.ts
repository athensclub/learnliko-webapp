import { fly, scale, type TransitionConfig, type FlyParams, type ScaleParams } from 'svelte/transition';

export const flyScale = (node: Element, options: FlyParams & ScaleParams): TransitionConfig => {
    const scaleTrans = scale(node, options);
    const flyTrans = fly(node, options);
    return {
        ...options,
        css: t => `
            ${scaleTrans.css(t)};
            ${flyTrans.css(t)};
        `
    };
}