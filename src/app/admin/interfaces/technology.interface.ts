import { TechType } from './tech-type.interface';

export interface Technology {
  technologyId: string;
  type: TechType;
  name: string;
  identifiers: string[];
}
