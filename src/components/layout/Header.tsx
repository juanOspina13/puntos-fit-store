import { Suspense } from "react";
import { getServerUser } from "@/lib/server-auth";
import HeaderClient from "./HeaderClient";

interface HeaderProps {
  userData?: any;
  searchParams?: Record<string, string | string[] | undefined>;
}

function HeaderSkeleton() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d1520]/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">
            <div className="hidden md:flex items-center gap-8">
              <div className="w-12 h-2.5 bg-white/5 rounded-sm animate-pulse" />
              <div className="w-16 h-2.5 bg-white/5 rounded-sm animate-pulse" />
              <div className="w-14 h-2.5 bg-white/5 rounded-sm animate-pulse" />
            </div>
            <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:left-auto">
              <div className="w-8 h-8 bg-primary/20 rounded-sm animate-pulse" />
              <div className="hidden sm:block w-20 h-3 bg-white/5 rounded-sm animate-pulse" />
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-8">
                <div className="w-16 h-2.5 bg-white/5 rounded-sm animate-pulse" />
                <div className="w-10 h-2.5 bg-white/5 rounded-sm animate-pulse" />
              </div>
              <div className="w-5 h-5 bg-white/5 rounded-sm animate-pulse" />
            </div>
          </div>
        </div>
      </header>
      <div className="h-[68px]" />
    </>
  );
}

async function HeaderWithData({
  userData,
  searchParams,
}: {
  userData?: any;
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  return <HeaderClient serverUserData={userData} searchParams={searchParams} />;
}

export default async function Header({ userData, searchParams }: HeaderProps) {
  const user = userData ?? (await getServerUser());
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderWithData userData={user} searchParams={searchParams} />
    </Suspense>
  );
}
