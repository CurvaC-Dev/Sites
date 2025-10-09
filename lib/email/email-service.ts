
import { prisma } from '../db';
import { EmailService, EmailProvider, EmailContact, EmailProviderResult } from './types';
import { MailchimpProvider } from './providers/mailchimp';
import { ConvertKitProvider } from './providers/convertkit';
import { CustomEmailProvider } from './providers/custom';

class EmailServiceImpl implements EmailService {
  private providers: Map<string, EmailProvider> = new Map();

  constructor() {
    // Register available providers
    this.providers.set('mailchimp', new MailchimpProvider());
    this.providers.set('convertkit', new ConvertKitProvider());
    this.providers.set('custom', new CustomEmailProvider());
  }

  async getActiveProvider(): Promise<EmailProvider | null> {
    try {
      const activeProviderConfig = await prisma.emailProvider.findFirst({
        where: { isActive: true }
      });

      if (!activeProviderConfig) {
        return null;
      }

      const provider = this.providers.get(activeProviderConfig.name);
      if (!provider) {
        return null;
      }

      // Configure the provider
      await provider.configure(activeProviderConfig.configuration as any);
      return provider;
    } catch (error) {
      console.error('Error getting active provider:', error);
      return null;
    }
  }

  async switchProvider(providerName: string): Promise<EmailProviderResult> {
    try {
      const provider = this.providers.get(providerName);
      if (!provider) {
        return {
          success: false,
          message: 'Provider not found',
          error: `Unknown provider: ${providerName}`
        };
      }

      // Deactivate all providers
      await prisma.emailProvider.updateMany({
        data: { isActive: false }
      });

      // Activate the selected provider
      const existingProvider = await prisma.emailProvider.findUnique({
        where: { name: providerName }
      });

      if (existingProvider) {
        await prisma.emailProvider.update({
          where: { id: existingProvider.id },
          data: { isActive: true }
        });
      }

      return {
        success: true,
        message: `Switched to ${provider.displayName} successfully`
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to switch provider',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async addContact(contact: EmailContact, source?: string): Promise<EmailProviderResult> {
    try {
      // Save to database first
      const lead = await prisma.lead.upsert({
        where: { email: contact.email },
        update: {
          name: contact.name || undefined,
          phone: contact.phone || undefined,
          source: source || undefined,
          tags: contact.tags || [],
          customFields: contact.customFields || {},
          status: 'ACTIVE'
        },
        create: {
          email: contact.email,
          name: contact.name || null,
          phone: contact.phone || null,
          source: source || null,
          tags: contact.tags || [],
          customFields: contact.customFields || {},
          status: 'ACTIVE'
        }
      });

      // Add to active email provider
      const provider = await this.getActiveProvider();
      if (provider) {
        const result = await provider.addContact(contact);
        
        // Log the activity
        const activeProviderConfig = await this.getActiveProviderConfig();
        if (activeProviderConfig) {
          await prisma.emailLog.create({
            data: {
              leadId: lead.id,
              providerId: activeProviderConfig.id,
              event: 'SENT',
              subject: 'Welcome to Workshop',
              metadata: { 
                success: result.success,
                message: result.message,
                source: source || null 
              }
            }
          });
        }

        return result;
      }

      return {
        success: true,
        message: 'Contact saved to database (no email provider active)',
        data: { leadId: lead.id }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add contact',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async sendWelcomeEmail(contact: EmailContact): Promise<EmailProviderResult> {
    const provider = await this.getActiveProvider();
    if (!provider) {
      return {
        success: false,
        message: 'No active email provider configured'
      };
    }

    try {
      // Create a welcome campaign
      const campaignResult = await provider.createCampaign({
        subject: 'Bem-vindo ao Workshop: Promova-se em 6 Meses!',
        content: this.generateWelcomeEmailContent(contact.name || ''),
      }, [contact.email]);

      if (!campaignResult.success || !campaignResult.data?.campaignId) {
        return campaignResult;
      }

      // Send the campaign
      return await provider.sendCampaign(campaignResult.data.campaignId);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send welcome email',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async getActiveProviderConfig() {
    return await prisma.emailProvider.findFirst({
      where: { isActive: true }
    });
  }

  private generateWelcomeEmailContent(name: string): string {
    return `
      <h1>Bem-vindo${name ? `, ${name}` : ''}!</h1>
      <p>Obrigado por se inscrever no Workshop: Promova-se em 6 Meses!</p>
      <p>Você está a um passo de transformar seu talento em reconhecimento.</p>
      <h3>Detalhes do Workshop:</h3>
      <ul>
        <li><strong>Data:</strong> 29/07</li>
        <li><strong>Horário:</strong> 19h</li>
        <li><strong>Formato:</strong> Online (100% Digital)</li>
      </ul>
      <p>Prepare-se para descobrir:</p>
      <ul>
        <li>Como identificar seus pontos cegos profissionais</li>
        <li>A comunicação que faz você ser visto como estratégico</li>
        <li>Os passos certos para alcançar promoções reais em até 6 meses</li>
      </ul>
      <p>Nos vemos no workshop!</p>
      <p><strong>Artemus Alachev</strong><br>
      Especialista em Desenvolvimento Profissional e Liderança</p>
    `;
  }
}

export const emailService = new EmailServiceImpl();
