import type { Content } from 'newt-client-js';

export type Staff = {
  fullName: string;
  englishFullName: string;
  specialtyField: string;
  biography: string;
  career: string;
  isTopThreeStaff: boolean;
  topThreeStaffOrder: boolean;
  profileImage: {
    src: string;
  };
} & Content;
