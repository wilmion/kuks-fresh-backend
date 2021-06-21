import { Response } from 'express';

export const setResponse = (
  res: Response,
  data: any,
  status: number,
  error?: any,
) => {
  const response = {
    response: data,
    status: status,
    error: error ? error : null,
  };

  res.send(response);
  res.status(status);
};
