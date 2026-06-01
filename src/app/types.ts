export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  logo: string;
  tags: string[];
  featured: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  companyInfo: {
    description: string;
    size: string;
    founded: string;
    website: string;
  };
  stats: {
    applicants: number;
    deadline: string;
    views: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'candidate' | 'company';
  companyName?: string | null;
  companyAbout?: string | null;
  website?: string | null;
}

export interface AuthState {
  token: string;
  user: User;
}
