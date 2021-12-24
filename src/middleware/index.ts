import * as http from "http";

interface MiddlewareProps {
  req: http.IncomingMessage;
  res: http.ServerResponse;
}

interface MiddlewareResponse {
  isCompleted: boolean;
}

export default ({ req }: MiddlewareProps): MiddlewareResponse => {
  console.log(`FROM MIDDLEWARE: `, req.url);

  return { isCompleted: false };
};
