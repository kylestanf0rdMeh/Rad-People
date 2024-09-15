import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

// Animation timing variables (in seconds)
const TYPING_SPEED = 0.25;
const TEXT_DISAPPEAR_DURATION = 0.5;
const BLUE_SCREEN_DURATION = 1.5;
const DELAY_BEFORE_BLUE_SCREEN = 0.2;

const BlueScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #1404FB;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Text = styled(motion.h1)`
  color: white;
  font-family: 'Sequel Sans', sans-serif;
  font-size: 4rem;
`;

const IntroAnimation: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = 'RadPeople.';
  const controls = useAnimation();
  const textControls = useAnimation();
  const blueScreenRef = useRef<HTMLDivElement>(null);

  const typeText = useCallback(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        animateTextDisappear();
      }
    }, TYPING_SPEED * 1000);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  const animateTextDisappear = useCallback(async () => {
    await textControls.start({
      y: '-100%',
      opacity: 0,
      transition: { duration: TEXT_DISAPPEAR_DURATION, ease: 'easeIn' }
    });
    animateBlueScreen();
  }, [textControls]);

  const animateBlueScreen = useCallback(async () => {
    await controls.start({
      y: '-100%',
      transition: {
        duration: BLUE_SCREEN_DURATION,
        ease: [0.6, 0.01, -0.05, 0.9], // Custom easing function
        delay: DELAY_BEFORE_BLUE_SCREEN
      }
    });
    if (blueScreenRef.current) {
      blueScreenRef.current.style.display = 'none';
    }
  }, [controls]);

  useEffect(() => {
    const cleanup = typeText();
    return cleanup;
  }, [typeText]);

  return (
    <BlueScreen ref={blueScreenRef} animate={controls}>
      <Text animate={textControls}>{text}</Text>
    </BlueScreen>
  );
};

export default IntroAnimation;