
'use client';

import { Suspense } from 'react';
import { CheckoutForm } from '@/components/checkout/checkout-form';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
