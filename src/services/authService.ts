import { LoginData } from "../interfaces/login-data.interface.";
import { RegisterData } from "../interfaces/register-data.interface";
import { ServerError } from "../interfaces/server-error.interface";
import { User } from "../interfaces/user.interface";

const API_URL = "http://localhost:3000/auth/";
const defaultErrMessage = "Something went wrong, Please try again later";

export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await fetch(`${API_URL}signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const user: User = await response.json();

    user && localStorage.setItem("parcelNerd-user", JSON.stringify(user));

    return user;
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      return error.message;
    }
    return defaultErrMessage;
  }
};

export const registerUser = async (
  registerData: RegisterData
): Promise<string | User> => {
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
        return body.message;
      default:
        return defaultErrMessage;
    }
  } catch (error: unknown) {
    return defaultErrMessage;
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
    if (error instanceof TypeError) {
      return error.message;
    }
    return defaultErrMessage;
  }
};
