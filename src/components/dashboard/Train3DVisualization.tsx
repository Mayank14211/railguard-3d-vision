
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text, Html } from "@react-three/drei";
import * as THREE from "three";

// Cabin component that represents one train cabin
const TrainCabin = ({ 
  position, 
  index, 
  alertLevel 
}: { 
  position: [number, number, number]; 
  index: number; 
  alertLevel: number; 
}) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  // Alert level determines the color
  // 0 = normal (green), 1 = warning (yellow), 2 = alert (red)
  const baseColor = new THREE.Color(alertLevel === 0 ? "#10B981" : alertLevel === 1 ? "#F59E0B" : "#EF4444");
  const hoverColor = new THREE.Color("#1EAEDB");
  
  const alertText = alertLevel === 0 ? "Status: Normal" : 
                    alertLevel === 1 ? "Warning: Suspicious Activity" : 
                    "ALERT: Unauthorized Access";
  
  // Pulse animation based on alert level
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Ensure we're working with MeshStandardMaterial
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    
    if (alertLevel > 0) {
      const intensity = Math.sin(state.clock.getElapsedTime() * (alertLevel === 2 ? 5 : 2)) * 0.2 + 0.8;
      material.opacity = intensity;
      
      // Make red alerts more intense
      if (alertLevel === 2) {
        const pulseColor = baseColor.clone().multiplyScalar(intensity);
        material.color = hovered ? hoverColor : pulseColor;
      }
    } else {
      material.opacity = hovered ? 0.9 : 0.6;
      material.color = hovered ? hoverColor : baseColor;
    }
  });

  // Position the train cabins next to each other
  const cabinWidth = 4;
  const cabinPosition: [number, number, number] = [position[0] + (index * cabinWidth), position[1], position[2]];

  return (
    <group position={cabinPosition}>
      <Text
        position={[0, 1.6, 0]}
        rotation={[0, 0, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {`Cabin ${index + 1}`}
      </Text>
      
      {alertLevel > 0 && (
        <Html position={[0, 2.1, 0]} center>
          <div className={`px-2 py-1 text-xs rounded-md whitespace-nowrap 
                          ${alertLevel === 1 ? 'bg-theme-yellow text-black' : 'bg-theme-red text-white'}`}>
            {alertText}
          </div>
        </Html>
      )}
      
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setActive(!active)}
      >
        <boxGeometry args={[3.5, 1, 8]} />
        <meshStandardMaterial 
          color={baseColor}
          transparent={true}
          opacity={0.6}
          wireframe={false}
        />
      </mesh>
      
      {/* Train top */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[3.3, 0.5, 7.8]} />
        <meshStandardMaterial 
          color="#222"
          transparent={true}
          opacity={0.7}
        />
      </mesh>

      {/* Windows */}
      {[-2.5, -1.25, 0, 1.25, 2.5].map((zPos, i) => (
        <mesh key={i} position={[1.76, 0, zPos]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial 
            color="#8B5CF6"
            transparent={true}
            opacity={0.5}
            emissive="#8B5CF6"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      
      {[-2.5, -1.25, 0, 1.25, 2.5].map((zPos, i) => (
        <mesh key={i + 10} position={[-1.76, 0, zPos]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial 
            color="#8B5CF6"
            transparent={true}
            opacity={0.5}
            emissive="#8B5CF6"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      
      {/* Door */}
      <mesh position={[0, -0.2, -4]}>
        <boxGeometry args={[1, 0.6, 0.1]} />
        <meshStandardMaterial 
          color="#1EAEDB"
          transparent={true}
          opacity={0.7}
          emissive="#1EAEDB"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

// Grid component for the floor
const Grid = () => {
  return (
    <gridHelper 
      args={[100, 100, "#1E293B", "#1E293B"]} 
      position={[0, -0.5, 0]} 
    />
  );
};

// Environment configuration
const SceneEnvironment = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#8B5CF6" />
    </>
  );
};

// Main train visualization component
const Train3DVisualization = () => {
  // Simulate alert levels (0 = normal, 1 = warning, 2 = alert)
  const [alertLevels, setAlertLevels] = useState<number[]>([0, 0, 0, 0, 0]);

  // Simulate changing alerts
  useEffect(() => {
    // Initial alert in cabin 3
    const initialTimer = setTimeout(() => {
      setAlertLevels(prev => {
        const updated = [...prev];
        updated[2] = 2; // Alert in cabin 3
        return updated;
      });
    }, 5000);

    // After some time, add warning in cabin 1
    const secondTimer = setTimeout(() => {
      setAlertLevels(prev => {
        const updated = [...prev];
        updated[0] = 1; // Warning in cabin 1
        return updated;
      });
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(secondTimer);
    };
  }, []);

  return (
    <div className="w-full h-[500px] lg:h-[600px] glass-panel">
      <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
        <SceneEnvironment />
        {alertLevels.map((level, i) => (
          <TrainCabin key={i} position={[-8, 0, 0]} index={i} alertLevel={level} />
        ))}
        <Grid />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 glass-panel p-2 text-xs text-white bg-theme-darker/80">
        <p className="font-medium mb-1">Train Security Status</p>
        <div className="flex space-x-1">
          {alertLevels.map((level, i) => (
            <div 
              key={i}
              className={`w-4 h-4 rounded-sm ${
                level === 0 ? 'bg-theme-green' : 
                level === 1 ? 'bg-theme-yellow' : 
                'bg-theme-red animate-pulse'
              }`}
              title={`Cabin ${i+1}: ${
                level === 0 ? 'Normal' : 
                level === 1 ? 'Warning' : 
                'Alert'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs text-white bg-theme-darker/80 glass-panel p-2">
        <p>Click and drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default Train3DVisualization;
