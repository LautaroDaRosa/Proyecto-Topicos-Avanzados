/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
class TokenService {
  getLocalRefreshToken() {
    return localStorage.getItem('refresh');
  }

  getLocalAccessToken() {
    return localStorage.getItem('token');
  }

  setLocalTokens(accessToken, refreshToken) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refresh', refreshToken);
  }

  updateLocalAccessToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeLocalTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  }
}

export default new TokenService();
