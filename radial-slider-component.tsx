import React, { useRef, useState, useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";

interface RadialSliderProps {
  value: number;
  onChange: (value: number) => void;
  maxValue?: number;
}

export const RadialSlider = ({
  onChange,
  maxValue = 100,
}: RadialSliderProps) => {
  const motionX = useMotionValue(0);
  const rotate = useMotionValue(0);
  const accumulatedRotation = useRef(0);
  const dragStartRotation = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateValue = (rotation: number) => {
    const snapAngle = 360 / maxValue;
    let normalizedRotation = rotation;
    normalizedRotation = ((normalizedRotation % 360) + 360) % 360;
    const nearestMultiple = Math.round(normalizedRotation / snapAngle) * snapAngle;
    const topIndex = (maxValue - nearestMultiple / snapAngle) % maxValue;
    onChange(Math.floor(topIndex));
  };

  useMotionValueEvent(motionX, "change", (latest) => {
    const newRotation = dragStartRotation.current + latest / 3;
    rotate.set(newRotation);
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      
      const wheelDelta = event.deltaY * 0.5;
      const currentRotation = rotate.get();
      const newRotation = currentRotation + wheelDelta;
      
      rotate.set(newRotation);
      accumulatedRotation.current = newRotation;
      updateValue(newRotation);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [maxValue, onChange, rotate]);

  return (
    <motion.div
      ref={containerRef}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      onDragStart={() => {
        dragStartRotation.current = accumulatedRotation.current;
        motionX.set(0);
      }}
      onDrag={(event, info) => {
        motionX.set(info.offset.x);
        const currentRotation = dragStartRotation.current + info.offset.x / 3;
        updateValue(currentRotation);
      }}
      onDragEnd={() => {
        const currentRotation = rotate.get();

        const snapAngle = 360 / maxValue;
        let normalizedRotation = currentRotation;
        normalizedRotation = ((normalizedRotation % 360) + 360) % 360;
        const nearestMultiple =
          Math.round(normalizedRotation / snapAngle) * snapAngle;

        const fullRotations = Math.floor(currentRotation / 360) * 360;
        const finalRotation = fullRotations + nearestMultiple;

        accumulatedRotation.current = finalRotation;

        animate(rotate, finalRotation, {
          type: "spring",
          stiffness: 300,
          damping: 30,
        });
      }}
      style={{ rotate }}
      className="radial-slider-wheel"
    >
      {Array.from({ length: maxValue }).map((_, i) => (
        <div
          key={i}
          data-index={i}
          className="radial-slider-tick"
          style={{
            transform: `rotate(${i * (360 / maxValue)}deg)`,
          }}
        >
          <div className="radial-slider-tick-line" />
        </div>
      ))}
    </motion.div>
  );
};
