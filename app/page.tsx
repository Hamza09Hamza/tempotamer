"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/MainNavbar";
import AnimatedBackground from "@/components/animatedBackground";
import CountdownSection from "@/components/countdownSection";
import IntroText from "@/components/introText";

const fallbackLifeTips = [
  {
    title: "Time Management Reimagined",
    description:
      "Set timers, get notifications, and stay productive with our elegant and intuitive timer application.",
  },
  {
    title: "Embrace Small Moments",
    description:
      "Take time to appreciate the little things in life. They often bring the greatest joy.",
  },
  {
    title: "Learn and Grow",
    description:
      "Every mistake is an opportunity to learn and become stronger. Embrace your journey.",
  },
  {
    title: "The Power of Kindness",
    description:
      "A simple act of kindness can change someone's entire day. Be the reason someone smiles.",
  },
  {
    title: "Attitude is Everything",
    description:
      "Your attitude determines your direction. Choose positivity and watch your world transform.",
  },
  {
    title: "Embrace Change",
    description:
      "Change is the only constant in life. Adapt, evolve, and thrive in new circumstances.",
  },
  {
    title: "Journey to Happiness",
    description:
      "Happiness is not a destination, but a way of traveling. Enjoy every step of your journey.",
  },
  {
    title: "Persistence Pays Off",
    description:
      "Success is falling nine times and getting up ten. Keep pushing forward, no matter what.",
  },
  {
    title: "Live Authentically",
    description:
      "Your time is limited. Don't waste it living someone else's life. Be true to yourself.",
  },
  {
    title: "Create Your Future",
    description:
      "The best way to predict the future is to create it. Take action towards your dreams today.",
  },
];

export default function Countdown() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [lifeTips, setLifeTips] = useState<any[]>([]);

  useEffect(() => {
    const fetchLifeTips = async () => {
      try {
        const response = await fetch("/api/lifetips");
        if (response.ok) {
          const data = await response.json();

          setLifeTips(data);
          console.log(data);
        } else {
          setLifeTips(fallbackLifeTips);
          console.log("Failed to fetch life tips");
        }
      } catch (error) {
        console.log("Error fetching life tips:", error);
      }
    };

    fetchLifeTips();
  }, []);

  const changeTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % lifeTips.length);
  };

  useEffect(() => {
    if (isStarted) {
      const interval = setInterval(changeTip, 10000);
      return () => clearInterval(interval);
    }
  }, [isStarted]);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            className="w-full "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <IntroText
              isStarted={isStarted}
              tipIndex={currentTipIndex}
              tip={lifeTips[currentTipIndex]}
            />
          </motion.div>
          <CountdownSection
            isStarted={isStarted}
            onStart={() => setIsStarted(true)}
            onTipChange={changeTip}
          />
        </div>
      </main>
    </div>
  );
}
