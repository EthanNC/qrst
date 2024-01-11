import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@qrst-stack/functions/trpc";
import { store } from "./auth";

const token = store.get()?.token;
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: (import.meta.env.VITE_API_URL + "/trpc") as string,
      headers() {
        return {
          Authorization: token ? `Bearer ${token}` : "",
        };
      },
    }),
  ],
});

export default trpc;
