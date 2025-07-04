'use client';
import dynamic from 'next/dynamic';

const ARModel = dynamic(() => import('@/components/ARModalView'), { ssr: false });
const SketchViewer = dynamic(() => import('@/components/sketchPreview'), { ssr: false });

export default function Home() {
  return (
    <div className="w-scrren h-screen flex items-center justify-center">
      <SketchViewer modelUrl="https://jv34vrtg2pneejhw.public.blob.vercel-storage.com/3Dgccc-i7jHVuX5piPTt6m5RmL8i78nLwk2OU.glb" />
      {/* <ModelWithAnnotations url="https://jv34vrtg2pneejhw.public.blob.vercel-storage.com/scifi_vr_rooms-SI35TkX11CMj25myrUWeyHtFapmEID.glb" /> */}
    </div>
  );
}
