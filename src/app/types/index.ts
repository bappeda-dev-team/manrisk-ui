export type FetchResponse<T> = {
  Data?: T;
  Loading: boolean;
  Error?: boolean;
};

export type RisikoData = {
  jenis_risiko: string;
  uraian: string;
}

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  errors: string[];
  timestamp: string; // This is typically a string in ISO 8601 format
}