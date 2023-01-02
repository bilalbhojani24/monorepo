import { getWebpackPublicPath } from './setWebpackPublicPath';

const CDN_PATH = getWebpackPublicPath();
export const IMAGES_CDN_PATH = `${CDN_PATH}`;
export const ASSETS_CDN_PATH = `${CDN_PATH}/assets/`;
