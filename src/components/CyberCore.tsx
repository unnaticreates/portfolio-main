import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const CyberCore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene Setup
    const container = containerRef.current;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xc2a4ff, 8, 20);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xfb8dff, 8, 20);
    pointLight2.position.set(-3, -3, -1);
    scene.add(pointLight2);

    const blueLight = new THREE.PointLight(0x5400ff, 5, 20);
    blueLight.position.set(0, -3, 2);
    scene.add(blueLight);

    // 3. Core Objects
    // A. Glass Outer Orb (Physical Glass Material)
    const glassGeo = new THREE.IcosahedronGeometry(1.3, 16);
    const glassMat = new THREE.MeshPhysicalMaterial({
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
      color: new THREE.Color("#e2d4ff"),
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const glassSphere = new THREE.Mesh(glassGeo, glassMat);
    scene.add(glassSphere);

    // B. Inner Glowing Energy Core
    const coreGeo = new THREE.IcosahedronGeometry(0.75, 8);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#c481ff"),
      emissive: new THREE.Color("#fb8dff"),
      emissiveIntensity: 2,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(coreGeo, coreMat);
    scene.add(innerCore);

    // C. Orbiting Cyber Rings
    const ringGeo1 = new THREE.TorusGeometry(1.75, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#c2a4ff"),
      emissive: new THREE.Color("#c2a4ff"),
      emissiveIntensity: 1.5,
      roughness: 0.3,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.05, 0.01, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#fb8dff"),
      emissive: new THREE.Color("#fb8dff"),
      emissiveIntensity: 1.2,
      roughness: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -Math.PI / 3;
    scene.add(ring2);

    // D. Ambient Floating Particle Swarm
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: new THREE.Color("#fb8dff"),
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Mouse Tracking & Interaction Setup
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };
    let isHovered = false;
    let pulseTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotation.x = y * 0.5;
      targetRotation.y = x * 0.5;
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
      targetRotation.x = 0;
      targetRotation.y = 0;
    };

    const handleClick = () => {
      pulseTime = 1.0; // Trigger pulse wave
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("click", handleClick);

    // 5. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp Rotations
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

      glassSphere.rotation.x = currentRotation.x + elapsedTime * 0.2;
      glassSphere.rotation.y = currentRotation.y + elapsedTime * 0.3;

      innerCore.rotation.x = -currentRotation.x - elapsedTime * 0.5;
      innerCore.rotation.y = -currentRotation.y - elapsedTime * 0.6;

      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.3;
      particles.rotation.y = elapsedTime * 0.05;

      // Dynamic Pulsing & Hover Reaction
      const baseScale = isHovered ? 1.08 : 1.0;
      const hoverPulse = Math.sin(elapsedTime * 3) * 0.04;
      const scale = baseScale + hoverPulse + pulseTime * 0.15;

      glassSphere.scale.set(scale, scale, scale);

      if (pulseTime > 0) {
        pulseTime -= 0.02;
        coreMat.emissiveIntensity = 2 + pulseTime * 4;
      } else {
        coreMat.emissiveIntensity = 2 + Math.sin(elapsedTime * 2) * 0.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("click", handleClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center pointer-events-auto cursor-pointer group">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute w-64 h-64 bg-gradient-to-r from-purple-500/20 via-pink-500/30 to-indigo-500/20 rounded-full blur-3xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none" />

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-[320px] h-[320px] max-w-[85vw] max-h-[85vw] relative z-10"
      />
    </div>
  );
};

export default CyberCore;
