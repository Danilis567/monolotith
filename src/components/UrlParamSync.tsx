'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function SearchParamReader({
  paramKey,
  onRead,
}: {
  paramKey: string;
  onRead: (value: string | null) => void;
}) {
  const searchParams = useSearchParams();
  const value = searchParams.get(paramKey);

  useEffect(() => {
    if (value !== null) {
      onRead(value);
    }
  }, [value, onRead]);

  return null;
}

export function UrlParamSync({
  paramKey,
  onRead,
}: {
  paramKey: string;
  onRead: (value: string | null) => void;
}) {
  return (
    <Suspense fallback={null}>
      <SearchParamReader paramKey={paramKey} onRead={onRead} />
    </Suspense>
  );
}
