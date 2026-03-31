import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import SectionHeading from "../SectionHeading";

export default function Chromaticity() {
  const slides = useMemo(
    () => [
      { src: "/images/projects/chromaticity/chromaticity-home.png", alt: "Chromaticity home screen", fit: "cover" },
      { src: "/images/projects/chromaticity/chromaticity-demo.gif", alt: "Chromaticity gameplay demo", fit: "cover" },
      { src: "/images/projects/chromaticity/chromaticity-connecting.png", alt: "Chromaticity connecting view", fit: "cover" },
      { src: "/images/projects/chromaticity/chromaticity-arc.png", alt: "Chromaticity gameplay arc", fit: "contain" },
    ],
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];
  const goPrev = () => setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % slides.length);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [slides.length]);

  return (
    <div className="mt-4 space-y-6">
      <div className="mb-6">
        <div className="relative">
          <div className="absolute top-[4px] left-[4px] w-full h-full bg-primary rounded-2xl"></div>
          <div className="relative z-10 bg-background border border-primary rounded-2xl overflow-hidden p-3">
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-primary bg-[var(--background)]">
              <Image
                key={activeSlide.src}
                src={activeSlide.src}
                alt={activeSlide.alt}
                width={1280}
                height={720}
                className={`w-full h-full ${activeSlide.fit === "contain" ? "object-contain" : "object-cover"}`}
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={goPrev}
                className="transition-all bg-background2 px-3 py-1 flex items-center whitespace-nowrap border border-[var(--primary)] md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full"
              >
                <span className="font-body font-medium text-sm text-[var(--primary)]">Prev</span>
              </button>

              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={idx === activeIndex ? "true" : "false"}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 w-2.5 rounded-full border border-primary transition-all ${
                      idx === activeIndex
                        ? "bg-primary scale-110 shadow-[0_0_8px_var(--primary)]"
                        : "bg-transparent opacity-70 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                className="transition-all bg-background2 px-3 py-1 flex items-center whitespace-nowrap border border-[var(--primary)] md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full"
              >
                <span className="font-body font-medium text-sm text-[var(--primary)]">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <SectionHeading>The Project</SectionHeading>
        <p className="font-body font-light">
          Chromaticity is a real-time computer vision fitness game where body movement becomes the controller for a
          pixel-art platformer experience. We also built a physical motion controller, making the experience feel like
          a hybrid of hardware + vision-based gameplay.
        </p>
      </div>

      <div className="mb-6">
        <SectionHeading>Technical Overview</SectionHeading>
        <ul className="list-disc pl-5 font-body font-light dark:[&>li]:marker:text-darkSecondary">
          <li>Built with Next.js and TypeScript for responsive gameplay and interface logic</li>
          <li>
            Used TensorFlow.js for computer vision, running the MoveNet pose model to detect joints/keypoints and map
            movement into in-game actions
          </li>
          <li>Integrated Phaser + Three.js to drive platformer mechanics and scene rendering</li>
          <li>Built a physical controller to complement vision input and improve responsiveness during gameplay</li>
          <li>Designed an input pipeline that fuses live camera signals and controller events into one control stream</li>
        </ul>
      </div>

      <div className="mb-6">
        <SectionHeading>Thoughts</SectionHeading>
        <p className="font-body mb-6 font-light">
          I built Chromaticity with my co-op coworker at the time during a hackathon, specifically to try out computer
          vision as part of my push to learn more about machine learning. It was exciting seeing MoveNet reliably
          track joints in real time, and then shaping that signal into controls that felt fun, responsive, and
          accessible.
        </p>
      </div>
    </div>
  );
}

