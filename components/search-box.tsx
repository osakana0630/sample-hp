'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { paths } from '@/routes';

export function SearchBox() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const onSearch = () => {
    const q = new URLSearchParams({ q: searchText }).toString();
    router.push(`${paths.search}?${q}`);
  };

  return (
    <div className="flex gap-1">
      <Input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      <Button type="button" size="icon" onClick={onSearch}>
        <Search size={20} />
      </Button>
    </div>
  );
}
