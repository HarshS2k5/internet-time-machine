export type EraId = 
  | 'dawn-80s' 
  | 'wild-web-90s' 
  | 'dotcom-2000s' 
  | 'mobile-social-2010s' 
  | 'ai-modern-2020s';

export type CategoryType = 
  | 'web' 
  | 'gaming' 
  | 'mobile' 
  | 'computers' 
  | 'ai' 
  | 'internet' 
  | 'social' 
  | 'media';

export interface Era {
  id: EraId;
  name: string;
  period: string;
  startYear: number;
  endYear: number;
  tagline: string;
  description: string;
  aesthetic: {
    accentColor: string;
    badgeStyle: string;
    borderStyle: string;
    eraVibe: string;
    glowColor: string;
  };
  signatureTech: string[];
  designTrend: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  year: number;
  dateStr: string;
  category: CategoryType;
  eraId: EraId;
  headline: string;
  description: string;
  whyItMattered: string;
  impactStats?: string;
  relatedEvents?: string[];
  relatedTech?: string[];
  tags: string[];
  image: string;
  externalSource?: string;
  featured?: boolean;
}

export interface WebDesignStyle {
  title: string;
  description: string;
  characteristics: string[];
  colorPalette: string[];
  notableSites: string[];
}

export interface YearData {
  year: number;
  eraId: EraId;
  eraName: string;
  headline: string;
  summary: string;
  webDesignStyle: WebDesignStyle;
  internetSpeed: string;
  activeUsers: string;
  popularWebsites: string[];
  popularGames: string[];
  majorDevices: string[];
  socialPlatforms: string[];
  culturalTrends: string[];
  keyEvents: HistoricalEvent[];
}

export interface WebsiteEvolutionItem {
  id: string;
  name: string;
  launchYear: number;
  category: 'Search' | 'Social' | 'Video' | 'Commerce' | 'Information' | 'Gaming';
  description: string;
  milestones: {
    year: number;
    title: string;
    designShift: string;
  }[];
  before: {
    year: number;
    title: string;
    image: string;
    features: string[];
    aestheticNotes: string;
  };
  after: {
    year: number;
    title: string;
    image: string;
    features: string[];
    aestheticNotes: string;
  };
  simulationAvailable?: 'google-1998' | 'yahoo-1996' | 'youtube-2005' | 'thefacebook-2004';
}

export interface GamingMilestone {
  id: string;
  title: string;
  year: number;
  type: 'Console' | 'PC' | 'Online/MMO' | 'Engine' | 'Esports' | 'Graphics';
  category: '8-bit & 16-bit' | '3D Revolution' | 'Online Golden Age' | 'HD & Esports' | 'Modern Era';
  description: string;
  whyItMattered: string;
  innovations: string[];
  image: string;
  featuredGame?: string;
}

export interface TechMilestone {
  id: string;
  title: string;
  year: number;
  type: 'Computer' | 'Smartphone' | 'GPU' | 'CPU' | 'Console' | 'Internet' | 'AI';
  launchDate: string;
  specs: string;
  explanation: string;
  whyItMattered: string;
  relatedTechnologies: string[];
  image: string;
}

export interface SocialMediaMilestone {
  id: string;
  platform: string;
  launchYear: number;
  era: string;
  mainPurpose: string;
  majorChanges: string;
  culturalInfluence: string;
  peakStats: string;
  iconBg: string;
  iconName: string;
}

export interface AIMilestone {
  id: string;
  year: number;
  milestone: string;
  category: 'Foundational' | 'Deep Learning' | 'NLP' | 'Computer Vision' | 'Generative AI' | 'Reasoning';
  organization: string;
  explanation: string;
  impact: string;
  keyMetricOrPaper: string;
}

export interface CategoryInfo {
  id: CategoryType;
  title: string;
  icon: string;
  description: string;
  color: string;
  accentHex: string;
}
