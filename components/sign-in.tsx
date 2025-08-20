import { signIn, auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

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
      <Link href={""}>
        <Image
          src={user.image || ""}
          width={30}
          height={30}
          alt={user.name || ""}
          className="rounded-full border border-blue-400 hover:border-cyan-300"
        />
      </Link>
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
        className="cursor-pointer text-sm md:text-base font-medium"
      >
        Sign in
      </button>
    </form>
  );
}
