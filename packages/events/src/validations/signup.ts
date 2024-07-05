import * as z from "zod";

export const userCreated = z.object({
    type: z.literal("userCreated"),
    data: z.object({
        email: z.string(),
        name: z.string(),
    })
});