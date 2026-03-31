'use client';

import { useState, useEffect } from 'react';
import { FiGithub } from 'react-icons/fi';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import Website from './projects/Website';
import GreenShift from './projects/GreenShift';
import FinSight from './projects/FinSight';
import Aasha from './projects/Aasha';

const DEFAULT_TECH_ICON = 'https://unpkg.com/lucide-static@latest/icons/code-2.svg';
const TECH_ICON_MAP = {
  Python: '/images/tech_icons/python.png',
  JavaScript: '/images/tech_icons/javascript.png',
  TypeScript: 'https://cdn.simpleicons.org/typescript',
  React: '/images/tech_icons/react.png',
  'Next.js': '/images/tech_icons/nextjs.png',
  'Tailwind CSS': '/images/tech_icons/tailwindcss.png',
  SQL: '/images/tech_icons/sql.png',
  PostgreSQL: 'https://cdn.simpleicons.org/postgresql',
  Flask: '/images/tech_icons/flask.png',
  FastAPI: 'https://cdn.simpleicons.org/fastapi',
  Claude: '/images/tech_icons/claude.svg',
  Gemini: 'https://cdn.simpleicons.org/googlegemini',
  RAG: '/images/tech_icons/rag.png',
};

const projects = [
    {
        id: 1,
        title: "Aasha (GenAI Genesis 2026)",
        subtitle: "An SMS-based maternal health triage system with a real-time dashboard.",
        image: "/images/projects/aasha/aasha-home.png",
        description:
          "Built at GenAI Genesis 2026, Aasha explores how GenAI can solve real-world healthcare challenges by monitoring high-risk pregnancies via structured SMS check-ins and prioritizing follow-ups with a live dashboard and protocol-grounded clinical reasoning.",
        expandedContent: <Aasha />,
        link: "https://devpost.com/software/aasha-ez5c4u",
        linkText: "Demo (beta)",
        githubLink: "https://github.com/arjunmenon17/Aasha",
        techStack: ['Python', 'TypeScript', 'React', 'PostgreSQL', 'FastAPI', 'RAG', 'Claude'],
    },
    {
      id: 2,
      title: "FinSight",
      subtitle: "A production‑ready app to help investors visualise performance across $1M+ in simulated assets.",
      image: "/images/projects/finsight.png",
      description: "FinSight is a asset management porfolio analytics simulator that I built as a personal project! It allows clients to put in their porfolio and analyze their investments throughout the years. This project was motivated by my interest in finance after looking at an TD article on Investing 1:1 and my curiosity in working with data; I wanted to obtain and transform assets into meaningful, interactive charts.",
      expandedContent: <FinSight />,
      githubLink: "https://github.com/ZainNizami/GreenShift",
      techStack: ['React', 'JavaScript', 'SQL', 'Python'],
    },
    {
      id: 3,
      title: "GreenShift (Hack the 6ix 2025)",
      subtitle: "An AI-powered interactive map that determines the risk of gentrification on Toronto Neighbourhoods.",
      image: "/images/projects/greenshift.png",
      description: "GreenShift was built at Hack the 6ix, where our team of 4 noobies wanted to learn how to optimize sustainability relative to gentrification, which is essentially replacing under-developped regions into more modern areas. Since we had limited time, our focus was on Toronto neighbours and how to help project managers predict the outcome of gentrification on the environment. This project was a combination of learning new frameworks, API's, and trying out AI for the first time to determine the risk of genetrification from modern data.",
      expandedContent: <GreenShift />,
      link: "https://devpost.com/software/greenshift-kxpn9v",
      linkText: "Demo (beta)",
      githubLink: "https://github.com/nguyenj1863/FinSight",
      techStack: ['Python', 'Flask', 'React', 'Gemini'],
    },
    {
        id: 4,
        title: "Personal Website",
        subtitle: "What you're looking at right now! :)",
        image: "/images/projects/website.png",
        description: "This website serves as a central hub for my professional history, side projects, and personal interests. I wanted this website to have purpose and be personal as possible. From showcasing my hobbies to displaying my real-time Spotify listening, I wanted it to feel like me. Thanks for checking it out!",
        expandedContent: <Website />,
        githubLink: "",
        techStack: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript'],
    },
  ]
  
