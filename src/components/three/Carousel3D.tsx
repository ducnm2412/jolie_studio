"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { photos } from "@/data/photos";
import { concepts } from "@/data/site";

// Mỗi concept lấy 2 ảnh để xếp thành vòng tròn 3D
const items = Object.keys(concepts)
  .filter((c) => c !== "lookbook")
  .flatMap((c) => photos.filter((p) => p.concept === c).slice(0, 2));

export default function Carousel3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = mount.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xece6dc, 20, 42);
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 1.5, 25);
    camera.lookAt(0, -1.2, 0);

    const ring = new THREE.Group();
    scene.add(ring);
    const n = items.length;
    const radius = 13;
    const loader = new THREE.TextureLoader();
    const geo = new THREE.PlaneGeometry(2.6, 3.9);
    const meshes = items.map((p, i) => {
      const tex = loader.load(p.src);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
      const m = new THREE.Mesh(geo, mat);
      const a = (i / n) * Math.PI * 2;
      m.position.set(Math.sin(a) * radius, 0, Math.cos(a) * radius);
      m.rotation.y = a;
      ring.add(m);
      return m;
    });

    let rot = 0;
    let vel = 0.0007;
    let dragging = false;
    let lastX = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      vel = (e.clientX - lastX) * 0.0009;
      lastX = e.clientX;
    };
    const up = () => (dragging = false);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.position.z = w < 640 ? 23 : 22;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    let lastActive = -1;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      if (!dragging) vel += (0.0007 - vel) * 0.03;
      rot += vel;
      ring.rotation.y = rot;
      ring.position.y = Math.sin(t / 1400) * 0.12;
      // Ảnh nằm phía trước được phóng to nhẹ
      let best = 0;
      let bestZ = -Infinity;
      meshes.forEach((m, i) => {
        const z = Math.cos((i / n) * Math.PI * 2 + rot);
        const s = 1 + Math.max(0, z) ** 6 * 0.18;
        m.scale.setScalar(s);
        if (z > bestZ) {
          bestZ = z;
          best = i;
        }
      });
      if (best !== lastActive) {
        lastActive = best;
        setActive(best);
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      geo.dispose();
      ring.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          (o.material as THREE.MeshBasicMaterial).map?.dispose();
          o.material.dispose();
        }
      });
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={mount} className="h-[340px] w-full cursor-grab touch-pan-y active:cursor-grabbing md:h-[620px]" />
      <p className="pointer-events-none mt-2 text-center font-serif text-3xl italic">
        {concepts[items[active].concept]}
      </p>
    </div>
  );
}
