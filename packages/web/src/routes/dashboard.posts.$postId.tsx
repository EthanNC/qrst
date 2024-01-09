import { postQueryOptions } from "@/utils/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FileRoute, Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import { z } from "zod";

export const Route = new FileRoute("/dashboard/posts/$postId").createRoute({
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
  const { postId } = Route.useParams();
  const postQuery = useSuspenseQuery(postQueryOptions(postId));
  const post = postQuery.data;
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.id });

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
