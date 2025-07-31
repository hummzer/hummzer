"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import BuyMeCoffeeModal from "../components/buy-me-coffee-modal.jsx" // Import the new modal

const TYPING_SPEED = 15 // Speed up typing slightly
const IDLE_TIMEOUT = 8000 // Increased to 8 seconds
const TRANSITION_DURATION = 2000 // Milliseconds for smooth fade transition (2 seconds)
const IDLE_TOGGLE_INTERVAL = 6500 // Milliseconds for how long each state (terminal/image) lasts during idle

export default function TerminalPortfolio() {
  const [history, setHistory] = useState([])
  const [currentInput, setCurrentInput] = useState("")
  const [displayingOutput, setDisplayingOutput] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const [isTerminalVisible, setIsTerminalVisible] = useState(true) // Terminal visible by default
  const [isCoffeeModalOpen, setIsCoffeeModalOpen] = useState(false) // State for modal visibility

  const inputRef = useRef(null)
  const terminalRef = useRef(null)
  const idleTimerRef = useRef(null)
  const transitionIntervalRef = useRef(null) // Ref for the idle transition interval

  const commands = {
    help: [
      "Available commands:",
      "",
      "  about     - Learn about me",
      "  skills    - View my technical skills",
      "  projects  - See my recent projects",
      "  contact   - Get my contact information",
      "  resume    - View my resume",
      "  clear     - Clear the terminal",
      "  help      - Show this help message",
      "",
    ],
    about: [
      "Hello world! 👋",
      "",
      "I'm Hamza Salim, a Full Stack Software Engineer.",
      "I build web applications, primarily using Next.js and Laravel.",
      "",
      "My journey in tech is driven by a love forWeb Development, OpenSource,the magic in scripting, Linux, AI, Quantum Computing and Blockchain.",
      "",
    ],
    skills: [
      "Technical Skills:",
      "",
      "  Frontend: ",
      "    • React, Next.js, JavaScript",
      "    • HTML5, CSS3, Tailwind CSS",
      "",
      "  Backend:",
      "    • Node.js, Laravel, PHP",
      "    • SQLite, MongoDB, MySQL, MariaDB",
      "    • REST APIs",
      "",
      "  DevOps & Tools:",
      "    • Docker, Kubernetes, Vercel",
      "    • Git, GitHub Actions, CI/CD",
      "    • Linux, Bash & Python3 scripting",
      "",
    ],
    projects: [
      "<span class='text-emerald-400'>Recent Projects:</span>", // Changed to emerald-400
      "",
      "  <span class='text-indigo-300'>1. Jola Pearl (Nails Parlour Website)</span>", // Changed to indigo-300
      "     • A modern and responsive website for a nails parlour.",
      "     • Technologies: Next.js, React, JavaScript, Tailwind CSS.",
      "     • <a href='https://jola-pearl.vercel.app/' target='_blank' rel='noopener noreferrer' class='text-pink-400 hover:underline'>View Website</a>", // Changed to pink-400
      "",
      "  <span class='text-indigo-300'>2. Simple Meal Planner</span>", // Changed to indigo-300
      "     • Full-stack Next.js app for meal planning and grocery lists.",
      "     • Technologies: Next.js, React, JavaScript, Tailwind CSS, Prisma ORM, Spoonacular API.",
      "     • <a href='https://v0-simple-meal-planner.vercel.app/' target='_blank' rel='noopener noreferrer' class='text-pink-400 hover:underline'>View Website</a>", // Changed to pink-400
      "",
      "  <span class='text-indigo-300'>3. YouTube Shorts Automation Script</span>", // Changed to indigo-300
      "     • Python script for generating and uploading Shorts.",
      "     • Technologies: Python, moviepy, YouTube API.",
      "",
      "  <span class='text-indigo-300'>4. Chrome OS Image Gallery</span>", // Changed to indigo-300
      "     • Next.js-based digital art showcase with dynamic rendering.",
      "     • Technologies: Next.js, React, JavaScript, Cloudinary, Framer Motion.",
      "     • <a href='https://v0-chrome-os-image-gallery.vercel.app/' target='_blank' rel='noopener noreferrer' class='text-pink-400 hover:underline'>View Website</a>", // Changed to pink-400
      "",

    ],
    contact: [
      "Get in touch:",
      "",
      "  Email:    salimhamza371@gmail.com",
      "  GitHub:   github.com/hummzer",
      "  Phone:    +254 716 475 923",
      "  Website:  hummzer.vercel.app",
      "",
      "Feel free to reach out for collaborations or opportunities!",
      "",
    ],
    resume: ["Resume:", "", "  You can download my resume at:", "  → https://yourwebsite.com/resume.pdf"],
  }

  const typeLine = useCallback((historyEntryIndex, lineIndex, fullLine, resolve) => {
    let charIndex = 0
    const interval = setInterval(() => {
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory]
        // Ensure we're updating the correct entry, especially if history changes rapidly
        if (newHistory[historyEntryIndex]) {
          const targetEntry = { ...newHistory[historyEntryIndex] }
          const updatedOutput = [...targetEntry.output]

          if (charIndex < fullLine.length) {
            updatedOutput[lineIndex] = fullLine.substring(0, charIndex + 1)
            charIndex++
          } else {
            // Ensure the full line is displayed if interval clears after last char
            updatedOutput[lineIndex] = fullLine
            clearInterval(interval)
            resolve()
          }
          newHistory[historyEntryIndex] = { ...targetEntry, output: updatedOutput }
        } else {
          // If entry no longer exists (e.g., clear command was used), stop typing
          clearInterval(interval)
          resolve()
        }
        return newHistory
      })
    }, TYPING_SPEED)
  }, [])

  const executeCommand = useCallback(
    async (input) => {
      const trimmedInput = input.trim().toLowerCase()
      let rawOutput = []

      if (trimmedInput === "clear") {
        setHistory([])
        return
      } else if (trimmedInput === "") {
        rawOutput = [""]
      } else if (commands.hasOwnProperty(trimmedInput)) {
        rawOutput = commands[trimmedInput]
      } else {
        rawOutput = [`Command not found: ${trimmedInput}`, 'Type "help" to see available commands.', ""]
      }

      // Add a new entry to history with empty lines as placeholders
      const newHistoryEntryIndex = history.length
      setHistory((prev) => [...prev, { input, output: rawOutput.map(() => "") }])
      setDisplayingOutput(true)

      // Type each line sequentially for all commands
      for (let i = 0; i < rawOutput.length; i++) {
        await new Promise((resolve) => {
          typeLine(newHistoryEntryIndex, i, rawOutput[i], resolve)
        })
      }

      setDisplayingOutput(false)
    },
    [commands, history.length, typeLine],
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentInput.trim() && !displayingOutput) {
      executeCommand(currentInput)
      setCurrentInput("")
    }
  }

  // Define resetIdleTimer BEFORE focusInput
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true)
    }, IDLE_TIMEOUT)
  }, [])

  const focusInput = useCallback(() => {
    setIsTerminalVisible(true) // Always show terminal on focus
    setIsIdle(false) // Reset idle state
    inputRef.current?.focus()
    resetIdleTimer() // Reset timer when focused
  }, [resetIdleTimer])

  // Handle simulated M-Pesa payment
  const handleMpesaPayment = useCallback(async (amount) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const success = Math.random() > 0.2 // 80% chance of success
    let message = ""

    if (success) {
      message = `<span class='text-emerald-400'>Payment of KSH ${amount.toFixed(2)} successful! Thank you for the coffee! ☕</span>`
    } else {
      message = `<span class='text-red-500'>Payment of KSH ${amount.toFixed(2)} failed. Please try again.</span>`
    }

    // Add the payment result to the terminal history
    setHistory((prev) => [
      ...prev,
      {
        input: `buy-coffee ${amount}`, // Show the command that triggered it
        output: [message, ""], // Add an empty line for spacing
      },
    ])
    // Ensure terminal scrolls to show the new message
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    // Initial welcome message
    setHistory([
      {
        input: "",
        output: [
          "╭─────────────────────────────────────────────────╮",
          "│              Welcome to Olympus                 ",
          "│                                                 ",
          "│  I'm Hamza Salim, a Full Stack Software Engineer. ",
          '│  Type "help" to explore my world.               ',
          "│  Click anywhere to focus the terminal.          ",
          "╰─────────────────────────────────────────────────╯",
          "",
        ],
      },
    ])
    setTimeout(() => focusInput(), 100)

    // Event listeners for activity
    document.addEventListener("mousemove", resetIdleTimer)
    document.addEventListener("keydown", resetIdleTimer)
    document.addEventListener("blur", () => setIsTerminalVisible(false)) // Hide terminal on blur

    return () => {
      document.removeEventListener("mousemove", resetIdleTimer)
      document.removeEventListener("keydown", resetIdleTimer)
      document.removeEventListener("blur", () => setIsTerminalVisible(false))
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [resetIdleTimer, focusInput])

  useEffect(() => {
    // Clear any existing interval when dependencies change or component unmounts
    if (transitionIntervalRef.current) {
      clearInterval(transitionIntervalRef.current)
      transitionIntervalRef.current = null
    }

    if (displayingOutput) {
      // If output is being typed, terminal must be visible and not idle
      setIsTerminalVisible(true)
      setIsIdle(false) // Ensure idle state is off
      resetIdleTimer() // Keep resetting idle timer
    } else if (isIdle) {
      // If idle and not typing, start the alternating fade
      // Ensure terminal is visible initially when entering idle mode, then start the toggle.
      setIsTerminalVisible(true)
      transitionIntervalRef.current = setInterval(() => {
        setIsTerminalVisible((prev) => !prev)
      }, IDLE_TOGGLE_INTERVAL)
    } else {
      // If not idle and not typing, ensure terminal is visible
      setIsTerminalVisible(true)
    }

    // Cleanup function for the effect
    return () => {
      if (transitionIntervalRef.current) {
        clearInterval(transitionIntervalRef.current)
      }
    }
  }, [isIdle, displayingOutput, resetIdleTimer]) // Dependencies for this effect

  useEffect(() => {
    // Ensure terminal scrolls to the bottom whenever history or typing state changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, displayingOutput])

  return (
    <div
      className="relative h-screen bg-black text-emerald-400 font-mono flex flex-col overflow-hidden" // Changed min-h-screen to h-screen
      onClick={focusInput} // Moved onClick to the outermost div
    >
      {/* Background Image */}
      <Image
        src="/background.jpg"
        alt="Abstract background"
        width={420} // Set your desired width
        height={420} // Set your desired height
        objectFit="contain" // Ensures the entire image is visible within its dimensions
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-${TRANSITION_DURATION} ${
          isTerminalVisible ? "opacity-0" : "opacity-80"
        }`}
        priority
      />

      {/* Terminal Overlay */}
      <div
        className={`absolute inset-0 flex flex-col transition-opacity duration-${TRANSITION_DURATION} ${
          isTerminalVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        // onClick removed from here, now on parent div
      >
        <div className="border-b border-emerald-400 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm">Hamza — portfolio</span>
            </div>
            {/* Removed Hamza@portfolio:~$ from top right */}
          </div>
        </div>
        <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto cursor-text custom-scrollbar">
          <div className="space-y-2">
            {history.map((command, index) => (
              <div key={index}>
                {command.input && (
                  <div className="flex">
                    <span className="text-emerald-400 mr-2">Hamza@portfolio:~$</span>
                    <span className="text-white">{command.input}</span>
                  </div>
                )}
                {command.output.map((line, lineIndex) => (
                  <div
                    key={lineIndex}
                    className="text-emerald-400 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
                ))}
              </div>
            ))}
            <form onSubmit={handleSubmit} className="flex">
              <span className="text-emerald-400 mr-2">Hamza@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none caret-emerald-400"
                autoComplete="off"
                spellCheck="false"
                disabled={displayingOutput} // Disable input during typing animation
              />
              {!displayingOutput && <span className="animate-pulse text-emerald-400">█</span>}
            </form>
          </div>
        </div>
        <div className="border-t border-emerald-400 p-2 text-xs opacity-70 text-center flex justify-between items-center">
          <span>Ctrl+C to interrupt • Type "help" for commands</span>
          <button
            onClick={() => setIsCoffeeModalOpen(true)}
            className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
          >
            Buy Me Coffee ☕
          </button>
        </div>
      </div>

      {/* Buy Me Coffee Modal */}
      <BuyMeCoffeeModal
        isOpen={isCoffeeModalOpen}
        onClose={() => setIsCoffeeModalOpen(false)}
        onConfirmPayment={handleMpesaPayment}
      />
    </div>
  )
}
