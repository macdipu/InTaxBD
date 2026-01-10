// Domain Entities

export interface ServiceItem {
  id: string;
  title: string;
  description: string[];
  iconName: string;
}

export interface PricingTier {
  id: string;
  label: string;
  price: string;
}

export interface HowItWorksStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
}

export interface DocRequirement {
  id: string;
  category: string;
  items: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  qualifications: string[];
  imagePlaceholder: string;
}