"use client"

import Footer from "../components/Footer"
import React, { useEffect, useRef, useState } from "react"

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

  // refs for the videos and the section elements
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  // which section is currently active (visible)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = entry.target.getAttribute("data-index")
          const idx = idxAttr ? Number(idxAttr) : NaN
          if (Number.isNaN(idx)) return

          if (entry.isIntersecting) {
            setActiveIndex(idx)
            const vid = videoRefs.current[idx]
            if (vid) {
              vid.muted = true
              vid.play().catch(() => {})
            }
          } else {
            const vid = videoRefs.current[idx]
            vid?.pause()
            setActiveIndex((prev) => (prev === idx ? null : prev))
          }
        })
      },
      { threshold: 0.6 }
    )

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

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
        {projects.map((project, index) => {
          const isActive = activeIndex === index

          return (
            <section
              key={index}
              data-index={index}
              ref={(el) => {
                sectionRefs.current[index] = el
              }}
              className="relative h-screen snap-start overflow-hidden flex items-center justify-center"
            >
              {/* BACKGROUND VIDEO */}
              <video
                ref={(el) => {
                  videoRefs.current[index] = el
                }}
                className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                src="/momo.mp4"
                loop
                muted
                playsInline
                preload="auto"
              />

              {/* STATIC overlay content */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="max-w-3xl text-center text-black px-10 md:px-20">
                  <h2
                    className="text-5xl md:text-7xl font-bold uppercase tracking-widest mb-6"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {project.title}
                  </h2>
                  <p className="text-sm md:text-base uppercase tracking-[0.2em] font-light leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <p className="text-xs md:text-sm tracking-wider text-black/70">
                    Tech: {project.tech}
                  </p>
                </div>
              </div>

              {/* VIDEO TINT */}
              <div
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
                  isActive ? (index % 2 === 0 ? "bg-black/50" : "bg-black/30") : "bg-transparent"
                }`}
              />

              {/* Project Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-8 right-8 z-30 bg-white text-black px-8 py-6 rounded-lg shadow-lg uppercase tracking-widest font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  View Project →
                </a>
              )}
            </section>
          )
        })}
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
