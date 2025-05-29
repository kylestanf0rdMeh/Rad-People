import React, { createContext, useContext, useEffect, useState } from 'react';
import { ClientItem } from '../models/Clients.model';
import { fetchClients } from '../middleware/Clients';

interface ClientsContextType {
  clients: ClientItem[] | null;
  loading: boolean;
  error: any;
}

const ClientsContext = createContext<ClientsContextType>({
  clients: null,
  loading: false,
  error: null,
});

export const useClients = () => useContext(ClientsContext);

export const ClientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<ClientItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    if (!clients) {
      setLoading(true);
      fetchClients()
        .then(data => {
          if (isMounted) {
            setClients(data);
            setLoading(false);
          }
        })
        .catch(err => {
          if (isMounted) {
            setError(err);
            setLoading(false);
          }
        });
    }
    return () => { isMounted = false; };
    // eslint-disable-next-line
  }, []);

  return (
    <ClientsContext.Provider value={{ clients, loading, error }}>
      {children}
    </ClientsContext.Provider>
  );
};