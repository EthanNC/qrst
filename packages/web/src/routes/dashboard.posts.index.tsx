import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute("/dashboard/posts/").createRoute({
  component: () => {
    return (
      <>
        <div className="p-2">Select a post to view.</div>
      </>
    );
  },
});
