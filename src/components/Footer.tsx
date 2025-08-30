"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center py-10 text-xs text-black uppercase tracking-widest font-light bg-white">
      <p>&copy; {new Date().getFullYear()} Hamza Salim</p>
    </footer>
  );
};

export default Footer;
