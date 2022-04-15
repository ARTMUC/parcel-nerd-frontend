import { CreateProject } from "../interfaces/createProject.interface";
import { LoginData } from "../interfaces/login-data.interface.";
import { Project } from "../interfaces/project.interface";
import { RegisterData } from "../interfaces/register-data.interface";
import { ServerError } from "../interfaces/server-error.interface";
import { User } from "../interfaces/user.interface";
import { defaultErrMessage, FetchError, mapServerResponse } from "./error";

const API_URL = "http://localhost:3000/projects/";

export const getAllProjects = async (): Promise<Project[] | void> => {
  try {
    const response = await fetch(`${API_URL}`, { credentials: "include" });
    const body: Project[] | ServerError = await response.json();

    return mapServerResponse<Project[]>(response, body);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};

export const addProject = async (
  createProject: CreateProject
): Promise<Project | void> => {
  try {
    const response = await fetch(`${API_URL}`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createProject),
    });
    const body: Project | ServerError = await response.json();

    return mapServerResponse<Project>(response, body);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};

// export const registerUser = async (
//   registerData: RegisterData
// ): Promise<void | User> => {
//   try {
//     const { email, name, password, repeatPassword } = registerData;

//     if (password !== repeatPassword) {
//       throw new Error("Passwords must match");
//     }
//     const response = await fetch(`${API_URL}signup`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, name, password }),
//     });
//     const body = await response.json();

//     switch (response.status) {
//       case 201:
//         return body;
//       case 400:
//       case 403:
//       case 404:
//       case 500:
//         throw new FetchError(body.message);
//       default:
//         throw new FetchError(defaultErrMessage);
//     }
//   } catch (error: unknown) {
//     if (error instanceof FetchError) {
//       throw error;
//     }
//     throw new Error(defaultErrMessage);
//   }
// };

// export const logoutUser = async () => {
//   try {
//     localStorage.removeItem("parcelNerd-user");
//     await fetch(`${API_URL}signout`, {
//       method: "GET",
//       credentials: "include",
//     });
//     return;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(defaultErrMessage);
//     }
//   }
// };
