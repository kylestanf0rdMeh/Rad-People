import { useState, useEffect } from 'react'

export const useLoadFont = (fontName: string) => {
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    const loadFont = async () => {
      try {
        await document.fonts.load(`1em "${fontName}"`)
        setFontLoaded(true)
      } catch (error) {
        console.error('Font loading failed:', error)
      }
    }

    loadFont()
  }, [fontName])

  return fontLoaded
}