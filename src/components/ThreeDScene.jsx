// src/components/ThreeDScene.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, Environment, useGLTF } from '@react-three/drei'
import { useGLTF } from '@react-three/drei/loaders'

export default function ThreeDScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Box position={[-1, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Box>
      <Sphere position={[1, 0, 0]}>
        <meshStandardMaterial color="blue" />
      </Sphere>
      <Text position={[0, 1, 0]} fontSize={0.5} color="white">
        3D Portfolio
      </Text>
    </Canvas>
  )
}
