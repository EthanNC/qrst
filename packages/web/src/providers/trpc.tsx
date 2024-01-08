import { httpBatchLink } from "@trpc/client";
import { trpc } from "../utils/trpc";
import QueryProvider from "./query";

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: (import.meta.env.VITE_API_URL + "/trpc") as string,

      // You can pass any HTTP headers you wish here
      // async headers() {
      //   return {
      //     authorization: getAuthCookie(),
      //   };
      // },
    }),
  ],
});

const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={QueryProvider.queryClient}>
      {children}
    </trpc.Provider>
  );
};

export default TRPCProvider;
