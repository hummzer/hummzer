"use client";

import { useState, useEffect, useRef } from "react";

export default function TerminalPortfolio() {
	const [history, setHistory] = useState([]);
	const [currentInput, setCurrentInput] = useState("");
	const inputRef = useRef(null);
	const terminalRef = useRef(null);

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
			"Helloworld! 👋",
			"",
			"I'm a Full Stack Software Engineer with a passion for building",
			"scalable web applications in Next JS, most of the time",
			"",
			"I love working with modern technologies and automation scripts,",
			"always eager to learn, adapt and automate rather short tasks that would take minutes to finish",
			"",
			"When I'm not coding, you can find me playing chess, making digital art",
			"contributing to open source, or enjoying a good cup of coffee.",
			"",
		],
		skills: [
			"Technical Skills:",
			"",
			"  Frontend:",
			"    • React, Next.js, TypeScript, JavaScript",
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
			"<span class='text-green-400'>Recent Projects:</span>",
			"",
			"  <span class='text-blue-400'>1. Meal Planner</span>",
			"     • Full-stack Next.js app for meal planning and grocery lists",
			"     • Integrated with Spoonacular API for recipes",
			"     • Deployed on Vercel with Prisma ORM",
			"",
			"  <span class='text-blue-400'>2. YouTube Shorts Automation Script</span>",
			"     • Python script for generating and uploading Shorts",
			"     • Uses moviepy for video editing and YouTube API",
			"     • Automated scheduling and metadata generation",
			"",
			"  <span class='text-blue-400'>3. Art Gallery</span>",
			"     • Next.js-based digital art showcase with dynamic rendering",
			"     • Cloudinary for image optimization and storage",
			"     • Interactive UI with Framer Motion",
			"",
			"  <span class='text-blue-400'>4. Blog Website</span>",
			"     • Next.js blog with MDX for content",
			"     • Supabase for user comments and authentication",
			"     • Deployed on Vercel with SEO optimization",
			"",
		],
		contact: [
			"Get in touch:",
			"",
			"  Email:    salimhamza371@gmail.com",
			"  GitHub:   github.com/hummzer",
			"  Phone:   +254 716 475 923",
			"  Website:  hummzer.vercel.app",
			"",
			"Feel free to reach out for collaborations or opportunities!",
			"",
		],
		resume: [
			"Resume:",
			"",
			"  You can download my resume at:",
			"  → https://yourwebsite.com/resume.pdf",
			"",
			"  Or view it online at:",
			"  → https://hummzer.vercel.app/",
			"",
		],
	};

	const executeCommand = (input) => {
		const trimmedInput = input.trim().toLowerCase();

		if (trimmedInput === "clear") {
			setHistory([]);
			return;
		}

		let output = [];

		if (trimmedInput === "") {
			output = [""];
		} else if (commands.hasOwnProperty(trimmedInput)) {
			output = commands[trimmedInput];
		} else {
			output = [
				`Command not found: ${trimmedInput}`,
				'Type "help" to see available commands.',
				"",
			];
		}

		setHistory((prev) => [...prev, { input, output }]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentInput.trim()) {
			executeCommand(currentInput);
			setCurrentInput("");
		}
	};

	const focusInput = () => {
		inputRef.current?.focus();
	};

	useEffect(() => {
		setHistory([
			{
				input: "",
				output: [
					"╭─────────────────────────────────────────────────╮",
					"│              Welcome to olympus                 │",
					"│                                                 │",
					'│  Type "help" to see available commands          │',
					"│  Click anywhere to focus the terminal           │",
					"╰─────────────────────────────────────────────────╯",
					"",
				],
			},
		]);
		setTimeout(() => focusInput(), 100);
	}, []);

	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [history]);

	return (
		<div className="min-h-screen bg-black text-green-400 font-mono flex flex-col">
		<div className="border-b border-green-400 p-4">
		<div className="flex items-center justify-between">
		<div className="flex items-center space-x-4">
		<div className="flex space-x-2">
		<div className="w-3 h-3 rounded-full bg-red-500"></div>
		<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
		<div className="w-3 h-3 rounded-full bg-green-500"></div>
		</div>
		<span className="text-sm">Hamza — portfolio</span>
		</div>
		<div className="text-sm opacity-70">Hamza@portfolio:~$</div>
		</div>
		</div>
		<div
		ref={terminalRef}
		className="flex-1 p-4 overflow-y-auto cursor-text"
		onClick={focusInput}
		>
		<div className="space-y-2">
		{history.map((command, index) => (
			<div key={index}>
			{command.input && (
				<div className="flex">
				<span className="text-green-400 mr-2">Hamza@portfolio:~$</span>
				<span className="text-white">{command.input}</span>
				</div>
			)}
			{command.output.map((line, lineIndex) => (
				<div
				key={lineIndex}
				className="text-green-400 whitespace-pre"
				dangerouslySetInnerHTML={{ __html: line }}
				/>
			))}
			</div>
		))}
		<form onSubmit={handleSubmit} className="flex">
		<span className="text-green-400 mr-2">Hamza@portfolio:~$</span>
		<input
		ref={inputRef}
		type="text"
		value={currentInput}
		onChange={(e) => setCurrentInput(e.target.value)}
		className="flex-1 bg-transparent text-white outline-none caret-green-400"
		autoComplete="off"
		spellCheck="false"
		/>
		<span className="animate-pulse text-green-400">█</span>
		</form>
		</div>
		</div>
		<div className="border-t border-green-400 p-2 text-xs opacity-70 text-center">
		Press Tab for autocomplete • Ctrl+C to interrupt • Type "help" for commands
		</div>
		</div>
	);
}
