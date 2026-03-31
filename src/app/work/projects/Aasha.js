import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import SectionHeading from "../SectionHeading";

export default function Aasha() {
  const slides = useMemo(
    () => [
      { type: "video", src: "/images/projects/aasha/aasha-demo.mp4", alt: "Aasha demo video" },
      { type: "image", src: "/images/projects/aasha/aasha-home.png", alt: "Aasha home" },
      { type: "image", src: "/images/projects/aasha/aasha-patient.png", alt: "Aasha patient view" },
      { type: "image", src: "/images/projects/aasha/aasha-calendar.png", alt: "Aasha calendar view" },
      { type: "image", src: "/images/projects/aasha/aasha-map.png", alt: "Aasha map view" },
    ],
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % slides.length);
  const activeSlide = slides[activeIndex];

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
              {activeSlide.type === "video" ? (
                <video
                  key={activeSlide.src}
                  src={activeSlide.src}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                />
              ) : (
                <Image
                  key={activeSlide.src}
                  src={activeSlide.src}
                  alt={activeSlide.alt}
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover"
                />
              )}
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
          Aasha is an AI-powered maternal health triage system built for low-connectivity settings. It enables
          symptom reporting over SMS and supports clinical QA + triage workflows grounded in WHO guidelines and
          patient-specific medical history.
        </p>
      </div>

      <div className="mb-6">
        <SectionHeading>Technical Overview</SectionHeading>
        <ul className="list-disc pl-5 font-body font-light dark:[&>li]:marker:text-darkSecondary">
          <li>
            Built a dual-context RAG pipeline for LLM-powered clinical QA triage, combining WHO clinical guidelines
            with patient-specific medical history
          </li>
          <li>
            Developed an SMS-based interface enabling patients without internet access to report symptoms in
            low-connectivity environments
          </li>
          <li>
            Designed a doctor dashboard in TypeScript/React that visualizes patients on a map and prioritizes visits
            based on real-time risk levels
          </li>
          <li>
            Implemented route planning with a PostgreSQL-backed data layer to manage patient records and optimize visit
            scheduling by severity and location
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <SectionHeading>Thoughts</SectionHeading>
        <p className="font-body mb-6 font-light">
          This was one of my favorite hackathon builds because it forced the product + technical design to revolve
          around real constraints. I was especially excited to use RAG for the first time and see how much better the
          triage flow became when retrieval was grounded in real clinical guidance. For me, GenAI Genesis was mostly
          about learning how to use GenAI to solve real-world problems in a meaningful way. I also really connected to
          this project personally, since I grew up in a rural area in Vietnam and saw this as a plausible solution to
          this kind of healthcare access crisis. Designing for SMS and low connectivity made every workflow choice
          matter, from how information is collected to how clinicians see and act on risk.
        </p>
      </div>
    </div>
  );
}