const ProjectTitle = ({ children, rotateRight = false, isHovered = false }) => (
  <div className="relative inline-block overflow-visible">
    <svg
      width="180"
      height="60"
      viewBox="0 0 180 60"
      className="absolute -left-2 -top-1 h-14 w-auto"
    >
      <ellipse
        cx="70"
        cy="25"
        rx="60"
        ry="15"
        transform={rotateRight ? "rotate(6, 90, 30)" : "rotate(-6, 90, 30)"}
        className="fill-none stroke-[0.5px] stroke-primary dark:stroke-darkSecondary"
        strokeDasharray={isHovered ? 'none' : '0, 314'}
        strokeDashoffset="0"
        style={{
          transition: 'stroke-dasharray 0.8s ease-in-out',
          strokeDasharray: isHovered ? '314' : '0, 314',
          filter: 'drop-shadow(0 0 4px var(--ellipse-glow))',
        }}
      />
    </svg>

    {/* Title Text */}
    <h2 className="relative text-3xl font-body font-bold tracking-tighter leading-8 text-[var(--primary)]">
      
      {/* Stroke Layer */}
      <span
        className="absolute top-0 left-0 -z-10 text-3xl font-body font-bold tracking-tighter leading-8"
        style={{
          WebkitTextStroke: '2px var(--secondary)',
          textStroke: '2px var(--secondary)',
        }}
      >
        {children}
      </span>

      {/* Fill Layer */}
      <span className="relative z-10 text-[var(--primary)]">
        {children}
      </span>
    </h2>
  </div>
);
const ProjectCard = ({ project, index, isMobile, openProjectModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shadow Layer for Project Card */}
      <div className="absolute top-[4px] left-[4px] w-full h-full bg-primary rounded-2xl"></div>

      {/* Main Project Card Layer */}
      <div
        className={`relative z-10 transition-all bg-background border border-primary p-6 sm:p-6 sm:pl-8 rounded-2xl md:hover:-translate-y-1 md:hover:-translate-x-1`}
      >
        {/* Header with image and basic info */}
        <div className={`flex flex-col md:flex-row gap-6 mb-6 items-center ${index % 2 ? 'md:flex-row-reverse' : ''}`}>
          <div className="md:w-1/3 relative">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className={`w-full h-auto object-contain transition-all ${project.outlineImage ? 'border border-primary rounded-xl' : ''}`}
            />
          </div>

          <div className="md:w-2/3">
            <ProjectTitle rotateRight={index % 2 === 0} isHovered={isHovered}>
              {project.title}
            </ProjectTitle>
            <h3 className="text-lg font-body text-primary mb-6 mt-1 leading-tight neon-glow">
              {project.subtitle}
            </h3>
            <p className="font-body font-[var(--primary)]">
              {project.description}
            </p>
            {project.techStack?.length > 0 && (
              <div className="mt-4">
                <p className="font-body text-sm font-medium mb-2 text-[var(--primary)]">Tech Used</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => {
                    const iconPath = TECH_ICON_MAP[tech] ?? DEFAULT_TECH_ICON;
                    return (
                      <div
                        key={`${project.id}-${tech}`}
                        className="transition-all bg-background2 px-2 py-1 flex items-center whitespace-nowrap border border-[var(--primary)] rounded-full"
                      >
                        <img src={iconPath} alt={tech} className="w-4 h-4 object-contain mr-2" />
                        <span className="font-body font-medium text-xs text-[var(--primary)]">{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
          {/* Left: GitHub + Link */}
          <div className="flex items-center gap-2">
            {project.githubLink && (
              <div className="relative group flex items-center">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] text-xl md:hover:scale-110 transition-all flex items-center -ml-2"
                >
                  <FiGithub className="align-middle" />
                </a>
                {!isMobile && (
                  <div className="absolute left-1/2 -translate-x-[54%] bottom-full mb-2 bg-[var(--background)] px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary whitespace-nowrap pointer-events-none rounded-full font-body w-max">
                    <span>Github Repo</span>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary"></div>
                  </div>
                )}
              </div>
            )}

            {project.link && project.linkText && (
              <div className="relative inline-block">
                {/* Main Button Layer */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 transition-all bg-background2 px-3 py-1 flex items-center whitespace-nowrap border border-[var(--primary)] md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full"
                >
                  <span className="font-body font-medium text-sm text-[var(--primary)]">
                    {project.linkText}
                  </span>
                </a>
              </div>
            )}
          </div>

          {/* Right: Show More */}
          <div className="relative inline-block">
            <button
              onClick={() => openProjectModal(project)}
              className="relative z-10 transition-all bg-background2 px-3 py-1 flex items-center whitespace-nowrap border border-[var(--primary)] md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full"
            >
              <span className="neon-glow font-body font-medium text-sm text-[var(--primary)]">
                Show More
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WorkPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    useEffect(() => {
      const shouldLockScroll = Boolean(selectedProject);
      const previousBodyOverflow = document.body.style.overflow;
      const previousHtmlOverflow = document.documentElement.style.overflow;
      const mainElement = document.querySelector('main');
      const previousMainOverflow = mainElement ? mainElement.style.overflow : '';

      if (shouldLockScroll) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        if (mainElement) {
          mainElement.style.overflow = 'hidden';
        }
      }

      return () => {
        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overflow = previousHtmlOverflow;
        if (mainElement) {
          mainElement.style.overflow = previousMainOverflow;
        }
      };
    }, [selectedProject]);

    useEffect(() => {
      if (!selectedProject) return;

      const onKeyDown = (event) => {
        if (event.key === 'Escape') {
          setSelectedProject(null);
        }
      };

      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }, [selectedProject]);

    return (
        <div className="p-6 relative bg-[var(--background)] transition-all">
            <p className="font-body font-light mb-6">
                For each project, you can click on <span className="font-bold tracking-tighter">Show More</span> for details about the technical process and my thoughts.
            </p>
            <div className="space-y-8">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        isMobile={isMobile}
                        openProjectModal={setSelectedProject}
                    />
                ))}
            </div>

            {isMounted && selectedProject && createPortal(
              <div
                className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-[1px] flex items-center justify-center p-4"
                onClick={() => setSelectedProject(null)}
              >
                <div
                  className="relative w-full max-w-4xl max-h-[85vh] bg-[var(--background)] border border-primary rounded-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="sticky top-0 z-10 flex items-center justify-between p-5 pb-3 bg-[var(--background)] border-b border-primary">
                    <h3 className="text-2xl font-body font-bold tracking-tighter neon-glow text-[var(--primary)]">
                      {selectedProject.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="transition-all bg-background2 px-3 py-1 border border-[var(--primary)] rounded-full"
                    >
                      <span className="font-body font-medium text-sm text-[var(--primary)]">Close</span>
                    </button>
                  </div>
                  <div className="max-h-[calc(85vh-88px)] overflow-y-auto overscroll-contain p-5 pt-3 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[var(--background)] [&::-webkit-scrollbar-thumb]:bg-[var(--primary)]">
                    {selectedProject.expandedContent}
                  </div>
                </div>
              </div>,
              document.body
            )}
        </div>
    );
}