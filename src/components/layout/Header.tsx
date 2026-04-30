import { Suspense } from "react";
import { getServerUser } from "@/lib/server-auth";
import HeaderClient from "./HeaderClient";

interface HeaderProps {
  userData?: any;
  searchParams?: Record<string, string | string[] | undefined>;
}

function HeaderSkeleton() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo skeleton */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-800 rounded-lg animate-pulse" />
            <div className="hidden sm:block w-32 h-6 bg-gray-800 rounded animate-pulse" />
          </div>

          {/* Navigation skeleton */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="w-16 h-4 bg-gray-800 rounded animate-pulse" />
            <div className="w-20 h-4 bg-gray-800 rounded animate-pulse" />
            <div className="w-24 h-4 bg-gray-800 rounded animate-pulse" />
            <div className="w-20 h-4 bg-gray-800 rounded animate-pulse" />
          </nav>

          {/* Search skeleton */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="w-full h-10 bg-gray-800 rounded-full animate-pulse" />
          </div>

          {/* Right icons skeleton */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block w-6 h-6 bg-gray-800 rounded animate-pulse" />
            <div className="w-6 h-6 bg-gray-800 rounded animate-pulse" />
            <div className="w-6 h-6 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
}

async function HeaderWithData({ userData, searchParams }: { userData?: any; searchParams?: Record<string, string | string[] | undefined> }) {
  return <HeaderClient serverUserData={userData} searchParams={searchParams} />;
}

export default async function Header({ userData, searchParams }: HeaderProps) {
  const user = userData ?? await getServerUser();
  console.log("user", user);
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderWithData userData={user} searchParams={searchParams} />
    </Suspense>
  );
}
