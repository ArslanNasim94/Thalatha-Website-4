import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

export function useGSAPEffect(callback, dependencies = []) {
  useLayoutEffect(() => {
    const context = gsap.context(callback)
    return () => context.revert()
  }, dependencies)
}
