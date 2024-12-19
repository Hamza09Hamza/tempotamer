"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Bell,
} from "lucide-react";

interface CountdownSectionProps {
  onStart: () => void;
  isStarted: boolean;
  onTipChange: () => void;
}

export default function CountdownSection({
  onStart,
  isStarted,
  onTipChange,
}: CountdownSectionProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(25);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            setIsRunning(false);
            setShowNotification(true);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    if (!isStarted) {
      onStart();
    }
    if (time === 0) {
      setTime(duration * 60 * 1000);
    }
    setIsRunning(true);
    onTipChange();
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setShowNotification(false);
  };

  const toggleTimer = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const increaseDuration = () => {
    setDuration((prev) => Math.min(prev + 5, 60));
  };

  const decreaseDuration = () => {
    setDuration((prev) => Math.max(prev - 5, 5));
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <motion.div
      className={`flex flex-col items-center justify-center w-full`}
      animate={{
        scale: isStarted ? 1.1 : 1,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className={`CircleWhite rounded-full bg-black w-[320px] h-[320px] flex flex-col items-center justify-center border border-white/20 transition-all duration-300`}
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white text-2xl font-medium mb-4 text-shadow"
        >
          Focus Time
        </motion.h2>
        <motion.div
          key={time}
          className={`text-white text-6xl font-medium mb-4 tabular-nums `}
        >
          {formatTime(time)}
        </motion.div>
        <div className="flex gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={toggleTimer}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors button-gradient"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isRunning ? "pause" : "play"}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                {isRunning ? (
                  <Pause className="w-6 h-6 text-black" />
                ) : (
                  <Play className="w-6 h-6 text-black translate-x-0.5" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
          <motion.button
            onClick={resetTimer}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors button-gradient"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={decreaseDuration}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors button-gradient"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.button>
          <motion.div
            key={duration}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-lg font-medium w-16 text-center text-shadow"
          >
            {duration}min
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={increaseDuration}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors button-gradient"
          >
            <ChevronUp className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-white text-black p-4 rounded-lg shadow-lg flex items-center"
          >
            <Bell className="w-6 h-6 mr-2" />
            <span>Time's up! Your focus session has ended.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
