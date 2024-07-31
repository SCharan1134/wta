"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Header = () => {
  const router = useRouter();

  return (
    <header className="w-full h-20 flex justify-between px-20 items-center">
      <Link href="/">
        <img src="/wta-logo.png" alt="WTA Logo" />
      </Link>
      <Button onClick={() => router.push("/addreview")}>Add Review</Button>
    </header>
  );
};

export default Header;
