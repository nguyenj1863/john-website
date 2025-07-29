'use client';

import { useState, useRef, useEffect } from 'react';
import { FiGithub } from 'react-icons/fi';
import Image from 'next/image';
import Website from './projects/Website';
import GreenShift from './projects/GreenShift';
import FinSight from './projects/FinSight';

const projects = [
    {
        id: 1,
        title: "FinSight",
        subtitle: "A production‑ready app to help investors visualise performance across $1M+ in simulated assets.",
        image: "/images/projects/finsight.png",
        description: "FinSight is a asset management porfolio analytics simulator that I built as a personal project! It allows clients to put in their porfolio and analyze their investments throughout the years. This project was motivated by my interest in finance after looking at an TD article on Investing 1:1 and my curiosity in working with data; I wanted to obtain and transform assets into meaningful, interactive charts.",
        expandedContent: <FinSight />,
        githubLink: "https://github.com/ZainNizami/GreenShift",
    },
    {
      id: 2,
      title: "GreenShift",
      subtitle: "An AI-powered interactive map that determines the risk of gentrification on Toronto Neighbourhoods.",
      image: "/images/projects/greenshift.png",
      description: "GreenShift was built at Hack the 6ix, where our team of 4 noobies wanted to learn how to optimize sustainability relative to gentrification, which is essentially replacing under-developped regions into more modern areas. Since we had limited time, our focus was on Toronto neighbours and how to help project managers predict the outcome of gentrification on the environment. This project was a combination of learning new frameworks, API's, and trying out AI for the first time to determine the risk of genetrification from modern data.",
      expandedContent: <GreenShift />,
      link: "https://devpost.com/software/greenshift-kxpn9v",
      linkText: "Demo (beta)",
      githubLink: "https://github.com/nguyenj1863/FinSight",
    },
    {
        id: 3,
        title: "Personal Website",
        subtitle: "What you're looking at right now! :)",
        image: "/images/projects/website.png",
        description: "This website serves as a central hub for my professional history, side projects, and personal interests. I wanted this website to have purpose and be personal as possible. From showcasing my hobbies to displaying my real-time Spotify listening, I wanted it to feel like me. Thanks for checking it out!",
        expandedContent: <Website />,
        githubLink: "",
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
const ProjectCard = ({ project, index, expandedIds, toggleExpand, getHeight, contentRefs, isMobile }) => {
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
          </div>
        </div>

        {/* Expanded content with animated height */}
        <div
          ref={(el) => (contentRefs.current[project.id] = el)}
          className="transition-[height,opacity] duration-500 ease-in-out overflow-hidden"
          style={{
            height: expandedIds.includes(project.id)
              ? `${getHeight(project.id)}px`
              : '0px',
            opacity: expandedIds.includes(project.id) ? 1 : 0,
          }}
        >
          <div className="mt-4 space-y-6">
            {project.expandedContent}
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

          {/* Right: Show More/Less */}
          <div className="relative inline-block">
            {/* Main Button Layer */}
            <button
              onClick={() => toggleExpand(project.id)}
              className="relative z-10 transition-all bg-background2 px-3 py-1 flex items-center whitespace-nowrap border border-[var(--primary)] md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full"
            >
              <span className="neon-glow font-body font-medium text-sm text-[var(--primary)]">
                {expandedIds.includes(project.id) ? 'Show Less' : 'Show More'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WorkPage() {
    const [expandedIds, setExpandedIds] = useState([]);
    const contentRefs = useRef({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const toggleExpand = (id) => {
        setExpandedIds((prev) =>
        prev.includes(id)
            ? prev.filter((item) => item !== id)
            : [...prev, id]
        );
    };

    const getHeight = (id) => {
        const el = contentRefs.current[id];
        return el ? el.scrollHeight : 0;
    };

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
                        expandedIds={expandedIds}
                        toggleExpand={toggleExpand}
                        getHeight={getHeight}
                        contentRefs={contentRefs}
                        isMobile={isMobile}
                    />
                ))}
            </div>
        </div>
    );
}