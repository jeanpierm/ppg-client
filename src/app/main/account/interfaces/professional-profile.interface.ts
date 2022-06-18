import { User } from '../../../admin/interfaces/user.interface';

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
  owner: User;
}
