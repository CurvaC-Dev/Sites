
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('receipt') as File;
    const orderDataStr = formData.get('orderData') as string;
    
    if (!file || !orderDataStr) {
      return NextResponse.json({ error: 'Dados faltando' }, { status: 400 });
    }

    const orderData = JSON.parse(orderDataStr);
    
    // Em produção, você salvaria o arquivo no storage (AWS S3, etc.)
    // e registraria a transação no banco de dados
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Log para acompanhamento
    console.log('Comprovante recebido para:', {
      customer: orderData.customer.email,
      product: orderData.product.name,
      file: file.name,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Comprovante recebido com sucesso' 
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
