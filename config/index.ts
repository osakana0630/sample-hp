type Runtime = 'edge' | 'nodejs';
type Config = {
  companyName: string;
  runtime: 'edge' | 'nodejs';
};

export const config: Config = {
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || '',
  runtime: (process.env.NEXT_PUBLIC_RUNTIME as Runtime) || 'nodejs',
};
