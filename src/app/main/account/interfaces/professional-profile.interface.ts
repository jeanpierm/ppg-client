import { Technology } from '../../../admin/interfaces/technology.interface';
import { Job } from '../../profiles/interfaces/job.interface';

export interface ProfessionalProfile {
  ppId: string;
  jobTitle: string;
  location: string;
  technologies: Technology[];
  requireEnglish: boolean;
  jobsAnalyzed: Job[];
  createdAt: string;
  updatedAt: string;
}
