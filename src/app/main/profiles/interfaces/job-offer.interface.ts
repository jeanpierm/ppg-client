export interface JobOffer {
  company: Company;
  url: string;
  title: string;
  location?: string;
  isRemote?: boolean;
  origin?: string;
}

export interface Company {
  name: string;
  logoUrl?: string;
}
