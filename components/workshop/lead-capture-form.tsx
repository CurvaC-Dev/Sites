
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface LeadCaptureFormProps {
  source: string;
  className?: string;
  buttonText?: string;
  size?: 'sm' | 'md' | 'lg';
  onSuccess?: () => void;
}

export function LeadCaptureForm({
  source,
  className,
  buttonText = 'INSCREVA-SE AGORA',
  size = 'md',
  onSuccess
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source,
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Inscrição realizada com sucesso! 🎉');
        setFormData({ name: '', email: '', phone: '' });
        onSuccess?.();
      } else {
        setMessage(result.message || 'Erro ao processar inscrição');
      }
    } catch (error) {
      setMessage('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: {
      input: 'h-10 text-sm',
      button: 'h-10 px-6 text-sm',
      gap: 'gap-3'
    },
    md: {
      input: 'h-12 text-base',
      button: 'h-12 px-8 text-base',
      gap: 'gap-4'
    },
    lg: {
      input: 'h-14 text-lg',
      button: 'h-14 px-12 text-lg font-bold',
      gap: 'gap-6'
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", sizeClasses[size].gap, className)}>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white">Nome completo</Label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome completo"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={cn("bg-white/10 border-white/20 text-white placeholder:text-white/60", sizeClasses[size].input)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={cn("bg-white/10 border-white/20 text-white placeholder:text-white/60", sizeClasses[size].input)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white">WhatsApp (opcional)</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(11) 99999-9999"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className={cn("bg-white/10 border-white/20 text-white placeholder:text-white/60", sizeClasses[size].input)}
        />
      </div>

      <Button
        type="submit"
        variant="workshop"
        className={cn("w-full", sizeClasses[size].button)}
        disabled={isLoading}
      >
        {isLoading ? 'Processando...' : buttonText}
      </Button>

      {message && (
        <p className={cn(
          "text-center text-sm",
          message.includes('sucesso') ? 'text-green-300' : 'text-red-300'
        )}>
          {message}
        </p>
      )}
    </form>
  );
}
