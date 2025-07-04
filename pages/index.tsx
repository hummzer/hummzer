import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
}

interface Droplet {
  left: string;
  duration: string;
  delay: string;
  translateX50: string;
  translateX100: string;
}

interface Certification {
  id: number;
  badgeId: string;
  host: string;
  name: string;
}

interface HomeProps {
  projects: Project[];
  waterDroplets: Droplet[];
}

const Home: React.FC<HomeProps> = ({ projects, waterDroplets }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const texts = ['Software Engineer', 'Tech Enthusiast', 'Pentester'];
  const projectsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
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

  const scrollPrev = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const certifications: Certification[] = [
    { id: 1, badgeId: 'c5e260c6-5cf0-40ae-a5c3-7e1ec0178bcc', host: 'https://www.credly.com', name: 'Course 1' },
    { id: 2, badgeId: '69bccc97-188d-4365-b97e-491feee29b12', host: 'https://www.credly.com', name: 'Course 2' },
    { id: 3, badgeId: '69da723e-04bf-43eb-9cf7-3db4075e7a7f', host: 'https://www.credly.com', name: 'Course 3' },
    { id: 4, badgeId: '2f0eca5d-bb41-42da-8e34-c0dc18c9072d', host: 'https://www.credly.com', name: 'Course 4' },
    // { id: 5, badgeId: '2f0eca5d-bb41-42da-8e34-c0dc18c9072d', host: 'https://www.credly.com', name: 'Course 5' }, // Uncomment and update if needed
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
      {/* Banner Section */}
      <motion.section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 0 4rem 0',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            height: '500px',
            margin: '0 auto 2rem auto',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            border: '1px solid #E5E5E7',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            position: 'relative',
          }}
        >
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
                  fontSize: '2.5rem',
                  color: '#8E8E93',
                  fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                  fontWeight: 700,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                  marginTop: '1rem',
                }}
                initial={{ opacity: 0, y: 20, textShadow: '2px 2px 4px rgba(0, 0, 0, 0)' }}
                animate={{ opacity: 1, y: 0, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
              >
                {texts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div
            style={{
              width: '40%',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '80%',
                background: 'url(/images/6e74707e-d907-4c55-a77b-01553266322d.jpg) center/cover',
                borderRadius: '16px',
              }}
            />
            {/* Uncomment to restore water droplets
            {waterDroplets.map((droplet, i) => (
              <div
                key={`img-droplet-${i}`}
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '10px',
                  background: 'rgba(0, 122, 255, 0.6)',
                  borderRadius: '50% 50% 20% 20%',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  transformStyle: 'preserve-3d',
                  left: droplet.left,
                  bottom: '0',
                  animation: `waterRise-${i} ${droplet.duration} infinite ease-in-out`,
                  animationDelay: droplet.delay,
                }}
              />
            ))}
            */}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        style={{
          padding: '4rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: '850px',
            width: '100%',
            height: '360px',
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
            About Me
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#1C2526', lineHeight: '1.5', textAlign: 'center' }}>
            Software Engineer passionate about coding and cybersecurity.
          </p>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        style={{
          padding: '4rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: '850px',
            width: '100%',
            height: '360px',
            margin: '2rem auto',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            border: '1px solid #E5E5E7',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            padding: '2rem 2rem 12px 2rem',
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
              overflowX: 'hidden',
              gap: '1.5rem',
              paddingBottom: '12px',
            }}
          >
            {projects.length === 0 ? (
              <p style={{ color: '#1C2526', textAlign: 'center', fontSize: '1.125rem', width: '100%' }}>
                No projects available.
              </p>
            ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #E5E5E7',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05), 0 0 8px rgba(0, 122, 255, 0.2)',
                      backdropFilter: 'blur(4px)',
                      minWidth: '250px',
                      height: '260px',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '15%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 0.5rem',
                      }}
                    >
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1C2526' }}>
                        {project.name}
                      </h3>
                    </div>
                    <div
                      style={{
                        height: '60%',
                        padding: '0 0.5rem',
                        borderTop: '1px solid #E5E5E7',
                        borderBottom: '1px solid #E5E5E7',
                      }}
                    >
                      <p style={{ fontSize: '1rem', color: '#1C2526', lineHeight: '1.4', margin: 0 }}>
                        {project.description || 'No description available.'}
                      </p>
                    </div>
                    <div
                      style={{
                        height: '25%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 0.5rem',
                      }}
                    >
                      <motion.a
                        href={project.html_url}
                        style={{
                          flex: 1,
                          background: '#D1D5DB',
                          color: '#1C2526',
                          padding: '0.5rem',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          textAlign: 'center',
                          marginRight: '0.5rem',
                        }}
                        whileHover={{ background: '#9CA3AF' }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </motion.a>
                      {project.homepage && (
                        <motion.a
                          href={project.homepage}
                          style={{
                            flex: 1,
                            background: '#D1D5DB',
                            color: '#1C2526',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            textAlign: 'center',
                          }}
                          whileHover={{ background: '#9CA3AF' }}
                          whileTap={{ scale: 0.95 }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Website
                        </motion.a>
                      )}
                    </div>
                  </div>
                ))
              )}
          </div>
          <motion.button
            onClick={() => scrollPrev(projectsRef)}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#E5E7EB',
              color: '#1C2526',
              padding: '0.75rem',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              lineHeight: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
            }}
            whileHover={{ background: '#9CA3AF', scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={() => scrollNext(projectsRef)}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#E5E7EB',
              color: '#1C2526',
              padding: '0.75rem',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              lineHeight: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
            }}
            whileHover={{ background: '#9CA3AF', scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            →
          </motion.button>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section
        id="certifications"
        style={{
          padding: '4rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: '850px',
            width: '100%',
            height: '360px',
            margin: '2rem auto',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            border: '1px solid #E5E5E7',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            padding: '2rem 2rem 12px 2rem',
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
              overflowX: 'hidden',
              gap: '1.5rem',
              paddingBottom: '12px',
            }}
          >
            {certifications.map((cert) => (
              <div
                key={cert.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px',
                  border: '1px solid #E5E5E7',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05), 0 0 8px rgba(0, 122, 255, 0.2)',
                  backdropFilter: 'blur(4px)',
                  minWidth: '250px',
                  height: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {isClient && (
                  <div
                    style={{
                      height: '82%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      data-iframe-width="200"
                      data-iframe-height="200"
                      data-share-badge-id={cert.badgeId}
                      data-share-badge-host={cert.host}
                      style={{
                        width: '200px',
                        height: '200px',
                        overflow: 'hidden',
                      }}
                    />
                  </div>
                )}
                <div
                  style={{
                    height: '18%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderTop: '1px solid #E5E5E7',
                    padding: '0 0.5rem',
                  }}
                >
                  <p
                    style={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#1C2526',
                      textAlign: 'center',
                      lineHeight: '1.4',
                      margin: 0,
                    }}
                  >
                    {cert.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <motion.button
            onClick={() => scrollPrev(certsRef)}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#E5E7EB',
              color: '#1C2526',
              padding: '0.75rem',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              lineHeight: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
            }}
            whileHover={{ background: '#9CA3AF', scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={() => scrollNext(certsRef)}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#E5E7EB',
              color: '#1C2526',
              padding: '0.75rem',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              lineHeight: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
            }}
            whileHover={{ background: '#9CA3AF', scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            →
          </motion.button>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        style={{
          padding: '4rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: '850px',
            width: '100%',
            height: '420px',
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
            <div style={{ display: 'flex', gap: '1rem' }}>
              <motion.button
                type="submit"
                style={{
                  flex: 1,
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
              <motion.a
                href="tel:+254716 475 923" 
                style={{
                  flex: 1,
                  background: '#007AFF',
                  color: '#FFFFFF',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
                whileHover={{ background: '#005BB5' }}
                whileTap={{ scale: 0.95 }}
              >
                Call Me
              </motion.a>
            </div>
          </form>
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section
        id="blog"
        style={{
          padding: '4rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: '850px',
            width: '100%',
            height: '360px',
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

      {/* Inline Keyframes */}
      <style>
        {`
/* Uncomment to restore water droplets
${waterDroplets
.map(
(droplet, i) => `
@keyframes waterRise-${i} {
0% { opacity: 0.6; transform: translateY(100px) translateX(0); }
50% { opacity: 0.8; transform: translateY(0) translateX(${droplet.translateX50}px); }
100% { opacity: 0; transform: translateY(-100px) translateX(${droplet.translateX100}px); }
}
`
)
.join('')}
*/
/* Hide Credly iframe non-image content */
div[data-share-badge-id] iframe {
width: 200px !important;
height: 200px !important;
border: none;
}
div[data-share-badge-id] iframe * {
display: none;
}
div[data-share-badge-id] iframe img {
display: block !important;
width: 100%;
height: 100%;
object-fit: contain;
}
`}
      </style>

      {/* Credly Embed Script */}
      {isClient && <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>}
    </div>
  );
};

export async function getStaticProps() {
  const waterDroplets: Droplet[] = Array.from({ length: 10 }, () => ({
    left: `${70 + Math.random() * 80}px`,
    duration: `${2 + Math.random() * 2}s`,
    delay: `${Math.random() * 1.5}s`,
    translateX50: `${Math.random() * 20 - 10}`,
    translateX100: `${Math.random() * 20 - 10}`,
  }));

  try {
    const headers = process.env.GITHUB_TOKEN
      ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
      : {};
    const res = await fetch('https://api.github.com/users/hummzer/repos', { headers });
    if (!res.ok) {
      console.error(`GitHub API error: ${res.status}`);
      return { props: { projects: [], waterDroplets } };
    }
    const data = await res.json();
    return {
      props: {
        projects: data,
        waterDroplets,
      },
      revalidate: 86400,
    };
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return { props: { projects: [], waterDroplets } };
  }
}

export default Home;
