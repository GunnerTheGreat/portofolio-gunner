'use client';
import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MMDLoader } from 'three-stdlib';
import * as THREE from 'three';

function ChisaModel({ side }) {
  const [mmd, setMmd] = useState(null);
  const meshRef = useRef(null);

  useEffect(() => {
    const loader = new MMDLoader();
    loader.load('/Chisa/Chisa.pmx', (mesh) => {
      const boneMap = {};
      mesh.skeleton.bones.forEach(b => { boneMap[b.name] = b; });

      const boneHead = boneMap['頭'];
      const boneUpperBody = boneMap['上半身'];
      const boneRightArm = boneMap['右腕'];
      const boneRightWrist = boneMap['右手首'];
      const boneRightElbow = boneMap['右ひじ'];
      const boneRightShoulder = boneMap['右肩'];
      const boneLeftElbow = boneMap['左ひじ'];
      const boneLeftArm = boneMap['左腕'];
      const boneLeftWrist = boneMap['左手首'];
      const boneUpperBody2 = boneMap['上半身2'];

      const bones = {
        head: boneHead,
        upperBody: boneUpperBody
      };

      if (boneHead) {
        boneHead.rotation.x = 0;
        boneHead.rotation.y = 0;
        boneHead.rotation.z = 0;
      }
      if (boneUpperBody) {
        boneUpperBody.rotation.x = -0.048;
        boneUpperBody.rotation.y = 0.193;
        boneUpperBody.rotation.z = 0.390;
      }
      if (boneRightArm) {
        boneRightArm.rotation.x = 0.178;
        boneRightArm.rotation.y = 0.244;
        boneRightArm.rotation.z = -0.687;
      }
      if (boneRightWrist) {
        boneRightWrist.rotation.x = -1.281;
        boneRightWrist.rotation.y = 0.151;
        boneRightWrist.rotation.z = -0.634;
      }
      if (boneRightElbow) {
        boneRightElbow.rotation.x = -0.285;
        boneRightElbow.rotation.y = 0.683;
        boneRightElbow.rotation.z = -1.229;
      }
      if (boneRightShoulder) {
        boneRightShoulder.rotation.x = 0.877;
        boneRightShoulder.rotation.y = 0.596;
        boneRightShoulder.rotation.z = -0.443;
      }
      if (boneLeftElbow) {
        boneLeftElbow.rotation.x = 0.000;
        boneLeftElbow.rotation.y = 0.000;
        boneLeftElbow.rotation.z = 0.000;
      }
      if (boneLeftArm) {
        boneLeftArm.rotation.x = 0.000;
        boneLeftArm.rotation.y = 0.000;
        boneLeftArm.rotation.z = 0.000;
      }
      if (boneLeftWrist) {
        boneLeftWrist.rotation.x = 0.000;
        boneLeftWrist.rotation.y = 0.000;
        boneLeftWrist.rotation.z = 0.000;
      }
      if (boneUpperBody2) {
        boneUpperBody2.rotation.x = 0.048;
        boneUpperBody2.rotation.y = -0.013;
        boneUpperBody2.rotation.z = -0.250;
      }


      mesh.rotation.y = 0;

      mesh.userData.bones = bones;
      meshRef.current = mesh;
      setMmd(mesh);
    }, undefined, (error) => {
      console.error('Error loading PMX model:', error);
    });
  }, [side]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    const bones = mesh.userData.bones;


    if (bones.head) {
      const baseRotY = 0;
      const baseRotX = 0;
      const targetY = baseRotY + (state.pointer.x * Math.PI) / 10;
      const targetX = baseRotX + (-state.pointer.y * Math.PI) / 12;
      bones.head.rotation.y = THREE.MathUtils.lerp(bones.head.rotation.y, targetY, 0.05);
      bones.head.rotation.x = THREE.MathUtils.lerp(bones.head.rotation.x, targetX, 0.05);
    }
  });

  if (!mmd) return null;

  return <primitive object={mmd} />;
}

export default function Chisa({
  className = "",
  side = "left",
  width = "300px",
  height = "450px",
}) {

  const cameraPosition = [0, 16, 20];
  const cameraTarget = [0, 15, 0];


  const clipStyle = side === "left"
    ? { clipPath: 'inset(0 57% 0 0)' }
    : { clipPath: 'inset(0 0 0 57%)' };

  return (
    <div
      className={`absolute pointer-events-none z-[10000] ${className}`}
      style={{
        width,
        height,
        ...clipStyle,
        filter: 'brightness(0.5) contrast(1.5)',
      }}
    >
      <Canvas
        camera={{ position: cameraPosition, fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
        onCreated={({ camera }) => {
          camera.lookAt(...cameraTarget);
        }}
      >
        <ambientLight intensity={2.0} />
        <directionalLight position={[5, 10, 10]} intensity={0} color="#ffffff" />
        <pointLight position={[-5, 5, -5]} intensity={2.0} color="#ff1a1a" />
        <ChisaModel side={side} />
      </Canvas>
    </div>
  );
}
