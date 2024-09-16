import { useState, useCallback, useEffect, useRef } from 'react'
import { useAnimation } from 'framer-motion'
import { useLoadFont } from '../hooks/UseLoadFont'
import { AnimatedChar, BlueScreen, NFUltraText } from '../styles/IntroAnimationStyles'

// Animation timing (in seconds)
const DELAY_BEFORE_TEXT_APPEAR = 0.8
const TYPING_SPEED = 0.07
const DISAPPEAR_SPEED = 0.05
const DELAY_BEFORE_TEXT_DISAPPEAR = 1.7
const BLUE_SCREEN_DURATION = 0.9
const DELAY_BEFORE_BLUE_SCREEN = 0.35

export default function IntroAnimation() {
  const fullText = 'RADPEOPLE'
  const [charStates, setCharStates] = useState(fullText.split('').map(() => ({ isVisible: false, isDisappearing: false })))  
  const [animationStarted, setAnimationStarted] = useState(false)
  const controls = useAnimation()
  const blueScreenRef = useRef<HTMLDivElement>(null)
  const fontLoaded = useLoadFont('NF Ultra')


  const animateTextAppear = useCallback(() => {
    if (!fontLoaded) return

    setAnimationStarted(true)
    setTimeout(() => {
      const animationPromises = fullText.split('').map((_, index) => {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            setCharStates(prev => prev.map((state, i) => 
              i === index ? { ...state, isVisible: true } : state
            ))
            resolve()
          }, index * TYPING_SPEED * 1000)
        })
      })
  
      Promise.all(animationPromises).then(() => {
        setTimeout(animateTextDisappear, DELAY_BEFORE_TEXT_DISAPPEAR * 1000)
      })
    }, DELAY_BEFORE_TEXT_APPEAR * 1000)
  }, [fullText, fontLoaded])

  const animateTextDisappear = useCallback(() => {
    if (!fontLoaded) return

    const animationPromises = fullText.split('').map((_, index) => {
      const reverseIndex = fullText.length - 1 - index
      return new Promise<void>(resolve => {
        setTimeout(() => {
          setCharStates(prev => prev.map((state, i) => 
            i === reverseIndex ? { ...state, isDisappearing: true } : state
          ))
          resolve()
        }, index * DISAPPEAR_SPEED * 1000)
      })
    })

    Promise.all(animationPromises).then(() => {
      setTimeout(animateBlueScreen, DISAPPEAR_SPEED * 1000)
    })
  }, [fullText, fontLoaded])

  const animateBlueScreen = useCallback(async () => {
    await controls.start({
      y: '-100%',
      transition: {
        duration: BLUE_SCREEN_DURATION,
        ease: [0.33, 0, 0.1, 1], // Modified easing function
        delay: DELAY_BEFORE_BLUE_SCREEN
      }
    })
    if (blueScreenRef.current) {
      blueScreenRef.current.style.display = 'none'
    }
  }, [controls])

  useEffect(() => {
    if (fontLoaded && !animationStarted) {
      animateTextAppear()
    }
  }, [fontLoaded, animationStarted, animateTextAppear])


  return (
    <BlueScreen ref={blueScreenRef} animate={controls} initial={{ y: 0 }}>
      {fontLoaded && ( 
        <NFUltraText>
          {fullText.split('').map((char, index) => (
            <AnimatedChar 
              key={index}
              $isVisible={charStates[index].isVisible}
              $isDisappearing={charStates[index].isDisappearing}
            >
              {char}
            </AnimatedChar>
          ))}
        </NFUltraText>
      )}
    </BlueScreen>
  )
}