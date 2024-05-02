import { Building2, Home, MailQuestion, Newspaper, Users } from 'lucide-react';
import { paths } from '@/routes';

export const headerNavs = [
  { label: 'Company', href: paths.companyInfo, icon: Building2 },
  { label: 'Consultant', href: paths.staffList(1), icon: Users },
  { label: 'Media', href: paths.medium.list, icon: Newspaper },
  { label: 'Contact', href: paths.contact, icon: MailQuestion },
];

export const mobileSidebarNavs = [
  { label: 'Home', href: paths.home, icon: Home },
  ...headerNavs,
];

export const footerNavs = [
  { label: 'Home', href: paths.home, icon: Home },
  ...headerNavs,
];

export const footerSubNavs = [
  {
    href: paths.privacyPolicy,
    label: 'Privacy Policy',
  },
  {
    href: paths.siteMap,
    label: 'Site Map',
  },
];
