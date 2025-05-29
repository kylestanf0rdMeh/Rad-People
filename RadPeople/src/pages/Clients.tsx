import React, { useRef, useState, useEffect } from 'react';
import {
  ClientName,
  ClientDescription,
  ClientCompany,
  ClientStatus,
  ClientNumber,
  StatusCircle
} from '../styles/ClientsStyles';
import { useClients } from '../contexts/ClientsContext';


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
}: {
  clients: ClientDisplay[];
  currentIdx: number;
  setCurrentIdx: (idx: number) => void;
}) => {
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const canScroll = useRef(true);

  useEffect(() => {
    const ref = rowRefs.current[currentIdx];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentIdx]);

  // Scroll behavior
  const handleWheel = (e: React.WheelEvent) => {
    if (!canScroll.current) return;
    if (e.deltaY > 0 && currentIdx < clients.length - 1) {
      setCurrentIdx(currentIdx + 1);
      canScroll.current = false;
      setTimeout(() => { canScroll.current = true; }, 350);
    } else if (e.deltaY < 0 && currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      canScroll.current = false;
      setTimeout(() => { canScroll.current = true; }, 350);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        overflowY: 'auto',
        margin: '0 auto',
        maxHeight: '65vh',
        scrollBehavior: 'smooth',
      }}
      onWheel={handleWheel}
      tabIndex={0}
    >
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <tbody>
          {clients.map((client, idx) => (
            <tr
              key={client.id + idx}
              ref={el => (rowRefs.current[idx] = el)}
              style={{
                height: '65vh',
                transition: 'height 0.3s',
              }}
            >
              {/* NUMBER */}
              <ClientNumber>
                {String(idx + 1).padStart(2, '0')}
              </ClientNumber>
              {/* DETAILS */}
              <td style={{
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
                  - {client.companyType}
                </ClientCompany>
              </td>
              {/* STATUS */}
              <td style={{
                width: '28%',
                textAlign: 'left',
                color: 'black',
                verticalAlign: 'top',
                fontFamily: 'Helvetica Neue LT Com, sans-serif',
                paddingLeft: '8vw',
                paddingTop: 0
              }}>
                <ClientStatus style={{ marginTop: '1rem' }}>
                  {client.status.year}
                </ClientStatus>
                <ClientStatus style={{ fontWeight: 'normal', display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                  {client.status.completed ? 'Complete' : 'In Progress'}
                  <StatusCircle filled={client.status.completed} />
                </ClientStatus>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Table ---
const ClientTable = ({
  clients,
  selectedIdx,
  setSelectedIdx,
  setSlideshowIdx,
}: {
  clients: ClientDisplay[];
  selectedIdx: number | null;
  setSelectedIdx: (idx: number) => void;
  setSlideshowIdx: (idx: number) => void;
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
                setSlideshowIdx(idx);
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

// --- Main Page ---
const Clients: React.FC = () => {
  const { clients, loading, error } = useClients();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

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

  return (
    <div style={{ textAlign: 'center', color: 'black' }}>
      <ClientSlideShow
        clients={clientsData}
        currentIdx={selectedIdx}
        setCurrentIdx={setSelectedIdx}
      />
      <ClientTable
        clients={clientsData}
        selectedIdx={selectedIdx}
        setSelectedIdx={setSelectedIdx}
        setSlideshowIdx={setSelectedIdx}
      />
    </div>
  );
};

export default Clients;