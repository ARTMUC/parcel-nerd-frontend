import { CreateProject } from '../interfaces/createProject.interface';

import { Project } from '../interfaces/project.interface';
import { ServerError } from '../interfaces/server-error.interface';
import { API_URL, defaultErrMessage, FetchError, mapServerResponse } from './fetchUtils';

export const getAllProjects = async (): Promise<Project[] | void> => {
  try {
    const response = await fetch(`${API_URL}projects`, { credentials: 'include' });
    const body: Project[] | ServerError = await response.json();

    return mapServerResponse<Project[]>(response, body);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};

export const addProject = async (createProject: CreateProject): Promise<Project | void> => {
  try {
    const response = await fetch(`${API_URL}projects`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createProject)
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

export const patchProject = async (project: Project): Promise<{ count: number } | void> => {
  try {
    const { id, title, content } = project;
    const response = await fetch(`${API_URL}projects/${id}`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });
    const body: { count: number } | ServerError = await response.json();

    return mapServerResponse<{ count: number }>(response, body);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};
//
// @TODO: implement remove and patch
//
