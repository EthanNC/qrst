import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { z } from "zod";

import { create, read } from "@qrst-stack/core/task";
import { ApiHandler } from "sst/node/api";

export const t = initTRPC.create();

const INVOICES = [
  { id: 1, title: "First post" },
  { id: 2, title: "Second post" },
  { id: 3, title: "Third post" },
  { id: 4, title: "Fourth post" },
  { id: 5, title: "Fifth post" },
  { id: 6, title: "Sixth post" },
  { id: 7, title: "Seventh post" },
  { id: 8, title: "Eighth post" },
  { id: 9, title: "Ninth post" },
  { id: 10, title: "Tenth post" },
];

const appRouter = t.router({
  create: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await create(input);
  }),
  read: t.procedure.input(z.string()).query(async ({ input }) => {
    return await read(input);
  }),
  posts: t.procedure.query(async (_) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return INVOICES;
  }),
  post: t.procedure.input(Number).query(async (req) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return INVOICES.find((p) => p.id === req.input);
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

const trpc = awsLambdaRequestHandler({
  router: appRouter,
});

export const handler = ApiHandler(async (req, ctx) => {
  return trpc(req, ctx);
});
