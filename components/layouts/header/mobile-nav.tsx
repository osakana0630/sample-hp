import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { mobileSidebarNavs } from '@/constants/nav-link';

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-1">
          {mobileSidebarNavs.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="justify-start text-lg"
              asChild
              aria-label="メニュー"
            >
              <Link href={item.href}>
                <item.icon className="mr-3" size={20} />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
