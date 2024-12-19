import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tip {
  title: string;
  description: string;
}

interface IntroTextProps {
  tip: Tip;
  isStarted: boolean;
  tipIndex: number;
}

const IntroText: React.FC<IntroTextProps> = ({ tipIndex, tip, isStarted }) => {
  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.h1
          key={`title-${tipIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
        >
          {tip && tip.title}
        </motion.h1>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={`description-${tipIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl"
        >
          {tip && tip.description}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default IntroText;
