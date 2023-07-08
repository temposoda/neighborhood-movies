import type { V2_MetaFunction } from "@remix-run/node";
import { useOptionalUser } from "~/utils";
import { Link } from "~/components";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">

            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32 bg-neutral">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block text-neutral-content uppercase drop-shadow-md">
                  Blues Stack
                </span>
              </h1>
              <p className="mx-auto mt-6 text-neutral-content max-w-lg text-center text-xl sm:max-w-3xl">
                Check the README.md file for instructions on how to get this
                project deployed.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    role="link"
                    to="/notes"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link

                      role="link"
                      to="/join"
                    >
                      Sign up
                    </Link>
                    <Link

                      role="link"
                      to="/login"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
