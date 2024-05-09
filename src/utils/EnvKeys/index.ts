const _env = import.meta.env;

// Backend url for apis
const apiUrl = (_env.PROD ? _env.VITE_API_URL_PROD : _env.VITE_API_URL) ?? '';
const backendUrl =
  (_env.PROD ? _env.VITE_BACKEND_URL_PROD : _env.VITE_BACKEND_URL) ?? '';

// AWS Details
const aws = {
  cognito: {
    poolId: _env.VITE_AWS_COGNITO_POOL_ID ?? '',
    clientId: _env.VITE_AWS_COGNITO_CLIENT_ID ?? ''
  }
};

const ENVS = {
  apiUrl,
  cryptoSecret: _env.VITE_CRYPTO_SECRET ?? 'invoice-app-secret',
  backendUrl,
  aws
};

if (!_env.VITE_AWS_COGNITO_POOL_ID || !_env.VITE_AWS_COGNITO_CLIENT_ID) {
  throw new Error('AWS Cognito Pool ID and Client ID are required');
}

export default ENVS;
