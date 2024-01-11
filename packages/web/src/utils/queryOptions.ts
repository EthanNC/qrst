import { queryOptions } from "@tanstack/react-query";
import trpc from "./trpc";

export const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => trpc.posts.query(),
});

export const postQueryOptions = (postId: number) =>
  queryOptions({
    queryKey: ["posts", { postId }],
    queryFn: () => trpc.post.query(postId),
  });

export const sessionQueryOptions = queryOptions({
  queryKey: ["session"],
  queryFn: () => trpc.session.query(),
});
