'use client';
import "../styles/globals.css";
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef} from 'react';
import { metadata } from './metadata';
import { AiOutlineLinkedin, AiOutlineMenu } from 'react-icons/ai';
import { FiGithub} from 'react-icons/fi';
import { MdOutlineMail } from 'react-icons/md';

const MESSAGES = {
  '/': "Welcome! Make yourself at home and see what's here :)",
  '/about': "A little window into who I am and how I’ve grown as a developer.",
  '/work': "Projects I've explored - each one taught me something along the way.",
  '/misc': "A spot for the non-tect stuff I enjoy and value!",
}

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarVisible, setSidebarVisible] = useState(pathname === '/');
  const [nowPlaying, setNowPlaying] = useState(0);
  const [showNowPlaying, setShowNowPlaying] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMessage = MESSAGES[pathname] || MESSAGES['/'];

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Fetch Last.am Data (Spotify type shit)
  const fetchNowPlaying = async () => {
    try {
      const response = await fetch('/api/lastfm');
      const data = await response.json();
      if (data?.track?.name) {
        setNowPlaying({
          artist: data.track.artist['#text'] || data.track.artist,
          track: data.track.name,
          album: data.track.album?.['#text'],
          image: data.track.image,
          nowplaying: data.nowplaying
        });
      } else {
        setNowPlaying(null);
      }
    } catch (error) {
      console.error('Error fetching now playing:', error);
      setNowPlaying(null);
    }
  };

  const resetDialogue = () => {
    setDisplayText('');
    setCurrentIndex(0);
    setShowNowPlaying(false);
  };
  const handleLinkClick = (e, href) => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo(0,0);
    }

    if (pathname === href) {
      e.preventDefault();
      setSidebarVisible(true);
      router.push('/');
    } else {
      setSidebarVisible(false);
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Fetch Last.am (spotify) data every 10s
  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(interval);
  }, []);

  // If mobile, show sidebar
  useEffect(() => {
    if (isMobile) {
      setSidebarVisible(pathname === '/');
    }
    resetDialogue();
  }, [pathname, isMobile]);

  useEffect(() => {
    if (currentIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + currentMessage[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (currentIndex === currentMessage.length && !showNowPlaying) {
      const delay = setTimeout(() => {
        setShowNowPlaying(true);
      }, 3000);
      return () => clearTimeout(delay)
    }
  }, [currentIndex, currentMessage, showNowPlaying]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[var(--background)] text[var(--primary)] transition-all" style={{ height: '100dvh', width: '100dvw', overflow: 'hidden'}}>
        <div className="flex flex-col" style={{ height: '100dvh' }}>
          <div className="flex flex-1 overflow-hidden">
            {isMobile && pathname !== '/' && (
              <div className="fixed top-4 right-4 z-[1000]" ref={menuRef}>
                <button onClick={toggleMobileMenu} className="transition-all p-2 border border-primary bg-[var(--background)] rounded-full" aria-label="Menu">
                  <AiOutlineMenu className="text-2x1 text-[var(--primary)]" />
                </button>

                {isMobileMenuOpen && (
                  <div className="fixed right-4 top-16 w-60 bg-[var(--background2)] py-3 z-[1000] border border-primary transition-all rounded-2xl]">
                    <div className="flex flex-col items-center">
                      <MobileNavLink href="/" pathname={pathname} onClick={(e) => handleLinkClick(e, '/')}>Home</MobileNavLink>
                      <MobileNavLink href="/about" pathname={pathname} onClick={(e) => handleLinkClick(e, '/about')}>About</MobileNavLink>
                      <MobileNavLink href="/work" pathname={pathname} onClick={(e) => handleLinkClick(e, '/work')}>Recent Projects</MobileNavLink>
                      <MobileNavLink href="/misc" pathname={pathname} onClick={(e) => handleLinkClick(e, '/misc')}>Life Outside of Coding</MobileNavLink>
                    </div>
                    <div className="flex justify-center gap-4 px-4 pt-4">
                      <a href="mailto:nguyenj1863@gmail.com" rel="noopener noreferrer" className="text-[var(--primary)] transition-all">
                        <MdOutlineMail className="text-lg" />
                      </a>
                      <a href="https://www.linkedin.com/in/john-nguyen-a778b420b/" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] transition-all">
                        <AiOutlineLinkedin className="text-lg" />
                      </a>
                      <a href="https://github.com/nguyenj1863" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] transition-all">
                        <FiGithub className="text-lg" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
            {(!isMobile || pathname === '/') && (
              <Sidebar 
                isVisible={isSidebarVisible}
                pathname={pathname}
                displayText={displayText}
                showNowPlaying={showNowPlaying}
                nowPlaying={nowPlaying}
                onLinkClick={handleLinkClick}
                onAvatarClick={resetDialogue}
                isMobile={isMobile}
                currentIndex={currentIndex}
                currentMessage={currentMessage}
              />
            )}
            <main className={`flex-1 transition-all duration-700 ${isSidebarVisible && !isMobile ? 'translate-x-full' : 'translate-x-0'} overflow-y-auto ${!isMobile ? '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[var(--background)] [&::-webkit-scrollbar-thumb]:bg-[var(--primary)]' : ''}`}>
              <div className="relative min-h-full">
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {!isMobile && (
                    <div
                      className="w-full h-full bg-[length:20px_20px] bg-repeat opacity-40"
                      style={{
                        backgroundImage: 'radial-gradient(circle, var(--dot-color, #3e4442) 1px, transparent 0)',
                      }}
                    />
                  )}
                </div>
                <div id="main-content" className="flex justify-center px-2 md:px-16 py-10 relative z-10">
                  <div className="w-full max-w-4xl 2xl:max-w-5xl transition-all">
                    {children}
                  </div>
                </div>
              </div>
            </main>  
          </div>
        </div>
      </body>
    </html>
  );
}

function Sidebar({ isVisible, pathname, displayText, showNowPlaying, nowPlaying, onLinkClick, onAvatarClick, isMobile, currentIndex, currentMessage}) {
  const [ellipseVisible, setEllipseVisible] = useState(true);
  const [sparklesVisible, setSparklesVisible] = useState([true, true, true]);

  useEffect(() => {
    let mainInterval;
    let blinkTimeout;

    const animateEllipse = () => {
      setEllipseVisible(false);

      blinkTimeout = setTimeout(() => {
        setSparklesVisible([false, false, false]);

        setTimeout(() => {
          setSparklesVisible([true, true, true]);

          setTimeout(() => {
            setEllipseVisible(true);
          }, 500);
        }, 500);
      }, 1200);
    };

    const initialDelay = 1000 + Math.random() * 2000;
    let initialTimeout = setTimeout(() => {
      animateEllipse();

      mainInterval = setInterval(animateEllipse, 10000);
    }, initialDelay);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(mainInterval);
      clearTimeout(blinkTimeout);
    };
  }, []);

  return (
    <aside
      className={`${isVisible ? 'w-full' : 'w-[30%]'} bg-[var(--background)] outline outline-1 outline-primary flex flex-col relative transition-all duration-300 ease-in-out`}
      style={{ flexShrink: 0, width: isVisible ? '100%' : isMobile ? '100%' : '30%', height: '100dvh' }}
    >
      <div className="flex flex-col items-center justify-center h-[50vh] min-h-[300px] relative">
        <div className="w-full flex flex-col items-center">
          <button
            onClick={(e) => {
              if (pathname !== '/') onLinkClick(e, pathname);
            }}
            className="px-9 py-5 text-4xl font-semibold text-white rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-md transition-all duration-300">
            John Nguyen
          </button>  
        </div>

        <SocialLinks isMobile={isMobile} />
        <nav className="text-[var(--primary)] text-base font-light font-body mt-4 text-center space-y-1 relative z-30">
          <NavLink href="/about" pathname={pathname} onClick={(e) => onLinkClick(e, '/about')}>About</NavLink>
          <NavLink href="/work" pathname={pathname} onClick={(e) => onLinkClick(e, '/work')}>Recent Projects</NavLink>
          <NavLink href="/misc" pathname={pathname} onClick={(e) => onLinkClick(e, '/misc')}> Life Outside of Coding</NavLink>
        </nav>
      </div>
      <div className="h-[50vh] flex flex-col justify-end items-center relative">
        <div className="absolute bottom-2 left-4 text-xs text-[var(--primary)] font-body font-light z-20">
          Built with Love<br />by
          <span className="font-bold tracking-tighter neon-glow"> John Nguyen</span>
        </div>

        <DialogueBox
          displayText={displayText}
          showNowPlaying={showNowPlaying}
          nowPlaying={nowPlaying}
          onAvatarClick={onAvatarClick}
          currentIndex={currentIndex}
          currentMessage={currentMessage}
        />
      </div>
    </aside>

  );
}

function SocialLinks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile;
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="flex justify-center gap-2 text-xl items-center pt-1">
      <div className="relative group flex items-center">
        <a href="mailto:nguyenj1863@gmail.com" rel="noopener noreferrer">
          <MdOutlineMail className="text-[var(--primary)] md:hover:scale-110 text-2xl transition-all" />
        </a>
        {!isMobile && (
          <div className="absolute flex flex-col -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-[var(--background2)] px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary whitespace-nowrap pointer-events-none font-body rounded-full">
            <span>Email</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary"></div>
          </div>
        )}
      </div>

      <div className="relative group flex items-center">
        <a href="https://www.linkedin.com/in/john-nguyen-a778b420b/" target="_blank" rel="noopener noreferrer">
          <AiOutlineLinkedin className="text-[var(--primary)] md:hover:scale-110 text-2xl transition-all" />
        </a>
        {!isMobile && (
          <div className="absolute flex flex-col -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-[var(--background2)] px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary whitespace-nowrap pointer-events-none font-body rounded-full]">
            <span>LinkedIn</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary"></div>
          </div>
        )}
      </div>

      <div className="relative group flex items-center">
        <a href="https://github.com/nguyenj1863" target="_blank" rel="noopener noreferrer">
          <FiGithub className="text-[var(--primary)] md:hover:scale-110 text-xl transition-all" />
        </a>
        {!isMobile && (
          <div className="absolute flex flex-col -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-[var(--background2)] px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary whitespace-nowrap pointer-events-none font-body rounded-full">
            <span>GitHub</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
}

function NavLink({ href, pathname, onClick, children}) {
  const rotations = {
    '/about': 9,
    '/work': -8,
    '/misc': 5
  };
  const rotation = rotations[href] || 0;

  const [isHovered, setIsHovered] = useState(false);
  const [wasActive, setWasActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = pathname === href;
  
  useEffect(() => {
    let timeout;
    if(isActive) {
      setWasActive(true);
    } else if (wasActive) {
      timeout = setTimeout(() => setWasActive(false), 500);
    }
    return () => clearTimeout(timeout);
  }, [isActive]);
  
  const showEllipse = (isActive || isHovered || wasActive) && !isMobile;
  
  return (
    <div className="neon-glow relative bg-background transition-all rounded-full px-2">
      {!isMobile && (
        <svg
          width="120"
          height="30"
          viewBox="0 0 120 40"
          className={`absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-[110px] h-[40px] pointer-events-none transition-opacity duration-300 ${showEllipse ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        >
          <ellipse
            cx="60"
            cy="18"
            rx="55"
            ry="12"
            className="fill-none stroke-[0.5px] stroke-primary"
            strokeDashoffset="0"
            style={{
              transition: 'stroke-dasharray 0.5s ease-in-out',
              strokeDasharray: (isActive || isHovered) ? '345' : '0, 345',
            }}
          />
        </svg>
      )}
      <Link
        href={href}
        onClick={onClick}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        className={`relative block text-lg transition-[font-weight,letter-spacing] duration-500 ${isActive ? 'font-bold tracking-tighter' : ''}`}
      >
        {children}
      </Link>
    </div>
  );
}

function MobileNavLink({ href, pathname, onClick, children }) {
  return (
    <div className="relative py-1">
      <Link
        href={href}
        onClick={onClick}
        className={`neon-glow relative px-4 py-1 text-base font-body duration-[0.4s] ease-in-out ${pathname === href ? 'font-bold tracking-tighter' : 'font-light'
          }`}
      >
        {children}
      </Link>
    </div>
  );
}

function DialogueBox({ displayText, showNowPlaying, nowPlaying, onAvatarClick, currentIndex, currentMessage}){
  const [currentAvatar, setCurrentAvatar] = useState(0);
  const [avatarHeight, setAvatarHeight] = useState(0);
  const avatarRef = useRef(null);
  const isTyping = currentIndex < currentMessage.length;

  useEffect(() => {
    const updateAvatarSize = () => {
      const viewportHeight = window.innerHeight;
      const maxHeight = Math.min(viewportHeight / 3, 400);
      setAvatarHeight(maxHeight);
    };

    updateAvatarSize();
    window.addEventListener('resize', updateAvatarSize);
    return () => window.removeEventListener('resize', updateAvatarSize);
  }, []);

  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setCurrentAvatar(prev => (prev + 1) % 2);
      }, 200);
      return () => clearInterval(interval);
    } else if (showNowPlaying && nowPlaying?.nowPlaying) {
      const interval = setInterval(() => {
        setCurrentAvatar(prev => (prev + 1) % 2);
      }, 400);
      return () => clearInterval(interval);
    } else {
      setCurrentAvatar(0);
    }
  }, [isTyping, showNowPlaying, nowPlaying]);

  const getAvatarImage = () => {
    return `/images/avatar/me-listening${currentAvatar + 1}.png`;
  }

  const handleAvatarClick = () => {
    onAvatarClick();
  }
  
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[520px] z-10">
      <div className="relative -top-5 mx-auto" style={{ width: "fit-content", maxWidth: "70%" }}>
        <div className=
          {`bg-[var(--background)] border border-primary p-2 px-4 text-[var(--primary)] whitespace-pre-line text-center min-h-[40px] 
            font-body font-light text-base rounded-full
            ${showNowPlaying ? 'pr-6' : ''}`}>
              {showNowPlaying ? (
                nowPlaying ? (
                  <NowPlayingDisplay nowPlaying={nowPlaying} />
                ) : (
                  <NoTracksDisplay />
                )
              ) : (
                <span className="neon-glow">{displayText}</span>
            )}
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary"></div>
      </div>

      <div>
        <img
          ref={avatarRef}
          src={getAvatarImage()}
          alt="me"
          style={{
            height: `${avatarHeight}px`,
            width: 'auto',
            maxWidth: '300px',
            minWidth: '80px',
          }}
          className="mx-auto object-contain transition-transform duration-400 cursor-pointer md:hover:scale-[103%] -mb-1"
          onClick={handleAvatarClick}
        />
      </div>
    </div>
  )
}

function NowPlayingDisplay({ nowPlaying }) {
  return (
    <div className="flex items-center">
      <div className="relative shrink-0">
        <img
          src={nowPlaying.image || '/default-song.png'}
          alt={`${nowPlaying.track} cover`}
          className={`border border-primary w-12 h-12 rounded-full object-cover ${nowPlaying.nowplaying ? 'animate-spin-slow' : ''
            }`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-song.png';
          }}
        />
        <div className="absolute inset-0 m-auto w-3 h-3 bg-[var(--background)] rounded-full border border-primary"></div>
      </div>
      <div className="text-left overflow-hidden min-w-0">
        <div className="text-sm font-body font-light text-[var(--primary)] mb-[-3px] pl-4">
          {nowPlaying.nowplaying ? 'Now Listening on Spotify:' : 'Last Played on Spotify:'}
        </div>
        <div className="truncate font-heading font-bold text-primary tracking-tighter mt-[-2px] mb-[-2px] neon-glow pl-4" title={nowPlaying.track}>
          {nowPlaying.track}
        </div>
        <div className="truncate font-body font-light text-sm text-[var(--primary)] mt-[-3px] pl-4" title={nowPlaying.artist}>
          {nowPlaying.artist}
        </div>
      </div>
    </div>
  );
}

function NoTracksDisplay() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        <img
          src="/default-song.png"
          alt="Not listening"
          className="h-12 rounded-full object-cover"
        />
      </div>
      <div className="text-left overflow-hidden min-w-0">
        <div className="text-xs text-[var(--primary)] font-light">Last Played on Spotify:</div>
        <div className="font-bold">—</div>
        <div className="text-xs text-[var(--primary)] font-light">[No recent tracks found]</div>
      </div>
    </div>
  );
}