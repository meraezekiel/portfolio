import { useCallback, useEffect, useRef } from 'react';

const HEAD_NAMES = ['Head', 'head', 'HEAD', 'Avatar', 'Character', 'Face'];
const EYE_NAMES = [
  'Eye', 'eye', 'Eyes', 'eyes',
  'Left Eye', 'Right Eye', 'EyeL', 'EyeR', 'eye_l', 'eye_r',
  'LeftEye', 'RightEye',
];

const HEAD_MAX_RAD = 0.35;
const EYE_MAX_RAD = 0.18;
const LERP = 0.12;
const SETTLE = 0.0005;

const findFirst = (spline, names) => {
  for (const name of names) {
    const obj = spline.findObjectByName(name);
    if (obj) return obj;
  }
  return null;
};

const findAll = (spline, names) => {
  const seen = new Set();
  const found = [];
  for (const name of names) {
    const obj = spline.findObjectByName(name);
    if (obj && !seen.has(obj.uuid ?? obj.id ?? name)) {
      seen.add(obj.uuid ?? obj.id ?? name);
      found.push(obj);
    }
  }
  return found;
};

export const useSplineCursorTrackingHandler = (visibleRef) => {
  const splineRef = useRef(null);
  const headRef = useRef(null);
  const eyesRef = useRef([]);
  const baseRotationsRef = useRef(new Map());
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  const handleSplineLoad = useCallback((spline) => {
    splineRef.current = spline;
    const head = findFirst(spline, HEAD_NAMES);
    const eyes = findAll(spline, EYE_NAMES);

    headRef.current = head;
    eyesRef.current = eyes;

    [head, ...eyes].filter(Boolean).forEach((obj) => {
      baseRotationsRef.current.set(obj, {
        x: obj.rotation?.x ?? 0,
        y: obj.rotation?.y ?? 0,
        z: obj.rotation?.z ?? 0,
      });
    });

    if (process.env.NODE_ENV !== 'production') {
      const allObjects = spline._scene?.children?.map((c) => c.name).filter(Boolean) ?? [];
      // eslint-disable-next-line no-console
      console.groupCollapsed('[Spline cursor tracking]');
      // eslint-disable-next-line no-console
      console.log('Scene root objects:', allObjects);
      // eslint-disable-next-line no-console
      console.log('Head matched:', head?.name ?? 'NONE — try adding the actual name to HEAD_NAMES');
      // eslint-disable-next-line no-console
      console.log('Eyes matched:', eyes.map((e) => e.name).join(', ') || 'NONE — try adding actual names to EYE_NAMES');
      // eslint-disable-next-line no-console
      console.groupEnd();
    }
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const tick = () => {
      const target = targetRef.current;
      currentRef.current.x += (target.x - currentRef.current.x) * LERP;
      currentRef.current.y += (target.y - currentRef.current.y) * LERP;

      const { x, y } = currentRef.current;
      const head = headRef.current;
      if (head?.rotation) {
        const base = baseRotationsRef.current.get(head) ?? { x: 0, y: 0, z: 0 };
        head.rotation.y = base.y + x * HEAD_MAX_RAD;
        head.rotation.x = base.x + y * HEAD_MAX_RAD * 0.5;
      }

      eyesRef.current.forEach((eye) => {
        if (!eye?.rotation) return;
        const base = baseRotationsRef.current.get(eye) ?? { x: 0, y: 0, z: 0 };
        eye.rotation.y = base.y + x * EYE_MAX_RAD;
        eye.rotation.x = base.x + y * EYE_MAX_RAD;
      });

      // Stop the loop once the head has caught up; the next mousemove restarts it.
      const settled = Math.abs(target.x - x) < SETTLE && Math.abs(target.y - y) < SETTLE;
      frameRef.current = settled ? null : requestAnimationFrame(tick);
    };

    const handleMove = (e) => {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      const hasTargets = headRef.current || eyesRef.current.length > 0;
      if (frameRef.current === null && visibleRef.current && hasTargets) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };
    window.addEventListener('mousemove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [visibleRef]);

  return { handleSplineLoad };
};
