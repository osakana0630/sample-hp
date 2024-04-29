import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Users,
  MailQuestion,
  Newspaper,
  Building2,
  Menu,
  Home,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/", icon: <Home /> },
  { label: "Company", href: "/company-info", icon: <Building2 /> },
  { label: "Consultant", href: "/staffs", icon: <Users /> },
  { label: "Media", href: "/medium", icon: <Newspaper /> },
  { label: "Contact", href: "/contact", icon: <MailQuestion /> },
];

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="justify-start"
              asChild
            >
              <Link href={item.href}>
                <span className="mr-5">{item.icon}</span>
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
