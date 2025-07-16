export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignupData {
name :string,
  email: string;
  password: string;
}

export interface SignupResponse {

name : string,
email: string;
password : string
id: number;



} 