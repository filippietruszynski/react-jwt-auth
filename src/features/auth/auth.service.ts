import AxiosInstance from '@/app/axios';

export interface SigninRequestData {
  email: string;
  password: string;
}

export interface SigninResponseData {
  access_token: string;
  refresh_token: string;
}

export interface GetUserResponseData {
  id: number;
  email: string;
  password?: string;
  name: string;
  role: string;
  avatar: string;
}

export interface RefreshTokenRequestData {
  refreshToken: string;
}

export interface RefreshTokenResponseData {
  access_token: string;
  refresh_token: string;
}

function signin(requestData: SigninRequestData) {
  return AxiosInstance.post<SigninResponseData>('/auth/login', requestData);
}

function getUser() {
  return AxiosInstance.get<GetUserResponseData>('/auth/profile');
}

function refreshToken(requestData: RefreshTokenRequestData) {
  return AxiosInstance.post<RefreshTokenResponseData>('/auth/refresh-token', requestData);
}

const AuthService = {
  signin,
  getUser,
  refreshToken,
};

export default AuthService;
