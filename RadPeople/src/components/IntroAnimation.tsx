import { useState, useCallback, useEffect, useRef } from 'react'
import { useAnimation } from 'framer-motion'
import { AnimatedChar, BlueScreen, NFUltraText } from '../styles/IntroAnimationStyles'

// Animation timing (in seconds)
const DELAY_BEFORE_TEXT_APPEAR = 0.8
const TYPING_SPEED = 0.03
const DELAY_AFTER_TEXT_APPEAR = 1.0
const BLUE_SCREEN_DURATION = 0.9

export default function IntroAnimation() {
  const fullText = 'RADPEOPLE'
  const [charStates, setCharStates] = useState(fullText.split('').map(() => ({ isVisible: false })))  
  const [animationStarted, setAnimationStarted] = useState(false)
  const controls = useAnimation()
  const blueScreenRef = useRef<HTMLDivElement>(null)

  const animateTextAppear = useCallback(() => {
    setAnimationStarted(true)
    setTimeout(() => {
      fullText.split('').forEach((_, index) => {
        setTimeout(() => {
          setCharStates(prev => prev.map((state, i) => 
            i === index ? { ...state, isVisible: true } : state
          ))
        }, index * TYPING_SPEED * 1000)
      })

      // Schedule blue screen animation after all text has appeared
      const totalTextDuration = TYPING_SPEED * fullText.length + DELAY_AFTER_TEXT_APPEAR
      setTimeout(animateBlueScreen, totalTextDuration * 1000)
    }, DELAY_BEFORE_TEXT_APPEAR * 1000)
  }, [fullText])

  const animateBlueScreen = useCallback(async () => {
    await controls.start({
      y: '-100%',
      transition: {
        duration: BLUE_SCREEN_DURATION,
        ease: [0.33, 0, 0.1, 1],
      }
    })
    if (blueScreenRef.current) {
      blueScreenRef.current.style.display = 'none'
    }
  }, [controls])

  useEffect(() => {
    if (!animationStarted) {
      animateTextAppear()
    }
  }, [animationStarted, animateTextAppear])

  return (
    <BlueScreen ref={blueScreenRef} animate={controls} initial={{ y: 0 }}>
      <NFUltraText>
        {fullText.split('').map((char, index) => (
          <AnimatedChar 
            key={index}
            $isVisible={charStates[index].isVisible}
          >
            {char}
          </AnimatedChar>
        ))}
      </NFUltraText>
    </BlueScreen>
  )
}