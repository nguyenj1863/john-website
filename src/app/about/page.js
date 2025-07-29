'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const SKILL_GROUPS = [
  { category: 'Programming Languages', items: ['Python', 'C', 'Java', 'JavaScript'] },
  { category: 'Web Development', items: ['HTML/CSS', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Flask'] },
  { category: 'Data Science & Machine Learning', items: ['SQLAlchemy', 'Pandas', 'OpenAI', 'Gemini'] },
  { category: 'Cloud & Database', items: ['SQL'] },
  { category: 'Desktop & Systems', items: ['Windows', 'Linux'] }
];

const SectionHeading = ({ children, ellipseRotation = -5 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={headingRef}
      className="flex items-center mb-4 relative group"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div className="relative inline-block">
        <svg
          width="200"
          height="60"
          viewBox="0 0 200 60"
          className="absolute -left-3 -top-2 h-12 w-auto"
        >
          <ellipse
            cx="100"
            cy="30"
            rx="90"
            ry="18"
            transform={`rotate(${ellipseRotation}, 90, 20)`}
            className="fill-none stroke-[0.5px] stroke-primary"
            strokeDasharray={
              isVisible ? (isHovered && !isMobile ? '0, 565' : '565') : '0, 565'
            }
            strokeDashoffset="0"
            style={{
              transition: isVisible
                ? 'stroke-dasharray 1.2s ease-in-out'
                : 'none',
              filter: 'drop-shadow(0 0 6px var(--ellipse-glow))',
            }}
          />
        </svg>

        <div className="relative">
          <div className="relative">
            {/* Stroke Layer */}
            <h2
              className="text-5xl font-heading font-bold md:whitespace-nowrap tracking-tight"
              style={{
                WebkitTextStroke: 'var(--stroke-width) var(--stroke-colour)',
                textStroke: 'var(--stroke-width) var(--stroke-colour)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {children}
            </h2>

            {/* Fill Layer */}
            <h2
              className="text-5xl font-heading font-bold md:whitespace-nowrap tracking-tight absolute top-0 left-0"
              style={{
                color: 'var(--text-fill-colour)',
                zIndex: 2,
              }}
            >
              {children}
            </h2>
          </div>
        </div>
      </div>

      {
        !isMobile && (
          <div className="hidden md:flex items-center w-full ml-4 relative top-[2px]">
            <div className="flex-grow h-px bg-primary"></div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="ml-1 transition-transform duration-300 ease-in-out"
              style={{
                transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                filter: 'drop-shadow(0 0 3px var(--sparkle-glow))',
              }}
            >
              <path
                d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z"
                fill="transparent"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z"
                fill="background"
                stroke="transparent"
              />
            </svg>
          </div>
        )
      }
    </div>
  );
};

export default function About() {
    return (
        <div>
            <div className="p-6 bg-[var(--background)] transition-all">
            <SectionHeading ellipseRotation={-8}>Hi, I'm John!</SectionHeading>
            <p className="mb-4 font-body font-light text-lg">
            I'm a computer science student at the University of Guelph who loves building practical solutions and learning through implementation. I've worked across various tech stacks in academic, personal, and professional projects, and I'm always eager to learn more.
            </p>
            <p className="mb-4 font-body font-light text-lg">
            When I'm not on VSCode, you'll probably find me indulging in my creative side through art,
            whether it's sketching, flipping through records, or exploring new matcha shops. I also like to make an unnecessary amount of Spotify playlist and consider myself to be a music enthusiast (with a soft spot for hip-pop and rnb genre), having Drake as my top artist of the year :).
            </p>
        </div>
        <div className="p-6 bg-[var(--background)] transition-all mt-10">
            <SectionHeading ellipseRotation={-5}>Technical Skills</SectionHeading>
            <p className="mb-4 font-body font-light text-lg">In no particular order, here's a mix of some languages, libraries, frameworks, and tools that I have experience working with.</p>
        </div>
        <div className="p-6 bg-[var(--background)] transition-all">
            {SKILL_GROUPS.map((group, index) => (
                <div
                    key={group.category}
                    className={index !== SKILL_GROUPS.length - 1 ? 'mb-8' : ''}
                >
                    <h3 className="text-2xl font-body font-bold text-primary mb-2 tracking-tighter neon-glow">{group.category}</h3>
                    <div className="flex flex-wrap gap-3">
                        {group.items.map((skillName) => (
                            <SkillBadge key={skillName} skillName={skillName} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}

const SkillBadge = ({ skillName }) => {
  const iconPath = `/images/tech_icons/${skillName.toLowerCase()
    .replace('.', '')
    .replace('/', '-')
    .replace('#', 'sharp')
    .replace(' ', '')}.png`;

  return (
      <div className="relative z-10 transition-all bg-var(--background) p-2 pr-4 flex items-center whitespace-nowrap border border-[var(--primary)] md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full">
        <div className="w-6 h-6 mr-2 flex items-center justify-center">
          <img src={iconPath} alt={skillName} className="w-5 h-5 object-contain" />
        </div>
        <span className="font-body font-medium text-[var(--primary)] text-base neon-glow">{skillName}</span>
      </div>
  );
};