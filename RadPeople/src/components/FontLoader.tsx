import { useEffect, useState } from 'react';

const FontLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const fontFamilies = [
      'NF Ultra',
      'Helvetica Neue LT Com',
      'MotoyaExCedar',
      'Sequel Sans',
      'Sequel Sans Regular'
    ];

    Promise.all(
      fontFamilies.map(font =>
        document.fonts.load(`1em "${font}"`)
      )
    ).then(() => {
      setFontsLoaded(true);
      // Store in sessionStorage to prevent reloading during session
      sessionStorage.setItem('fontsLoaded', 'true');
    });
  }, []);

  // Check if fonts were already loaded in this session
  useEffect(() => {
    if (sessionStorage.getItem('fontsLoaded')) {
      setFontsLoaded(true);
    }
  }, []);

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
};

export default FontLoader; 