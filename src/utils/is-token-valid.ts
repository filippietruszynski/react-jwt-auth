import jwt_decode from 'jwt-decode';

const MILISECONDS_IN_SECOND = 1000;

interface DecodedToken {
  exp: number;
  [key: string]: unknown;
}

/* Only for Base64Url encoded JWT tokens */
export function isTokenValid(token: string | null): boolean {
  if (!token) return false;

  const decodedToken = jwt_decode<DecodedToken>(token);
  const currentTime = Date.now() / MILISECONDS_IN_SECOND;

  return decodedToken.exp > currentTime;
}
