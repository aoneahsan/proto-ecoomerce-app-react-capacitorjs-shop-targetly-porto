const _env = import.meta.env;

// Backend url for apis
const apiUrl = (_env.PROD ? _env.VITE_API_URL_PROD : _env.VITE_API_URL) ?? '';
const backendUrl =
  (_env.PROD ? _env.VITE_BACKEND_URL_PROD : _env.VITE_BACKEND_URL) ?? '';

export const ENVS = {
  apiUrl,
  cryptoSecret: _env.VITE_CRYPTO_SECRET ?? 'invoice-app-secret',
  backendUrl
};
