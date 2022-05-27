import { CreateLine } from '../interfaces/createLine.type';
import { CreateProject } from '../interfaces/createProject.interface';
import { Line } from '../interfaces/line.type';

import { Project } from '../interfaces/project.interface';
import { ServerError } from '../interfaces/server-error.interface';
import { API_URL, defaultErrMessage, FetchError, mapServerResponse } from './fetchUtils';

export const getAllLines = async (projectId: string): Promise<Line[] | void> => {
  try {
    const response = await fetch(`${API_URL}lines/project=${projectId}`, { credentials: 'include' });
    const body: Line[] | ServerError = await response.json();

    return mapServerResponse<Line[]>(response, body);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};

export const addLine = async (createLine: CreateLine, projectId: string): Promise<Line | void> => {
  try {
    const response = await fetch(`${API_URL}lines/project=${projectId}`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createLine)
    });
    const body: Line | ServerError = await response.json();

    return mapServerResponse<Line>(response, body);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};

export const removeLine = async (lineId: string): Promise<any | void> => {
  try {
    const response = await fetch(`${API_URL}lines/${lineId}`, {
      credentials: 'include',
      method: 'DELETE'
    });
    const body: any | ServerError = await response.json();

    return mapServerResponse<any>(response, body);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};
