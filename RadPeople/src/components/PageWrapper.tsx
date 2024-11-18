import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled from 'styled-components';

const PageContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: white;
  z-index: 2; // Ensure it's above other content during transition
`;

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <PageContainer
      initial={{ opacity: 0, backgroundColor: 'white' }}
      animate={{ opacity: 1, backgroundColor: 'white' }}
      exit={{ opacity: 0, backgroundColor: 'white' }}
      transition={{
        duration: 0.39,
        ease: "easeInOut"
      }}
    >
      {children}
    </PageContainer>
  );
};

export default PageWrapper;