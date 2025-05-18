// ... existing imports ...
import React, { useRef, useState, useEffect } from 'react';
import {
    ClientName,
    ClientDescription,
    ClientCompany,
    ClientStatus,
    ClientNumber
  } from '../styles/ClientsStyles';


// Dummy data
const clientsData = [
  { id: 'client1', name: 'Calvin Klein', description: 'Calvin Klein & Nensi Dojaka Selfridges Retail Installation', status: '2020 Complete', companyType: 'Concept, Design, Creative, Production' },
  { id: 'client2', name: 'Globex Inc', description: 'Innovators in tech solutions.', status: '2020 Complete', companyType: 'Strategy and Creative' },
  { id: 'client3', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: 'client3', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: 'client3', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: 'client3', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
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
          maxHeight: '60vh',
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
                  height: '60vh',
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
                    <ClientStatus>
                        {client.status.split(' ')[0]}
                    </ClientStatus>
                    <ClientStatus style={{ fontWeight: 'normal' }}>
                        {client.status.split(' ').slice(1).join(' ')}
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
    <table style={{ margin: '2rem auto', width: '80%', color: 'black' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {clients.map(client => (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
  const Clients: React.FC = () => {
    return (
      <div style={{ padding: '1rem', textAlign: 'center', color: 'black' }}>
        <ClientSlideShow clients={clientsData} />
        <ClientTable clients={clientsData} />
      </div>
    );
  };

export default Clients;