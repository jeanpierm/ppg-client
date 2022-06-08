export interface TechnologyTypeOption {
  value: string;
  name: string;
}

export const techTypeOptions: TechnologyTypeOption[] = [
  {
    value: 'database',
    name: 'Base de datos',
  },
  {
    value: 'framework',
    name: 'Framework',
  },
  {
    value: 'library',
    name: 'Librería',
  },
  {
    value: 'paradigm',
    name: 'Paradigma',
  },
  {
    value: 'pattern',
    name: 'Patrón',
  },
  {
    value: 'language',
    name: 'Lenguaje',
  },
  {
    value: 'tool',
    name: 'Herramienta',
  },
];
