import { Route as rootRoute } from "./routes/__root"
import { Route as DashboardImport } from "./routes/dashboard"
import { Route as IndexImport } from "./routes/index"
import { Route as DashboardIndexImport } from "./routes/dashboard.index"
import { Route as DashboardPostsImport } from "./routes/dashboard.posts"
import { Route as DashboardPostsIndexImport } from "./routes/dashboard.posts.index"
import { Route as DashboardPostsPostIdImport } from "./routes/dashboard.posts.$postId"

const DashboardRoute = DashboardImport.update({
  path: "/dashboard",
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  path: "/",
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardPostsRoute = DashboardPostsImport.update({
  path: "/posts",
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardPostsIndexRoute = DashboardPostsIndexImport.update({
  path: "/",
  getParentRoute: () => DashboardPostsRoute,
} as any)

const DashboardPostsPostIdRoute = DashboardPostsPostIdImport.update({
  path: "/$postId",
  getParentRoute: () => DashboardPostsRoute,
} as any)
declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    "/dashboard": {
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    "/dashboard/posts": {
      preLoaderRoute: typeof DashboardPostsImport
      parentRoute: typeof DashboardImport
    }
    "/dashboard/": {
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardImport
    }
    "/dashboard/posts/$postId": {
      preLoaderRoute: typeof DashboardPostsPostIdImport
      parentRoute: typeof DashboardPostsImport
    }
    "/dashboard/posts/": {
      preLoaderRoute: typeof DashboardPostsIndexImport
      parentRoute: typeof DashboardPostsImport
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexRoute,
  DashboardRoute.addChildren([
    DashboardPostsRoute.addChildren([
      DashboardPostsPostIdRoute,
      DashboardPostsIndexRoute,
    ]),
    DashboardIndexRoute,
  ]),
])
