import * as THREE from "three";
import { mulberry32 } from "./layout";

/**
 * Small procedural canvas textures (no external image files). Greyscale-ish, so the
 * material colour tints them. Client-only: called from inside the lazily loaded scene.
 */

function canvasTexture(size: number, draw: (ctx: CanvasRenderingContext2D, size: number) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function speckle(ctx: CanvasRenderingContext2D, size: number, seed: number, amount: number) {
  const rand = mulberry32(seed);
  const img = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (rand() - 0.5) * amount;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
}

/** Rough tarmac. Tile with `repeat`. */
export function makeAsphalt(repeatX: number, repeatY: number) {
  const tex = canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = "#b8b8b8";
    ctx.fillRect(0, 0, s, s);
    speckle(ctx, s, 11, 70);
  });
  tex.repeat.set(repeatX, repeatY);
  return tex;
}

/** Asphalt with a dashed centre line; u runs along the road, v across it. */
export function makeRoad(repeatAlong: number) {
  const tex = canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = "#b8b8b8";
    ctx.fillRect(0, 0, s, s);
    speckle(ctx, s, 23, 70);
    ctx.fillStyle = "#f4e7c4";
    ctx.fillRect(0, s / 2 - 3, s / 2, 6); // dash occupies the first half of each tile
  });
  tex.repeat.set(repeatAlong, 1);
  return tex;
}

/** Paving slabs with joints. */
export function makePaving(repeatX: number, repeatY: number) {
  const tex = canvasTexture(256, (ctx, s) => {
    ctx.fillStyle = "#d4d4d4";
    ctx.fillRect(0, 0, s, s);
    speckle(ctx, s, 5, 34);
    ctx.strokeStyle = "rgba(0,0,0,0.38)";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, s, s);
    ctx.beginPath();
    ctx.moveTo(s / 2, 0);
    ctx.lineTo(s / 2, s);
    ctx.moveTo(0, s / 2);
    ctx.lineTo(s, s / 2);
    ctx.stroke();
  });
  tex.repeat.set(repeatX, repeatY);
  return tex;
}
