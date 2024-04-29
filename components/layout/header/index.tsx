"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/layout/header/mobile-nav";
import { headerNavs } from "@/constants/nav-link";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="h-16 border-b shadow-lg">
      <div className="container h-full flex items-center gap-4">
        {/* SPメニュー */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
        {/* ロゴ */}
        <Button variant="ghost">
          <Link href="/">株式会社〇〇</Link>
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
                    "text-md hover:no-underline hover:text-muted",
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
      </div>
    </header>
  );
}
