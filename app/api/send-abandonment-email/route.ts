
import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_TEMPLATES } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const { email, name, product, checkoutLink } = await request.json();
    
    if (!email || !name) {
      return NextResponse.json({ error: 'Dados faltando' }, { status: 400 });
    }

    // Em produção, você integraria com um serviço de email como:
    // - SendGrid
    // - AWS SES
    // - Mailchimp
    // - ConvertKit
    
    const emailContent = EMAIL_TEMPLATES.ABANDONMENT_REMINDER.html
      .replace('{{checkout_link}}', checkoutLink);
    
    // Simular envio de email
    console.log('Email de abandono enviado para:', {
      to: email,
      name: name,
      product: product,
      subject: EMAIL_TEMPLATES.ABANDONMENT_REMINDER.subject,
      timestamp: new Date().toISOString()
    });
    
    // Aqui você faria a integração real:
    /*
    await emailService.send({
      to: email,
      subject: EMAIL_TEMPLATES.ABANDONMENT_REMINDER.subject,
      html: emailContent
    });
    */
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email de lembrete enviado' 
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
