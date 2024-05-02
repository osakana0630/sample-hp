'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import MobileNav from '@/components/layouts/header/mobile-nav';
import { headerNavs } from '@/constants/nav-link';
import { cn } from '@/lib/utils';
import { config } from '@/config';

export function Header() {
  const pathname = usePathname();
  return (
    <header className="h-16 w-full border-b shadow-lg">
      <div className="container flex  h-full max-w-screen-sm items-center gap-4 md:max-w-screen-md lg:max-w-screen-lg">
        {/* ロゴ */}
        <Button variant="ghost" className="text-xl font-bold md:text-2xl">
          <Link href="/">{config.companyName}</Link>
        </Button>

        <div className="flex-1" />
        {/*  PCナビゲーション */}
        <div className="hidden lg:block">
          <ul className="flex gap-3">
            {headerNavs.map((item) => (
              <li key={item.label}>
                <Button
                  variant={item.label === 'Contact' ? 'destructive' : 'link'}
                  asChild
                  className={cn(
                    pathname === item.href && item.label !== 'Contact'
                      ? 'text-destructive'
                      : '',
                    'text-md hover:text-muted-foreground hover:no-underline'
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
