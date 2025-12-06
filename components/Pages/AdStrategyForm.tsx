"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check, Target, DollarSign, Share2, User } from "lucide-react";

export default function AdStrategyForm() {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0); // For animation direction
  const [formData, setFormData] = useState({
    goal: "",
    budget: "",
    platforms: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
  });

  useEffect(() => {
    // Check local storage to prevent spamming the user
    const isSubmitted = localStorage.getItem("formSubmitted");
    const wasSkipped = localStorage.getItem("formSkipped");
    
    // Slight delay so it doesn't pop up instantly on load (better UX)
    if (!isSubmitted && !wasSkipped) {
      const timer = setTimeout(() => setShowForm(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectOption = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Auto advance on selection for smoother UX (optional)
    // setTimeout(() => nextStep(), 300); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("formSubmitted", "true");
    // Animation out
    setShowForm(false);
    console.log("Form submitted:", formData);
  };

  const nextStep = () => {
    setDirection(1);
    // Logic to skip to end if "Expert" is chosen
    if (
      (currentStep === 1 && formData.goal.includes("expert")) ||
      (currentStep === 2 && formData.budget.includes("expert")) ||
      (currentStep === 3 && formData.platforms.includes("expert"))
    ) {
      setCurrentStep(4);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSkip = () => {
    localStorage.setItem("formSkipped", "true");
    setShowForm(false);
  };

  if (!showForm) return null;

  // Animation Variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop with Blur and Noise */}
          <div 
            className="absolute inset-0 bg-[#050505]/90 backdrop-blur-xl"
            onClick={handleSkip} // Click outside to close
          >
             <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>
          </div>

          {/* Main Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[85vh] bg-[#0A0A0A] border border-[#B9935B]/30 overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Close Button */}
            <button
              onClick={handleSkip}
              className="absolute top-6 right-6 z-50 text-gray-500 hover:text-[#B9935B] transition-colors p-2"
            >
              <X size={24} />
            </button>

            {/* LEFT SIDE: Progress & Context (The "Dashboard") */}
            <div className="w-full md:w-1/3 bg-[#111] border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                {/* Decorative Grid Background */}
                <div className="absolute inset-0 opacity-10" 
                     style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
                </div>

                <div className="relative z-10">
                    <div className="text-[#B9935B] font-mono text-xs tracking-[0.2em] mb-4">SYSTEM_INIT //</div>
                    <h2 className="text-3xl font-bold text-white mb-2">Strategy <br/> Configuration</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Configure your campaign parameters. Our AI will generate a preliminary roadmap based on these inputs.
                    </p>
                </div>

                {/* Progress Indicators */}
                <div className="relative z-10 space-y-6 mt-8 md:mt-0">
                    {[
                        { id: 1, label: "Objective", icon: Target },
                        { id: 2, label: "Resources", icon: DollarSign },
                        { id: 3, label: "Channels", icon: Share2 },
                        { id: 4, label: "Identity", icon: User }
                    ].map((step) => (
                        <div key={step.id} className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                                currentStep === step.id 
                                    ? "border-[#B9935B] bg-[#B9935B]/10 text-[#B9935B] shadow-[0_0_15px_rgba(185,147,91,0.3)]" 
                                    : currentStep > step.id 
                                        ? "border-[#B9935B] bg-[#B9935B] text-black"
                                        : "border-white/10 text-gray-600"
                            }`}>
                                {currentStep > step.id ? <Check size={16} /> : <step.icon size={16} />}
                            </div>
                            <div>
                                <div className={`text-xs font-mono uppercase tracking-widest ${currentStep === step.id ? "text-[#B9935B]" : "text-gray-500"}`}>
                                    Step 0{step.id}
                                </div>
                                <div className={`text-sm font-medium ${currentStep >= step.id ? "text-white" : "text-gray-600"}`}>
                                    {step.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Metadata */}
                <div className="relative z-10 hidden md:block">
                    <div className="h-px w-full bg-white/10 mb-4"></div>
                    <div className="flex justify-between text-[10px] font-mono text-gray-600 uppercase">
                        <span>ID: 8492-BX</span>
                        <span>Secure Connection</span>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: The Form (The "Input Terminal") */}
            <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col relative bg-[#0A0A0A]">
                
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col max-w-2xl mx-auto w-full justify-center">
                    <AnimatePresence mode="wait" custom={direction}>
                        
                        {/* STEP 1: GOAL */}
                        {currentStep === 1 && (
                            <StepContainer key="step1" direction={direction} variants={variants}>
                                <h3 className="text-2xl text-white font-light mb-8">What is your primary <span className="text-[#B9935B]">objective</span>?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <OptionCard 
                                        label="Boost Sales" 
                                        sub="eCommerce & Products" 
                                        selected={formData.goal === 'Boost online sales (eCommerce)'}
                                        onClick={() => selectOption('goal', 'Boost online sales (eCommerce)')}
                                    />
                                    <OptionCard 
                                        label="Lead Gen" 
                                        sub="Service Business" 
                                        selected={formData.goal === 'Generate more qualified leads'}
                                        onClick={() => selectOption('goal', 'Generate more qualified leads')}
                                    />
                                    <OptionCard 
                                        label="Brand Awareness" 
                                        sub="Reach & Followers" 
                                        selected={formData.goal === 'Build brand awareness & followers'}
                                        onClick={() => selectOption('goal', 'Build brand awareness & followers')}
                                    />
                                    <OptionCard 
                                        label="Retargeting" 
                                        sub="Convert Visitors" 
                                        selected={formData.goal === 'Retarget people who’ve visited my site'}
                                        onClick={() => selectOption('goal', 'Retarget people who’ve visited my site')}
                                    />
                                    <OptionCard 
                                        label="Consult Expert" 
                                        sub="I need strategy help" 
                                        selected={formData.goal === 'I’d like to discuss my goals with an expert'}
                                        onClick={() => selectOption('goal', 'I’d like to discuss my goals with an expert')}
                                        fullWidth
                                    />
                                </div>
                            </StepContainer>
                        )}

                        {/* STEP 2: BUDGET */}
                        {currentStep === 2 && (
                             <StepContainer key="step2" direction={direction} variants={variants}>
                                <h3 className="text-2xl text-white font-light mb-8">Monthly ad <span className="text-[#B9935B]">investment</span>?</h3>
                                <div className="space-y-3">
                                    {[
                                        'Under $500 (Testing)',
                                        '$500 – $1,000',
                                        '$1,000 – $5,000',
                                        '$5,000 – $10,000',
                                        '$10,000+ (Scaling)',
                                        'Undecided / Need Advice'
                                    ].map(opt => (
                                        <div 
                                            key={opt}
                                            onClick={() => selectOption('budget', opt)}
                                            className={`p-4 border cursor-pointer transition-all duration-300 flex items-center justify-between group ${
                                                formData.budget === opt 
                                                ? "border-[#B9935B] bg-[#B9935B]/10 text-white" 
                                                : "border-white/10 hover:border-[#B9935B]/50 text-gray-400"
                                            }`}
                                        >
                                            <span className="font-mono text-sm">{opt}</span>
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                                 formData.budget === opt ? "border-[#B9935B]" : "border-gray-600"
                                            }`}>
                                                {formData.budget === opt && <div className="w-2 h-2 rounded-full bg-[#B9935B]" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </StepContainer>
                        )}

                        {/* STEP 3: PLATFORMS */}
                        {currentStep === 3 && (
                             <StepContainer key="step3" direction={direction} variants={variants}>
                                <h3 className="text-2xl text-white font-light mb-8">Preferred <span className="text-[#B9935B]">battlefield</span>?</h3>
                                <div className="grid grid-cols-2 gap-4">
                                     {['Facebook & IG', 'TikTok', 'YouTube Ads', 'Pinterest', 'Full Funnel (All)', 'Expert Choice'].map((platform) => (
                                        <div 
                                            key={platform}
                                            onClick={() => selectOption('platforms', platform)}
                                            className={`h-24 p-4 border cursor-pointer transition-all duration-300 flex flex-col justify-center items-center text-center gap-2 hover:bg-white/5 ${
                                                formData.platforms === platform
                                                ? "border-[#B9935B] text-[#B9935B]" 
                                                : "border-white/10 text-gray-400"
                                            }`}
                                        >
                                            <span className="font-mono text-sm uppercase tracking-wider">{platform}</span>
                                        </div>
                                     ))}
                                </div>
                            </StepContainer>
                        )}

                        {/* STEP 4: DETAILS */}
                        {currentStep === 4 && (
                            <StepContainer key="step4" direction={direction} variants={variants}>
                                <h3 className="text-2xl text-white font-light mb-8">Finalize <span className="text-[#B9935B]">Transmission</span>.</h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <InputGroup 
                                            label="Name" 
                                            name="name" 
                                            value={formData.name} 
                                            onChange={handleChange} 
                                            placeholder="John Doe"
                                        />
                                        <InputGroup 
                                            label="Company" 
                                            name="company" 
                                            value={formData.company} 
                                            onChange={handleChange} 
                                            placeholder="Acme Corp"
                                        />
                                    </div>
                                    <InputGroup 
                                        label="Email Address" 
                                        name="email" 
                                        type="email"
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        placeholder="john@example.com"
                                    />
                                    <InputGroup 
                                        label="Website URL" 
                                        name="website" 
                                        type="url"
                                        value={formData.website} 
                                        onChange={handleChange} 
                                        placeholder="https://codeopsagar.in"
                                    />
                                    <InputGroup 
                                        label="Phone (Optional)" 
                                        name="phone" 
                                        type="tel"
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </StepContainer>
                        )}
                    </AnimatePresence>

                    {/* Navigation Bar */}
                    <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`flex items-center gap-2 text-sm font-mono uppercase tracking-wider transition-colors ${
                                currentStep === 1 ? "text-gray-700 cursor-not-allowed" : "text-gray-400 hover:text-white"
                            }`}
                        >
                            <ChevronLeft size={16} /> Back
                        </button>

                        {currentStep < 4 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="group flex items-center gap-3 bg-white text-black px-6 py-3 font-bold uppercase text-sm tracking-wider hover:bg-[#B9935B] hover:text-white transition-all duration-300"
                            >
                                Continue <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="group relative flex items-center gap-3 bg-[#B9935B] text-black px-8 py-3 font-bold uppercase text-sm tracking-wider overflow-hidden hover:text-white transition-colors duration-300"
                            >
                                <span className="relative z-10">Initialize Strategy</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        )}
                    </div>
                </form>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

const StepContainer = ({ children, direction, variants }: any) => (
    <motion.div
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
        className="w-full"
    >
        {children}
    </motion.div>
);

const OptionCard = ({ label, sub, selected, onClick, fullWidth }: any) => (
    <div 
        onClick={onClick}
        className={`
            ${fullWidth ? 'md:col-span-2' : ''}
            relative p-6 border cursor-pointer transition-all duration-300 group overflow-hidden
            ${selected ? 'border-[#B9935B] bg-[#B9935B]/5' : 'border-white/10 bg-white/5 hover:border-[#B9935B]/40'}
        `}
    >
        <div className={`absolute top-0 left-0 w-0.5 h-full bg-[#B9935B] transition-all duration-300 ${selected ? 'opacity-100' : 'opacity-0'}`} />
        <h4 className={`font-bold text-lg mb-1 ${selected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{label}</h4>
        <p className="text-xs text-gray-500 font-mono uppercase">{sub}</p>
    </div>
);

const InputGroup = ({ label, name, type = "text", value, onChange, placeholder }: any) => (
    <div className="flex flex-col gap-2 group">
        <label className="text-xs font-mono text-[#B9935B] uppercase tracking-widest opacity-70 group-focus-within:opacity-100 transition-opacity">
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-[#B9935B] transition-colors"
            required
        />
    </div>
);