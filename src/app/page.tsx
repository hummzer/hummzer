// page.tsx
"use client"

import Footer from "../components/Footer"
import React, { useEffect, useRef, useState } from "react"

export default function Portfolio() {
  const projects = [
    {
      title: "Momo",
      description: "A project involving advanced video automation and scripting for content creation.",
      tech: "Python, moviepy, APIs",
      link: "https://example.com/momo", // Update with actual link if available
      image: "/momo.jpg", // Assume high-res image path; replace with actual high-quality image URL or path (e.g., from Unsplash: 'https://images.unsplash.com/photo-1557682250-33bd709cbe92?auto=format&fit=crop&w=1920')
      video: "/momo.mp4",
    },
  ]

  // Refs for the video and section (simplified for single project)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  // State for preview mode
  const [isPreviewActive, setIsPreviewActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (isPreviewActive && videoRef.current) {
              videoRef.current.muted = true
              videoRef.current.play().catch(() => {})
            }
          } else {
            setIsVisible(false)
            if (videoRef.current) {
              videoRef.current.pause()
            }
          }
        })
      },
      { threshold: 0.6 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isPreviewActive])

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* Hero Section with high-res image background */}
      <section 
        className="relative h-screen flex flex-col justify-center items-center text-black snap-start bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557682250-33bd709cbe92?auto=format&fit=crop&w=1920')" }} // High-res minimal abstract image; replace as needed
      >
        <div className="absolute inset-0 bg-white/30" /> {/* Light tint for readability */}
        <div className="z-20 text-center px-4">
          <h1
            className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-bold uppercase tracking-widest"
            style={{ fontFamily: "DM Serif Display, serif" }} // Updated to match imported font
          >
            Hamza Salim
          </h1>
          <p className="mt-6 text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.2em] font-light">
            Full Stack Software Engineer
          </p>
        </div>
      </section>

      {/* About Section with high-res image background */}
      <section
        id="about"
        className="h-screen flex flex-col justify-center items-center text-black px-4 sm:px-6 snap-start bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1920')" }} // High-res minimal image; replace as needed
      >
        <div className="absolute inset-0 bg-gray-200/70" /> {/* Subtle tint for readability */}
        <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl text-center relative z-10">
          <h2
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-widest mb-8"
            style={{ fontFamily: "DM Serif Display, serif" }}
          >
            About Me
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.2em] font-light leading-relaxed">
            I am a Full Stack Developer specializing in Next.js and Laravel, with a
            strong focus on automation and scripting. I thrive in the terminal and
            enjoy building efficient, modern solutions.
          </p>
        </div>
      </section>

      {/* Projects Section (single project: Momo) */}
      <section id="projects" className="snap-start">
        {projects.map((project, index) => (
          <section
            key={index}
            ref={sectionRef}
            className="relative h-screen overflow-hidden flex items-center justify-center snap-start"
          >
            {/* Background: Image by default, video on preview */}
            {!isPreviewActive ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${project.image}')` }}
              />
            ) : (
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                src={project.video}
                loop
                muted
                playsInline
                preload="auto"
              />
            )}

            {/* Overlay content (white board) - hidden on preview */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                isPreviewActive ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl text-center text-black px-4 sm:px-10 md:px-20 bg-white/80 py-8 sm:py-10 md:py-12 rounded-lg shadow-lg">
                <h2
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-widest mb-6"
                  style={{ fontFamily: "DM Serif Display, serif" }}
                >
                  {project.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.2em] font-light leading-relaxed mb-4">
                  {project.description}
                </p>
                <p className="text-2xs sm:text-xs md:text-sm lg:text-base tracking-wider text-black/70 mb-6">
                  Tech: {project.tech}
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <button
                    onClick={() => setIsPreviewActive(true)}
                    className="bg-black text-white px-6 py-3 rounded-lg uppercase tracking-widest font-semibold hover:bg-gray-800 transition-colors duration-300"
                  >
                    Preview
                  </button>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black border border-black px-6 py-3 rounded-lg uppercase tracking-widest font-semibold hover:bg-gray-100 transition-colors duration-300"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Tint on video preview */}
            {isPreviewActive && (
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            )}

            {/* Close button during preview */}
            {isPreviewActive && (
              <button
                onClick={() => setIsPreviewActive(false)}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 z-30 text-white text-xl sm:text-2xl font-bold uppercase tracking-widest hover:text-gray-300 transition-colors duration-300"
              >
                Close
              </button>
            )}
          </section>
        ))}
      </section>

      {/* Contact Section with high-res image background */}
      <section
        id="contact"
        className="h-screen flex flex-col justify-center items-center text-black px-4 sm:px-10 md:px-20 snap-start bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1567095760787-7abb0ee5e812?auto=format&fit=crop&w=1920')" }} // High-res minimal image; replace as needed
      >
        <div className="absolute inset-0 bg-white/30" /> {/* Light tint for readability */}
        <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl text-center relative z-10">
          <h2
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-widest mb-8"
            style={{ fontFamily: "DM Serif Display, serif" }}
          >
            Get in Touch
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.2em] font-light leading-relaxed mb-8">
            Open to collaborations, opportunities, and new ideas.
          </p>
          <div className="space-y-2 text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-widest font-light">
            <p>
              Email:{" "}
              <a
                href="mailto:zaeh888@gmail.com"
                className="hover:text-gray-600 transition-colors duration-300"
              >
                zaeh888@gmail.com
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