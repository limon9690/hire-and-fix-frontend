export type ApiErrorSource = {
  path: string;
  message: string;
};

export type ApiMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
  totalPages?: number;
};

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  meta?: ApiMeta;
};

export type ApiFailureResponse = {
  success: false;
  message: string;
  statusCode?: number;
  errorSources?: ApiErrorSource[];
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;

export class ApiError extends Error {
  statusCode: number;
  errorSources: ApiErrorSource[];

  constructor(
    message: string,
    statusCode = 500,
    errorSources: ApiErrorSource[] = []
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorSources = errorSources;
  }
}
