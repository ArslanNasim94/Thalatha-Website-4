import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

export default function HomeScene() {
  const canvasRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouch(touchDevice)
    if (touchDevice || !canvasRef.current) return undefined

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: window.innerWidth > 768 })
    const houseGroup = new THREE.Group()
    const orbiters = []
    let frameId

    camera.position.set(0, 2, 8)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    scene.add(new THREE.AmbientLight(0xffffff, 0.65))
    const dirLight = new THREE.DirectionalLight(0x4f46e5, 1.3)
    dirLight.position.set(5, 10, 7)
    scene.add(dirLight)

    const walls = new THREE.Mesh(
      new THREE.BoxGeometry(2, 1.5, 2),
      new THREE.MeshPhongMaterial({ color: 0x4f46e5, emissive: 0x4f46e5, emissiveIntensity: 0.1 }),
    )
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(1.65, 1, 4),
      new THREE.MeshPhongMaterial({ color: 0x7c3aed, shininess: 80 }),
    )
    roof.position.y = 1.25
    roof.rotation.y = Math.PI / 4
    houseGroup.add(walls, roof)
    scene.add(houseGroup)

    const orbitColors = [0x4f46e5, 0xf59e0b, 0x10b981, 0x7c3aed, 0x4f46e5, 0xf59e0b]
    for (let index = 0; index < 6; index += 1) {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 24, 24),
        new THREE.MeshPhongMaterial({ color: orbitColors[index], emissive: orbitColors[index], emissiveIntensity: 0.15 }),
      )
      scene.add(sphere)
      orbiters.push({ mesh: sphere, angle: (index / 6) * Math.PI * 2 })
    }

    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 1) {
      positions[i] = (Math.random() - 0.5) * 18
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x4f46e5,
      size: 0.035,
      transparent: true,
      opacity: 0.52,
    })
    const particles = new THREE.Points(particleGeo, particleMaterial)
    scene.add(particles)

    const grid = new THREE.GridHelper(8, 20, 0x4f46e5, 0xeef2ff)
    grid.position.y = -1.2
    grid.material.opacity = 0.18
    grid.material.transparent = true
    scene.add(grid)

    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement
      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
    }

    const bobTween = gsap.to(houseGroup.position, {
      y: 0.3,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    const rotateTween = gsap.to(houseGroup.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: 'none',
    })

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      orbiters.forEach((orbiter, index) => {
        orbiter.angle += 0.006 + index * 0.0003
        orbiter.mesh.position.x = Math.cos(orbiter.angle) * 3.35
        orbiter.mesh.position.z = Math.sin(orbiter.angle) * 3.35
        orbiter.mesh.position.y = Math.sin(orbiter.angle * 2) * 0.5
      })
      particles.rotation.y += 0.00045
      renderer.render(scene, camera)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      bobTween.kill()
      rotateTween.kill()
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) object.material.dispose()
      })
      renderer.dispose()
    }
  }, [])

  if (isTouch) {
    return (
      <div className="mobile-home-scene" aria-hidden="true">
        <div className="phone-orbit">
          <span>Record</span>
          <span>Quote</span>
          <span>Done</span>
        </div>
      </div>
    )
  }

  return <canvas ref={canvasRef} className="home-scene" aria-label="Animated Thalatha home services scene" />
}
