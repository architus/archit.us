import { warn } from "utility";

export const API_START = "API_START";
export const API_END = "API_END";
export const API_ERROR = "API_ERROR";

export const apiStart = label => ({
  type: API_START,
  payload: label
});

export const apiEnd = label => ({
  type: API_END,
  payload: label
});

export const apiError = error => {
  warn(error);
  return {
    type: API_ERROR,
    error
  };
};
