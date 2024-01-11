import { loginUrl, logout } from "@/utils/auth";

export default function AuthHeader({ email }: { email: string | undefined }) {
  return (
    <>
      {email ? (
        <div className={`flex gap-2 text-sm items-center`}>
          <span className={`text-gray-500`}>Logged in as:</span> {email}
          <button
            onClick={logout}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm`}
          >
            Logout
          </button>
        </div>
      ) : (
        <a
          href={loginUrl({ provider: "google" })}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm`}
        >
          Login
        </a>
      )}
    </>
  );
}
