import { Route as rootRoute } from "./routes/__root"
import { Route as DashboardImport } from "./routes/dashboard"
import { Route as ProtectedImport } from "./routes/_protected"
import { Route as AuthImport } from "./routes/_auth"
import { Route as IndexImport } from "./routes/index"
import { Route as DashboardIndexImport } from "./routes/dashboard.index"
import { Route as DashboardPostsImport } from "./routes/dashboard.posts"
import { Route as ProtectedProfileImport } from "./routes/_protected.profile"
import { Route as AuthCallbackImport } from "./routes/_auth.callback"
import { Route as DashboardPostsIndexImport } from "./routes/dashboard.posts.index"
import { Route as DashboardPostsPostIdImport } from "./routes/dashboard.posts.$postId"

const DashboardRoute = DashboardImport.update({
  path: "/dashboard",
  getParentRoute: () => rootRoute,
} as any)

const ProtectedRoute = ProtectedImport.update({
  id: "/_protected",
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: "/_auth",
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

const ProtectedProfileRoute = ProtectedProfileImport.update({
  path: "/profile",
  getParentRoute: () => ProtectedRoute,
} as any)

const AuthCallbackRoute = AuthCallbackImport.update({
  path: "/callback",
  getParentRoute: () => AuthRoute,
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
    "/_auth": {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    "/_protected": {
      preLoaderRoute: typeof ProtectedImport
      parentRoute: typeof rootRoute
    }
    "/dashboard": {
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    "/_auth/callback": {
      preLoaderRoute: typeof AuthCallbackImport
      parentRoute: typeof AuthImport
    }
    "/_protected/profile": {
      preLoaderRoute: typeof ProtectedProfileImport
      parentRoute: typeof ProtectedImport
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
  AuthRoute.addChildren([AuthCallbackRoute]),
  ProtectedRoute.addChildren([ProtectedProfileRoute]),
  DashboardRoute.addChildren([
    DashboardPostsRoute.addChildren([
      DashboardPostsPostIdRoute,
      DashboardPostsIndexRoute,
    ]),
    DashboardIndexRoute,
  ]),
])
