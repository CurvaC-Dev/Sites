
import { EmailProvider, EmailProviderConfig, EmailContact, EmailCampaignData, EmailProviderResult } from '../types';

export abstract class BaseEmailProvider implements EmailProvider {
  abstract name: string;
  abstract displayName: string;
  
  protected config: EmailProviderConfig | null = null;
  protected isConfigured = false;

  async configure(config: EmailProviderConfig): Promise<EmailProviderResult> {
    try {
      const isValid = await this.validateConfig(config);
      if (!isValid) {
        return {
          success: false,
          message: 'Invalid configuration provided',
          error: 'Configuration validation failed'
        };
      }
      
      this.config = config;
      this.isConfigured = true;
      
      return {
        success: true,
        message: `${this.displayName} configured successfully`
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to configure ${this.displayName}`,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  protected ensureConfigured(): void {
    if (!this.isConfigured || !this.config) {
      throw new Error(`${this.displayName} is not configured`);
    }
  }

  // Abstract methods that must be implemented by concrete providers
  abstract validateConfig(config: EmailProviderConfig): Promise<boolean>;
  abstract addContact(contact: EmailContact): Promise<EmailProviderResult>;
  abstract updateContact(email: string, contact: Partial<EmailContact>): Promise<EmailProviderResult>;
  abstract removeContact(email: string): Promise<EmailProviderResult>;
  abstract getContact(email: string): Promise<EmailProviderResult>;
  abstract getLists(): Promise<EmailProviderResult>;
  abstract createList(name: string, description?: string): Promise<EmailProviderResult>;
  abstract createCampaign(campaign: EmailCampaignData, contactEmails?: string[]): Promise<EmailProviderResult>;
  abstract sendCampaign(campaignId: string): Promise<EmailProviderResult>;
  abstract getCampaignStats(campaignId: string): Promise<EmailProviderResult>;
  abstract getContactStats(email: string): Promise<EmailProviderResult>;
}
