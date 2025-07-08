export type ActionError = {
  code: string;
  message: string;
};

export type ActionSuccess<T> = {
  data: T;
  error: null;
};

export type ActionFailure = {
  data: null;
  error: ActionError;
};

export type ActionResponse<T = unknown> = ActionSuccess<T> | ActionFailure;
