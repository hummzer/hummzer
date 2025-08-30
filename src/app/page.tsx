"use client"

import Footer from "../components/Footer"
import React from "react"

export default function Portfolio() {
  const projects = [
    {
      title: "Bot Forge",
      description: "A platform for traders to create and manage custom trading bots.",
      tech: "Next.js, React, APIs",
      link: "https://bot-forge-eumi-lihslfc41-babus-projects-8dce53e8.vercel.app/",
    },
    {
      title: "Exquisite Private",
      description: "A modern luxury e-commerce store for timepieces and jewelry.",
      tech: "Next.js, TypeScript, Tailwind CSS",
      link: "https://v0-modern-catalogue-design.vercel.app/",
    },
    {
      title: "Jola Pearl",
      description: "A sleek and modern website for a nails parlour.",
      tech: "Next.js, React, JavaScript, Tailwind CSS",
      link: "https://jola-pearl.vercel.app/",
    },
    {
      title: "YouTube Shorts Automation",
      description: "A Python script for automating the creation of video shorts.",
      tech: "Python, moviepy, YouTube API",
      link: "",
    },
  ]

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center bg-white text-black snap-start">
        <div className="z-20 text-center">
          <h1
            className="text-7xl md:text-9xl font-bold uppercase tracking-widest"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Hamza Salim
          </h1>
          <p className="mt-6 text-sm md:text-base uppercase tracking-[0.2em] font-light">
            Full Stack Software Engineer
          </p>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="h-screen flex flex-col justify-center items-center bg-gray-200 text-black px-6 snap-start"
      >
        <div className="max-w-3xl text-center">
          <h2
            className="text-5xl md:text-7xl font-bold uppercase tracking-widest mb-8"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            About Me
          </h2>
          <p className="text-sm md:text-base uppercase tracking-[0.2em] font-light leading-relaxed">
            I am a Full Stack Developer specializing in Next.js and Laravel, with a
            strong focus on automation and scripting. I thrive in the terminal and
            enjoy building efficient, modern solutions.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`h-screen flex flex-col justify-center items-center px-10 md:px-20 snap-start ${
              index % 2 === 0 ? "bg-white text-black" : "bg-gray-200 text-black"
            }`}
          >
            <div className="max-w-3xl text-center">
              <h2
                className="text-5xl md:text-7xl font-bold uppercase tracking-widest mb-6"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {project.title}
              </h2>
              <p className="text-sm md:text-base uppercase tracking-[0.2em] font-light leading-relaxed mb-4">
                {project.description}
              </p>
              <p className="text-xs md:text-sm tracking-wider text-gray-500 mb-6">
                Tech: {project.tech}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base uppercase tracking-widest font-light hover:text-gray-600 transition-colors duration-300"
                >
                  View Project →
                </a>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="h-screen flex flex-col justify-center items-center bg-white text-black px-10 md:px-20 snap-start"
      >
        <div className="max-w-3xl text-center">
          <h2
            className="text-5xl md:text-7xl font-bold uppercase tracking-widest mb-8"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Get in Touch
          </h2>
          <p className="text-sm md:text-base uppercase tracking-[0.2em] font-light leading-relaxed mb-8">
            Open to collaborations, opportunities, and new ideas.
          </p>
          <div className="space-y-2 text-sm md:text-base uppercase tracking-widest font-light">
            <p>
              Email:{" "}
              <a
                href="mailto:salimhamza371@gmail.com"
                className="hover:text-gray-600 transition-colors duration-300"
              >
                salimhamza371@gmail.com
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/hummzer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors duration-300"
              >
                github.com/hummzer
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
