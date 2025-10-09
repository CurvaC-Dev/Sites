
'use client';

import { Suspense } from 'react';
import { ThemeSelectionPage } from '@/components/theme/theme-selection-page';

export default function SelectTheme() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ThemeSelectionPage />
    </Suspense>
  );
}
