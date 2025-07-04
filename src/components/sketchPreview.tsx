'use client';

import { Canvas, useThree } from '@react-three/fiber';
import {
    Environment,
    useGLTF,
    ContactShadows,
    Html,
    useProgress,
    FirstPersonControls,
    OrbitControls,
} from '@react-three/drei';
import { Suspense, useEffect } from 'react';

function Loader() {
    const { progress } = useProgress();

    return (
        <Html center>
            <div style={{
                background: '#fff',
                padding: '10px 20px',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(0,0,0,0.3)',
                fontSize: '0.9rem',
                fontWeight: 'bold',
            }}>
                <span className='flex gap-1 text-black'>
                    ⏳ Loading... {Math.floor(progress)}%
                </span>
            </div>
        </Html>
    );
}

function Model({ url }: { url: string }) {
    const gltf = useGLTF(url);
    return <primitive object={gltf.scene} dispose={null} />;
}


function EnablePointerLock() {
    const { gl } = useThree();

    useEffect(() => {
        const canvas = gl.domElement;
        const requestPointerLock = () => {
            canvas.requestPointerLock?.();
        };
        canvas.addEventListener('click', requestPointerLock);
        return () => canvas.removeEventListener('click', requestPointerLock);
    }, [gl]);

    return null;
}

export default function SketchViewer({ modelUrl }: { modelUrl: string }) {
    return (
        <div className="w-full h-screen">
            <Canvas shadows camera={{ position: [0, 1.6, 5], fov: 75 }}>
                <Suspense fallback={<Loader />}>
                    <Environment preset="studio" />
                    <Model url={modelUrl} />
                    <ContactShadows
                        position={[0, -0.8, 0]}
                        opacity={0.5}
                        scale={10}
                        blur={1.5}
                        far={4.5}
                    />
                </Suspense>

                <EnablePointerLock />

                {/* 🧭 First person controls instead of OrbitControls */}
                {/* <FirstPersonControls
                    lookSpeed={0.1}
                    movementSpeed={3}
                    lookVertical={true}
                    constrainVertical={false}
                    enabled={true}
                    activeLook={true}
                /> */}

                <OrbitControls enablePan enableZoom enableRotate />
            </Canvas>
        </div>
    );
}
