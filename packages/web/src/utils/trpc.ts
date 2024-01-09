import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@qrst-stack/functions/trpc";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: (import.meta.env.VITE_API_URL + "/trpc") as string,
    }),
  ],
});

export default trpc;
