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
      <div className="flex gap-5">
        <Button
          onClick={() =>
            router.push(
              "https://docs.google.com/spreadsheets/d/1gQBWfCnWBcYQSojPqVslgO8mrvbbUxTuv6AjqSFVeoI/edit?gid=0#gid=0"
            )
          }
        >
          Google Sheets
        </Button>
        <Button onClick={() => router.push("/addreview")}>Add Review</Button>
      </div>
    </header>
  );
};

export default Header;
