"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MobileNav from "@/components/layout/mobile-nav";
import { Building2, MailQuestion, Newspaper, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Company", href: "/company-info", icon: <Building2 size={18} /> },
  { label: "Consultant", href: "/staffs", icon: <Users size={18} /> },
  { label: "Media", href: "/medium", icon: <Newspaper size={18} /> },
  { label: "Contact", href: "/contact", icon: <MailQuestion size={18} /> },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="h-16 container border-b flex items-center gap-4">
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
          {navItems.map((item) => (
            <li key={item.label}>
              <Button
                variant={item.label === "Contact" ? "destructive" : "link"}
                asChild
                className={cn(
                  pathname === item.href ? "text-destructive" : "",
                  "text-md hover:no-underline hover:text-muted",
                )}
              >
                <Link href={item.href}>
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
