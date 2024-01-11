import { StackContext } from "sst/constructs";
import { Auth as SSTAuth } from "sst/constructs/future";

export function Auth({ stack }: StackContext) {
  const auth = new SSTAuth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth.handler",
      environment: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
      },
    },
  });

  stack.addOutputs({
    AUTH_URL: auth.url,
  });

  return auth;
}
