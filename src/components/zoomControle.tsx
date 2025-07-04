"use client"

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

function ZoomControl() {
  const { camera } = useThree();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '+') {
        camera.fov = Math.max(10, camera.fov - 5);
        camera.updateProjectionMatrix();
      } else if (e.key === '-') {
        camera.fov = Math.min(120, camera.fov + 5);
        camera.updateProjectionMatrix();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [camera]);

  return null;
}
