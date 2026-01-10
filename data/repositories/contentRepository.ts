import { ServiceItem, PricingTier, HowItWorksStep, DocRequirement, FaqItem, Stat, TeamMember } from '../../domain/entities/models';

// This repository acts as the single source of truth for content, 
// adhering to the "Clean Architecture" data layer principle.

export const ContentRepository = {
  getHeroStats: (): Stat[] => [
    { id: '1', value: '100%', label: 'Compliance', description: 'Guaranteed tax law adherence' },
    { id: '2', value: '500+', label: 'Clients', description: 'Trusted by professionals' },
    { id: '3', value: 'Expert', label: 'Team', description: 'Certified tax consultants' },
    { id: '4', value: '48h', label: 'Processing', description: 'Returns filed within 48 hours' },
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
      description: ['Proprietorship', 'Partnership firms', 'Financial statements review'],
    },
    {
      id: 'special',
      title: 'Specialized Services',
      iconName: 'Briefcase',
      description: ['Freelancer income tax', 'Investment & asset disclosure', 'Tax certificate support'],
    },
  ],

  getOrbitingServices: (): string[] => [
    'Individual Tax Return',
    'Business Tax Services',
    'VAT & Compliance',
    'Freelancer Income Tax',
    'Audit Support',
    'Investment & Asset Disclosure'
  ],

  getPricing: (): PricingTier[] => [
    { id: 'p1', label: 'Below 350,000 Tk', price: '1,500 Tk' },
    { id: 'p2', label: 'Up to 10 lacs tk', price: '3,000 Tk' },
    { id: 'p3', label: '10–25 lacs tk', price: '5,000 Tk' },
    { id: 'p4', label: '25–40 lacs tk', price: '8,000 Tk' },
    { id: 'p5', label: '40–60 lacs tk', price: '12,000 Tk' },
    { id: 'p6', label: '60 lacs–1 crore tk', price: '20,000 Tk' },
    { id: 'p7', label: 'More than 1 crore Tk', price: '25,000 Tk' },
  ],

  getProcessSteps: (): HowItWorksStep[] => [
    { id: 's1', stepNumber: '01', title: 'Initial Contact', description: 'Phone / WhatsApp / Form' },
    { id: 's2', stepNumber: '02', title: 'Document Submission', description: 'WhatsApp / Email' },
    { id: 's3', stepNumber: '03', title: 'Review & Calculation', description: 'Expert analysis' },
    { id: 's4', stepNumber: '04', title: 'Client Confirmation', description: 'Approval' },
    { id: 's5', stepNumber: '05', title: 'Return Submission', description: 'Submit to NBR' },
    { id: 's6', stepNumber: '06', title: 'Post-Filing Support', description: 'Year-round advice' },
  ],

  getDocuments: (): DocRequirement[] => [
    {
      id: 'all',
      category: 'For All Clients',
      items: ['Bank statements', 'Investment documents', 'Loan & gift documents', 'Other income details'],
    },
    {
      id: 'employees',
      category: 'Employees',
      items: ['Salary certificate'],
    },
    {
      id: 'business',
      category: 'Business Owners',
      items: ['Income & expense statement', 'Bank statement'],
    },
    {
      id: 'new',
      category: 'New Clients',
      items: ['Last year tax return', 'TIN certificate', 'NID & photo'],
    },
    {
      id: 'additional',
      category: 'Additional',
      items: ['TDS certificates', 'Advance tax challan', 'Inherited property documents'],
    },
  ],

  getFaq: (): FaqItem[] => [
    { 
      id: 'f1', 
      question: 'Who needs to file income tax return in Bangladesh?', 
      answer: 'Generally, if you have a taxable income above the threshold (Tk 3,50,000 for general individuals), own a car, have a trade license, or own specific assets, you must file a return.' 
    },
    { 
      id: 'f2', 
      question: 'Late filing consequences', 
      answer: 'Late filing can result in penalties, interest on tax payable, and inability to access certain government services requiring a tax certificate.' 
    },
    { 
      id: 'f3', 
      question: 'Online filing security', 
      answer: 'We use secure, encrypted channels for document transfer and ensure your data is handled with strict confidentiality.' 
    },
    { 
      id: 'f4', 
      question: 'Freelancer & NRB support', 
      answer: 'Yes, we specialize in foreign remittance declaration for freelancers and NRBs to ensure you get legal tax exemptions.' 
    },
    { 
      id: 'f5', 
      question: 'Data confidentiality', 
      answer: 'Your financial data is strictly confidential and shared only with the NBR for filing purposes.' 
    },
    { 
      id: 'f6', 
      question: 'Processing time', 
      answer: 'Typically, we prepare your return within 48 hours of receiving all necessary documents.' 
    },
    { 
      id: 'f7', 
      question: 'Post-filing support', 
      answer: 'We provide the acknowledgment receipt immediately and help you with tax clearance certificates or audit notices if they arise.' 
    },
  ],

  getLeadership: (): TeamMember => ({
    name: 'MD. Reyad Chowdhury',
    role: 'CEO, InTaxBD',
    qualifications: ['CA Professional Level, ICAB', 'MBA & BBA (Finance, University of Dhaka)'],
    imagePlaceholder: 'https://picsum.photos/200/200?grayscale',
  })
};