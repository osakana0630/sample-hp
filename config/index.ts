type Config = {
  companyName: string;
};

export const config: Config = {
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || '',
};
