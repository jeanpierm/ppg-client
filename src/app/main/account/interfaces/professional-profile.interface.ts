import { Job } from '../../profiles/interfaces/job.interface';

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
  jobsAnalyzed: Job[];
  createdAt: string;
}
