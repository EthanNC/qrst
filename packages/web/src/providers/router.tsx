import {
  Router,
  RouterProvider as TanStackRouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import QueryProvider from "./query";
import Spinner from "@/utils/spinner";

const router = new Router({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <Spinner />
    </div>
  ),
  // defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    queryClient: QueryProvider.queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
export default function RouterProvider() {
  return <TanStackRouterProvider router={router} />;
}
