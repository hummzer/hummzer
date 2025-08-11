// new page.jsx

"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import BuyMeCoffeeModal from "../components/buy-me-coffee-modal.jsx" // New modal component

const TYPING_SPEED = 20
const IDLE_TIMEOUT = 15000 // Increased idle time
const TRANSITION_DURATION = 1500 // Smoother, faster transition
const IDLE_TOGGLE_INTERVAL = 8000 // Toggles every 8 seconds

export default function TerminalPortfolio() {
  const [history, setHistory] = useState([])
  const [currentInput, setCurrentInput] = useState("")
  const [displayingOutput, setDisplayingOutput] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const [isTerminalVisible, setIsTerminalVisible] = useState(true)
  const [isCoffeeModalOpen, setIsCoffeeModalOpen] = useState(false)

  const inputRef = useRef(null)
  const terminalRef = useRef(null)
  const idleTimerRef = useRef(null)
  const transitionIntervalRef = useRef(null)

  const commands = {
    help: [
      "<span class='text-cyan-400'>Available Commands:</span>",
      "",
      "  <span class='text-purple-400'>about</span>     - Who am I?",
      "  <span class='text-purple-400'>skills</span>    - My tech stack",
      "  <span class='text-purple-400'>projects</span>  - My creations",
      "  <span class='text-purple-400'>contact</span>   - Reach out to me",
      "  <span class='text-purple-400'>resume</span>    - View my resume",
      "  <span class='text-purple-400'>clear</span>     - Clear the terminal screen",
      "  <span class='text-purple-400'>help</span>      - Show this list of commands",
      "  <span class='text-purple-400'>buy-coffee</span> - Support my work! ☕",
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
      "<span class='text-cyan-400'>Technical Skills:</span>",
      "",
      "  <span class='text-orange-400'>Frontend:</span>",
      "    • React, Next.js, JavaScript, TypeScript",
      "    • HTML5, CSS3, Tailwind CSS, Framer Motion",
      "",
      "  <span class='text-orange-400'>Backend:</span>",
      "    • Node.js, Laravel, PHP",
      "    • SQLite, MongoDB, MySQL, MariaDB, Prisma ORM",
      "    • RESTful APIs",
      "",
      "  <span class='text-orange-400'>DevOps & Tools:</span>",
      "    • Docker, Kubernetes, Vercel, CI/CD",
      "    • Git, GitHub Actions",
      "    • Linux, Bash & Python3 scripting",
      "",
    ],
    projects: [
      "<span class='text-cyan-400'>Recent Creations:</span>",
      "",
      "  <span class='text-indigo-400'>1. Bot Forge (Trading Bot Management)</span>",
      "     • A powerful platform for traders to create, manage, and backtest custom trading bots.",
      "     • Designed to simplify complex trading strategies with an intuitive interface.",
      "     • <span class='text-gray-500'>Tech:</span> Next.js, React, APIs, Backend not specified.",
      "     • <a href='https://bot-forge-eumi-lihslfc41-babus-projects-8dce53e8.vercel.app/' target='_blank' rel='noopener noreferrer' class='text-fuchsia-400 hover:underline transition-colors'>View Project →</a>",
      "",
      "  <span class='text-indigo-400'>2. Exquisite Private (Luxury E-commerce)</span>",
      "     • A modern luxury e-commerce store for timepieces and jewelry.",
      "     • Features a beautiful, responsive UI and dynamic product handling.",
      "     • <span class='text-gray-500'>Tech:</span> Next.js, TypeScript, Tailwind CSS.",
      "     • <a href='https://v0-modern-catalogue-design.vercel.app/' target='_blank' rel='noopener noreferrer' class='text-fuchsia-400 hover:underline transition-colors'>View Project →</a>",
      "",
      "  <span class='text-indigo-400'>3. Jola Pearl (Nails Parlour Website)</span>",
      "     • A sleek and modern website for a nails parlour, focusing on user experience.",
      "     • Implemented with a focus on fast load times and clean design.",
      "     • <span class='text-gray-500'>Tech:</span> Next.js, React, JavaScript, Tailwind CSS.",
      "     • <a href='https://jola-pearl.vercel.app/' target='_blank' rel='noopener noreferrer' class='text-fuchsia-400 hover:underline transition-colors'>View Project →</a>",
      "",
      "  <span class='text-indigo-400'>4. YouTube Shorts Automation Script</span>",
      "     • A Python script for automating the creation and uploading of video shorts.",
      "     • Streamlines content creation workflows for creators.",
      "     • <span class='text-gray-500'>Tech:</span> Python, moviepy, YouTube API.",
      "",
    ],
    contact: [
      "<span class='text-cyan-400'>Get in touch:</span>",
      "",
      "  <span class='text-purple-400'>Email:</span>    salimhamza371@gmail.com",
      "  <span class='text-purple-400'>GitHub:</span>   github.com/hummzer",
      "  <span class='text-purple-400'>Phone:</span>    +254 716 475 923",
      "  <span class='text-purple-400'>Website:</span>  hummzer.vercel.app",
      "",
      "Feel free to reach out for collaborations or opportunities!",
      "",
    ],
    resume: ["<span class='text-cyan-400'>Resume:</span>", "", "  You can download my resume at:", "  <a href='https://yourwebsite.com/resume.pdf' target='_blank' rel='noopener noreferrer' class='text-fuchsia-400 hover:underline transition-colors'>→ Download PDF</a>"],
    "buy-coffee": [
      "<span class='text-pink-400'>Launching M-Pesa payment simulator...</span>",
      "<span class='text-pink-400'>Please enter a valid amount and phone number in the modal.</span>",
      "",
    ],
  }

  const typeLine = useCallback((historyEntryIndex, lineIndex, fullLine, resolve) => {
    let charIndex = 0
    const interval = setInterval(() => {
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory]
        if (newHistory[historyEntryIndex]) {
          const targetEntry = { ...newHistory[historyEntryIndex] }
          const updatedOutput = [...targetEntry.output]
          if (charIndex < fullLine.length) {
            updatedOutput[lineIndex] = fullLine.substring(0, charIndex + 1)
            charIndex++
          } else {
            updatedOutput[lineIndex] = fullLine
            clearInterval(interval)
            resolve()
          }
          newHistory[historyEntryIndex] = { ...targetEntry, output: updatedOutput }
        } else {
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
      } else if (trimmedInput === "buy-coffee") {
        setIsCoffeeModalOpen(true)
        rawOutput = commands[trimmedInput]
      } else if (trimmedInput === "") {
        rawOutput = [""]
      } else if (commands.hasOwnProperty(trimmedInput)) {
        rawOutput = commands[trimmedInput]
      } else {
        rawOutput = [`<span class='text-red-400'>Command not found: ${trimmedInput}</span>`, 'Type "help" to see available commands.', ""]
      }

      const newHistoryEntryIndex = history.length
      setHistory((prev) => [...prev, { input, output: rawOutput.map(() => "") }])
      setDisplayingOutput(true)

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

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true)
    }, IDLE_TIMEOUT)
  }, [])

  const focusInput = useCallback(() => {
    setIsTerminalVisible(true)
    setIsIdle(false)
    inputRef.current?.focus()
    resetIdleTimer()
  }, [resetIdleTimer])

  const handleSimulatedPayment = useCallback(async (amount, phoneNumber) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const success = Math.random() > 0.2
    let message = ""

    if (success) {
      message = `<span class='text-emerald-400'>✅ Payment of KSH ${amount.toFixed(2)} from ${phoneNumber} successful! Thank you! ☕</span>`
    } else {
      message = `<span class='text-red-400'>❌ Payment of KSH ${amount.toFixed(2)} from ${phoneNumber} failed. Please try again.</span>`
    }

    setHistory((prev) => [
      ...prev,
      {
        input: `buy-coffee ${amount} ${phoneNumber}`,
        output: [message, ""],
      },
    ])

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
          "╭───────────────────────────────────────────────────╮",
          "│                 Welcome to Olympus                │",
          "│                                                   │",
          "│  I'm Hamza Salim, a Full Stack Software Engineer. │",
          '│  Type "<span class="text-purple-400">help</span>" to explore my world.                       │',
          "│  Click anywhere to focus the terminal.            │",
          "╰───────────────────────────────────────────────────╯",
          "",
        ],
      },
    ])
    setTimeout(() => focusInput(), 100)

    document.addEventListener("mousemove", resetIdleTimer)
    document.addEventListener("keydown", resetIdleTimer)
    document.addEventListener("blur", () => setIsTerminalVisible(false))

    return () => {
      document.removeEventListener("mousemove", resetIdleTimer)
      document.removeEventListener("keydown", resetIdleTimer)
      document.removeEventListener("blur", () => setIsTerminalVisible(false))
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [resetIdleTimer, focusInput])

  useEffect(() => {
    if (transitionIntervalRef.current) {
      clearInterval(transitionIntervalRef.current)
      transitionIntervalRef.current = null
    }

    if (displayingOutput) {
      setIsTerminalVisible(true)
      setIsIdle(false)
      resetIdleTimer()
    } else if (isIdle) {
      setIsTerminalVisible(true)
      transitionIntervalRef.current = setInterval(() => {
        setIsTerminalVisible((prev) => !prev)
      }, IDLE_TOGGLE_INTERVAL)
    } else {
      setIsTerminalVisible(true)
    }

    return () => {
      if (transitionIntervalRef.current) {
        clearInterval(transitionIntervalRef.current)
      }
    }
  }, [isIdle, displayingOutput, resetIdleTimer])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, displayingOutput])

  return (
    <div
      className="relative h-screen bg-zinc-950 text-emerald-400 font-mono flex flex-col overflow-hidden transition-colors duration-500"
      onClick={focusInput}
    >
      {/* Background Image with animated overlay */}
      <Image
        src="/background.jpg"
        alt="Abstract background"
        width={1920}
        height={1080}
        objectFit="cover"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[${TRANSITION_DURATION}ms] ${
          isTerminalVisible ? "opacity-0 scale-105" : "opacity-40 scale-100"
        }`}
        priority
      />

      {/* Terminal Overlay */}
      <div
        className={`absolute inset-0 flex flex-col transition-opacity duration-[${TRANSITION_DURATION}ms] ${
          isTerminalVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        } backdrop-blur-sm bg-black/60`}
      >
        <div className="border-b border-zinc-700/50 p-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-green-500/50"></div>
            </div>
            <span className="text-sm text-zinc-400">Hamza — <span className="text-cyan-400">Portfolio</span></span>
          </div>
          <div className="text-xs text-zinc-500">Hamza@portfolio:~</div>
        </div>
        <div ref={terminalRef} className="flex-1 p-6 overflow-y-auto cursor-text custom-scrollbar">
          <div className="space-y-4">
            {history.map((command, index) => (
              <div key={index}>
                {command.input && (
                  <div className="flex items-start">
                    <span className="text-cyan-400 mr-2 min-w-[150px]">Hamza@portfolio:~$</span>
                    <span className="text-white break-all">{command.input}</span>
                  </div>
                )}
                {command.output.map((line, lineIndex) => (
                  <div
                    key={lineIndex}
                    className="text-white whitespace-pre-wrap pl-8"
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
                ))}
              </div>
            ))}
            <form onSubmit={handleSubmit} className="flex items-start">
              <span className="text-cyan-400 mr-2 min-w-[150px]">Hamza@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none caret-fuchsia-400"
                autoComplete="off"
                spellCheck="false"
                disabled={displayingOutput}
              />
              {!displayingOutput && <span className="animate-pulse text-fuchsia-400">█</span>}
            </form>
          </div>
        </div>
        <div className="border-t border-zinc-700/50 p-3 text-xs opacity-80 flex justify-between items-center bg-zinc-950/50 backdrop-blur-md">
          <span className="text-zinc-500">Ctrl+C to interrupt • <span className="text-cyan-400">Type "help" for commands</span></span>
          <button
            onClick={(e) => { e.stopPropagation(); setIsCoffeeModalOpen(true) }}
            className="flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors duration-200 animate-pulse"
          >
            <span className="text-lg">☕</span> Buy Me Coffee
          </button>
        </div>
      </div>

      {/* Buy Me Coffee Modal */}
      <BuyMeCoffeeModal
        isOpen={isCoffeeModalOpen}
        onClose={() => setIsCoffeeModalOpen(false)}
        onConfirmPayment={handleSimulatedPayment}
      />
    </div>
  )
}