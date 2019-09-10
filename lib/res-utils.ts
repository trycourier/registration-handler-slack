import { NextApiResponse } from 'next';

export const sendJson = (res: NextApiResponse, obj: object): void => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(obj, undefined, 2));
};

export const sendRedirect = (res: NextApiResponse, path: string, statusCode: number = 302): void => {
  res.setHeader('Location', path);
  res.statusCode = statusCode;
  res.end();
};