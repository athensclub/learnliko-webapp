import { Configuration, OpenAIApi } from 'openai';
import { SECRET_OPENAI_API_KEY } from '$env/static/private';

// generate image outside ssr (temporary code)

const _configuration = new Configuration({
    organization: 'org-zy9WP5Ms8eWs4ToQfjGStzlC',
    apiKey: SECRET_OPENAI_API_KEY
});
export const _openai = new OpenAIApi(_configuration);

/**
 * 
 * @param prompt 
 * @returns base64 image url.
 */
export const createImage = async (prompt: string) => {
    const res = await _openai.createImage({ prompt, n: 1, response_format: 'url' });
    return res.data.data[0].url;
}