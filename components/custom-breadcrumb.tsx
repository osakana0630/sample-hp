"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

export function CustomBreadcrumb() {
  const pathname = usePathname();
  const pathNames = pathname.split("/").filter(Boolean);
  const isHome = pathNames.length === 0;
  if (isHome) return null;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {pathNames.map((pathName, i) => {
          const href = `/${pathNames.slice(0, i + 1).join("/")}`;
          const linkName =
            pathName[0].toUpperCase() + pathName.slice(1, pathName.length);
          const isLastPath = i === pathNames.length - 1;

          return (
            <Fragment key={pathName}>
              <BreadcrumbItem>
                {isLastPath ? (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{linkName}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{linkName}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLastPath && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
