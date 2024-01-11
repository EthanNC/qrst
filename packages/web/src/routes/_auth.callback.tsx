import { decodeToken, store } from "@/utils/auth";
import { FileRoute, redirect } from "@tanstack/react-router";

export const Route = new FileRoute("/_auth/callback").createRoute({
  beforeLoad({ context, location }) {
    if (context.user) {
      throw redirect({
        to: "/dashboard",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
    const token = new URLSearchParams(window.location.hash.substring(1)).get(
      "access_token"
    );

    if (token) {
      // Handling an auth callback, this should become the authoritative account
      const _account = decodeToken({ token: token });
      console.log(
        "🤖 Auth registering account from callback",
        JSON.stringify(_account, null, 2)
      );
      store.set({ user: _account });
      return {
        user: _account,
      };
    }
  },
  component: AuthCallbackComponent,
});

function AuthCallbackComponent() {
  const email = Route.useRouteContext().user?.email;
  if (email) {
    location.href = location.origin;
  }
  return <div>Logging in user: {email}</div>;
}
