import { FileRoute, redirect } from "@tanstack/react-router";

export const Route = new FileRoute("/_protected").createRoute({
  beforeLoad({ context, location }) {
    if (!context.user) {
      throw redirect({
        to: "/",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
});
