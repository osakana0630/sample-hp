import { Building2, Home, MailQuestion, Newspaper, Users } from "lucide-react";

export const headerNavs = [
  { label: "Company", href: "/company-info", icon: Building2 },
  { label: "Consultant", href: "/staffs", icon: Users },
  { label: "Media", href: "/medium", icon: Newspaper },
  { label: "Contact", href: "/contact", icon: MailQuestion },
];

export const mobileSidebarNavs = [
  { label: "Home", href: "/", icon: Home },
  ...headerNavs,
];

export const footerNavs = [
  { label: "Home", href: "/", icon: Home },
  ...headerNavs,
];

export const footerSubNavs = [
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
  },
  {
    href: "/sitemap.xml",
    label: "Site Map",
  },
];
