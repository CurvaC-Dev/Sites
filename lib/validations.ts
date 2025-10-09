
import { z } from 'zod';

// Lead capture form validation
export const leadCaptureSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  phone: z.string().optional(),
  source: z.enum(['workshop', 'ebook_1', 'ebook_2', 'bundle', 'contact']),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  subject: z.string().min(1, 'Assunto é obrigatório').max(200, 'Assunto muito longo'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(1000, 'Mensagem muito longa'),
});

// Admin login validation
export const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

// Email provider configuration validation
export const emailProviderConfigSchema = z.object({
  name: z.enum(['mailchimp', 'convertkit', 'sendgrid', 'custom']),
  displayName: z.string().min(1, 'Nome de exibição é obrigatório'),
  configuration: z.record(z.any()),
  isActive: z.boolean().default(false),
});

// Campaign creation validation
export const campaignSchema = z.object({
  name: z.string().min(1, 'Nome da campanha é obrigatório').max(200, 'Nome muito longo'),
  subject: z.string().min(1, 'Assunto é obrigatório').max(200, 'Assunto muito longo'),
  content: z.string().min(10, 'Conteúdo deve ter pelo menos 10 caracteres'),
  providerId: z.string().min(1, 'Provedor é obrigatório'),
  scheduledFor: z.date().optional(),
});

export type LeadCaptureData = z.infer<typeof leadCaptureSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type EmailProviderConfigData = z.infer<typeof emailProviderConfigSchema>;
export type CampaignData = z.infer<typeof campaignSchema>;
