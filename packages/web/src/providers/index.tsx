import QueryProvider from "./query";
import RouterProvider from "./router";

const RootProvider = () => {
  return (
    <QueryProvider>
      {/* <AuthProvider> */}
      <RouterProvider />
      {/* </AuthProvider> */}
    </QueryProvider>
  );
};

export default RootProvider;
