import { AuthHandler, GoogleAdapter } from "sst/node/future/auth";
import { sessions } from "./sessions";

export const handler = AuthHandler({
  sessions,
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: process.env.GOOGLE_CLIENT_ID!,
    }),
  },
  callbacks: {
    auth: {
      async allowClient() {
        return true;
      },
      async success(input, response) {
        // let user: User.Info | undefined = undefined
        if (input.provider === "google") {
          return response.session({
            type: "user",
            properties: {
              email: input.tokenset.claims().email as string,
            },
          });
        }
        throw new Error("Unknown provider");
      },
    },
  },
});
