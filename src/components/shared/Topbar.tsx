"use client";
// not installed
// import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../../app/context/auth";
import { useQuery } from "@tanstack/react-query";
import { CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL } from "next/dist/shared/lib/constants";

function Topbar() {
  // const { isLoggedIn } = useAuthContext();

  const fetchUserInfo = async () => {
    console.log("on fetchUserInfo");
    const res = await fetch("http://localhost/api/profile", {
      credentials: "include", // Laravel Sanctum とのクッキーを使った認証をサポートするため
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to fetch user info");
    }
    return res.json();
  };

  // const { data: user, isSuccess } = useQuery("userInfo", fetchUserInfo, {
  //   staleTime: 600000, // 10 minutes
  //   cacheTime: 600000, // 10 minutes
  // });

  // const { isSuccess, data: user } = useQuery({
  //   queryKey: ["data"],
  //   queryFn: fetchUserInfo,
  // });

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden animate-bounce duration-50 repeat-[5]">
          Neighbors
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <div className="flex cursor-pointer">
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
          </div>
          {/* {isSuccess && (
            <div className="mr-2">
              <Image
                src={user.profile_image}
                alt="Profile"
                width={24}
                height={24}
              />
            </div>
          )} */}
          {/* <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn> */}
        </div>

        {/* <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        /> */}
      </div>
    </nav>
  );
}

export default Topbar;
