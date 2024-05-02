import type { Content } from 'newt-client-js';

export type Staff = {
  fullName: string;
  englishFullName: string;
  specialityField: string;
  biography: string;
  career: string;
  profileImage: {
    src: string;
  };
} & Content;
