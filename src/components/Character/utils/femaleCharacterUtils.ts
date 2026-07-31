import * as THREE from "three";

export function transformToFemaleCharacter(character: THREE.Object3D) {
  // Find hair node or head bone
  const hairNode =
    character.getObjectByName("hair") ||
    character.getObjectByName("Iron:pCube3.004");
  const headBone =
    character.getObjectByName("spine006") ||
    character.getObjectByName("spine.006");

  // Hide original male hair mesh geometry if present
  character.traverse((child) => {
    if (
      child.name.toLowerCase().includes("hair") ||
      child.name === "Iron:pCube3.004"
    ) {
      if ((child as THREE.Mesh).geometry) {
        child.visible = false;
      }
    }
  });

  // Target parent for female hair attachment
  const parentContainer = hairNode || headBone || character;

  // Material for Female Hair (Dark Warm Espresso Brown with glossy sheen)
  const hairMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#1f1412"),
    roughness: 0.35,
    metalness: 0.1,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
  });

  // Material for Hair Ribbon
  const ribbonMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#e84393"), // Stylish pink/magenta ribbon
    roughness: 0.3,
    metalness: 0.2,
  });

  // Material for Gold Earrings
  const earringMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#f1c40f"), // Bright Gold
    metalness: 0.9,
    roughness: 0.15,
  });

  const femaleHairGroup = new THREE.Group();
  femaleHairGroup.name = "FemaleHairGroup";

  if (hairNode) {
    // Local coordinate space relative to hairNode (scaled by ~10x in local model space)
    const hairCapGeo = new THREE.SphereGeometry(0.088, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const hairCapMesh = new THREE.Mesh(hairCapGeo, hairMaterial);
    hairCapMesh.scale.set(1.02, 1.08, 1.05);
    hairCapMesh.position.set(0, 0.015, -0.005);
    femaleHairGroup.add(hairCapMesh);

    const backHairGeo = new THREE.CylinderGeometry(0.085, 0.065, 0.25, 24);
    backHairGeo.translate(0, -0.12, 0);
    const backHairMesh = new THREE.Mesh(backHairGeo, hairMaterial);
    backHairMesh.position.set(0, 0.01, -0.045);
    backHairMesh.rotation.x = -0.15;
    femaleHairGroup.add(backHairMesh);

    const ponytailGeo = new THREE.CylinderGeometry(0.035, 0.015, 0.22, 16);
    ponytailGeo.translate(0, -0.11, 0);
    const ponytailMesh = new THREE.Mesh(ponytailGeo, hairMaterial);
    ponytailMesh.position.set(0, 0.04, -0.08);
    ponytailMesh.rotation.x = -0.35;
    femaleHairGroup.add(ponytailMesh);

    const ribbonGeo = new THREE.TorusGeometry(0.032, 0.008, 12, 24);
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMaterial);
    ribbonMesh.position.set(0, 0.04, -0.078);
    ribbonMesh.rotation.x = Math.PI / 2.2;
    femaleHairGroup.add(ribbonMesh);

    const lockGeoL = new THREE.CylinderGeometry(0.018, 0.006, 0.18, 12);
    lockGeoL.translate(0, -0.09, 0);
    const lockMeshL = new THREE.Mesh(lockGeoL, hairMaterial);
    lockMeshL.position.set(0.065, 0.02, 0.04);
    lockMeshL.rotation.z = -0.15;
    lockMeshL.rotation.x = 0.1;
    femaleHairGroup.add(lockMeshL);

    const lockMeshR = new THREE.Mesh(lockGeoL, hairMaterial);
    lockMeshR.position.set(-0.065, 0.02, 0.04);
    lockMeshR.rotation.z = 0.15;
    lockMeshR.rotation.x = 0.1;
    femaleHairGroup.add(lockMeshR);

    const earringGeo = new THREE.TorusGeometry(0.018, 0.0035, 12, 24);
    const earringL = new THREE.Mesh(earringGeo, earringMaterial);
    earringL.position.set(0.078, -0.025, 0.01);
    earringL.rotation.y = Math.PI / 2;
    femaleHairGroup.add(earringL);

    const earringR = new THREE.Mesh(earringGeo, earringMaterial);
    earringR.position.set(-0.078, -0.025, 0.01);
    earringR.rotation.y = Math.PI / 2;
    femaleHairGroup.add(earringR);
  } else {
    // World space relative to head bone
    const hairCapGeo = new THREE.SphereGeometry(0.88, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const hairCapMesh = new THREE.Mesh(hairCapGeo, hairMaterial);
    hairCapMesh.scale.set(1.02, 1.08, 1.05);
    hairCapMesh.position.set(0, 0.15, -0.05);
    femaleHairGroup.add(hairCapMesh);

    const backHairGeo = new THREE.CylinderGeometry(0.85, 0.65, 2.5, 24);
    backHairGeo.translate(0, -1.2, 0);
    const backHairMesh = new THREE.Mesh(backHairGeo, hairMaterial);
    backHairMesh.position.set(0, 0.1, -0.45);
    backHairMesh.rotation.x = -0.15;
    femaleHairGroup.add(backHairMesh);

    const ponytailGeo = new THREE.CylinderGeometry(0.35, 0.15, 2.2, 16);
    ponytailGeo.translate(0, -1.1, 0);
    const ponytailMesh = new THREE.Mesh(ponytailGeo, hairMaterial);
    ponytailMesh.position.set(0, 0.4, -0.8);
    ponytailMesh.rotation.x = -0.35;
    femaleHairGroup.add(ponytailMesh);

    const ribbonGeo = new THREE.TorusGeometry(0.32, 0.08, 12, 24);
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMaterial);
    ribbonMesh.position.set(0, 0.4, -0.78);
    ribbonMesh.rotation.x = Math.PI / 2.2;
    femaleHairGroup.add(ribbonMesh);

    const earringGeo = new THREE.TorusGeometry(0.18, 0.035, 12, 24);
    const earringL = new THREE.Mesh(earringGeo, earringMaterial);
    earringL.position.set(0.78, -0.25, 0.1);
    earringL.rotation.y = Math.PI / 2;
    femaleHairGroup.add(earringL);

    const earringR = new THREE.Mesh(earringGeo, earringMaterial);
    earringR.position.set(-0.78, -0.25, 0.1);
    earringR.rotation.y = Math.PI / 2;
    femaleHairGroup.add(earringR);
  }

  parentContainer.add(femaleHairGroup);

  // Safely mutate materials in-place to preserve WebGL SkinnedMesh shaders
  const faceMesh = character.getObjectByName("Face.002") as THREE.Mesh;
  if (faceMesh && faceMesh.material) {
    const mat = faceMesh.material as THREE.MeshStandardMaterial;
    if (mat.color) mat.color.set("#f8d7c7"); // Soft warm peach skin tone
  }

  ["Neck", "Hand"].forEach((name) => {
    const mesh = character.getObjectByName(name) as THREE.Mesh;
    if (mesh && mesh.material) {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat.color) mat.color.set("#f8d7c7");
    }
  });

  const shirtMesh = character.getObjectByName("BODY.SHIRT") as THREE.Mesh;
  if (shirtMesh && shirtMesh.material) {
    const mat = shirtMesh.material as THREE.MeshStandardMaterial;
    if (mat.color) mat.color.set("#6c5ce7"); // Vibrant purple top
  }

  const pantMesh = character.getObjectByName("Pant") as THREE.Mesh;
  if (pantMesh && pantMesh.material) {
    const mat = pantMesh.material as THREE.MeshStandardMaterial;
    if (mat.color) mat.color.set("#2d3436");
  }

  const shoeMesh = character.getObjectByName("Shoe") as THREE.Mesh;
  if (shoeMesh && shoeMesh.material) {
    const mat = shoeMesh.material as THREE.MeshStandardMaterial;
    if (mat.color) mat.color.set("#fd79a8");
  }

  // Adjust Bust/Silhouette
  const breastL = character.getObjectByName("breastL") || character.getObjectByName("breast.L");
  const breastR = character.getObjectByName("breastR") || character.getObjectByName("breast.R");
  if (breastL) breastL.scale.set(1.3, 1.3, 1.3);
  if (breastR) breastR.scale.set(1.3, 1.3, 1.3);
}

