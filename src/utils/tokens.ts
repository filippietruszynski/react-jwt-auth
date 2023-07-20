type TokenType = 'access_token' | 'refresh_token';

export function getTokenFromSessionStorage(tokenType: TokenType): string | null {
  return sessionStorage.getItem(tokenType);
}

export function setTokenInSessionStorage(token: string, tokenType: TokenType): void {
  sessionStorage.setItem(tokenType, token);
}

export function removeTokenFromSessionStorage(tokenType: TokenType): void {
  sessionStorage.removeItem(tokenType);
}
