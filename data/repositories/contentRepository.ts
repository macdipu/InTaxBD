import leaderPhoto from '@/assets/jpg/reyad-chowdhury.jpg';
import { ServiceItem, PricingTier, HowItWorksStep, DocRequirement, FaqItem, Stat, TeamMember } from '../../domain/entities/models';

// This repository acts as the single source of truth for content, 
// adhering to the "Clean Architecture" data layer principle.

export const ContentRepository = {
  getHeroStats: (): Stat[] => [
    { id: '1', value: '48h', label: 'Processing', description: 'To prepare your return once documents arrive' },
    { id: '2', value: '500+', label: 'Clients', description: 'Individuals and businesses filed for' },
    { id: '3', value: 'Expert', label: 'Team', description: 'CA professionals, Income Tax Practitioners (ITP), tax lawyers and accountants' },
    { id: '4', value: '100%', label: 'Compliance', description: 'Filed in line with the Income Tax Act 2023' },
  ],

  getServices: (): ServiceItem[] => [
    {
      id: 'individual',
      title: 'Individual Tax Return',
      iconName: 'User',
      description: ['Salaried employees', 'Professionals', 'NRBs (Non-Resident Bangladeshis)'],
    },
    {
      id: 'business',
      title: 'Business Tax Services',
      iconName: 'Building',
      description: ['Proprietorship', 'Partnership firms', 'Company', 'Financial statements review'],
    },
    {
      id: 'special',
      title: 'Specialized Services',
      iconName: 'Briefcase',
      description: ['Freelancer income tax', 'Investment & asset disclosure', 'Tax certificate support', 'Tax planning', 'Rebate planning', 'Financial statements preparation', 'Internal audit & process development', 'SOP development', 'Company registration', 'RJSC return', 'VAT return', 'Training on tax, VAT & regulatory compliance'],
    },
  ],

  getAdditionalServices: (): string[] => ['regulatory compliance', 'audit support'],

  // Bangladesh income year runs 1 July to 30 June. Returns for an income year are
  // filed from the following July, so the year rolls over automatically each 1 July.
  // e.g. any date from 1 July 2026 to 30 June 2027 gives:
  //   Income Year 01 July 2025 to 30 June 2026, Assessment Year 2026-2027
  getTaxYear: (today: Date = new Date()) => {
    const y = today.getFullYear();
    const assessmentStart = today.getMonth() >= 6 ? y : y - 1; // month 6 = July
    return {
      assessmentYear: `${assessmentStart}-${assessmentStart + 1}`,
      incomeYear: `01 July ${assessmentStart - 1} to 30 June ${assessmentStart}`,
    };
  },

  getContact: () => ({
    phoneDisplay: '01717170575',
    phoneHref: 'tel:01717170575',
    whatsappNumber: '8801717170575',
    email: 'intaxbd.ca@gmail.com',
    website: 'www.intaxbd.online',
    websiteHref: 'https://www.intaxbd.online',
  }),

  // Individual return deadline, set by the site owner. The NBR feed overrides it if a notice states a date.
  getDeadline: () => ({ date: '2026-12-31', label: '31 December 2026' }),

  getPricing: (): PricingTier[] => [
    { id: 'p1', label: 'Below 4,00,000 Tk', price: '1,500 Tk' },
    { id: 'p2', label: 'Up to 10 lacs Tk', price: '3,000 Tk' },
    { id: 'p3', label: '10–25 lacs Tk', price: '5,000 Tk' },
    { id: 'p4', label: '25–40 lacs Tk', price: '8,000 Tk' },
    { id: 'p5', label: '40–60 lacs Tk', price: '12,000 Tk' },
    { id: 'p6', label: '60 lacs–1 crore Tk', price: '20,000 Tk' },
    { id: 'p7', label: 'More than 1 crore Tk', price: '25,000 Tk' },
  ],

  getProcessSteps: (): HowItWorksStep[] => [
    { id: 's1', stepNumber: '01', title: 'Get in touch', description: 'Call, WhatsApp us, or send the form below.' },
    { id: 's2', stepNumber: '02', title: 'Send your documents', description: 'Photos or PDFs on WhatsApp or email are fine.' },
    { id: 's3', stepNumber: '03', title: 'We review and calculate', description: 'A qualified accountant prepares your return and works out the tax.' },
    { id: 's4', stepNumber: '04', title: 'You confirm the figures', description: 'We show you the numbers. Nothing is filed until you approve.' },
    { id: 's5', stepNumber: '05', title: 'We submit to the NBR', description: 'Your return is filed and you get the acknowledgement receipt.' },
    { id: 's6', stepNumber: '06', title: 'Support after filing', description: 'Help with tax certificates or notices, all year.' },
  ],

  getDocuments: (): DocRequirement[] => [
    {
      id: 'all',
      category: 'For All Clients',
      whoFor: 'Everyone needs these',
      items: ['Bank statements', 'Investment documents', 'Loan & gift documents', 'Other income details'],
    },
    {
      id: 'employees',
      category: 'Employees',
      whoFor: 'Only if you have a job',
      items: ['Salary certificate'],
    },
    {
      id: 'business',
      category: 'Business Owners',
      whoFor: 'Only if you run a business',
      items: ['Income & expense statement', 'Bank statement'],
    },
    {
      id: 'new',
      category: 'New Clients',
      whoFor: 'Only if this is your first time with us',
      items: ['Last year tax return', 'TIN certificate', 'NID & photo'],
    },
    {
      id: 'additional',
      category: 'Additional',
      whoFor: 'Only if they apply to you',
      items: ['TDS certificates', 'Advance tax challan', 'Inherited property documents'],
    },
  ],

  getFaq: (): FaqItem[] => [
    { 
      id: 'f1', 
      question: 'Who needs to file income tax return in Bangladesh?', 
      answer: 'Generally, if you have a taxable income above the threshold (Tk 4,00,000 for general individuals), own a car, have a trade license, or own specific assets, you must file a return.' 
    },
    { 
      id: 'f2', 
      question: 'What happens if I file late?',
      answer: 'Late filing can result in penalties, interest on tax payable, and inability to access certain government services requiring a tax certificate.' 
    },
    { 
      id: 'f3', 
      question: 'Is it safe to send my documents online?', 
      answer: 'We use secure, encrypted channels for document transfer and ensure your data is handled with strict confidentiality.' 
    },
    { 
      id: 'f4', 
      question: 'Do you handle freelancers and NRBs?', 
      answer: 'Yes, we specialize in foreign remittance declaration for freelancers and NRBs to ensure you get legal tax exemptions.' 
    },
    { 
      id: 'f5', 
      question: 'Who sees my financial information?', 
      answer: 'Your financial data is strictly confidential and shared only with the NBR for filing purposes.' 
    },
    { 
      id: 'f6', 
      question: 'How long does it take?', 
      answer: 'Typically, we prepare your return within 48 hours of receiving all necessary documents.' 
    },
    { 
      id: 'f7', 
      question: 'What do I get after filing?', 
      answer: 'We provide the acknowledgment receipt immediately and help you with tax clearance certificates or audit notices if they arise.' 
    },
  ],

  getLeadership: (): TeamMember => ({
    name: 'MD. Reyad Chowdhury',
    role: 'CEO, InTaxBD',
    qualifications: ['CA Professional Level, ICAB', 'MBA & BBA (Finance, University of Dhaka)'],
    photo: leaderPhoto,
  })
};