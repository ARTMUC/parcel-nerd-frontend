import { LoginData } from '../interfaces/login-data.interface';
import { RegisterData } from '../interfaces/register-data.interface';
import { User } from '../interfaces/user.interface';
import { API_URL, defaultErrMessage, FetchError, FRONT_URL, mapServerResponse } from './fetchUtils';

export const loginUser = async (loginData: LoginData): Promise<User | void> => {
  try {
    const response = await fetch(`${API_URL}auth/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    const body = await response.json();

    body && localStorage.setItem('parcelNerd-user', JSON.stringify(body));

    return mapServerResponse<User>(response, body);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};

export const registerUser = async (registerData: RegisterData): Promise<void | User> => {
  try {
    const { email, name, password, repeatPassword } = registerData;

    if (password !== repeatPassword) {
      throw new Error('Passwords must match');
    }
    const response = await fetch(`${API_URL}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, name, password })
    });
    const body = await response.json();

    return mapServerResponse<User>(response, body);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem('parcelNerd-user');
    fetch(`${API_URL}auth/signout`, {
      method: 'GET',
      credentials: 'include'
    });
    window.location.href = `${FRONT_URL}signin`;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(defaultErrMessage);
    }
  }
};
