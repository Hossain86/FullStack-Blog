import { Request } from "express";

// Define the user structure (adjust according to your User model)
export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    email: string;
    username: string;
  };
}
