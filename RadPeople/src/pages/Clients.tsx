import React, { useRef, useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { useClients } from '../contexts/ClientsContext';
import { ClientCompany, ClientDescription, ClientName, ClientNumber, ClientNumberNavWrapper, ClientSlideMobile, ClientStatus, ClientTableWrapper } from '../styles/ClientsStyles';
import useWindowDimensions from '../hooks/useWindowDimensions';

const BLUE = 'rgba(20, 4, 251, 0.15)';      // Selected row (matches brand blue, translucent)
const BLUE_HOVER = 'rgba(20, 4, 251, 0.08)'; // Hover row (matches brand blue, more subtle)

type ClientDisplay = {
  id: string;
  name: string;
  description: string;
  status: {
    year: number;
    completed: boolean;
  };
  companyType: string;
};


// --- Slideshow ---
const ClientSlideShow = ({
  clients,
  currentIdx,
  setCurrentIdx,
  scrollToIdx,
  onSlideInView, // <-- new prop
}: {
  clients: ClientDisplay[];
  currentIdx: number;
  setCurrentIdx: (idx: number) => void;
  scrollToIdx: number | null;
  onSlideInView?: (idx: number) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to the slide when scrollToIdx changes (from table click)
  useEffect(() => {
    if (
      scrollToIdx !== null &&
      slideRefs.current[scrollToIdx]
    ) {
      slideRefs.current[scrollToIdx]!.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [scrollToIdx]);

  // Intersection Observer to detect which slide is in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !onSlideInView) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let visibleIdx = currentIdx;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            visibleIdx = Number((entry.target as HTMLElement).dataset.idx);
          }
        });
        if (visibleIdx !== currentIdx) {
          onSlideInView(visibleIdx);
        }
      },
      {
        root: container,
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
      }
    );

    slideRefs.current.forEach((slide, idx) => {
      if (slide) {
        slide.dataset.idx = String(idx);
        observer.observe(slide);
      }
    });

    return () => observer.disconnect();
  }, [clients.length, onSlideInView, currentIdx]);

  // Keyboard navigation (optional)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && currentIdx < clients.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else if (e.key === 'ArrowUp' && currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        maxHeight: '65vh',
        overflowY: 'auto',
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
        margin: '0 auto',
        outline: 'none',
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {clients.map((client, idx) => (
          <div
            key={client.id + idx}
            ref={el => (slideRefs.current[idx] = el)}
            style={{
              height: '65vh',
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
              display: 'flex',
              alignItems: 'stretch',
              transition: 'height 0.5s',
              marginBottom: '2vh',
            }}
          >
          {/* NUMBER */}
          <ClientNumber>
            {String(idx + 1).padStart(2, '0')}
          </ClientNumber>
          {/* DETAILS */}
          <div style={{
            width: '64%',
            textAlign: 'left',
            color: 'black',
            verticalAlign: 'top',
            paddingLeft: '7vw',
            paddingTop: 0,
          }}>
            <ClientName>
              {client.name}
            </ClientName>
            <ClientDescription>
              {client.description}
            </ClientDescription>
            <ClientCompany>
              - {client.companyType}, {client.status.year}
            </ClientCompany>
          </div>
          {/* STATUS */}
          <div style={{
            width: '28%',
            textAlign: 'left',
            color: 'black',
            verticalAlign: 'top',
            fontFamily: 'Helvetica Neue LT Com, sans-serif',
            paddingLeft: '8vw',
            paddingTop: 0
          }}>
            <ClientStatus style={{ fontWeight: 'normal', display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              {client.status.completed ? 'Complete' : 'In Progress'}
            </ClientStatus>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

const ClientSlideShowMobile = ({
  clients,
  currentIdx,
  scrollToIdx,
  onSlideInView,
}: {
  clients: ClientDisplay[];
  currentIdx: number;
  scrollToIdx: number | null;
  onSlideInView?: (idx: number) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to the slide when scrollToIdx changes
  useEffect(() => {
    if (
      scrollToIdx !== null &&
      slideRefs.current[scrollToIdx]
    ) {
      const container = containerRef.current;
      const slide = slideRefs.current[scrollToIdx];
      if (container && slide) {
        // Get the top padding in px (e.g., 1rem = 16px, or use getComputedStyle)
        const paddingTop = 16; // or whatever your padding is in px
        const slideTop = slide.offsetTop;
        container.scrollTo({
          top: slideTop - paddingTop,
          behavior: 'smooth',
        });
      }
    }
  }, [scrollToIdx]);

  // Intersection Observer to detect which slide is in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !onSlideInView) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let visibleIdx = currentIdx;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            visibleIdx = Number((entry.target as HTMLElement).dataset.idx);
          }
        });
        if (visibleIdx !== currentIdx) {
          onSlideInView(visibleIdx);
        }
      },
      {
        root: container,
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
      }
    );

    slideRefs.current.forEach((slide, idx) => {
      if (slide) {
        slide.dataset.idx = String(idx);
        observer.observe(slide);
      }
    });

    return () => observer.disconnect();
  }, [clients.length, onSlideInView, currentIdx]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        margin: '0 auto',
        maxHeight: '100vh',
        overflowY: 'auto',
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
        minHeight: '100vh',
      }}
    >
      {clients.map((client, idx) => (
        <ClientSlideMobile key={client.id} ref={el => (slideRefs.current[idx] = el)}>
          <ClientNumber>{String(idx + 1).padStart(2, '0')}</ClientNumber>
          <ClientName>{client.name}</ClientName>
          <ClientDescription>{client.description}</ClientDescription>
          <ClientCompany>- {client.companyType}</ClientCompany>
          <div style={{ fontFamily: 'Helvetica Neue LT Com, sans-serif', fontSize: '1.3rem', textTransform: 'uppercase', marginTop: '0', marginLeft: '0.1rem' }}>
            {client.status.year}
          </div>
          <ClientStatus>{client.status.completed ? 'Complete' : 'In Progress'}</ClientStatus>
        </ClientSlideMobile>
      ))}
    </div>
  );
};

