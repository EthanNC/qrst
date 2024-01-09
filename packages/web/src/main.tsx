import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Outlet,
  RouterProvider,
  Router,
  Link,
  MatchRoute,
  useNavigate,
  Route,
  useRouterState,
  rootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@qrst-stack/functions/trpc";
import {
  QueryClient,
  QueryClientProvider,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { z } from "zod";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: (import.meta.env.VITE_API_URL + "/trpc") as string,
    }),
  ],
});

function Spinner() {
  return <div className="inline-block animate-spin px-3">⍥</div>;
}

const rootRoute = rootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

  return (
    <>
      <div className={`min-h-screen flex flex-col`}>
        <div className={`flex items-center border-b gap-2`}>
          <h1 className={`text-3xl p-2`}>Kitchen Sink</h1>
          {/* Show a global spinner when the router is transitioning */}
          <div
            className={`text-3xl duration-300 delay-0 opacity-0 ${
              isLoading ? ` duration-1000 opacity-40` : ""
            }`}
          >
            <Spinner />
          </div>
        </div>
        <div className={`flex-1 flex`}>
          <div className={`divide-y w-56`}>
            {(
              [
                ["/", "Home"],
                ["/dashboard", "Dashboard"],
              ] as const
            ).map(([to, label]) => {
              return (
                <div key={to}>
                  <Link
                    to={to}
                    activeOptions={
                      {
                        // If the route points to the root of it's parent,
                        // make sure it's only active if it's exact
                        // exact: to === '.',
                      }
                    }
                    preload="intent"
                    className={`block py-2 px-3 text-blue-700`}
                    // Make "active" links bold
                    activeProps={{ className: `font-bold` }}
                  >
                    {label}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className={`flex-1 border-l border-gray-200`}>
            {/* Render our first route match */}
            <Outlet />
          </div>
        </div>
      </div>
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    return (
      <div className={`p-2`}>
        <div className={`text-lg`}>Welcome Home!</div>
        <hr className={`my-2`} />
        <Link
          to={postRoute.fullPath}
          params={{
            postId: 3,
          }}
          className={`py-1 px-2 text-xs bg-blue-500 text-white rounded-full`}
        >
          1 New Invoice
        </Link>
        <hr className={`my-2`} />
        <div className={`max-w-xl`}>
          As you navigate around take note of the UX. It should feel
          suspense-like, where routes are only rendered once all of their data
          and elements are ready.
          <hr className={`my-2`} />
          To exaggerate async effects, play with the artificial request delay
          slider in the bottom-left corner.
          <hr className={`my-2`} />
          The last 2 sliders determine if link-hover preloading is enabled (and
          how long those preloads stick around) and also whether to cache
          rendered route data (and for how long). Both of these default to 0 (or
          off).
        </div>
      </div>
    );
  },
});

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "dashboard",
  component: () => {
    return (
      <>
        <div className="flex items-center border-b">
          <h2 className="text-xl p-2">Dashboard</h2>
          <Link
            to="/dashboard/posts/$postId"
            params={{
              postId: 3,
            }}
            className="py-1 px-2 text-xs bg-blue-500 text-white rounded-full"
          >
            1 New Invoice
          </Link>
        </div>
        <div className="flex flex-wrap divide-x">
          {(
            [
              ["/dashboard", "Summary", true],
              ["/dashboard/posts", "Posts"],
            ] as const
          ).map(([to, label, exact]) => {
            return (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact }}
                activeProps={{ className: `font-bold` }}
                className="p-2"
              >
                {label}
              </Link>
            );
          })}
        </div>
        <hr />
        <Outlet />
      </>
    );
  },
});

const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => trpc.posts.query(),
});

const dashboardIndexRoute = new Route({
  getParentRoute: () => dashboardRoute,
  path: "/",
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions),
  component: DashboardIndexComponent,
});

function DashboardIndexComponent() {
  const posts = dashboardIndexRoute.useLoaderData();

  return (
    <div className="p-2">
      <div className="p-2">
        Welcome to the dashboard! You have{" "}
        <strong>{posts.length} total posts</strong>.
      </div>
    </div>
  );
}

const postsRoute = new Route({
  getParentRoute: () => dashboardRoute,
  path: "posts",
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
                to={postRoute.fullPath}
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
                    to={postRoute.fullPath}
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

const postsIndexRoute = new Route({
  getParentRoute: () => postsRoute,
  path: "/",
  component: () => {
    return (
      <>
        <div className="p-2">Select a post to view.</div>
      </>
    );
  },
});

const postQueryOptions = (postId: number) =>
  queryOptions({
    queryKey: ["posts", { postId }],
    queryFn: () => trpc.post.query(postId),
  });

const postRoute = new Route({
  getParentRoute: () => postsRoute,
  path: "$postId",
  parseParams: (params) => ({
    postId: z.number().int().parse(Number(params.postId)),
  }),
  stringifyParams: ({ postId }) => ({ postId: `${postId}` }),
  validateSearch: z.object({
    showNotes: z.boolean().optional(),
    notes: z.string().optional(),
  }),
  loader: ({ context: { queryClient }, params: { postId } }) =>
    queryClient.ensureQueryData(postQueryOptions(postId)),
  component: PostComponent,
});

function PostComponent() {
  const { postId } = postRoute.useParams();
  const postQuery = useSuspenseQuery(postQueryOptions(postId));
  const post = postQuery.data;
  const search = postRoute.useSearch();
  const navigate = useNavigate({ from: postRoute.id });

  const [notes, setNotes] = React.useState(search.notes ?? "");
  React.useEffect(() => {
    navigate({
      search: (old) => ({
        ...old,
        notes: notes ? notes : undefined,
      }),
      params: true,
      replace: true,
    });
  }, [notes]);

  return (
    <div className="p-2 space-y-2" key={post?.id}>
      <div className="space-y-2">
        <h2 className="font-bold text-lg">
          <input
            defaultValue={post?.id}
            className="border border-opacity-50 rounded p-2 w-full"
            disabled
          />
        </h2>
        <div>
          <textarea
            defaultValue={post?.title}
            rows={6}
            className="border border-opacity-50 p-2 rounded w-full"
            disabled
          />
        </div>
      </div>
      <div>
        <Link
          search={(old) => ({
            ...old,
            showNotes: old.showNotes ? undefined : true,
          })}
          className="text-blue-700"
        >
          {search.showNotes ? "Close Notes" : "Show Notes"}{" "}
        </Link>
        {search.showNotes ? (
          <>
            <div>
              <div className="h-2" />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className="shadow w-full p-2 rounded"
                placeholder="Write some notes here..."
              />
              <div className="italic text-xs">
                Notes are stored in the URL. Try copying the URL into a new tab!
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute.addChildren([
    dashboardIndexRoute,
    postsRoute.addChildren([postsIndexRoute, postRoute]),
  ]),
]);

const queryClient = new QueryClient();

const router = new Router({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <Spinner />
    </div>
  ),
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} defaultPreload="intent" />
    </QueryClientProvider>
  );
}
