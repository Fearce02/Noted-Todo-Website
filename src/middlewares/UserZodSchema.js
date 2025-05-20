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
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  username: z.string().min(5).optional(),
  password: z.string().min(8).optional(),
});

export { CreateUser, SigninUser, UpdateUser };
