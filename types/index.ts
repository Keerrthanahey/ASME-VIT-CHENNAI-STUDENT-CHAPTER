export type EventCategory =
  | "technical-talk"
  | "workshop"
  | "industrial-visit"
  | "guest-lecture"
  | "competition";

export type EventStatus = "upcoming" | "ongoing" | "past";

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  photo: string;
  bio: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
}

export interface AgendaItem {
  time: string;
  title: string;
  description?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  category: EventCategory;
  status: EventStatus;
  banner: string;
  date: string;
  endDate?: string;
  time: string;
  endTime?: string;
  venue: string;
  location: { lat: number; lng: number; address: string };
  agenda: AgendaItem[];
  speakers: Speaker[];
  sponsors: Sponsor[];
  gallery: string[];
  brochureUrl?: string;
  certificateAvailable: boolean;
  downloads: { name: string; url: string }[];
  maxRegistrations?: number;
  registeredCount: number;
  featured: boolean;
}

export interface Workshop {
  id: string;
  slug: string;
  title: string;
  overview: string;
  prerequisites: string[];
  instructor: {
    name: string;
    title: string;
    photo: string;
    bio: string;
  };
  learningOutcomes: string[];
  resources: { name: string; url: string; type: string }[];
  certificateAvailable: boolean;
  gallery: string[];
  date: string;
  duration: string;
  venue: string;
  banner: string;
  maxSeats: number;
  registeredCount: number;
}

export type ProjectCategory =
  | "design"
  | "automobile"
  | "robotics"
  | "manufacturing"
  | "thermal"
  | "aerospace"
  | "automation"
  | "mechatronics";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  objectives: string[];
  category: ProjectCategory;
  images: string[];
  videos?: string[];
  technologies: string[];
  software: string[];
  teamMembers: { name: string; role: string; photo?: string }[];
  githubUrl?: string;
  demoUrl?: string;
  awards?: string[];
  year: number;
  featured: boolean;
}

export type ResourceCategory =
  | "mechanical-notes"
  | "solidworks"
  | "catia"
  | "fusion-360"
  | "ansys"
  | "matlab"
  | "python"
  | "fea"
  | "cfd"
  | "manufacturing"
  | "materials"
  | "research-papers"
  | "interview-questions"
  | "resume-templates";

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  fileUrl: string;
  fileType: "pdf" | "doc" | "ppt" | "video" | "link";
  downloads: number;
  tags: string[];
  uploadedAt: string;
}

export type GalleryCategory =
  | "events"
  | "workshops"
  | "industrial-visits"
  | "competitions"
  | "team-building"
  | "achievements";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  thumbnailUrl: string;
  eventId?: string;
  date: string;
}

export type AchievementType =
  | "competition"
  | "publication"
  | "patent"
  | "internship"
  | "placement"
  | "scholarship"
  | "national-award"
  | "international-award";

export interface Achievement {
  id: string;
  title: string;
  type: AchievementType;
  description: string;
  year: number;
  members: string[];
  image?: string;
  organization?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  photo: string;
  linkedin?: string;
  email?: string;
  bio: string;
  team:
    | "faculty-coordinator"
    | "faculty-advisor"
    | "chairperson"
    | "vice-chairperson"
    | "secretary"
    | "treasurer"
    | "technical"
    | "design"
    | "media"
    | "events"
    | "editorial"
    | "public-relations"
    | "web-development";
  order: number;
}

export type AnnouncementType =
  | "general"
  | "event"
  | "placement"
  | "internship"
  | "competition";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  pinned: boolean;
  createdAt: string;
  expiresAt?: string;
}

export interface Member {
  id: string;
  uid: string;
  name: string;
  email: string;
  photo?: string;
  rollNumber: string;
  department: string;
  year: number;
  phone?: string;
  linkedin?: string;
  role: "member" | "admin" | "core";
  joinedAt: string;
  volunteerHours: number;
  attendance: number;
  achievements: string[];
  registeredEvents: string[];
  bookmarks: string[];
  certificates: { id: string; name: string; url: string; issuedAt: string }[];
}

export interface Statistic {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface SearchResult {
  id: string;
  title: string;
  type: "event" | "workshop" | "project" | "resource" | "page";
  url: string;
  description: string;
}
