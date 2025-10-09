
// Abstract interfaces for email marketing providers

export interface EmailProviderConfig {
  apiKey: string;
  listId?: string;
  [key: string]: any;
}

export interface EmailContact {
  email: string;
  name?: string;
  phone?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface EmailCampaignData {
  subject: string;
  content: string;
  templateId?: string;
  scheduledFor?: Date;
}

export interface EmailProviderResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface EmailProvider {
  name: string;
  displayName: string;
  
  // Configuration
  configure(config: EmailProviderConfig): Promise<EmailProviderResult>;
  validateConfig(config: EmailProviderConfig): Promise<boolean>;
  
  // Contact Management
  addContact(contact: EmailContact): Promise<EmailProviderResult>;
  updateContact(email: string, contact: Partial<EmailContact>): Promise<EmailProviderResult>;
  removeContact(email: string): Promise<EmailProviderResult>;
  getContact(email: string): Promise<EmailProviderResult>;
  
  // List/Audience Management
  getLists(): Promise<EmailProviderResult>;
  createList(name: string, description?: string): Promise<EmailProviderResult>;
  
  // Campaign Management
  createCampaign(campaign: EmailCampaignData, contactEmails?: string[]): Promise<EmailProviderResult>;
  sendCampaign(campaignId: string): Promise<EmailProviderResult>;
  getCampaignStats(campaignId: string): Promise<EmailProviderResult>;
  
  // Analytics
  getContactStats(email: string): Promise<EmailProviderResult>;
}

export interface EmailService {
  getActiveProvider(): Promise<EmailProvider | null>;
  switchProvider(providerName: string): Promise<EmailProviderResult>;
  addContact(contact: EmailContact, source?: string): Promise<EmailProviderResult>;
  sendWelcomeEmail(contact: EmailContact): Promise<EmailProviderResult>;
}

export type SupportedProviders = 'mailchimp' | 'convertkit' | 'sendgrid' | 'custom';
