"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function Starfield(props: any) {
  const ref = useRef<any>(null);
  
  // Natively generate random points in a sphere to avoid 'maath' dependency
  const sphere = useMemo(() => {
    const points = new Float32Array(4000 * 3);
    for (let i = 0; i < 4000; i++) {
      // Random direction vectors
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 2.0; // Radius 2.0
      const sinPhi = Math.sin(phi);
      points[i * 3] = r * sinPhi * Math.cos(theta);
      points[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      points[i * 3 + 2] = r * Math.cos(phi);
    }
    return points;
  }, []);

  useFrame((state: RootState, delta: number) => {
    // Slow, infinite float rotation
    if (ref.current) {
        ref.current.rotation.x -= delta / 30;
        ref.current.rotation.y -= delta / 40;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#818CF8" // Soft indigo star glow
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export default function CosmicBackground() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, pointerEvents: "none", background: "#030305", overflow: "hidden" }}>
      {/* Dynamic gradient nebulas utilizing deep space colors */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.25 }}>
        <div style={{ animationDuration: "12s", position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vh", borderRadius: "50%", background: "#4f46e5", filter: "blur(130px)", mixBlendMode: "screen", animation: "pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
        <div style={{ animationDuration: "16s", position: "absolute", bottom: "-10%", right: "-10%", width: "60vw", height: "60vh", borderRadius: "50%", background: "#1e3a8a", filter: "blur(150px)", mixBlendMode: "screen", animation: "pulse 16s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
        <div style={{ animationDuration: "14s", position: "absolute", top: "40%", right: "30%", width: "40vw", height: "40vh", borderRadius: "50%", background: "#7c3aed", filter: "blur(120px)", mixBlendMode: "screen", animation: "pulse 14s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
      </div>

      <Canvas camera={{ position: [0, 0, 1] }}>
        <Starfield />
      </Canvas>
    </div>
  );
}
