"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { Slash } from "lucide-react";

type Link = { name: string; href?: string; icon?: React.ReactNode };

type Props = {
  links: Link[];
};

export function CustomBreadcrumb({ links }: Props) {
  return (
    <Breadcrumb className="text-sm md:text-md">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">ホーム</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>

        {links.map((link, i) => {
          const isLastPath = i === links.length - 1;

          return (
            <Fragment key={link.name}>
              {link.href ? (
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={link.href}>{link.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbPage>{link.name}</BreadcrumbPage>
              )}
              {!isLastPath && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
