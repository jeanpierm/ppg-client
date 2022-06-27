export interface Job {
  jobId: string;

  title: string;

  company: Company;

  location: string;

  workplaceType?: string;

  url: string;
}

export interface Company {
  name: string;
  photoUrl: string;
}
