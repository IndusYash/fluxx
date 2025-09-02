/**
 * TypeScript interfaces for faculty data structures
 */

export interface Faculty {
  id: string;
  name: string;
  position: string;
  department: string;
  image: string;
  email: string;
  phone: string;
  specialties: string[];
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    researchGate?: string;
    googleScholar?: string;
    personalWebsite?: string;
  };
  achievements?: {
    patents?: string;
    projectPublications?: string;
    internationalPublications?: string;
    nationalPublications?: string;
    books?: string;
    [key: string]: string | undefined;
  };
  organisationsAndSocieties?: string[];
}

export interface HOD extends Faculty {
  isHOD: true;
  message: string;
}

export interface Department {
  id: string;
  name: string;
  color: string;
  facultyCount: number;
}