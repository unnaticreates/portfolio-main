import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const QuantumNebulaBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const auroraLight1 = new THREE.PointLight(0xc2a4ff, 12, 40);
    auroraLight1.position.set(0, 0, 5);
    scene.add(auroraLight1);

    const auroraLight2 = new THREE.PointLight(0xfb8dff, 10, 40);
    auroraLight2.position.set(-10, -5, -2);
    scene.add(auroraLight2);

    const auroraLight3 = new THREE.PointLight(0x38bdf8, 8, 40);
    auroraLight3.position.set(10, 5, -2);
    scene.add(auroraLight3);

    // 3. Fluid Plasma Aurora Meshes (Soft Glowing Spheres)
    const auroraGroup = new THREE.Group();
    scene.add(auroraGroup);

    const plasmaGeo = new THREE.IcosahedronGeometry(6, 4);
    const plasmaMat1 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#c2a4ff"),
      transparent: true,
      opacity: 0.12,
      wireframe: true,
    });
    const plasma1 = new THREE.Mesh(plasmaGeo, plasmaMat1);
    auroraGroup.add(plasma1);

    const plasmaMat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#fb8dff"),
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });
    const plasma2 = new THREE.Mesh(new THREE.IcosahedronGeometry(8, 3), plasmaMat2);
    plasma2.position.set(-4, 2, -3);
    auroraGroup.add(plasma2);

    // 4. Quantum Particle Constellation System
    const particleCount = 350;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 45;
      particlePos[i + 1] = (Math.random() - 0.5) * 45;
      particlePos[i + 2] = (Math.random() - 0.5) * 30;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.015,
      });
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));

    // Custom Particle Texture & Material
    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      color: new THREE.Color("#fb8dff"),
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Dynamic Constellation Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#c2a4ff"),
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    const lineGeo = new THREE.BufferGeometry();
    const maxLines = 150;
    const linePositions = new Float32Array(maxLines * 6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(linesMesh);

    // 5. Scroll & Mouse Tracking State
    let scrollY = 0;
    let targetScrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp for Scroll & Mouse
      scrollY += (targetScrollY - scrollY) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const totalHeight = Math.max(
        document.body.scrollHeight - window.innerHeight,
        1
      );
      const scrollProgress = scrollY / totalHeight;

      // Scroll-Driven Camera & Warp Effects
      camera.position.z = 15 - scrollProgress * 6 + Math.sin(elapsedTime * 0.5) * 0.5;
      camera.position.y = -scrollProgress * 8;
      camera.rotation.z = scrollProgress * 0.2;

      // Camera Mouse Tilt Parallax
      camera.position.x = mouseX * 1.5;
      camera.rotation.y = -mouseX * 0.05;
      camera.rotation.x = mouseY * 0.05;

      // Aurora Rotation & HSL Color Morphing
      auroraGroup.rotation.x = elapsedTime * 0.05 + scrollProgress * 2;
      auroraGroup.rotation.y = elapsedTime * 0.08 + scrollProgress * 1.5;

      // Morph Light Colors based on Scroll Progress
      const hue1 = (0.7 + scrollProgress * 0.2) % 1.0; // Purple to Cyan
      const hue2 = (0.9 - scrollProgress * 0.2) % 1.0; // Pink to Rose
      auroraLight1.color.setHSL(hue1, 0.8, 0.65);
      auroraLight2.color.setHSL(hue2, 0.8, 0.65);

      // Particle Motion & Constellation Line Updates
      const positions = particleGeo.attributes.position.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Move particles
        positions[i3] += particleVelocities[i].x;
        positions[i3 + 1] += particleVelocities[i].y;
        positions[i3 + 2] += particleVelocities[i].z;

        // Bounce back inside boundaries
        if (Math.abs(positions[i3]) > 25) particleVelocities[i].x *= -1;
        if (Math.abs(positions[i3 + 1]) > 25) particleVelocities[i].y *= -1;
        if (Math.abs(positions[i3 + 2]) > 18) particleVelocities[i].z *= -1;

        // Mouse Magnetic Repel Interaction
        const dx = positions[i3] - mouseX * 15;
        const dy = positions[i3 + 1] - mouseY * 15;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 4) {
          const force = (4 - dist) * 0.02;
          positions[i3] += (dx / dist) * force;
          positions[i3 + 1] += (dy / dist) * force;
        }

        // Draw lines between close particles
        for (let j = i + 1; j < particleCount; j++) {
          if (lineIndex >= maxLines * 6) break;

          const j3 = j * 3;
          const lx = positions[i3] - positions[j3];
          const ly = positions[i3 + 1] - positions[j3 + 1];
          const lz = positions[i3 + 2] - positions[j3 + 2];
          const distance = Math.sqrt(lx * lx + ly * ly + lz * lz);

          if (distance < 4.5) {
            linePositions[lineIndex++] = positions[i3];
            linePositions[lineIndex++] = positions[i3 + 1];
            linePositions[lineIndex++] = positions[i3 + 2];
            linePositions[lineIndex++] = positions[j3];
            linePositions[lineIndex++] = positions[j3 + 1];
            linePositions[lineIndex++] = positions[j3 + 2];
          }
        }
      }

      particleGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};

export default QuantumNebulaBackground;
