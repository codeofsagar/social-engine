// src/components/GlobalAnimatedBackground.tsx
"use client";

import { useId, useEffect, useRef } from "react";
import { useMotionValue, animate } from "framer-motion";

export function GlobalAnimatedBackground() {
  const id = useId().replace(/:/g, "");
  const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
  const hueRotateMotionValue = useMotionValue(180);
  
  // Animation configuration
  const animationConfig = { scale: 30, speed: 30 };
  const noiseConfig = { opacity: 0.1, scale: 0.5 };
  
  const displacementScale = mapRange(animationConfig.scale, 1, 100, 20, 100);
  const animationDuration = mapRange(animationConfig.speed, 1, 100, 1000, 50);

  useEffect(() => {
    if (feColorMatrixRef.current) {
      const hueRotateAnimation = animate(hueRotateMotionValue, 360, {
        duration: animationDuration / 1000,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        onUpdate: (value) => {
          if (feColorMatrixRef.current) {
            feColorMatrixRef.current.setAttribute("values", String(value));
          }
        }
      });

      return () => hueRotateAnimation.stop();
    }
  }, [animationDuration, hueRotateMotionValue]);

  function mapRange(
    value: number,
    fromLow: number,
    fromHigh: number,
    toLow: number,
    toHigh: number
  ): number {
    return toLow + ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow);
  }

  return (
    <div 
      className="fixed inset-0 overflow-hidden"
      style={{ 
        pointerEvents: "none",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -displacementScale,
          filter: `url(#${id})`
        }}
      >
        <svg style={{ position: "absolute" }}>
          <defs>
            <filter id={id}>
              <feTurbulence
                result="undulation"
                numOctaves="2"
                baseFrequency={`${mapRange(animationConfig.scale, 0, 100, 0.001, 0.005)},${mapRange(animationConfig.scale, 0, 100, 0.004, 0.02)}`}
                seed="0"
                type="turbulence"
              />
              <feColorMatrix
                ref={feColorMatrixRef}
                in="undulation"
                type="hueRotate"
                values="180"
              />
              <feColorMatrix
                in="dist"
                result="circulation"
                type="matrix"
                values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="circulation"
                scale={displacementScale}
                result="dist"
              />
              <feDisplacementMap
                in="dist"
                in2="undulation"
                scale={displacementScale}
                result="output"
              />
            </filter>
          </defs>
        </svg>
        <div
         style={{
            backgroundColor: "",
            maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
            maskSize: "cover",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            width: "100%",
            height: "100%" }}
        />
      </div>

      {noiseConfig.opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
            backgroundSize: noiseConfig.scale * 200,
            backgroundRepeat: "repeat",
            opacity: noiseConfig.opacity,
            mixBlendMode: "overlay"
          }}
        />
      )}
    </div>
  );
}