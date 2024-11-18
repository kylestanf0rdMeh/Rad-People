import { motion } from 'framer-motion';
import styled from 'styled-components';

const TransitionOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
  pointer-events: none;
`;

const PageTransition = () => {
  return (
    <TransitionOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
    />
  );
};

export default PageTransition;