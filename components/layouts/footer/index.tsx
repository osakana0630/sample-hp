import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { footerNavs, footerSubNavs } from '@/constants/nav-link';
import { config } from '@/config';

export function Footer() {
  return (
    <footer className="sticky top-full w-full border-t bg-muted py-6">
      <div className="container mb-3 flex max-w-screen-sm flex-col justify-center gap-6 md:max-w-screen-md md:flex-row lg:max-w-screen-lg">
        <p className="text-lg">{config.companyName}</p>
        <div className="flex-1" />
        <nav className="flex gap-4">
          <ul className="space-y-2">
            {footerNavs.map((item) => (
              <li key={item.label}>
                <Button variant="link" asChild>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {footerSubNavs.map((item) => (
              <li key={item.label}>
                <Button variant="link" asChild>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        &copy;〇〇Inc. All rights reserved
      </p>
    </footer>
  );
}
