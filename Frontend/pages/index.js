import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaCode } from "react-icons/fa";
import { IoMdColorPalette } from "react-icons/io";
import { FiMusic } from "react-icons/fi";
import { LuNotepadText } from "react-icons/lu";
import { useAuth, SignInButton } from "@clerk/nextjs";

const activities = [
  { id: "Coding", title: "Coding", desc: "Reflect on your logic, debugging, and creative problem solving.", icon: <FaCode /> },
  { id: "Drawing", title: "Drawing", desc: "Explore your artistic process, color choices, and visual expression.", icon: <IoMdColorPalette /> },
  { id: "MusicBlocks", title: "Music", desc: "Capture the rhythm of your composition and musical ideas.", icon: <FiMusic /> },
  { id: "Writing", title: "Writing", desc: "Document your narrative flow, character development, and themes.", icon: <LuNotepadText /> }
];

const springTransition = { type: "spring", stiffness: 100, damping: 20, mass: 1 };

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    if (isLoaded && isSignedIn && userId) {
      const checkUser = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}`);
          if (res.status === 404) router.push('/onboarding');
        } catch (err) {
          console.error("Error checking user:", err);
        }
      };
      checkUser();
    }
  }, [isLoaded, isSignedIn, userId, router]);

  const handleStart = () => {
    if (selectedActivity && projectName.trim()) {
      router.push(`/reflect?activity=${encodeURIComponent(selectedActivity)}&project=${encodeURIComponent(projectName)}`);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-gray-800 bg-white">
      {/* Removed Navbar */}

      {/* Minimalist Hero Section */}
      <section className="pt-32 pb-40 px-6 max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center justify-center min-h-[85vh]">
        {/* Subtle background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-gray-50 rounded-full blur-[100px] opacity-70 -z-10 pointer-events-none" />
        
        <motion.div style={{ y, opacity }} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-gray-100 text-gray-500 text-xs md:text-sm font-light mb-8 md:mb-12 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gray-900 animate-pulse" />
              INTELLIGENT REFLECTION
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-[6rem] font-light text-gray-900 mb-8 md:mb-10 tracking-tighter leading-[1.05] px-2">
              A thoughtful space <br className="hidden sm:block" />
              <span className="text-gray-300 italic font-serif tracking-normal">for young minds.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-10 md:mb-14 px-6 md:px-4">
              Turn your everyday creative activities into profound learning experiences through gentle, AI-guided journaling.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6 sm:px-0"
          >
            <button 
              onClick={() => document.getElementById("start-section").scrollIntoView({ behavior: 'smooth' })}
              className="framer-button px-10 py-4 text-lg cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Start Reflection
            </button>
            <button 
              onClick={() => router.push('/journal')}
              className="px-10 py-4 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 font-normal transition-all text-lg cursor-pointer shadow-sm w-full sm:w-auto"
            >
              Journals
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* How AI Reflection Works — Kolb's Experiential Learning Cycle */}
      <section id="how-it-works" className="py-32 px-6 relative z-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            transition={springTransition}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight mb-6">
              How Reflection process Works?
            </h2>
            <p className="text-gray-400 font-light text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Powered by <span className="text-gray-700 font-normal">Kolb&apos;s Experiential Learning Cycle</span> — a well-known model in constructionist education.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center text-gray-500 font-light text-base md:text-lg max-w-2xl mx-auto mb-20 leading-relaxed"
          >
            The AI gently guides each child through 4 simple stages, helping them move from just &ldquo;making&rdquo; to deeply understanding and improving their future projects — perfectly aligned with Sugar Labs&apos; constructionist philosophy.
          </motion.p>

          {/* Kolb Cycle Visual — 4 Stage Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
          >
            {/* Stage 1 */}
            <motion.div whileHover={{ y: -4 }} className="relative p-8 rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-50/50 to-white transition-all duration-300 hover:shadow-lg hover:border-blue-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-medium">1</div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900">Concrete Experience</h3>
              </div>
              <p className="text-gray-500 font-light leading-relaxed">What did you make? Tell me about your project and what you built today.</p>
              <div className="absolute top-4 right-4 text-2xl opacity-50">{"\uD83C\uDFA8"}</div>
            </motion.div>

            {/* Stage 2 */}
            <motion.div whileHover={{ y: -4 }} className="relative p-8 rounded-3xl border border-gray-100 bg-gradient-to-br from-purple-50/50 to-white transition-all duration-300 hover:shadow-lg hover:border-purple-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-lg font-medium">2</div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900">Reflective Observation</h3>
              </div>
              <p className="text-gray-500 font-light leading-relaxed">How did it feel? What did you notice while working on your project?</p>
              <div className="absolute top-4 right-4 text-2xl opacity-50">{"\uD83D\uDE0A"}</div>
            </motion.div>

            {/* Stage 3 */}
            <motion.div whileHover={{ y: -4 }} className="relative p-8 rounded-3xl border border-gray-100 bg-gradient-to-br from-amber-50/50 to-white transition-all duration-300 hover:shadow-lg hover:border-amber-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-lg font-medium">3</div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900">Abstract Conceptualization</h3>
              </div>
              <p className="text-gray-500 font-light leading-relaxed">What did you learn? What new ideas or skills did you pick up?</p>
              <div className="absolute top-4 right-4 text-2xl opacity-50">{"\u2B50"}</div>
            </motion.div>

            {/* Stage 4 */}
            <motion.div whileHover={{ y: -4 }} className="relative p-8 rounded-3xl border border-gray-100 bg-gradient-to-br from-green-50/50 to-white transition-all duration-300 hover:shadow-lg hover:border-green-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-lg font-medium">4</div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900">Active Experimentation</h3>
              </div>
              <p className="text-gray-500 font-light leading-relaxed">What will you try next time? How will you use what you learned?</p>
              <div className="absolute top-4 right-4 text-2xl opacity-50">{"\uD83D\uDE80"}</div>
            </motion.div>
          </motion.div>

          {/* Cycle Arrow Hint */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center gap-3 text-gray-300 text-sm font-light">
              <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
                <path d="M2 10 C 20 2, 60 2, 74 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
                <path d="M70 6 L 76 10 L 70 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              <span>The cycle repeats with each new project</span>
              <svg width="80" height="20" viewBox="0 0 80 20" fill="none" className="rotate-180">
                <path d="M2 10 C 20 2, 60 2, 74 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
                <path d="M70 6 L 76 10 L 70 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clean Interaction Section */}
      <section id="start-section" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
        <div className="mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight mb-4">
            Begin writing
          </h2>
          <p className="text-gray-500 font-light text-lg">Select your medium to get started.</p>
        </div>

        {(!isLoaded || !isSignedIn) ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="framer-panel p-16 text-center flex flex-col items-center justify-center max-w-2xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white -z-10" />
            <h3 className="text-2xl font-normal text-gray-900 mb-3 tracking-tight">Authentication Required</h3>
            <p className="text-gray-500 font-light mb-10 max-w-md leading-relaxed text-lg">Your reflections are deeply personal. Please sign in or create an account to start your secure journaling journey.</p>
            <SignInButton mode="modal">
              <button className="framer-button px-10 py-4 bg-gray-900 text-white rounded-full text-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer">
                Sign In to Continue <span className="text-sm">→</span>
              </button>
            </SignInButton>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springTransition}
            className="framer-panel p-10 md:p-16 relative"
          >
            <div className="mb-14">
              <h3 className="text-lg font-normal text-gray-900 mb-6">1. Activity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activities.map(act => (
                  <motion.button
                    key={act.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedActivity(act.title)}
                    className={`p-6 rounded-2xl flex flex-col items-center gap-4 transition-all duration-300 border cursor-pointer ${
                      selectedActivity === act.title 
                        ? 'border-gray-900 bg-gray-900 text-white shadow-lg' 
                        : 'border-gray-100 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-900'
                    }`}
                  >
                    <div className="text-3xl">
                      {act.icon}
                    </div>
                    <span className="text-sm font-normal tracking-wide">
                      {act.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mb-14">
              <h3 className="text-lg font-normal text-gray-900 mb-6">2. Project Title</h3>
              <input 
                type="text" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. My First Game" 
                className="w-full px-6 py-4 framer-input text-lg"
              />
            </div>

            <div className="flex justify-center pt-6">
              <button
                onClick={handleStart}
                disabled={!selectedActivity || !projectName.trim()}
                className="framer-button px-12 py-4 text-lg w-full md:w-auto cursor-pointer"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </section>
      
      {/* Minimal Footer */}
      <footer className="flex flex-col items-center gap-4 justify-center pb-12 text-gray-400 text-sm font-light">
        <p>A minimalist space for reflection.</p>
      </footer>
    </div>
  );
}
