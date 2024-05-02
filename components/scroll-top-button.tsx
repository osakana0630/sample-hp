'use client';

import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export function ScrollTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      type="button"
      size="icon"
      className="fixed bottom-3 right-3 z-10"
      onClick={handleClick}
    >
      <ArrowUp size={20} />
    </Button>
  );
}
