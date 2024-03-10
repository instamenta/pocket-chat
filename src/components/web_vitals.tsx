'use client';

import { useReportWebVitals } from 'next/web-vitals';

// @ts-ignore
export function WebVitals(): React.JSX {
  useReportWebVitals((
    // metric
  ) => {
    // console.log(metric);
  });
}

