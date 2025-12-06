"use client";
import { useRef, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, PlayCircle } from "lucide-react";

// --- 3D IMPORTS ---
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// --- 1. MOBILE CHECK HOOK ---
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

// --- INDIVIDUAL 3D MODEL COMPONENT ---
function FloatingModel({ url, position, rotation, scale = 0.6, mousePos }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url) as any;

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // --- RESTRICTED MOVEMENT LOGIC ---
    const targetX = rotation[0] + (mousePos.y * 0.1); 
    const targetY = rotation[1] + (mousePos.x * 0.1);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0} 
      floatIntensity={1}    
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={meshRef} position={position} scale={scale} rotation={rotation}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

// --- THE 3D CANVAS LAYER ---
const FloatingIconsCanvas = ({ mousePos, isMobile }: { mousePos: { x: number, y: number }, isMobile: boolean }) => {
  return (
    <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 35 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#B9935B" />
        <spotLight position={[-10, -10, 10]} angle={0.5} penumbra={1} intensity={1} color="#ffffff" />
        <Environment preset="city" />

        <Suspense fallback={null}>
          {/* 1. Top Left (Instagram) */}
          <FloatingModel 
            url="/models/insta.glb" 
            position={isMobile ? [-1.8, 2.9, 0] : [-5, 2.5, 0]} 
            rotation={[0, -Math.PI / 2, 0]} 
            scale={isMobile ? 0.4 : 0.6} 
            mousePos={mousePos}
          />

          {/* 2. Top Right (Youtube) */}
          <FloatingModel 
            url="/models/youtube.glb" 
            position={isMobile ? [1.8, 3.5, -2] : [5, 3, -2]} 
            rotation={[0, -Math.PI / 2, 0]} 
            scale={isMobile ? 0.4 : 0.6} 
            mousePos={mousePos}
          />

          {/* 3. Bottom Left (TikTok) */}
          <FloatingModel 
            url="/models/tiktok.glb" 
            position={isMobile ? [-1, -3.5, 2] : [-4, -3, 2]} 
            rotation={[0, 0, 0]} 
            scale={isMobile ? 0.36 : 0.5} 
            mousePos={mousePos}
          />

          {/* 4. Bottom Right (Facebook) */}
          <FloatingModel 
            url="/models/fb.glb" 
            position={isMobile ? [1.5,-3.8, 0] : [5, -2, 0]} 
            rotation={[0, -Math.PI / 2, 0]} 
            scale={isMobile ? 0.45 : 0.6} 
            mousePos={mousePos}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};


function HeroSection() {
  const container = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // --- USE THE HOOK ---
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Badge Reveal
    tl.from(".hero-badge", {
      y: -20,
      opacity: 0,
      duration: 1,
      delay: 0.2,
    })
    // 2. Main Title Stagger
    .from(".hero-line", {
      yPercent: 100,
      opacity: 0,
      rotateX: 10,
      stagger: 0.15,
      duration: 1.2,
      ease: "power4.out",
    }, "-=0.5")
    // 3. Subtext & Button
    .from(".hero-fade-up", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
    }, "-=0.8");

  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* =========================================
          BACKGROUND LAYER (VIDEO)
      ========================================= */}
      <div className="absolute inset-0 z-0 opacity-40">
        <video
          className="w-full h-full object-cover "
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/herovideo.mp4" type="video/mp4" />
        </video>
        {/* Overlay Gradient to make text readable */}
        <div className="absolute inset-0 "></div>
      </div>

      {/* =========================================
          3D ICONS LAYER
      ========================================= */}
      <FloatingIconsCanvas mousePos={mousePos} isMobile={isMobile} />

      {/* =========================================
          CONTENT LAYER
      ========================================= */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 flex flex-col items-center text-center">
        
        

        {/* Cinematic Headline - SIZING REDUCED HERE */}
        <div className="max-w-5xl mx-auto w-full">
            <h1 
              className="flex flex-col items-center justify-center font-black leading-[0.9] tracking-tighter mb-8 md:mb-10"
              style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }}
            >
              {/* LINE 1: WHITE */}
              <div className="overflow-hidden">
                <span className="hero-line block text-white text-[9vw] md:text-[5vw] drop-shadow-2xl">
                  STOP WASTING
                </span>
              </div>
              
              {/* LINE 2: GOLD & GLOWING */}
              <div className="overflow-hidden">
                  <span className="hero-line block text-[#B9935B] text-[9vw] md:text-[5vw] drop-shadow-[0_0_35px_rgba(185,147,91,0.4)]">
                    MONEY ON
                  </span>
              </div>

              {/* LINE 3: HOLLOW / STROKED */}
              <div className="overflow-hidden">
                  <span 
                    className="hero-line block text-transparent text-[9vw] md:text-[5vw] [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:1px_rgba(255,255,255,0.8)] opacity-60"
                  >
                    BAD MARKETING
                  </span>
              </div>
            </h1>
        </div>

        {/* Description */}
        <p className="hero-fade-up text-sm md:text-base text-gray-400 max-w-[80%] md:max-w-xl leading-relaxed mb-10 font-mono uppercase tracking-widest border-l-2 border-[#B9935B] pl-4 md:pl-6 text-left md:text-center md:border-l-0 md:border-t-2 md:pt-6">
          We combine cinematic visuals with data-driven strategies to convert your ad spend into measurable profit.
        </p>

        {/* Magnetic Button Group */}
        <div className="hero-fade-up flex flex-col md:flex-row gap-6 items-center">
            
            {/* Main CTA */}
            <Link 
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-[#B9935B] text-black overflow-hidden transition-all duration-300 hover:bg-white"
            >
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
               <span 
                 className="relative z-10 font-bold text-xs md:text-sm uppercase tracking-widest"
                 style={{ fontFamily: "Druk Wide Cy Web Bold Regular" }} 
               >
                 Start Growth
               </span>
               <ArrowRight className="relative z-10 w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA */}
            <button className="group flex items-center gap-3 text-white/70 hover:text-[#B9935B] transition-colors uppercase text-[10px] md:text-xs font-bold tracking-widest">
                <PlayCircle className="w-8 h-8 md:w-10 md:h-10 stroke-1 group-hover:scale-110 transition-transform" />
                <span>Watch <br/> Showreel</span>
            </button>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;