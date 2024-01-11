import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute("/_protected/profile").createRoute({
  component: ProfileComponent,
});

function ProfileComponent() {
  return <div>Profile</div>;
}
