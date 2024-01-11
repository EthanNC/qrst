import { createContext, useContext } from "react";

export function loginUrl(input: { provider: "google" }) {
  const params = new URLSearchParams({
    client_id: "local",
    redirect_uri: location.origin + "/callback",
    response_type: "token",
    provider: input.provider,
  });
  const url = import.meta.env.VITE_AUTH_URL + "/authorize?" + params.toString();
  return url;
}

export type User = {
  email?: string;
  token?: string;
};

export const store = {
  get() {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw) as User;
  },
  set(input: { user: User }) {
    return localStorage.setItem("user", JSON.stringify(input.user));
  },
  remove() {
    return localStorage.removeItem("user");
  },
};

export function decodeToken(input: { token: string }): User {
  const [, payloadEncoded] = input.token.split(".");
  //   invariant(payloadEncoded, "Invalid access token");
  const payload = JSON.parse(
    atob(payloadEncoded.replace(/-/g, "+").replace(/_/g, "/"))
  );
  return {
    ...payload.properties,
    token: input.token,
  };
}

interface AuthContextType {
  user?: User;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  logout: () => {},
});

export function logout() {
  store.remove();
  location.href = location.origin;
}

export function useAuth() {
  const result = useContext(AuthContext);
  if (!result) throw new Error("useAuth must be used within an AuthProvider");
  return result;
}
