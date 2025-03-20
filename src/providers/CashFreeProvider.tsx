'use client';

import { useEffect, useState } from 'react';

const CashFreeProvider = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !loaded) {
      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [loaded]);

  return null; // This component does not render anything
};

export default CashFreeProvider;