// --- Table ---
const ClientTable = ({
  clients,
  selectedIdx,
  setSelectedIdx,
  setScrollToIdx, // <-- new prop for triggering scroll in slideshow
}: {
  clients: ClientDisplay[];
  selectedIdx: number | null;
  setSelectedIdx: (idx: number) => void;
  setScrollToIdx: (idx: number) => void;
}) => (
  <div style={{ width: '80%', margin: '0rem auto' }}>
    <div
      style={{
        border: '1px solid black',
        maxHeight: '14rem',
        overflow: 'hidden',
      }}
    >
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
          <tr>
            <th
              style={{
                width: '30%',
                textAlign: 'left',
                padding: '0.3rem 1rem',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                color: 'black',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid black',
                fontFamily: "'Helvetica Neue LT Com', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              Name
            </th>
            <th
              style={{
                width: '45%',
                textAlign: 'left',
                padding: '0.3rem 1rem',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                color: 'black',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid black',
                fontFamily: "'Helvetica Neue LT Com', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              Description
            </th>
            <th
              style={{
                width: '25%',
                textAlign: 'left',
                padding: '0.3rem 1rem',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                color: 'black',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid black',
                fontFamily: "'Helvetica Neue LT Com', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody
          style={{
            display: 'block',
            maxHeight: '11.5rem',
            overflowY: 'auto',
            width: '100%',
          }}
        >
          {clients.map((client, idx) => (
            <tr
              key={client.id}
              style={{
                display: 'table',
                tableLayout: 'fixed',
                width: '100%',
                cursor: 'pointer',
                background:
                  selectedIdx === idx
                    ? BLUE
                    : undefined,
                transition: 'background 0.2s',
              }}
              onClick={() => {
                setSelectedIdx(idx);
                setScrollToIdx(idx); // <-- trigger scroll in slideshow
              }}
              onMouseEnter={e => {
                if (selectedIdx !== idx) {
                  (e.currentTarget as HTMLElement).style.background = BLUE_HOVER;
                }
              }}
              onMouseLeave={e => {
                if (selectedIdx !== idx) {
                  (e.currentTarget as HTMLElement).style.background = '';
                }
              }}
            >
              <td
                style={{
                  width: '30%',
                  padding: '3px 1rem',
                  color: 'black',
                  background: 'transparent',
                  textAlign: 'left',
                  fontSize: '15px',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  border: 'none',
                }}
              >
                {client.name}
              </td>
              <td
                style={{
                  width: '45%',
                  padding: '3px 1rem',
                  color: 'black',
                  background: 'transparent',
                  textAlign: 'left',
                  fontSize: '15px',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  borderLeft: '1px solid black',
                  borderRight: 'none',
                  borderTop: 'none',
                  borderBottom: 'none',
                }}
              >
                {client.description}
              </td>
              <td
                style={{
                  width: '25%',
                  padding: '3px 1rem',
                  color: 'black',
                  background: 'transparent',
                  textAlign: 'left',
                  fontSize: '15px',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  borderLeft: '1px solid black',
                  borderRight: 'none',
                  borderTop: 'none',
                  borderBottom: 'none',
                }}
              >
                {client.status.year} {client.status.completed ? 'Complete' : 'In Progress'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


const ClientNumberNav = ({
  count,
  currentIdx,
  onSelect,
}: {
  count: number;
  currentIdx: number;
  onSelect: (idx: number) => void;
}) => (
  <div
    style={{
      position: 'fixed',
      top: '25%',
      right: 0,
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '12px 0 0 12px',
      padding: '0.2rem 0.3rem',
      gap: '0',
    }}
    className="client-number-nav"
  >
    {Array.from({ length: count }).map((_, idx) => (
      <button
        key={idx}
        onClick={() => onSelect(idx)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: idx === currentIdx ? '#1404FB' : 'transparent',
          color: idx === currentIdx ? 'white' : '#1404FB',
          border: 'none',
          borderRadius: '0%',
          width: '1.1rem',
          height: '1.1rem',
          fontWeight: 'bold',
          fontSize: '0.6rem', // increased for better visibility
          cursor: 'pointer',
          outline: 'none',
          transition: 'background 0.2s, color 0.2s',
          padding: 0,
        }}
        aria-label={`Go to client ${idx + 1}`}
      >
        {idx + 1}
      </button>
    ))}
  </div>
);

// --- Main Page ---
const Clients: React.FC = () => {
  const { clients, loading, error } = useClients();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [scrollToIdx, setScrollToIdx] = useState<number | null>(null);
  const [mobileCurrentIdx, setMobileCurrentIdx] = useState(0);
  const [mobileScrollToIdx, setMobileScrollToIdx] = useState<number | null>(null);
  const { width } = useWindowDimensions();


  if (loading) return <div>Loading clients...</div>;
  if (error) return <div>Error loading clients.</div>;
  if (!clients) return <div>No clients found.</div>;

  // Transform the data to match the UI's expected structure
  const clientsData = clients.map((client) => ({
    id: client.sys.id,
    name: client.fields.clientName,
    description: client.fields.description,
    // Combine yearStarted and isCompleted for status
    status: {
      year: client.fields.yearStarted,
      completed: client.fields.isCompleted,
    },
    companyType: client.fields.companyType,
  }));

  // ... existing code ...
  return (
    <PageWrapper>
      <div style={{ textAlign: 'center', color: 'black' }}>
        {width <= 767 ? (
          // MOBILE VIEW
          <>
            <ClientSlideShowMobile
              clients={clientsData}
              currentIdx={mobileCurrentIdx}
              scrollToIdx={mobileScrollToIdx}
              onSlideInView={setMobileCurrentIdx}
            />
            <ClientNumberNavWrapper>
              <ClientNumberNav
                count={clientsData.length}
                currentIdx={mobileCurrentIdx}
                onSelect={idx => {
                  setMobileCurrentIdx(idx);
                  setMobileScrollToIdx(idx);
                  setTimeout(() => setMobileScrollToIdx(null), 500);
                }}
              />
            </ClientNumberNavWrapper>
          </>
        ) : (
          // DESKTOP VIEW
          <>
            <ClientSlideShow
              clients={clientsData}
              currentIdx={selectedIdx}
              setCurrentIdx={setSelectedIdx}
              scrollToIdx={scrollToIdx}
              onSlideInView={setSelectedIdx}
            />
            <ClientTableWrapper>
              <ClientTable
                clients={clientsData}
                selectedIdx={selectedIdx}
                setSelectedIdx={idx => {
                  setSelectedIdx(idx);
                  setScrollToIdx(idx);
                  setTimeout(() => setScrollToIdx(null), 500);
                }}
                setScrollToIdx={setScrollToIdx}
              />
            </ClientTableWrapper>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default Clients;