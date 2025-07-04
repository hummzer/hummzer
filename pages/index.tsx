import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

interface HomeProps {
  projects: Project[];
}

const Home: React.FC<HomeProps> = ({ projects }) => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ['Software Engineer', 'Tech Enthusiast', 'Pentester'];
  const projectsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollNext = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Placeholder badge data (replace with your Credly/HTB badge URLs)
  const certifications = [
    { id: 1, name: 'Credly: AWS Certified Developer', image: 'https://via.placeholder.com/100?text=Credly' },
    { id: 2, name: 'HTB: Web Exploitation', image: 'https://via.placeholder.com/100?text=HTB' },
    { id: 3, name: 'Credly: Python Professional', image: 'https://via.placeholder.com/100?text=Credly' },
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #E6F0FA 0%, #F5F5F7 100%)',
        color: '#1C2526',
        fontFamily: "'SF Pro Display', -apple-system, sans-serif",
        position: 'relative',
        overflowX: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* iOS-style Particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            background: 'rgba(0, 122, 255, 0.3)',
            borderRadius: '50%',
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animation: `fadeMove ${3 + Math.random() * 3}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Banner Section */}
      <motion.section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 0',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div
          style={{
            maxWidth: '672px',
            width: '85%',
            height: '300px',
            margin: '2rem auto',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            border: '1px solid #E5E5E7',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            display: 'flex',
          }}
        >
          {/* Left Side: "I am a" and Professions */}
          <div
            style={{
              width: '60%',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <motion.h1
              style={{
                fontSize: '2.5rem',
                fontWeight: 600,
                color: '#1C2526',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              {['I', ' ', 'a', 'm', ' ', 'a'].map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], color: ['#1C2526', '#1C2526', '#1C2526', '#FFFFFF'] }}
                  transition={{ duration: 2, delay: i * 0.2, times: [0, 0.3, 0.7, 1] }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                style={{
                  fontSize: '2rem',
                  color: '#FF2D55',
                  fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                  marginTop: '1rem',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {texts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          {/* Right Side: Image */}
          <div
            style={{
              width: '40%',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '80%',
                background: 'url(https://via.placeholder.com/200?text=Your+Image) center/cover',
                borderRadius: '16px',
              }}
            />
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        style={{ padding: '4rem 0' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: '672px',
            width: '85%',
            height: '300px',
            margin: '2rem auto',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            border: '1px solid #E5E5E7',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '1rem', color: '#1C2526', textAlign: 'center' }}>
            About Me
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#1C2526', lineHeight: '1.5', textAlign: 'center' }}>
            Software Engineering student passionate about coding and cybersecurity.
          </p>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        style={{ padding: '4rem 0' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: '672px',
            width: '85%',
            height: '300px',
            margin: '2rem auto',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            border: '1px solid #E5E5E7',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            position: 'relative',
          }}
        >
          <h2 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '1rem', color: '#1C2526', textAlign: 'center' }}>
            Projects
          </h2>
          <div
            ref={projectsRef}
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '1rem',
              paddingBottom: '1rem',
            }}
          >
            {projects.length === 0 ? (
              <p style={{ color: '#1C2526', textAlign: 'center', fontSize: '1.125rem', width: '100%' }}>
                No projects available.
              </p>
            ) : (
                projects.map((project) => (
                  <motion.div
                    key={project.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E5E5E7',
                      padding: '1rem',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                      minWidth: '250px',
                      position: 'relative',
                      overflow: 'visible',
                    }}
                    animate={{
                      rotate: [0, 2, -2, 0],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1C2526', marginBottom: '0.5rem' }}>
                      {project.name}
                    </h3>
                    <p style={{ fontSize: '1rem', color: '#1C2526', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                      {project.description || 'No description available.'}
                    </p>
                    <motion.a
                      href={project.html_url}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: '#007AFF',
                        color: '#FFFFFF',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                      whileHover={{ background: '#005BB5' }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub
                      <span style={{ marginLeft: '0.5rem', fontSize: '1rem' }}>→</span>
                    </motion.a>
                  </motion.div>
                ))
              )}
          </div>
          <motion.button
            onClick={() => scrollNext(projectsRef)}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#007AFF',
              color: '#FFFFFF',
              padding: '0.5rem',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
            whileHover={{ background: '#005BB5' }}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section
        id="certifications"
        style={{ padding: '4rem 0' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: '672px',
            width: '85%',
            height: '300px',
            margin: '2rem auto',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            border: '1px solid #E5E5E7',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            position: 'relative',
          }}
        >
          <h2 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '1rem', color: '#1C2526', textAlign: 'center' }}>
            Certifications & Badges
          </h2>
          <div
            ref={certsRef}
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '1rem',
              paddingBottom: '1rem',
            }}
          >
            {certifications.map((cert) => (
              <div
                key={cert.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E5E5E7',
                  padding: '1rem',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                  minWidth: '250px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  src={cert.image}
                  alt={cert.name}
                  style={{ width: '60px', height: '60px', borderRadius: '8px' }}
                />
                <p style={{ fontSize: '1rem', color: '#1C2526', fontWeight: 500 }}>
                  {cert.name}
                </p>
              </div>
            ))}
          </div>
          <motion.button
            onClick={() => scrollNext(certsRef)}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#007AFF',
              color: '#FFFFFF',
              padding: '0.5rem',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
            whileHover={{ background: '#005BB5' }}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        style={{ padding: '4rem 0' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: '672px',
            width: '85%',
            height: '300px',
            margin: '2rem auto',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            border: '1px solid #E5E5E7',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
          }}
        >
          <h2 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '1rem', color: '#1C2526', textAlign: 'center' }}>
            Contact Me
          </h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              type="text"
              placeholder="Your Name"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                background: '#F5F5F7',
                color: '#1C2526',
                border: '1px solid #E5E5E7',
                fontSize: '1rem',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#007AFF')}
              onBlur={(e) => (e.target.style.borderColor = '#E5E5E7')}
            />
            <input
              type="email"
              placeholder="Your Email"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                background: '#F5F5F7',
                color: '#1C2526',
                border: '1px solid #E5E5E7',
                fontSize: '1rem',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#007AFF')}
              onBlur={(e) => (e.target.style.borderColor = '#E5E5E7')}
            />
            <textarea
              placeholder="Your Message"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                background: '#F5F5F7',
                color: '#1C2526',
                border: '1px solid #E5E5E7',
                fontSize: '1rem',
                outline: 'none',
                resize: 'none',
                height: '100px',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#007AFF')}
              onBlur={(e) => (e.target.style.borderColor = '#E5E5E7')}
              rows={5}
            />
            <motion.button
              type="submit"
              style={{
                width: '100%',
                background: '#007AFF',
                color: '#FFFFFF',
                padding: '0.75rem',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
              whileHover={{ background: '#005BB5' }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section
        id="blog"
        style={{ padding: '4rem 0' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: '672px',
            width: '85%',
            height: '300px',
            margin: '2rem auto',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            border: '1px solid #E5E5E7',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '1rem', color: '#1C2526' }}>
            Blog
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#1C2526', textAlign: 'center', lineHeight: '1.5' }}>
            Coming soon! Check back for updates on software engineering and cybersecurity insights.
          </p>
        </div>
      </motion.section>

      {/* Inline Keyframes for Particles */}
      <style>
        {`
@keyframes fadeMove {
0% { opacity: 0; transform: translateY(0); }
50% { opacity: 0.5; transform: translateY(-20px); }
100% { opacity: 0; transform: translateY(0); }
}
`}
      </style>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const headers = process.env.GITHUB_TOKEN
      ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
      : {};
    const res = await fetch('https://api.github.com/users/hummzer/repos', { headers });
    if (!res.ok) {
      console.error(`GitHub API error: ${res.status}`);
      return { props: { projects: [] } };
    }
    const data = await res.json();
    return {
      props: {
        projects: data,
      },
      revalidate: 86400,
    };
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return { props: { projects: [] } };
  }
}

export default Home;
