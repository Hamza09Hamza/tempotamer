"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-br from-black to-gray-900">
      <svg className="absolute inset-0 w-full h-full">
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="gooey"
          />
        </filter>
      </svg>
      <div className="absolute inset-0" style={{ filter: "url(#gooey)" }} />
    </div>
  );
};

export default AnimatedBackground;
