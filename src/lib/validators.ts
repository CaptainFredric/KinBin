import { z } from "zod";

export const binderSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
});

export type BinderFormValues = z.infer<typeof binderSchema>;
