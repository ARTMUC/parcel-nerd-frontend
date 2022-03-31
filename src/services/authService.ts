import { LoginData } from "../interfaces/login-data.interface.";
import { RegisterData } from "../interfaces/register-data.interface";
import { User } from "../interfaces/user.interface";

const API_URL = "http://localhost:3000/auth/";

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
  } catch (error) {
    // throw new Error(error.message);
    console.log(error);
  }
};

export const registerUser = async (registerData: RegisterData) => {
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
    const { message } = await response.json();
    switch (response.status) {
      case 201:
        return message;
      case 400:
        throw new Error(message);
      case 500:
        throw new Error("server error - please try again later");
      default:
        console.log("unhandled", response.status);
        break;
    }
  } catch (error) {
    // throw new Error(error.message);
    console.log(error);
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
  } catch (error) {
    // throw new Error(error.message);
    console.log(error);
  }
};
