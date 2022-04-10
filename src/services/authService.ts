import { LoginData } from "../interfaces/login-data.interface.";
import { RegisterData } from "../interfaces/register-data.interface";
import { ServerError } from "../interfaces/server-error.interface";
import { User } from "../interfaces/user.interface";
import { FetchError } from "./error";

const API_URL = "http://localhost:3000/auth/";
const defaultErrMessage = "Something went wrong, Please try again later";

export const loginUser = async (loginData: LoginData): Promise<User | void> => {
  try {
    const response = await fetch(`${API_URL}signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const body = await response.json();

    body && localStorage.setItem("parcelNerd-user", JSON.stringify(body));

    switch (response.status) {
      case 200:
        return body;
      case 400:
      case 403:
      case 404:
      case 500:
        throw new Error(body.message);
      default:
        throw new Error(defaultErrMessage);
    }
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};

export const registerUser = async (
  registerData: RegisterData
): Promise<void | User> => {
  try {
    const { email, name, password, repeatPassword } = registerData;

    if (password !== repeatPassword) {
      throw new Error("Passwords must match");
    }
    const response = await fetch(`${API_URL}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });
    const body = await response.json();

    switch (response.status) {
      case 201:
        return body;
      case 400:
      case 403:
      case 404:
      case 500:
        throw new FetchError(body.message);
      default:
        throw new FetchError(defaultErrMessage);
    }
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem("parcelNerd-user");
    await fetch(`${API_URL}signout`, {
      method: "GET",
      credentials: "include",
    });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(defaultErrMessage);
    }
  }
};
