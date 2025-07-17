import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @type {import("puppeteer").Configuration}
 */
const config = {
  cacheDirectory: path.join(__dirname, '.cache', 'puppeteer'),
};

export default config;