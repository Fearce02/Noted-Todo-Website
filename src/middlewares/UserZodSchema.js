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
  username: z.string().min(5).optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),

  password: z.string().min(8).optional(),
});

export { CreateUser, SigninUser, UpdateUser };
