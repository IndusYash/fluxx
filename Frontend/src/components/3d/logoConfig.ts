import * as THREE from "three";

/**
 * 5 columns x 5 rows grid specification for the Flux logo:
 *
 * col:  0  1  2  3  4
 * r0:   A  .  B  B  B
 * r1:   .  C  .  .  .
 * r2:   D  .  .  E  E
 * r3:   .  .  F  .  .
 * r4:   G  G  .  .  .
 *
 * A: col 0, row 0, 1 wide    B: col 2, row 0, 3 wide    C: col 1, row 1, 1 wide
 * D: col 0, row 2, 1 wide    E: col 3, row 2, 2 wide    F: col 2, row 3, 1 wide
 * G: col 0, row 4, 2 wide
 */
export interface LogoBlockDef {
  id: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  col: number;
  row: number;
  width: number;
}

export const LOGO_BLOCK_TABLE: readonly LogoBlockDef[] = [
  { id: "A", col: 0, row: 0, width: 1 },
  { id: "B", col: 2, row: 0, width: 3 },
  { id: "C", col: 1, row: 1, width: 1 },
  { id: "D", col: 0, row: 2, width: 1 },
  { id: "E", col: 3, row: 2, width: 2 },
  { id: "F", col: 2, row: 3, width: 1 },
  { id: "G", col: 0, row: 4, width: 2 },
] as const;

export interface ComputedBlockLayout {
  id: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  col: number;
  row: number;
  width: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const LOGO_UNIT_SIZE = 0.64;

/**
 * Computes block centers and sizes from (col, row, width):
 *   x_center = (col + width/2 - 2.5) * u
 *   y_center = (2 - row) * u
 *   block size = (width * u - 0.04u) by (u - 0.04u)
 */
export function getLogoBlockLayout(u: number = LOGO_UNIT_SIZE): ComputedBlockLayout[] {
  return LOGO_BLOCK_TABLE.map((b) => ({
    id: b.id,
    col: b.col,
    row: b.row,
    width: b.width,
    x: (b.col + b.width / 2 - 2.5) * u,
    y: (2 - b.row) * u,
    w: b.width * u - 0.04 * u,
    h: u - 0.04 * u,
  }));
}

export const BLOCK_EXTRUDE_SETTINGS: THREE.ExtrudeGeometryOptions = {
  depth: 0.52,
  bevelEnabled: true,
  bevelSegments: 5,
  steps: 1,
  bevelSize: 0.045,
  bevelThickness: 0.055,
};

/**
 * Creates an extruded, beveled block mesh with centered local geometry.
 */
export function createBeveledBlock(
  w: number,
  h: number,
  x: number,
  y: number,
  material: THREE.Material,
  bevelR: number = 0.05
): THREE.Mesh {
  const shape = new THREE.Shape();
  const hw = w / 2;
  const hh = h / 2;
  const r = Math.min(bevelR, hw * 0.4, hh * 0.4);

  shape.moveTo(-hw + r, -hh);
  shape.lineTo(hw - r, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
  shape.lineTo(hw, hh - r);
  shape.quadraticCurveTo(hw, hh, hw - r, hh);
  shape.lineTo(-hw + r, hh);
  shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
  shape.lineTo(-hw, -hh + r);
  shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

  const geometry = new THREE.ExtrudeGeometry(shape, BLOCK_EXTRUDE_SETTINGS);
  geometry.center();

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, 0);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/**
 * Builds the inner group of 7 logo blocks with Box3 pivot centering at (0, 0, 0).
 */
export function buildLogoInnerGroup(
  u: number = LOGO_UNIT_SIZE,
  material: THREE.Material
): {
  logoInnerGroup: THREE.Group;
  blocks: THREE.Mesh[];
  layout: ComputedBlockLayout[];
} {
  const logoInnerGroup = new THREE.Group();
  const blocks: THREE.Mesh[] = [];
  const layout = getLogoBlockLayout(u);

  layout.forEach((b) => {
    const mesh = createBeveledBlock(b.w, b.h, b.x, b.y, material);
    mesh.name = `block_${b.id}`;
    logoInnerGroup.add(mesh);
    blocks.push(mesh);
  });

  // Box3 pivot centering: center placed precisely at (0, 0, 0)
  const logoBox = new THREE.Box3().setFromObject(logoInnerGroup);
  const logoCenter = new THREE.Vector3();
  logoBox.getCenter(logoCenter);
  logoInnerGroup.position.set(-logoCenter.x, -logoCenter.y, -logoCenter.z);

  return { logoInnerGroup, blocks, layout };
}

