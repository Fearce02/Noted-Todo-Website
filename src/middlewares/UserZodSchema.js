import { z } from "zod";

const CreateUser = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SigninUser = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const UpdateUser = z.object({
  firstname: z.string().min(1).optional(),
  lastname: z.string().min(1).optional(),
  username: z.string().min(5).optional(),
  password: z.string().min(8).optional(),
});

export { CreateUser, SigninUser, UpdateUser };
