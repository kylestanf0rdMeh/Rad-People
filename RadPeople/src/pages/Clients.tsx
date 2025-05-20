// ... existing imports ...
import React, { useRef, useState, useEffect } from 'react';
import {
    ClientName,
    ClientDescription,
    ClientCompany,
    ClientStatus,
    ClientNumber,
    StatusCircle
  } from '../styles/ClientsStyles';


// Dummy data
const clientsData = [
  { id: 'client1', name: 'Calvin Klein', description: 'Calvin Klein & Nensi Dojaka Selfridges Retail Installation', status: '2020 In Progress', companyType: 'Concept, Design, Creative, Production' },
  { id: 'client2', name: 'Globex Inc', description: 'Innovators in tech solutions.', status: '2020 Complete', companyType: 'Strategy and Creative' },
  { id: 'client3', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: '111', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: '222', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: '333', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: 'cl444ient1', name: 'Calvin Klein', description: 'Calvin Klein & Nensi Dojaka Selfridges Retail Installation', status: '2020 In Progress', companyType: 'Concept, Design, Creative, Production' },
  { id: '444', name: 'Globex Inc', description: 'Innovators in tech solutions.', status: '2020 Complete', companyType: 'Strategy and Creative' },
  { id: '555', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: '667', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: '665', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: '777', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: '888', name: 'Calvin Klein', description: 'Calvin Klein & Nensi Dojaka Selfridges Retail Installation', status: '2020 In Progress', companyType: 'Concept, Design, Creative, Production' },
  { id: '999', name: 'Globex Inc', description: 'Innovators in tech solutions.', status: '2020 Complete', companyType: 'Strategy and Creative' },
  { id: '000', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: '123', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: '234', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: '345', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
];

const ClientSlideShow = ({ clients }: { clients: typeof clientsData }) => {
    const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const canScroll = useRef(true);
  
    useEffect(() => {
      const ref = rowRefs.current[currentIdx];
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, [currentIdx]);
  
    const handleWheel = (e: React.WheelEvent) => {
      if (!canScroll.current) return;
      if (e.deltaY > 0 && currentIdx < clients.length - 1) {
        setCurrentIdx(idx => idx + 1);
        canScroll.current = false;
        setTimeout(() => { canScroll.current = true; }, 350);
      } else if (e.deltaY < 0 && currentIdx > 0) {
        setCurrentIdx(idx => idx - 1);
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
                    <ClientStatus style={{marginTop:'1rem'}}>
                        {client.status.split(' ')[0]}
                    </ClientStatus>
                    <ClientStatus style={{ fontWeight: 'normal', display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                        {client.status.split(' ').slice(1).join(' ')}
                        <StatusCircle
                        filled={client.status.toLowerCase().includes('complete')}
                        />
                    </ClientStatus>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const ClientTable = ({ clients }: { clients: typeof clientsData }) => (
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
                  borderBottom: '1px solid black', // <-- Add this
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
                  borderBottom: '1px solid black', // <-- Add this
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
                  borderBottom: '1px solid black', // <-- Add this
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
              <tr key={client.id} style={{ display: 'table', tableLayout: 'fixed', width: '100%' }}>
                <td
                  style={{
                    width: '30%',
                    padding: '3px 1rem',
                    color: 'black',
                    background: 'white',
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
                    background: 'white',
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
                    background: 'white',
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
                  {client.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  const Clients: React.FC = () => {
    return (
      <div style={{ textAlign: 'center', color: 'black' }}>
        <ClientSlideShow clients={clientsData} />
        <ClientTable clients={clientsData} />
      </div>
    );
  };

export default Clients;