
'use client';

import { Suspense } from 'react';
import { PaymentPageAdvanced } from '@/components/payment/payment-page-advanced';

export default function Payment() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <PaymentPageAdvanced />
    </Suspense>
  );
}
