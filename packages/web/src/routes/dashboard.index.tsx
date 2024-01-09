import { postsQueryOptions } from "@/utils/queryOptions";
import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute("/dashboard/").createRoute({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions),
  component: DashboardIndexComponent,
});

function DashboardIndexComponent() {
  const posts = Route.useLoaderData();

  return (
    <div className="p-2">
      <div className="p-2">
        Welcome to the dashboard! You have{" "}
        <strong>{posts.length} total posts</strong>.
      </div>
    </div>
  );
}
