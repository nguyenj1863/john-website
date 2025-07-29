'use client'

import { useEffect, useRef, useState } from 'react';
import LastFm from './LastFm';
import AlbumCollage from './AlbumCollage';

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
            className="fill-none stroke-[0.5px] stroke-primary dark:stroke-darkSecondary"
            strokeDasharray={
              isVisible ? (isHovered && !isMobile ? '0, 565' : '565') : '0, 565'
            }
            strokeDashoffset="0"
            style={{
              transition: isVisible
                ? 'stroke-dasharray 1.2s ease-in-out'
                : 'none',
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
            <div className="flex-grow h-px bg-primary dark:bg-darkSecondary"></div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="ml-1 transition-transform duration-300 ease-in-out"
              style={{
                transform: isHovered ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              <path
                d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z"
                fill="transparent"
                stroke="var(--primary)"
                strokeWidth="2"
                strokeLinejoin="round"
                className="dark:stroke-darkSecondary"
              />
              <path
                d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z"
                fill="background"
                stroke="transparent"
                className="dark:fill-darkSecondary"
              />
            </svg>
          </div>
        )
      }
    </div>
  );
};

export default function MiscPage() {
    const [listenRec, setListenRec] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!listenRec) return;

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
        const response = await fetch('/api/send_recs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ listenRec }),
        });

        setSubmitMessage(response.ok
            ? 'Thanks!'
            : 'Failed to send :('
        );

        if (response.ok) {
            setListenRec('');
        }
        } catch {
            setSubmitMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitMessage(''), 5000);
        }
    };

    return (
        <div>
            <div className="overflow-x-hidden p-6 bg-[var(--background)] transition-all mt-8">
                <RecentMediaSection />
            </div>
            <div className="overflow-x-hidden p-6 bg-[var(--background)] transition-all mt-8">
                <FavoritesSection />
            </div>
            <div className="overflow-x-hidden p-6 bg-[var(--background)] transition-all mt-8">
                <RecommendationForm
                    listenRec={listenRec}
                    isSubmitting={isSubmitting}
                    submitMessage={submitMessage}
                    onListenRecChange={(e) => setListenRec(e.target.value)}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

const RecommendationForm = ({
  listenRec,
  isSubmitting,
  submitMessage,
  onListenRecChange,
  onSubmit
}) => (
  <div>
    <p className="font-body font-light mb-6 text-lg">
      If you've made it this far, feel free to give me recommendations if you have any :) I'm not picky and I love listening to new things.
    </p>

    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 text-lg">
        <RecommendationInput
          label="Tell me what to listen to:"
          value={listenRec}
          onChange={onListenRecChange}
          placeholder="Artist, album, song, etc."
        />
      </div>
      <SubmitButton isSubmitting={isSubmitting} />
      {submitMessage && (
        <p className="mt-2 font-body font-light text-sm text-[var(--primary)]">
          {submitMessage}
        </p>
      )}
    </form>
  </div>
);

const RecentMediaSection = () => (
  <>
    <SectionHeading ellipseRotation={5}>Recent Listening</SectionHeading>
        <LastFm />
  </>
);

const FavoritesSection = () => (
  <>
    <SectionHeading ellipseRotation={-6}>Favourites!</SectionHeading>
    <p className="font-body font-light mb-4 text-lg">
      Since I shared my recents, I wanted to also share my favourites, though this will likely be changed frequently.
    </p>
    <div className="mb-4">
      <AlbumCollage />
    </div>
  </>
);

const RecommendationInput = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block font-body font-light mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="text-black w-full px-4 py-2 border bg-background border-primary font-body font-light focus:outline-none focus:ring-1 focus:ring-[var(--primary)] placeholder-[var(--secondary)] rounded-full"
      placeholder={placeholder}
    />
  </div>
);

const SubmitButton = ({ isSubmitting }) => (
  <div className="relative inline-block">
    {/* Main Button Layer */}
    <button
      type="submit"
      disabled={isSubmitting}
      className="relative z-10 transition-all bg-background dark:bg-darkBackground2 py-2 px-4 flex items-center whitespace-nowrap border border-[var(--primary)] dark:border-darkBackground2 md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full"
    >
      <span className="font-body text-base text-[var(--primary)]">
        {isSubmitting ? 'Sending...' : 'Send!'}
      </span>
    </button>
  </div>
);