import Link from "next/link";
import { Button } from "@/components/ui/button";

const navMainItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/company-info",
    label: "Company",
  },
  {
    href: "/staffs",
    label: "Consultant",
  },
  {
    href: "/medium",
    label: "Media",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const navSubItems = [
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
  },
  {
    href: "/sitemap.xml",
    label: "Site Map",
  },
];

export function Footer() {
  return (
    <footer className="border-t sticky top-full bg-muted py-6">
      <div className="container flex items-start">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-lg">株式会社〇〇</p>
            <dl className="text-sm text-muted-foreground">
              <dd>〒000-0000 〇〇県〇〇市〇〇町0-0-0</dd>
            </dl>
          </div>
        </div>

        <div className="flex-1" />

        <nav className="flex gap-4">
          <ul className="space-y-2">
            {navMainItems.map((item) => (
              <li key={item.label}>
                <Button variant="link" asChild>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {navSubItems.map((item) => (
              <li key={item.label}>
                <Button variant="link" asChild>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="container text-xs text-muted-foreground my-auto">
        &copy;〇〇Inc. All rights reserved
      </p>
    </footer>
  );
}
