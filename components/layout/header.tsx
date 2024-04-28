import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MobileNav from "@/components/layout/mobile-nav";

const navItems = [
  { label: "会社概要", href: "/company-info" },
  { label: "コンサルタント紹介", href: "/staffs" },
  { label: "メディア", href: "/medium" },
  { label: "お問い合わせ", href: "/inquiry" },
];

export function Header() {
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
      {/* 検索バー */}
      {/*<form*/}
      {/*  className="flex gap-2"*/}
      {/*  action={async (data: FormData) => {*/}
      {/*    "use server";*/}

      {/*    const keyword = data.get("keyword") as string;*/}
      {/*    const q = new URLSearchParams({ q: keyword });*/}
      {/*    redirect(`/search?${q.toString()}`);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Input autoComplete="off" name="keyword" className="flex-1" />*/}
      {/*  <Button size="icon" type="submit">*/}
      {/*    <Search size={20} />*/}
      {/*  </Button>*/}
      {/*</form>*/}

      {/*  PCナビゲーション */}
      <div className="hidden lg:block">
        <ul className="flex gap-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <Button
                variant={
                  item.label === "お問い合わせ" ? "destructive" : "ghost"
                }
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
