import { User, Lead, EmailProvider, EmailCampaign, LeadStatus, Role } from '@prisma/client';
import { DefaultSession } from 'next-auth';

// Extended types with relations
export type LeadWithDetails = Lead & {
  createdBy?: User;
};

export type CampaignWithDetails = EmailCampaign & {
  provider: EmailProvider;
  createdBy: User;
  _count: {
    campaignLeads: number;
    emailLogs: number;
  };
};

export type UserWithStats = User & {
  _count: {
    createdLeads: number;
    managedCampaigns: number;
  };
};

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Dashboard Statistics
export interface DashboardStats {
  totalLeads: number;
  activeLeads: number;
  totalCampaigns: number;
  activeCampaigns: number;
  recentLeads: LeadWithDetails[];
  recentCampaigns: CampaignWithDetails[];
  leadsGrowth: {
    current: number;
    previous: number;
    change: number;
  };
  topSources: {
    source: string;
    count: number;
  }[];
}

// Form types
export interface LeadFormData {
  email: string;
  name?: string;
  phone?: string;
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Email marketing types
export interface EmailStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
}

export interface ProviderStatus {
  name: string;
  displayName: string;
  isActive: boolean;
  isConfigured: boolean;
  lastSync?: Date;
  stats?: EmailStats;
}

// Utility types
export type LeadSource = 'workshop' | 'ebook_1' | 'ebook_2' | 'bundle' | 'contact';
export type SortOrder = 'asc' | 'desc';
export type FilterStatus = 'all' | LeadStatus;

// NextAuth type declarations
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role: Role;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    role: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: Role;
  }
}