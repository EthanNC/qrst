import { AuthContext, decodeToken, logout, store } from "@/utils/auth";
import type { User } from "@/utils/auth";
import { ReactNode, useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = new URLSearchParams(window.location.hash.substring(1)).get(
      "access_token"
    );

    if (token) {
      // Handling an auth callback, this should become the authoritative account
      const _account = decodeToken({ token: token });
      console.log(
        "🤖 Auth registering account from callback",
        JSON.stringify(_account, null, 2)
      );
      store.set({ user: _account });
      setUser(_account);
      return;
    }

    // No auth callback, but lets check for an account in localstorage
    const _account = store.get();
    if (_account) {
      console.log(
        "🤖 Auth rehydrating account from localstorage",
        JSON.stringify(_account, null, 2)
      );
      setUser(_account);
      return;
    }

    console.log("🤖 No active Auth session");
  }, []);

  const value = {
    user,
    //   loginUrls,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
