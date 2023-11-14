export {};

declare global {
  interface ApiRecord {
    id: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: string | number;
  }

  type RecordField = {
    key: string;
    value: string;
    decorator?: string;
  };

  type RecordList = {
    title: string;
    url: string;
    fields: RecordField[];
    values: ApiRecord[];
  };

  type ApiError = {
    response: {
      data: {
        statusCode: number;
        message: string;
        error: string;
      };
    };
  };

  type ApiMultipleErrors = {
    response: {
      data: {
        statusCode: number;
        message: string[];
        error: string;
      };
    };
  };
}
