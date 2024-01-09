import QueryProvider from "./query";
import RouterProvider from "./router";

const RootProvider = () => {
  return (
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  );
};

export default RootProvider;
