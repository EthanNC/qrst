import AuthHeader from "@/components/AuthHeader";
import { FileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = new FileRoute("/dashboard").createRoute({
  component: DashboardComponent,
});

function DashboardComponent() {
  const email = Route.useRouteContext().user?.email;
  return (
    <>
      <div className="flex items-center border-b gap-3">
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
        <AuthHeader email={email} />
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
}
