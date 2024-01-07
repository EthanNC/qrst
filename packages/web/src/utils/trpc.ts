import type { Router } from "@qrst-stack/functions/trpc";

import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<Router>();
