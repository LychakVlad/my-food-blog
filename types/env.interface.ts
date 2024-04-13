import { NextApiResponse } from "next";

declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_ID: string;
  }
}
export interface CustomApiResponse<T = any> extends NextApiResponse<T> {
  params?: {
    id: string;
  };
}
