"use client"

import { useMemo, useRef } from "react"
import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import * as THREE from "three"

const PARTICLE_COUNT = 20000
const SPEED_MULTIPLIER = 1
const SCALE = 120
const FLOW = 0.9
const CURL = 2.2
const WARP = 2.5
const FILAMENTS = 5
const PULSE = 1.2

function seededValue(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function seededRange(seed: number): number {
  return (seededValue(seed) - 0.5) * 100
}

function ParticleSwarm(): React.JSX.Element {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  const particleColor = useMemo(() => new THREE.Color(), [])

  const positions = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      return new THREE.Vector3(
        seededRange(index * 3 + 1),
        seededRange(index * 3 + 2),
        seededRange(index * 3 + 3)
      )
    })
  }, [])

  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), [])
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), [])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    const time = state.clock.getElapsedTime() * SPEED_MULTIPLIER

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const t = time * FLOW
      const fi = i / PARTICLE_COUNT
      const ga = 2.3999632297
      const a = i * ga
      const r0 = Math.pow(fi, 0.55) * SCALE + 0.0001

      const s1 = Math.sin(a * 1.3 + t * 0.7)
      const s2 = Math.sin(a * 2.1 - t * 0.9)
      const s3 = Math.sin((s1 + s2) * 2.5 + t * 0.5)

      const cx = s2 - s3
      const cy = s3 - s1
      const cz = s1 - s2

      const dx = cx * CURL
      const dy = cy * CURL
      const dz = cz * CURL

      const theta = a + WARP * Math.sin(r0 * 0.04 + t) + dx * 0.3
      const phi = Math.acos(1 - 2 * fi) + dy * 0.2
      const sinPhi = Math.sin(phi)

      const filamentMask = Math.pow(Math.abs(Math.sin(a * FILAMENTS + t)), 3)
      const pulseWave = 1 + PULSE * 0.2 * Math.sin(t + r0 * 0.05)
      const r = r0 * (1 + 0.4 * dz) * (0.7 + 0.6 * filamentMask) * pulseWave

      const x = r * sinPhi * Math.cos(theta)
      const y = r * sinPhi * Math.sin(theta)
      const z = r * Math.cos(phi) + dz * 10

      target.set(x, y, z)

      const band = Math.sin(r * 0.02 + t + dz)
      const hue = (0.65 + 0.25 * band + 0.1 * filamentMask) % 1
      const sat = Math.min(Math.max(0.7 + 0.3 * filamentMask, 0), 1)
      const light = Math.min(Math.max(0.15 + 0.7 * (1 - fi) + 0.2 * band, 0), 1)

      particleColor.setHSL(hue, sat, light)

      positions[i].lerp(target, 0.1)
      dummy.position.copy(positions[i])
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, particleColor)
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true
    }
  })

  return <instancedMesh ref={meshRef} args={[geometry, material, PARTICLE_COUNT]} />
}

export function NebulaBackground(): React.JSX.Element {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <fog attach="fog" args={["#000000", 0.01]} />
        <ParticleSwarm />
        <OrbitControls autoRotate enablePan={false} enableZoom={false} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} intensity={1.8} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
