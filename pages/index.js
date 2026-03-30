import { useState } from "react";
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
  const { isSignedIn, isLoaded } = useAuth();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [projectName, setProjectName] = useState("");

  const handleStart = () => {
    if (selectedActivity && projectName.trim()) {
      router.push(`/reflect?activity=${encodeURIComponent(selectedActivity)}&project=${encodeURIComponent(projectName)}`);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-gray-800 bg-white">
      {/* Removed Navbar */}

      {/* Minimalist Hero Section */}
      <section className="pt-24 pb-32 px-6 max-w-5xl mx-auto text-center relative z-10">
        <motion.div style={{ y, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight leading-tight">
              A thoughtful space <br/>
              <span className="text-gray-400">for young minds.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto mb-16">
              Turn your everyday activities into profound learning experiences with gentle guided reflections.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex justify-center gap-6"
          >
            <button 
              onClick={() => document.getElementById("start-section").scrollIntoView({ behavior: 'smooth' })}
              className="framer-button px-8 py-4 text-lg"
            >
              Start Reflection
            </button>
            <button 
              onClick={() => document.getElementById("how-it-works").scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 text-gray-500 hover:text-gray-900 font-normal transition-colors text-lg"
            >
              Learn more
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Rethought How it works Section */}
      <section id="how-it-works" className="py-32 px-6 relative z-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            transition={springTransition}
            className="text-4xl md:text-5xl font-light text-center mb-32 text-gray-900 tracking-tight"
          >
            The reflection process.
          </motion.h2>

          <div className="space-y-32">
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={springTransition}
              className="flex flex-col md:flex-row items-center gap-12 md:gap-24"
            >
              <div className="md:w-1/2 relative">
                <div className="absolute -top-16 -left-8 text-[12rem] font-light text-gray-50 leading-none -z-10 select-none">1</div>
                <h3 className="text-2xl font-normal text-gray-900 mb-4">Do your thing</h3>
                <p className="text-gray-500 font-light text-lg leading-relaxed">Whether you are building a website, painting on canvas, or composing a melody, just focus entirely on creating something you're proud of.</p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-full max-w-[320px] aspect-square bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 relative overflow-hidden">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="w-64 h-64 border border-gray-200 rounded-full border-dashed absolute" />
                  <IoMdColorPalette className="text-6xl text-gray-300 z-10" />
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ ...springTransition, delay: 0.1 }}
              className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24"
            >
              <div className="md:w-1/2 relative">
                <div className="absolute -top-16 -left-8 text-[12rem] font-light text-gray-50 leading-none -z-10 select-none">2</div>
                <h3 className="text-2xl font-normal text-gray-900 mb-4">Pause and think</h3>
                <p className="text-gray-500 font-light text-lg leading-relaxed">Bring your project here. Our intelligent mentor will ask you deep, dynamic questions about your challenges and breakthroughs.</p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-full max-w-[320px] aspect-square bg-gray-50 rounded-[3rem] flex items-center justify-center border border-gray-100 relative">
                  <LuNotepadText className="text-6xl text-gray-300 z-10" />
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ ...springTransition, delay: 0.2 }}
              className="flex flex-col md:flex-row items-center gap-12 md:gap-24"
            >
              <div className="md:w-1/2 relative">
                <div className="absolute -top-16 -left-8 text-[12rem] font-light text-gray-50 leading-none -z-10 select-none">3</div>
                <h3 className="text-2xl font-normal text-gray-900 mb-4">Build an archive</h3>
                <p className="text-gray-500 font-light text-lg leading-relaxed">Your answers are elegantly synthesized into a first-person journal entry, creating a permanent portfolio of your thought processes.</p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-[200px] h-[280px] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-2xl border border-gray-100 flex flex-col p-8 rotate-3 transition-transform hover:rotate-0 duration-500">
                  <div className="w-1/2 h-2.5 bg-gray-200 rounded-full mb-8"></div>
                  <div className="w-full h-2 bg-gray-50 rounded-full mb-4"></div>
                  <div className="w-5/6 h-2 bg-gray-50 rounded-full mb-4"></div>
                  <div className="w-full h-2 bg-gray-50 rounded-full mb-4"></div>
                  <div className="w-2/3 h-2 bg-gray-50 rounded-full"></div>
                  <div className="mt-auto flex justify-end">
                    <FiMusic className="text-gray-200 text-2xl" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
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
              <button className="framer-button px-10 py-4 bg-gray-900 text-white rounded-full text-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2">
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
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {activities.map(act => (
                  <motion.button
                    key={act.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedActivity(act.title)}
                    className={`p-6 rounded-2xl flex flex-col items-center gap-4 transition-all duration-300 border ${
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
                className="framer-button px-12 py-4 text-lg w-full md:w-auto"
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
