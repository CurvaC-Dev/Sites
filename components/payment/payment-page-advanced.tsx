
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Copy, CheckCircle, Clock, CreditCard, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/constants';

interface OrderData {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    pixCode?: string;
    deliveryType?: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
  };
  timestamp: string;
}

export function PaymentPageAdvanced() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [pixCopied, setPixCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'upload' | 'processing' | 'completed'>('pending');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Recuperar PIX code real baseado no produto
  const getPixCodeForProduct = (productId: string): string => {
    const productMap: Record<string, any> = PRODUCTS;
    const productData = Object.values(productMap).find(p => p.id === productId);
    return productData?.pixCode || "00020126360014br.gov.bcb.pix011433862520000162520400005303986540519.905802BR5925ARTEMUS_ALACHEV_PALESTRAS6008Sorocaba610918085-35562130509workshop16304AD1F";
  };

  useEffect(() => {
    const storedOrderData = localStorage.getItem('order-data');
    if (storedOrderData) {
      const parsedData = JSON.parse(storedOrderData);
      // Adicionar PIX code real ao produto
      parsedData.product.pixCode = getPixCodeForProduct(parsedData.product.id);
      setOrderData(parsedData);
      
      // Iniciar timer de abandono de carrinho (10 minutos)
      const abandonTimer = setTimeout(() => {
        if (paymentStatus === 'pending') {
          sendAbandonmentEmail(parsedData);
        }
      }, 10 * 60 * 1000); // 10 minutos

      return () => clearTimeout(abandonTimer);
    }
  }, []);

  const sendAbandonmentEmail = async (order: OrderData) => {
    try {
      await fetch('/api/send-abandonment-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: order.customer.email,
          name: order.customer.name,
          product: order.product.name,
          checkoutLink: `/checkout?product=${order.product.id}`
        })
      });
    } catch (error) {
      console.error('Erro ao enviar email de abandono:', error);
    }
  };

  const copyPixCode = async () => {
    if (orderData?.product.pixCode) {
      try {
        await navigator.clipboard.writeText(orderData.product.pixCode);
        setPixCopied(true);
        setTimeout(() => setPixCopied(false), 3000);
      } catch (err) {
        console.error('Erro ao copiar código PIX:', err);
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024) { // 5MB max
        setSelectedFile(file);
      } else {
        alert('Por favor, selecione uma imagem (JPG, PNG) ou PDF de até 5MB');
      }
    }
  };

  const uploadReceipt = async () => {
    if (!selectedFile || !orderData) return;

    setPaymentStatus('processing');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('receipt', selectedFile);
    formData.append('orderData', JSON.stringify(orderData));

    try {
      const response = await fetch('/api/upload-receipt', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Simular progresso de upload
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setPaymentStatus('completed');
              sendAccessEmail();
              return 100;
            }
            return prev + 10;
          });
        }, 200);
      } else {
        throw new Error('Erro no upload');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      setPaymentStatus('upload');
      alert('Erro ao enviar comprovante. Tente novamente.');
    }
  };

  const sendAccessEmail = async () => {
    if (!orderData) return;
    
    try {
      await fetch('/api/send-access-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: orderData.customer.email,
          name: orderData.customer.name,
          product: orderData.product,
          deliveryType: orderData.product.deliveryType
        })
      });
    } catch (error) {
      console.error('Erro ao enviar email de acesso:', error);
    }
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
              
              <h1 className="text-3xl font-bold text-green-600 mb-4">Comprovante Recebido!</h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                Recebemos seu comprovante e estamos verificando o pagamento. Você receberá o acesso ao material por e-mail em até 2 horas.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Detalhes da compra:</h3>
                <p className="text-sm"><strong>Produto:</strong> {orderData.product.name}</p>
                <p className="text-sm"><strong>Valor:</strong> R$ {orderData.product.price.toFixed(2).replace('.', ',')}</p>
                <p className="text-sm"><strong>E-mail:</strong> {orderData.customer.email}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  📧 <strong>Fique atento ao seu e-mail!</strong> Enviaremos o acesso assim que confirmarmos o pagamento.
                </p>
              </div>
              
              <Link href="/">
                <Button className="w-full">
                  Voltar ao site
                </Button>
              </Link>
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
                    {paymentStatus === 'upload' && (
                      <>
                        <Upload className="w-4 h-4 mr-1" />
                        Envie o comprovante
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
                      value={orderData.product.pixCode || ''}
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
                    <li>5. Envie o comprovante abaixo</li>
                  </ol>
                </div>

                {/* Upload de Comprovante */}
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-3 text-yellow-800">📄 Envie seu comprovante:</h4>
                  
                  {!selectedFile ? (
                    <div className="border-2 border-dashed border-yellow-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <p className="text-sm text-yellow-700 mb-3">Clique para selecionar o comprovante</p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="receipt-upload"
                      />
                      <label htmlFor="receipt-upload">
                        <Button variant="outline" size="sm" asChild>
                          <span>Selecionar arquivo</span>
                        </Button>
                      </label>
                      <p className="text-xs text-yellow-600 mt-2">Formatos: JPG, PNG ou PDF (máx. 5MB)</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white p-3 rounded border">
                        <span className="text-sm font-medium">{selectedFile.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFile(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {paymentStatus === 'processing' && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                      
                      <Button
                        onClick={uploadReceipt}
                        disabled={paymentStatus === 'processing'}
                        className="w-full"
                      >
                        {paymentStatus === 'processing' ? 'Enviando...' : 'Enviar Comprovante'}
                      </Button>
                    </div>
                  )}
                </div>
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
                    <span>Acesso liberado após verificação</span>
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
