"use client"
import React, { createRef, useEffect } from 'react'
import '@google/model-viewer';
import { ModelViewer, activateAR } from '@r2u/react-ar-components'
import type { ModelViewerElement } from '@r2u/react-ar-components'


export default function ARModel() {
    // const usdz = 'http://localhost:8080/mesh_01000.usdz'
    const glb = 'https://jv34vrtg2pneejhw.public.blob.vercel-storage.com/scifi_vr_rooms-SI35TkX11CMj25myrUWeyHtFapmEID.glb'
    const imageUrl = 'https://tnga.github.io/sharedbazar/img/react-aframe.png'
    const viewerRef = createRef<ModelViewerElement>()

    // useEffect(() => {
    //     // Dynamically import only in client
    //     import('@google/model-viewer');
    // }, []);

    return (
        <>
            {/* <button type="button" onClick={() => activateAR({ glb })}>
                View in 3D
            </button> */}
            <ModelViewer
                ref={viewerRef}
                src={glb}
                alt="3D model"
                style={{ width: '100%', height: '100vh' }}
                poster={imageUrl}
            />
        </>
    );
}
