import { User } from '../../interfaces/user';

// export class ProfessionalProfile {
//   constructor(
//     public ppId: string = '',
//     public jobTitle: string = '',
//     public location: string = '',
//     public languages: Array<string> = [],
//     public frameworks: Array<string> = [],
//     public databases: Array<string> = [],
//     public patterns: Array<string> = [],
//     public tools: Array<string> = [],
//     public paradigms: Array<string> = [],
//     public requireEnglish: boolean = false,
//     public owner: User
//   ) {}
// }

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
