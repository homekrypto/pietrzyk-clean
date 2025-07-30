import React from 'react';

export type Theme = 'light' | 'dark';

export interface NavLink {
  name: string;
  href: string;
}

export interface HelpArea {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface SuccessStory {
  image: string;
  title: string;
  category: string;
}

export interface Testimonial {
  stars: number;
  quote: string;
  author: string;
  role: string;
  date: string;
}

export interface ClientLogo {
  name: string;
  logoLight: React.ReactNode;
  logoDark: React.ReactNode;
}

export interface LocationInfo {
  address: string;
  city: string;
  description: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
}
