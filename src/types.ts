export interface Inquiry {
  id: string;
  parentName: string;
  childName: string;
  phone: string;
  className: string;
  submittedAt: string;
  notes?: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  questionHindi?: string;
  answerHindi?: string;
}

export interface AcademicProgram {
  id: string;
  gradeRange: string;
  title: string;
  description: string;
  highlights: string[];
  iconName: string;
}

export interface Testimonial {
  id: string;
  parentName: string;
  location: string;
  quote: string;
  relationship: string; // e.g. "Father of Class 2 Student"
}

export interface SchoolFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
