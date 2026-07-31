import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const TechOrbit3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Neon Purple & Pink Accents)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLightPurple = new THREE.PointLight(0xc2a4ff, 10, 25);
    pointLightPurple.position.set(4, 4, 4);
    scene.add(pointLightPurple);

    const pointLightPink = new THREE.PointLight(0xfb8dff, 10, 25);
    pointLightPink.position.set(-4, -4, 2);
    scene.add(pointLightPink);

    const pointLightBlue = new THREE.PointLight(0x38bdf8, 8, 20);
    pointLightBlue.position.set(0, 4, -3);
    scene.add(pointLightBlue);

    // 3. Central Morphing Glass Blob / Mesh
    const blobGeo = new THREE.IcosahedronGeometry(1.2, 32); // High resolution for morphing
    const positionAttribute = blobGeo.getAttribute("position");
    const originalPositions = positionAttribute.clone();

    const glassMat = new THREE.MeshPhysicalMaterial({
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.88,
      ior: 1.45,
      thickness: 1.1,
      transparent: true,
      opacity: 0.85,
      color: new THREE.Color("#d8b4fe"),
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });

    const glassBlob = new THREE.Mesh(blobGeo, glassMat);
    scene.add(glassBlob);

    // Wireframe Inner Core Grid
    const wireMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#c084fc"),
      emissive: new THREE.Color("#e879f9"),
      emissiveIntensity: 1.5,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerWire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 4), wireMat);
    scene.add(innerWire);

    // 4. Floating 3D Tech Logos / Icons
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // A. 3D React Atom Icon
    const reactGroup = new THREE.Group();
    const nucleus = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    reactGroup.add(nucleus);

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });

    const ringGeo = new THREE.TorusGeometry(0.32, 0.02, 12, 48);
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 3;
    const ring3 = new THREE.Mesh(ringGeo, ringMat);
    ring3.rotation.x = -Math.PI / 3;

    reactGroup.add(ring1, ring2, ring3);
    reactGroup.position.set(2.1, 0.3, 0);
    orbitGroup.add(reactGroup);

    // B. 3D Python emblem (Gold & Blue 3D Intertwined S-Shapes)
    const pythonGroup = new THREE.Group();
    const pyBlueMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      roughness: 0.2,
    });
    const pyGoldMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xca8a04,
      emissiveIntensity: 0.5,
      roughness: 0.2,
    });

    const pyTop = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.08, 12, 24, Math.PI * 1.3), pyBlueMat);
    pyTop.position.set(-0.06, 0.06, 0);
    const pyBottom = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.08, 12, 24, Math.PI * 1.3), pyGoldMat);
    pyBottom.position.set(0.06, -0.06, 0);
    pyBottom.rotation.z = Math.PI;

    pythonGroup.add(pyTop, pyBottom);
    pythonGroup.position.set(-2.1, -0.3, 0.3);
    orbitGroup.add(pythonGroup);

    // C. 3D UI/UX Layer Stack / Figma Gem
    const figmaGroup = new THREE.Group();
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xe11d48,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.5,
    });
    const layer1 = new THREE.Mesh(new THREE.OctahedronGeometry(0.26, 0), gemMat);
    figmaGroup.add(layer1);
    figmaGroup.position.set(0.3, 2.0, -0.3);
    orbitGroup.add(figmaGroup);

    // D. 3D AI Spark / Diamond Crystal
    const aiGroup = new THREE.Group();
    const aiMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      wireframe: true,
    });
    const aiCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), aiMat);
    aiGroup.add(aiCrystal);
    aiGroup.position.set(-0.5, -2.0, 0.2);
    orbitGroup.add(aiGroup);

    // E. Outer Particle Ring
    const particleCount = 150;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.8;
      particlePos[i] = Math.cos(angle) * radius;
      particlePos[i + 1] = (Math.random() - 0.5) * 0.8;
      particlePos[i + 2] = Math.sin(angle) * radius;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: new THREE.Color("#e879f9"),
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleRing = new THREE.Points(particleGeo, particleMat);
    orbitGroup.add(particleRing);

    // 5. Interactive Mouse Physics & Lerp
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };
    let isHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotation.x = y * 0.6;
      targetRotation.y = x * 0.6;
    };

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => {
      isHovered = false;
      targetRotation.x = 0;
      targetRotation.y = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // 6. Animation Loop & Organic Morphing Vertex Distortion
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Organic Glass Morphing Blob Effect
      const positions = positionAttribute.array as Float32Array;
      const origs = originalPositions.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const vx = origs[i];
        const vy = origs[i + 1];
        const vz = origs[i + 2];

        // Per-vertex sine distortion
        const wave = Math.sin(vx * 3 + elapsedTime * 2) * 0.08 +
                     Math.cos(vy * 3 + elapsedTime * 2) * 0.08 +
                     Math.sin(vz * 3 + elapsedTime * 2) * 0.08;

        positions[i] = vx + vx * wave;
        positions[i + 1] = vy + vy * wave;
        positions[i + 2] = vz + vz * wave;
      }
      positionAttribute.needsUpdate = true;
      blobGeo.computeVertexNormals();

      // Smooth Cursor Rotations
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

      // Group & Object Animations
      scene.rotation.x = currentRotation.x;
      scene.rotation.y = currentRotation.y;

      glassBlob.rotation.y = elapsedTime * 0.15;
      innerWire.rotation.x = -elapsedTime * 0.3;
      innerWire.rotation.y = -elapsedTime * 0.2;

      // Orbiting 3D Icons Rotation
      orbitGroup.rotation.y = elapsedTime * 0.35;
      reactGroup.rotation.y = elapsedTime * 1.2;
      pythonGroup.rotation.z = elapsedTime * 0.8;
      figmaGroup.rotation.x = elapsedTime * 0.9;
      aiCrystal.rotation.y = elapsedTime * 1.5;

      // Scale Pulse on Mouse Hover
      const targetScale = isHovered ? 1.12 : 1.0;
      glassBlob.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center pointer-events-auto cursor-pointer group select-none">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute w-72 h-72 bg-gradient-to-r from-purple-600/25 via-pink-500/35 to-sky-500/25 rounded-full blur-3xl opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none" />

      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-[360px] h-[360px] max-w-[85vw] max-h-[85vw] relative z-10"
      />
    </div>
  );
};

export default TechOrbit3D;
