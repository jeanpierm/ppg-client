export interface ProfessionalProfile {
  ppId: string;
  jobTitle: string;
  location: string;
  languages: string[];
  frameworks: string[];
  databases: string[];
  patterns: string[];
  tools: string[];
  paradigms: string[];
  requireEnglish: boolean;
  createdAt: string;
}

export interface JobOffer {
  title: string;
  company: string;
  link: string;
}
