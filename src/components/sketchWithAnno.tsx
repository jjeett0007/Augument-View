'use client';

import {
  useGLTF,
  Html,
} from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type Annotation = {
  name: string;
  position: THREE.Vector3;
  target: THREE.Object3D;
};

export default function ModelWithAnnotations({ url }: { url: string }) {
  const gltf = useGLTF(url);
  const { camera } = useThree();

  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const annotationRefs = useRef<Record<string, THREE.Object3D>>({});

  useEffect(() => {
    const found: Annotation[] = [];

    gltf.scene.traverse((node) => {
      if (node.name.startsWith('annot_') || node.userData?.annotation) {
        const position = node.getWorldPosition(new THREE.Vector3());
        annotationRefs.current[node.name] = node;
        found.push({ name: node.name, position, target: node });
      }
    });

    setAnnotations(found);
  }, [gltf.scene]);

  const teleportTo = (target: THREE.Object3D) => {
    const pos = target.getWorldPosition(new THREE.Vector3());
    const offset = new THREE.Vector3(0, 1, 2); // Camera offset
    camera.position.copy(pos.clone().add(offset));
    camera.lookAt(pos);
  };

  return (
    <>
      <primitive object={gltf.scene} dispose={null} />

      {annotations.map((anno, i) => (
        <Html
          key={i}
          position={anno.position}
          center
          distanceFactor={8}
          style={{
            background: '#fff',
            padding: '4px 8px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.7rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
          onClick={() => teleportTo(anno.target)}
        >
          📍 {anno.name}
        </Html>
      ))}

      {/* Mini map corner markers */}
      <Html
        position={[0, 0, 0]}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'rgba(255,255,255,0.9)',
          padding: '6px',
          borderRadius: '8px',
          width: '120px',
          fontSize: '0.65rem',
        }}
      >
        <div><b>🗺️ Mini Map</b></div>
        {annotations.map((anno) => (
          <div
            key={anno.name}
            style={{ cursor: 'pointer', color: '#0070f3' }}
            onClick={() => teleportTo(anno.target)}
          >
            • {anno.name}
          </div>
        ))}
      </Html>
    </>
  );
}
