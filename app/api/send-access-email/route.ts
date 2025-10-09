
import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_TEMPLATES } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const { email, name, product, deliveryType } = await request.json();
    
    if (!email || !name || !product) {
      return NextResponse.json({ error: 'Dados faltando' }, { status: 400 });
    }

    let emailTemplate;
    let downloadLinks = {};
    
    // Definir template e links baseado no tipo de entrega
    switch (deliveryType) {
      case 'ebook_download':
        emailTemplate = EMAIL_TEMPLATES.EBOOK_ACCESS;
        downloadLinks = {
          download_link: `https://example.com/download/ebook-${product.id}`
        };
        break;
        
      case 'course_access':
        emailTemplate = EMAIL_TEMPLATES.COURSE_ACCESS;
        downloadLinks = {
          course_link: 'https://example.com/curso',
          ebook1_link: 'https://example.com/download/ebook-comunicacao',
          ebook2_link: 'https://example.com/download/ebook-roma'
        };
        break;
        
      case 'combo_access':
        emailTemplate = EMAIL_TEMPLATES.COURSE_ACCESS;
        downloadLinks = {
          course_link: 'https://example.com/primeira-aula',
          ebook1_link: 'https://example.com/download/ebook-comunicacao',
          ebook2_link: 'https://example.com/download/ebook-roma'
        };
        break;
        
      case 'single_class_access':
        emailTemplate = EMAIL_TEMPLATES.COURSE_ACCESS;
        downloadLinks = {
          course_link: 'https://example.com/aula-escolhida'
        };
        break;
        
      default:
        emailTemplate = EMAIL_TEMPLATES.EBOOK_ACCESS;
        downloadLinks = {
          download_link: 'https://example.com/download'
        };
    }
    
    // Substituir placeholders no template
    let emailContent: string = emailTemplate.html;
    for (const [key, value] of Object.entries(downloadLinks)) {
      emailContent = emailContent.replace(`{{${key}}}`, String(value));
    }
    
    // Log para acompanhamento
    console.log('Email de acesso enviado para:', {
      to: email,
      name: name,
      product: product.name,
      deliveryType: deliveryType,
      subject: emailTemplate.subject,
      timestamp: new Date().toISOString()
    });
    
    // Aqui você faria a integração real com seu provedor de email:
    /*
    await emailService.send({
      to: email,
      subject: emailTemplate.subject,
      html: emailContent
    });
    */
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email de acesso enviado' 
    });

  } catch (error) {
    console.error('Erro ao enviar email de acesso:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
