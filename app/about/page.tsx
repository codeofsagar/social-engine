"use client";

import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Brain,
  Zap,
  Shield,
  Cpu,
  BarChart3,
  Users,
  Globe,
  TrendingUp,
  Clock,
  Sparkles,
  Rocket,
  Layers
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const fonts = {
  header: "'Kanit', sans-serif",
  mono: "'IBM Plex Mono', monospace",
  body: "'Inter', sans-serif"
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ✅ Hydration-safe particles */
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 61) % 100}%`,
        delay: `${(i % 5) * 0.3}s`
      })),
    []
  );

  useGSAP(
    () => {
      /* Parallax layers */
      gsap.utils.toArray(".parallax-layer").forEach((layer: any, i) => {
        gsap.to(layer, {
          yPercent: -15 * (i + 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      /* Hero text */
      gsap.utils.toArray(".hero-text").forEach((el: any, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.25,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%"
            }
          }
        );
      });

      /* Paragraph reveal */
      gsap.utils.toArray(".text-reveal").forEach((el: any) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%"
            }
          }
        );
      });

      /* Count up stats */
      gsap.utils.toArray(".count-stat").forEach((el: any) => {
        const value = Number(el.dataset.value || 0);
        const suffix = el.dataset.suffix || "";

        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: value,
            duration: 2,
            ease: "power3.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%"
            },
            onUpdate() {
              el.textContent =
                Math.floor(Number(el.textContent)) + suffix;
            }
          }
        );
      });

      /* Card hover */
      gsap.utils.toArray(".feature-card").forEach((card: any) => {
        const enter = () =>
          gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
        const leave = () =>
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0F0F0F] text-white"
      style={{ fontFamily: fonts.body }}
    >
      {/* Background layers */}
      <div className="parallax-layer absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(185,147,91,0.1),transparent_50%)]" />
      </div>

      <div className="parallax-layer absolute inset-0 z-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#B9935B] rounded-full"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay
            }}
          />
        ))}
      </div>

      {/* Hero Section - More Compact */} 
      <section className="relative min-h-[75vh] flex items-center z-10 pt-8 md:pt-20"> 
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 mt-10"> 
          <div className="max-w-5xl mx-auto text-center"> 
            <span className="inline-block text-sm uppercase text-[#B9935B]/70 mb-4 px-4 py-1 border border-[#B9935B]/20 rounded-full" style={{ fontFamily: fonts.mono }}> 
              AP Agency • Since 2018 
            </span> 
           <h1 className="hero-text text-[11vw] lg:text-[7vw] font-black uppercase mb-4 leading-[0.9]"
    style={{ fontFamily: fonts.header }}>
 
              <span className="text-white">Revenue</span> 
              <span className="block text-[#B9935B] ">Engineering</span> 
              <span className="block text-white/80 text-[8vw] lg:text-[5vw] ">Precision</span> 
            </h1> 
            <p className="hero-text max-w-2xl mx-auto text-lg text-white/70 mb-8 leading-relaxed text-reveal"> 
              We&apos;ve engineered a new paradigm in digital marketing where every campaign is a precision instrument, every decision is data-driven, and every result is mathematically guaranteed. Our systems transform ad spend into predictable profit, eliminating guesswork and maximizing ROI through advanced algorithms and machine learning. 
            </p> 
            <div className="flex flex-wrap justify-center gap-6 mb-8"> 
              <div className="flex items-center gap-2 text-sm text-white/60"> 
                <Sparkles className="w-4 h-4 text-[#B9935B]" /> 
                <span>500+ Campaigns</span> 
              </div> 
              <div className="flex items-center gap-2 text-sm text-white/60"> 
                <TrendingUp className="w-4 h-4 text-[#B9935B]" /> 
                <span>3.5x Average ROI</span> 
              </div> 
              <div className="flex items-center gap-2 text-sm text-white/60"> 
                <Shield className="w-4 h-4 text-[#B9935B]" /> 
                <span>97% Client Retention</span> 
              </div> 
            </div> 
          </div> 
        </div> 
      </section> 

      {/* Mission Section - Compact */} 
      <section className="relative py-16 md:py-20 z-10"> 
        <div className="container mx-auto px-4 md:px-6 lg:px-8"> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"> 
            <div> 
              <div className="flex items-center gap-3 mb-6"> 
                <div className="w-8 h-0.5 bg-gradient-to-r from-[#B9935B] to-transparent"></div> 
                <span className="text-sm uppercase tracking-widest text-[#B9935B]" style={{ fontFamily: fonts.mono }}>Our Mission</span> 
              </div> 
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 leading-tight" style={{ fontFamily: fonts.header }}> 
                Eliminating Marketing<br /> 
                <span className="text-[#B9935B]">Uncertainty</span> 
              </h2> 
              <div className="space-y-4 text-reveal"> 
                <p className="text-white/70"> 
                  Traditional marketing operates on hope and guesswork. We operate on mathematics and machine intelligence. Our mission is to eradicate uncertainty from digital advertising by building systems that predict, optimize, and scale with precision. 
                </p> 
                <p className="text-white/70"> 
                  We&apos;ve analyzed over $50M in ad spend across 500+ campaigns to develop proprietary algorithms that identify winning patterns, predict audience behavior, and optimize bids in real-time. This isn&apos;t marketing—it&apos;s revenue engineering. 
                </p> 
                <p className="text-white/70"> 
                  Our Toronto-based team of data scientists, AI specialists, and growth hackers work around the clock to ensure your campaigns don&apos;t just perform—they dominate. 
                </p> 
              </div> 
            </div> 
            <div className="grid grid-cols-2 gap-6"> 
              {[ 
                { value: "500", suffix: "+", label: "Campaigns Engineered", icon: Rocket }, 
                { value: "3.5", suffix: "x", label: "Average ROI Multiplier", icon: TrendingUp }, 
                { value: "97", suffix: "%", label: "Client Retention Rate", icon: Users }, 
                { value: "24", suffix: "/7", label: "Real-Time Monitoring", icon: Clock } 
              ].map((stat, index) => ( 
                <div key={index} className="feature-card bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#B9935B]/15 rounded-xl p-6 hover:border-[#B9935B]/30 transition-all duration-300"> 
                  <stat.icon className="w-8 h-8 text-[#B9935B] mb-4" /> 
                  <div className="text-3xl font-black text-white mb-2" style={{ fontFamily: fonts.mono }}> 
                    <span className="count-stat" data-value={stat.value} data-suffix={stat.suffix}>0</span> 
                  </div> 
                  <p className="text-xs uppercase tracking-wider text-white/50" style={{ fontFamily: fonts.mono }}>{stat.label}</p> 
                </div> 
              ))} 
            </div> 
          </div> 
        </div> 
      </section> 

      {/* Methodology Section - More Content */} 
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-transparent via-[#0A0A0A]/30 to-transparent z-10"> 
        <div className="container mx-auto px-4 md:px-6 lg:px-8"> 
          <div className="text-center mb-12"> 
            <div className="inline-flex items-center gap-3 mb-4"> 
              <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-[#B9935B] to-transparent"></div> 
              <span className="text-sm uppercase tracking-widest text-[#B9935B]" style={{ fontFamily: fonts.mono }}>Our Methodology</span> 
              <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-[#B9935B] to-transparent"></div> 
            </div> 
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 leading-tight" style={{ fontFamily: fonts.header }}> 
              The Science Behind<br /> 
              <span className="text-[#B9935B]">Our Success</span> 
            </h2> 
            <p className="text-white/70 max-w-2xl mx-auto text-reveal"> 
              We combine cutting-edge technology with battle-tested strategies to deliver predictable results. Here&apos;s how we engineer revenue growth for our clients. 
            </p> 
          </div> 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
            {[ 
              { icon: Brain, title: "AI-Powered Analysis", description: "Our proprietary AI models analyze millions of data points to identify winning patterns, predict audience behavior, and optimize ad performance in real-time. We don't just react to data—we anticipate it.", features: ["Predictive Analytics", "Behavior Modeling", "Real-Time Optimization"] }, 
              { icon: Target, title: "Precision Targeting", description: "We drill down to atomic-level targeting using psychographic profiling, intent signals, and behavioral data. Our systems identify and reach your ideal customers when they're most likely to convert.", features: ["Psychographic Profiling", "Intent-Based Targeting", "Lookalike Expansion"] }, 
              { icon: Layers, title: "Omni-Channel Orchestration", description: "We coordinate campaigns across all platforms—Meta, Google, TikTok, LinkedIn—creating a unified customer journey that maximizes touchpoints and minimizes ad fatigue.", features: ["Cross-Platform Sync", "Journey Optimization", "Frequency Management"] } 
            ].map((item, index) => ( 
              <div key={index} className="feature-card bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#B9935B]/15 rounded-xl p-6 hover:border-[#B9935B]/30 transition-all duration-300 h-full"> 
                <div className="w-12 h-12 bg-[#B9935B]/10 rounded-lg flex items-center justify-center mb-6"> 
                  <item.icon className="w-6 h-6 text-[#B9935B]" /> 
                </div> 
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: fonts.header }}>{item.title}</h3> 
                <p className="text-white/70 text-sm mb-6 leading-relaxed text-reveal">{item.description}</p> 
                <div className="space-y-2"> 
                  {item.features.map((feature, idx) => ( 
                    <div key={idx} className="flex items-center gap-2 text-xs text-white/50"> 
                      <div className="w-1.5 h-1.5 bg-[#B9935B] rounded-full"></div> 
                      <span>{feature}</span> 
                    </div> 
                  ))} 
                </div> 
              </div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* Technology Stack */} 
      <section className="relative py-16 md:py-20 z-10"> 
        <div className="container mx-auto px-4 md:px-6 lg:px-8"> 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"> 
            <div> 
              <div className="flex items-center gap-3 mb-6"> 
                <div className="w-8 h-0.5 bg-gradient-to-r from-[#B9935B] to-transparent"></div> 
                <span className="text-sm uppercase tracking-widest text-[#B9935B]" style={{ fontFamily: fonts.mono }}>Our Technology</span> 
              </div> 
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 leading-tight" style={{ fontFamily: fonts.header }}> 
                Built On<br /> 
                <span className="text-[#B9935B]">Cutting-Edge AI</span> 
              </h2> 
              <div className="space-y-4 text-reveal"> 
                <p className="text-white/70"> 
                  We&apos;ve invested millions in developing proprietary technology that gives our clients a competitive edge. Our platform combines machine learning algorithms with real-time data processing to deliver insights traditional tools can&apos;t match. 
                </p> 
                <p className="text-white/70"> 
                  From predictive bidding algorithms to automated creative optimization, our technology stack is designed to eliminate human error and maximize efficiency. We process over 100,000 data points per second to make micro-optimizations that add up to massive results. 
                </p> 
              </div> 
              <div className="mt-8 grid grid-cols-2 gap-4"> 
                {[ 
                  { label: "Real-Time Analytics", value: "100K/sec" }, 
                  { label: "Model Accuracy", value: "94.7%" }, 
                  { label: "Optimization Cycles", value: "Daily" }, 
                  { label: "Data Sources", value: "15+" } 
                ].map((item, index) => ( 
                  <div key={index} className="bg-[#1A1A1A] border border-[#B9935B]/10 rounded-lg p-4"> 
                    <div className="text-2xl font-black text-[#B9935B] mb-1" style={{ fontFamily: fonts.mono }}>{item.value}</div> 
                    <p className="text-xs uppercase tracking-wider text-white/50">{item.label}</p> 
                  </div> 
                ))} 
              </div> 
            </div> 
            <div className="grid grid-cols-2 gap-6"> 
              {[ 
                { icon: Cpu, title: "Machine Learning Core", desc: "Advanced neural networks for pattern recognition and prediction" }, 
                { icon: Zap, title: "Automated Optimization", desc: "Real-time bid and budget adjustment algorithms" }, 
                { icon: BarChart3, title: "Predictive Analytics", desc: "Forecasting models for campaign performance" }, 
                { icon: Globe, title: "Multi-Platform Integration", desc: "Unified dashboard across all advertising platforms" } 
              ].map((tech, index) => ( 
                <div key={index} className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#B9935B]/10 rounded-xl p-5 hover:border-[#B9935B]/25 transition-all duration-300"> 
                  <div className="w-10 h-10 bg-[#B9935B]/10 rounded-lg flex items-center justify-center mb-4"> 
                    <tech.icon className="w-5 h-5 text-[#B9935B]" /> 
                  </div> 
                  <h4 className="text-sm font-bold text-white mb-2">{tech.title}</h4> 
                  <p className="text-xs text-white/50 leading-relaxed">{tech.desc}</p> 
                </div> 
              ))} 
            </div> 
          </div> 
        </div> 
      </section> 

      {/* Why Choose Us */} 
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-transparent via-[#0A0A0A]/30 to-transparent z-10"> 
        <div className="container mx-auto px-4 md:px-6 lg:px-8"> 
          <div className="text-center mb-12"> 
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight" style={{ fontFamily: fonts.header }}> 
              Why <span className="text-[#B9935B]">AP Agency</span> 
            </h2> 
            <p className="text-white/70 max-w-2xl mx-auto text-reveal"> 
              In a sea of marketing agencies, we stand apart through our commitment to engineering rather than guessing. 
            </p> 
          </div> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"> 
            {[ 
              { title: "No More Guesswork", description: "While other agencies rely on intuition, we rely on data. Every decision is backed by statistical significance and predictive modeling." }, 
              { title: "Full Transparency", description: "Complete access to dashboards, metrics, and performance data. No black boxes—just clear, actionable insights." }, 
              { title: "Scalable Systems", description: "Our infrastructure scales with your growth. From startups to enterprises, our systems adapt to your needs." }, 
              { title: "Continuous Innovation", description: "We reinvest 20% of profits into R&D to ensure our clients always have access to cutting-edge technology." } 
            ].map((item, index) => ( 
              <div key={index} className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#B9935B]/10 rounded-xl p-6 hover:border-[#B9935B]/20 transition-all duration-300"> 
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: fonts.header }}>{item.title}</h3> 
                <p className="text-white/70 text-sm leading-relaxed text-reveal">{item.description}</p> 
              </div> 
            ))} 
          </div> 
        </div> 
      </section> 

      {/* CTA Section - Compact */} 
      <section className="relative py-16 md:py-20 z-10"> 
        <div className="container mx-auto px-4 md:px-6 lg:px-8"> 
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#B9935B]/20  p-8 md:p-12"> 
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 leading-tight" style={{ fontFamily: fonts.header }}> 
              Ready to Engineer<br /> 
              <span className="text-[#B9935B]">Predictable Growth? </span> 
            </h2> 
            <p className="text-white/70 mb-8 text-reveal"> 
              Join 500+ businesses that have transformed their marketing from a cost center to a revenue engine. Schedule a free strategy session to see how our systems can work for you. 
            </p> 
            <div className="flex flex-col sm:flex-row gap-4 justify-center"> 
              
               <Link 
              href="/contact"
              className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#B9935B] text-black overflow-hidden hover:scale-105 hover:shadow-[0_0_50px_rgba(185,147,91,0.6)] shadow-[0_0_30px_rgba(185,147,91,0.3)] transition-all duration-300"
            >
               {/* Scanline Effect on Button */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>

               {/* Shimmer Effect */}
               <div className="absolute inset-0 -translate-x-full group-hover:animate-none animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-10" />
               
               {/* Hover Fill Effect */}
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />

               <span 
                 className="relative z-20 font-black text-sm md:text-base uppercase tracking-[0.2em] flex items-center gap-4"
                 style={{ fontFamily: fonts.mono }} 
               >
                 Initiate Launch
                 <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
               </span>
            </Link>
            </div> 
            <p className="text-xs text-white/40 mt-6"> 
              Average results: 3.5x ROI within 90 days for qualified clients 
            </p> 
          </div> 
        </div> 
      </section>
    </section>
  );
}