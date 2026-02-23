import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, useAnimations, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
    const group = useRef();
    const { scene, animations } = useGLTF('/model.gltf');
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        // Play all animations
        Object.values(actions).forEach((action) => {
            action.reset().fadeIn(0.5).play();
        });
        return () => {
            Object.values(actions).forEach((action) => action.fadeOut(0.5));
        };
    }, [actions]);

    return (
        <group ref={group} dispose={null}>
            <primitive object={scene} />
        </group>
    );
}

export default function HeroModel() {
    return (
        <Canvas
            shadows
            gl={{ 
                alpha: true, 
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                outputColorSpace: THREE.SRGBColorSpace 
            }}
            style={{ background: 'transparent' }}
        >
            <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={45} />
            <ambientLight intensity={0.5} />
            <hemisphereLight intensity={0.5} groundColor="black" />
            <directionalLight 
                position={[5, 5, 5]} 
                intensity={1} 
                castShadow 
                shadow-mapSize={[1024, 1024]}
            />
            
            <Suspense fallback={null}>
                <Model />
            </Suspense>
            
            <OrbitControls 
                enableZoom={false} 
                autoRotate 
                autoRotateSpeed={0.5} 
                makeDefault
            />
        </Canvas>
    );
}

useGLTF.preload('/model.gltf');
