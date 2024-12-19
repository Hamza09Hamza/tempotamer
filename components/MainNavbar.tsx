"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/images/Logo.png";
import { MenuItem } from "./menuItem";
import { motion } from "framer-motion";

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [menuActive, setMenuActive] = useState<boolean>(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 inset-x-0 bg-transparent max-w-2xl mx-auto z-50"
    >
      <motion.div className="relative rounded-full border border-white/[0.2] bg-black/50 backdrop-blur-md shadow-lg flex justify-between items-center space-x-4 px-8 py-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-4 max-h-10"
        >
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="Timer Logo"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-bold text-xl text-white"
            >
              TempoTamer
            </motion.span>
          </Link>
        </motion.div>
        <div
          onMouseLeave={() => {
            setActive(null);
          }}
          className="flex items-center space-x-4"
        >
          <MenuItem
            menuActive={menuActive}
            setMenuActive={setMenuActive}
            setActive={setActive}
            active={active}
            item="Alarms"
          >
            <div className="p-2">
              <p className="text-sm text-gray-400">Coming soon</p>
            </div>
          </MenuItem>
          <MenuItem
            menuActive={menuActive}
            setMenuActive={setMenuActive}
            setActive={setActive}
            active={active}
            item="Reminders"
          >
            <div className="p-2">
              <p className="text-sm text-gray-400">Under development</p>
            </div>
          </MenuItem>
          <MenuItem
            menuActive={menuActive}
            setMenuActive={setMenuActive}
            setActive={setActive}
            active={active}
            item="About Us"
          >
            <div className="p-2">
              <p className="text-sm text-gray-400">Coming soon</p>
            </div>
          </MenuItem>
          <MenuItem
            menuActive={menuActive}
            setMenuActive={setMenuActive}
            setActive={setActive}
            active={active}
            item="Sign In"
          >
            <div className="p-2">
              <p className="text-sm text-gray-400">Coming soon</p>
            </div>
          </MenuItem>
        </div>
      </motion.div>
    </motion.nav>
  );
}
