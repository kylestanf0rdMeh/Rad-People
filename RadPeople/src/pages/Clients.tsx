// ... existing imports ...
import React, { useRef, useState, useEffect } from 'react';

// Dummy data
const clientsData = [
  { id: 'client1', name: 'Acme Corp', description: 'A leading provider of widgets.', status: '2020 Complete', companyType: 'Strategy and Creative' },
  { id: 'client2', name: 'Globex Inc', description: 'Innovators in tech solutions.', status: '2020 Complete', companyType: 'Strategy and Creative' },
  { id: 'client3', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: 'client3', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: 'client3', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
  { id: 'client3', name: 'Soylent Corp', description: 'Pioneers in food engineering.', status: '2024 Complete', companyType: 'Strategy and Creative' },
];

const ClientSlideShow = ({ clients }: { clients: typeof clientsData }) => {
    // Create refs for each client row
    const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
  
    // Scroll to the current client when index changes
    useEffect(() => {
      const ref = rowRefs.current[currentIdx];
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, [currentIdx]);
  
    // Handle wheel scroll
    const handleWheel = (e: React.WheelEvent) => {
      if (e.deltaY > 0 && currentIdx < clients.length - 1) {
        setCurrentIdx(idx => idx + 1);
      } else if (e.deltaY < 0 && currentIdx > 0) {
        setCurrentIdx(idx => idx - 1);
      }
    };
  
    return (
      <div
        style={{
          width: '100vw',
          overflowY: 'auto',
          margin: '0 auto',
          maxHeight: '60vh', // Adjust as needed for your layout
          scrollBehavior: 'smooth',
        }}
        onWheel={handleWheel}
        tabIndex={0} // Make div focusable for keyboard events if needed
      >
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <tbody>
            {clients.map((client, idx) => (
              <tr
                key={client.id + idx}
                ref={el => (rowRefs.current[idx] = el)}
                style={{
                  height: '60vh', // Each row fills the container height
                  transition: 'height 0.3s',
                }}
              >
                {/* ...columns as before... */}
                <td style={{
                  width: '8%',
                  textAlign: 'right',
                  fontSize: '1.05rem',
                  color: 'black',
                  verticalAlign: 'top',
                  fontFamily: 'Helvetica Neue LT Com, sans-serif',
                  paddingRight: '6.2vw',
                  paddingTop: 0
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </td>
                <td style={{
                  width: '64%',
                  textAlign: 'left',
                  color: 'black',
                  verticalAlign: 'top',
                  paddingLeft: '7vw',
                  paddingTop: 0,
                }}>
                  <div style={{
                    fontFamily: 'Sequel Sans, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '3rem',
                    lineHeight: 1,
                    marginTop: -4,
                    textTransform: 'uppercase',
                    marginBottom: '-1px',
                  }}>
                    {client.name}
                  </div>
                  <div style={{
                    fontFamily: 'Helvetica Neue LT Com, sans-serif',
                    fontSize: '1rem',
                    marginLeft: '0.1rem',
                    marginTop: 0,
                    textTransform: 'uppercase',
                    marginBottom: '-8px',
                  }}>
                    {client.description}
                  </div>
                  <div style={{
                    fontFamily: 'Helvetica Neue LT Com, sans-serif',
                    fontSize: '1rem',
                    marginLeft: '0.1rem',
                    marginTop: 0,
                    textTransform: 'uppercase',
                    marginBottom: 0,
                  }}>
                    - {client.companyType}
                  </div>
                </td>
                <td style={{
                  width: '28%',
                  textAlign: 'left',
                  color: 'black',
                  verticalAlign: 'top',
                  fontFamily: 'Helvetica Neue LT Com, sans-serif',
                  paddingLeft: '8vw',
                  paddingTop: 0
                }}>
                  <div style={{
                    fontSize: '1.05rem',
                    fontWeight: 'bold',
                    lineHeight: '1.1',
                    margin: 0,
                    padding: 0
                  }}>
                    {client.status.split(' ')[0]}
                  </div>
                  <div style={{
                    fontSize: '1.05rem',
                    margin: 0,
                    padding: 0,
                    lineHeight: '1.1'
                  }}>
                    {client.status.split(' ').slice(1).join(' ')}
                  </div>
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