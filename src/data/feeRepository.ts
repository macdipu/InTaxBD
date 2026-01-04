import { FeePackage } from '../domain/FeePackage';

const mockFeePackages: FeePackage[] = [
  {
    id: 1,
    incomeRange: 'Below 350,000 Tk',
    fee: '1,500 Tk',
    description: 'Ideal for small income earners'
  },
  {
    id: 2,
    incomeRange: 'Up to 10 lacs tk',
    fee: '3,000 Tk',
    description: 'Perfect for mid-level professionals'
  },
  {
    id: 3,
    incomeRange: '10 - 25 lacs tk',
    fee: '5,000 Tk',
    description: 'Suited for growing businesses'
  },
  {
    id: 4,
    incomeRange: '25 - 40 lacs tk',
    fee: '8,000 Tk',
    description: 'For established professionals'
  },
  {
    id: 5,
    incomeRange: '40 - 60 lacs tk',
    fee: '12,000 Tk',
    description: 'Advanced business support'
  },
  {
    id: 6,
    incomeRange: '60 lacs - 1 crore tk',
    fee: '20,000 Tk',
    description: 'Premium business services'
  },
  {
    id: 7,
    incomeRange: 'More than 1 crore Tk',
    fee: '25,000 Tk',
    description: 'Enterprise-level consulting'
  }
];

export const fetchFeePackages = (): Promise<FeePackage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFeePackages);
    }, 600);
  });
};
