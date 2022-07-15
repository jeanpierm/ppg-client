import { ProfessionalProfile } from '../../account/interfaces/professional-profile.interface';

export const getTechnologyNames = (
  profile: ProfessionalProfile,
  type: string
): string[] => {
  return profile.technologies
    .filter((technology) => technology.type === type)
    .map((technology) => technology.name);
};
