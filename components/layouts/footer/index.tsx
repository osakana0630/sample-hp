import Link from "next/link";
import { Button } from "@/components/ui/button";
import { footerNavs, footerSubNavs } from "@/constants/nav-link";
import { config } from "@/config";

export function Footer() {
  return (
    <footer className="w-full border-t sticky top-full bg-muted py-6">
      <div className="container max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg flex flex-col md:flex-row justify-center gap-6 mb-3">
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
