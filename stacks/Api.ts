import { StackContext, use, Api as ApiGateway, Config } from "sst/constructs";
import { Database } from "./Database";
import { Auth } from "./Auth";

export function Api({ stack }: StackContext) {
  const auth = use(Auth);

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        bind: [auth],
      },
    },
    customDomain:
      stack.stage === "prod" ? "api.sevensingletables.com" : undefined,
    routes: {
      "GET /trpc/{proxy+}": "packages/functions/src/trpc.handler",
      "POST /trpc/{proxy+}": "packages/functions/src/trpc.handler",
    },
  });

  stack.addOutputs({
    API_URL: api.customDomainUrl || api.url,
  });

  return api;
}
