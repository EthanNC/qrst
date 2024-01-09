import { postsQueryOptions } from "@/utils/queryOptions";
import Spinner from "@/utils/spinner";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FileRoute, Link, MatchRoute, Outlet } from "@tanstack/react-router";

export const Route = new FileRoute("/dashboard/posts").createRoute({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions),
  component: PostsComponent,
});

function PostsComponent() {
  const postsQuery = useSuspenseQuery(postsQueryOptions);
  const posts = postsQuery.data;

  return (
    <div className="flex-1 flex">
      <div className="divide-y w-48">
        {posts?.map((post) => {
          return (
            <div key={post.id}>
              <Link
                to="/dashboard/posts/$postId"
                params={{
                  postId: post.id,
                }}
                preload="intent"
                className="block py-2 px-3 text-blue-700"
                activeProps={{ className: `font-bold` }}
              >
                <pre className="text-sm">
                  #{post.id} - {post.title.slice(0, 10)}{" "}
                  <MatchRoute
                    to="/dashboard/posts/$postId"
                    params={{
                      postId: post.id,
                    }}
                    pending
                  >
                    <Spinner />
                  </MatchRoute>
                </pre>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="flex-1 border-l border-gray-200">
        <Outlet />
      </div>
    </div>
  );
}
