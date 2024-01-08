import QueryProvider from "./query";
import RouterProvider from "./router";
import TRPCProvider from "./trpc";

const RootProvider = () => {
  return (
    <QueryProvider>
      <TRPCProvider>
        <RouterProvider />
      </TRPCProvider>
    </QueryProvider>
  );
};

export default RootProvider;
