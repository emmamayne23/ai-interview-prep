import { signIn, auth, signOut } from "@/auth";
import Image from "next/image";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;
  return user ? (
    <div className="flex items-center gap-3 md:gap-5 lg:gap-7 text-sm md:text-base font-medium">
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          className="cursor-pointer font-medium text-blue-400 hover:text-cyan-300 duration-300"
        >
          Sign Out
        </button>
      </form>
      <div className="group">
        <button>
          <Image
            src={user.image || ""}
            width={30}
            height={30}
            alt={user.name || ""}
            className="rounded-full mt-1.5 border border-blue-400 hover:border-cyan-300"
          />
        </button>

        <div className="hidden absolute top-14 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 group-hover:flex animate-in fade-in-90 zoom-in-95 duration-200 min-w-[240px]">
          <div className="flex items-start space-x-3">
            <Image
              src={user.image || "/default-avatar.png"}
              width={40}
              height={40}
              alt={user.name || "User"}
              className="rounded-full ring-2 ring-cyan-500/20"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {user.name || "User"}
              </p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="cursor-pointer text-sm md:text-base font-medium text-blue-400 hover:text-cyan-300 duration-300"
      >
        Sign in
      </button>
    </form>
  );
}
