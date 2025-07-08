import { createSafeActionClient } from "next-safe-action";
import { ZodSchema } from "zod";

// Create a safe action client
export const action = createSafeActionClient();

// Typed wrapper for actions with Zod schema
export function createAction<Schema extends ZodSchema, Result>(
  schema: Schema,
  handler: (input: Schema["_output"]) => Promise<Result>
) {
  return action.schema(schema).action(async (data) => {
    const validated = schema.parse(data);
    return handler(validated);
  });
}
