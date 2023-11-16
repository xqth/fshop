import { config } from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

config();

export const APP_PORT = process.env.APP_PORT || 3000;
export const SECRET_KEY = process.env.SECRET_KEY;
export const ROOT_DIR = join(dirname(fileURLToPath(import.meta.url)), '../..');
