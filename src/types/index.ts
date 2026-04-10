export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  coverImage: string;
  description: string;
  whatsappLink: string;
  shopeeLink: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  image?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedDate: string;
  category: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

export interface ManuscriptSubmission {
  name: string;
  email: string;
  phone: string;
  fileLink: string;
  message?: string;
}

export interface CommunityRegistration {
  name: string;
  email: string;
  phone: string;
  interests: string[];
}

export interface Statistics {
  booksPublished: number;
  authorsServed: number;
  yearsExperience: number;
  partnerships: number;
}
