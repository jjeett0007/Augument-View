'use client';
import dynamic from 'next/dynamic';

const ARModel = dynamic(() => import('@/components/ARModalView'), { ssr: false });

export default function Home() {
  return (
    <div className="w-scrren h-screen flex items-center justify-center">
     <ARModel />
    </div>
  );
}
