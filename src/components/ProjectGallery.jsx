"use client";

// src/components/ProjectGallery.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, Environment } from '@react-three/drei'

export default function ProjectGallery() {
  const projects = [
    {
      id: 1,
      title: '3D Portfolio Website',
      description: 'A modern portfolio built with Three.js and Next.js',
      image: '/public/portfolio.jpg',
      link: '/portfolio'
    },
    {
      id: 2,
      title: 'VR Experience',
      description: 'Immersive virtual reality application using WebXR',
      image: '/public/vr.jpg',
      link: '/vr'
    },
    // Add more projects here
  ];

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Environment />
      <OrbitControls />
      {projects.map(project => (
        <mesh key={project.id} position={[-2 + project.id * 2, 0, 0]}>
          <boxGeometry args={[1, 0.5, 0.2]} />
          <meshStandardMaterial color="hotpink" />
          <Html distanceFactor={5}>
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-sm">{project.description}</p>
              <a
                href={project.link}
                className="mt-2 inline-block text-blue-300 hover:text-blue-400"
              >
                View Project
              </a>
            </div>
          </Html>
        </mesh>
      ))}
    </Canvas>
  )
}
