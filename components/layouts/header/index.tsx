"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/layouts/header/mobile-nav";
import { headerNavs } from "@/constants/nav-link";
import { cn } from "@/lib/utils";
import { config } from "@/config";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="w-full h-16 border-b shadow-lg">
      <div className="container max-w-screen-sm  md:max-w-screen-md lg:max-w-screen-lg h-full flex items-center gap-4">
        {/* ロゴ */}
        <Button variant="ghost" className="text-xl md:text-2xl font-bold">
          <Link href="/">{config.companyName}</Link>
        </Button>

        <div className="flex-1" />
        {/*  PCナビゲーション */}
        <div className="hidden lg:block">
          <ul className="flex gap-3">
            {headerNavs.map((item) => (
              <li key={item.label}>
                <Button
                  variant={item.label === "Contact" ? "destructive" : "link"}
                  asChild
                  className={cn(
                    pathname === item.href && item.label !== "Contact"
                      ? "text-destructive"
                      : "",
                    "text-md hover:no-underline hover:text-muted-foreground",
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2" size={18} />
                    {item.label}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* SPメニュー */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
