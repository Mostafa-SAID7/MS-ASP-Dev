import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePreferences } from "@/store/preferences";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const theme = usePreferences((s) => s.theme);

  const count = 280;

  // Stable particle positions — only computed once on mount
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 7 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      p[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return p;
  }, []);

  // Stable initial copy for the bufferAttribute — prevents R3F from recreating
  // the GPU buffer on every React render (positions.slice() in JSX would do this)
  const positionsInitial = useMemo(() => positions.slice(), [positions]);

  // Constellation lines — computed once from stable positions
  const linePositions = useMemo(() => {
    const threshold = 1.8;
    const verts: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < threshold * threshold) {
          verts.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    return new Float32Array(verts);
  }, [positions]);

  // Per-particle phase offsets — stable
  const phases = useMemo(() => {
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) ph[i] = Math.random() * Math.PI * 2;
    return ph;
  }, []);

  // Per-particle drift — stable
  const drift = useMemo(() => {
    const d = new Float32Array(count * 2); // x and y drift only
    for (let i = 0; i < count; i++) {
      d[i * 2 + 0] = (Math.random() - 0.5) * 0.03;
      d[i * 2 + 1] = (Math.random() - 0.5) * 0.024;
    }
    return d;
  }, []);

  const isDark = theme === "dark";
  const particleColor = isDark ? "#c8c3bb" : "#2a2621";
  const lineColor = isDark ? "#9a9188" : "#6b6560";

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      // Batch updates — compute sin/cos once per particle rather than per axis
      for (let i = 0; i < count; i++) {
        const ph = phases[i];
        const sinT = Math.sin(t * 0.18 + ph);
        const cosT = Math.cos(t * 0.14 + ph * 1.3);
        pos.setXYZ(
          i,
          positions[i * 3 + 0] + sinT * 0.22 + drift[i * 2 + 0] * t,
          positions[i * 3 + 1] + cosT * 0.15 + drift[i * 2 + 1] * t,
          positions[i * 3 + 2] + Math.sin(t * 0.1 + ph * 0.7) * 0.1,
        );
      }
      pos.needsUpdate = true;

      // Slow global rotation — very cheap
      pointsRef.current.rotation.y = t * 0.012;
      pointsRef.current.rotation.x = Math.sin(t * 0.06) * 0.04;
    }

    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.012;
      linesRef.current.rotation.x = Math.sin(t * 0.06) * 0.04;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positionsInitial, 3]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color={particleColor}
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={0.18}
        />
      </lineSegments>
    </>
  );
}

export default function InkParticles() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.4} />
      <Particles />
    </Canvas>
  );
}
