'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, ContactShadows, Bounds, Html, FirstPersonControls } from '@react-three/drei';
import { useEffect, useRef, useState, Suspense } from 'react';
import * as THREE from 'three';

type Annotation = {
    name: string;
    position: THREE.Vector3;
    target?: THREE.Object3D;
};

function Model({ url }: { url: string }) {
    const gltf = useGLTF(url);
    const { camera } = useThree();

    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const annotationMapRef = useRef<Record<string, THREE.Object3D>>({});

    useEffect(() => {
        const found: Annotation[] = [];

        gltf.scene.traverse((node) => {
            // Check by naming convention
            if (node.name.startsWith('annot_')) {
                const pos = node.getWorldPosition(new THREE.Vector3());
                annotationMapRef.current[node.name] = node;
                found.push({ name: node.name, position: pos, target: node });
            }

            // Optionally check userData for annotations (e.g. node.userData.annotation === true)
            if (node.userData?.annotation) {
                const pos = node.getWorldPosition(new THREE.Vector3());
                annotationMapRef.current[node.name] = node;
                found.push({ name: node.name, position: pos, target: node });
            }
        });

        setAnnotations(found);

        const handleKey = (e: KeyboardEvent) => {
            const key = e.key;
            const match = `annot_${key}`;
            const node = annotationMapRef.current[match];

            if (node) {
                const focus = node.getWorldPosition(new THREE.Vector3());
                const offset = new THREE.Vector3(0, 1, 2); // camera offset
                camera.position.copy(focus.clone().add(offset));
                camera.lookAt(focus);
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [gltf.scene, camera]);

    return (
        <>
            <primitive object={gltf.scene} dispose={null} />

            {/* Render annotation labels */}
            {annotations.map((anno, i) => (
                <Html
                    key={i}
                    position={anno.position}
                    center
                    distanceFactor={8}
                    style={{
                        background: '#fff',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        boxShadow: '0 0 5px rgba(0,0,0,0.3)',
                        fontSize: '0.75rem',
                        border: "1px solid white"
                    }}
                >
                    📌 {anno.name}
                </Html>
            ))}
        </>
    );
}





export default function SketchViewer({ modelUrl }: { modelUrl: string }) {
    return (
        <div className="w-full h-screen">
            <Canvas
                shadows
                camera={{ position: [0, 2, 5], fov: 45 }}
            >
                <Suspense fallback={null}>
                    <Environment preset="studio" />
                    <Bounds fit observe margin={1.2}>
                        <Model url={modelUrl} />
                    </Bounds>
                    <ContactShadows
                        position={[0, -0.8, 0]}
                        opacity={0.5}
                        scale={10}
                        blur={1.5}
                        far={4.5}
                    />
                </Suspense>

                {/* 👇 This is the important fix */}
                {/* <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    enableDamping

                    makeDefault
                    target={[0, 1, 0]} // change target to match your model focus
                /> */}
                <FirstPersonControls
                    activeLook={true}
                    lookSpeed={0.1}
                    movementSpeed={5}
                    lookVertical={true}
                    constrainVertical={false}
                />
            </Canvas>
        </div>
    );
}
