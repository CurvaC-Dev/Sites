
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Copy, CheckCircle, Clock, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface OrderData {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
  };
  timestamp: string;
}

export function PaymentPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [pixCopied, setPixCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');

  // PIX fictício para demonstração
  const pixCode = "00020126580014BR.GOV.BCB.PIX01368EXAMPLE@DOMAIN.COM0208PURCHASE52040000530398654041.505802BR5925EXEMPLO COMERCIO LTDA6014RIO DE JANEIRO62070503***6304ABCD";
  const pixQRData = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`;

  useEffect(() => {
    const storedOrderData = localStorage.getItem('order-data');
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    }
  }, []);

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setPixCopied(true);
      setTimeout(() => setPixCopied(false), 3000);
    } catch (err) {
      console.error('Erro ao copiar código PIX:', err);
    }
  };

  const simulatePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('completed');
    }, 3000);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Pedido não encontrado</h1>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao site
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStatus === 'completed') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-green-600 mb-4">Pagamento Confirmado!</h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                Seu pagamento foi processado com sucesso. Você receberá o acesso ao material por e-mail em instantes.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Detalhes da compra:</h3>
                <p className="text-sm"><strong>Produto:</strong> {orderData.product.name}</p>
                <p className="text-sm"><strong>Valor:</strong> R$ {orderData.product.price.toFixed(2).replace('.', ',')}</p>
                <p className="text-sm"><strong>E-mail:</strong> {orderData.customer.email}</p>
              </div>
              
              <div className="space-y-4">
                <Button size="lg" className="w-full">
                  Acessar Material
                </Button>
                
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Voltar ao site
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao site
          </Link>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pagamento PIX */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Pagamento via PIX
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Badge variant={paymentStatus === 'processing' ? 'default' : 'secondary'} className="mb-4">
                    {paymentStatus === 'pending' && (
                      <>
                        <Clock className="w-4 h-4 mr-1" />
                        Aguardando pagamento
                      </>
                    )}
                    {paymentStatus === 'processing' && (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                        Processando...
                      </>
                    )}
                  </Badge>
                  
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded">
                      <span className="text-sm text-gray-500">QR Code PIX</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    Escaneie o QR Code com o app do seu banco ou copie o código PIX abaixo
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Código PIX Copia e Cola:</Label>
                  <div className="flex gap-2">
                    <Input
                      value={pixCode}
                      readOnly
                      className="font-mono text-xs"
                    />
                    <Button 
                      onClick={copyPixCode}
                      variant="outline"
                      size="sm"
                    >
                      {pixCopied ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {pixCopied && (
                    <p className="text-sm text-green-600">Código copiado!</p>
                  )}
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Como pagar:</h4>
                  <ol className="text-sm space-y-1 text-muted-foreground">
                    <li>1. Abra o app do seu banco</li>
                    <li>2. Procure pela opção PIX</li>
                    <li>3. Escaneie o QR Code ou cole o código</li>
                    <li>4. Confirme o pagamento</li>
                  </ol>
                </div>
                
                {/* Botão para simular pagamento (apenas para demonstração) */}
                <Button 
                  onClick={simulatePayment}
                  variant="outline"
                  className="w-full"
                  disabled={paymentStatus !== 'pending'}
                >
                  {paymentStatus === 'processing' ? 'Processando...' : 'Simular Pagamento (Demonstração)'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do pedido */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg">{orderData.product.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{orderData.product.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {orderData.product.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">
                        R$ {orderData.product.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Dados do comprador:</h4>
                  <p className="text-sm text-muted-foreground">{orderData.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{orderData.customer.email}</p>
                  <p className="text-sm text-muted-foreground">{orderData.customer.phone}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Pagamento instantâneo via PIX</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Acesso liberado automaticamente</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}

function Input({ value, onChange, readOnly, className, ...props }: any) {
  return (
    <input
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
