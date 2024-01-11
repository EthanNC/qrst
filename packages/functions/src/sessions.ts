import { createSessionBuilder } from "sst/node/future/auth";

export const sessions = createSessionBuilder<{
  user: {
    email: string;
  };
}>();
