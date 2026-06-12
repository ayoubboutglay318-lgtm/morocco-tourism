import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ThreeHero() {
  const mountRef = useRef()

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    mount.appendChild(renderer.domElement)

    // ── Scene & Camera ──
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200)
    camera.position.set(0, 0.5, 9)

    // ── Fog ──
    scene.fog = new THREE.FogExp2(0x0f0800, 0.018)

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0x1a0800, 3))

    const warmLight = new THREE.PointLight(0xf4a830, 8, 25)
    warmLight.position.set(3, 4, 3)
    scene.add(warmLight)

    const rimLight = new THREE.PointLight(0x4433aa, 3, 18)
    rimLight.position.set(-6, -2, -4)
    scene.add(rimLight)

    const topLight = new THREE.DirectionalLight(0xffeedd, 1.5)
    topLight.position.set(0, 10, 5)
    scene.add(topLight)

    // ── Main group (for mouse parallax) ──
    const group = new THREE.Group()
    scene.add(group)

    // ── Stars ──
    const starCount = 8000
    const starPos = new Float32Array(starCount * 3)
    const starSizes = new Float32Array(starCount)
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 100
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 100
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 100 - 10
      starSizes[i] = Math.random() * 1.5 + 0.2
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1))
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xfff8ee,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    }))
    group.add(stars)

    // ── Sand Dune Particles ──
    const duneCount = 6000
    const dunePos = new Float32Array(duneCount * 3)
    const duneColors = new Float32Array(duneCount * 3)
    for (let i = 0; i < duneCount; i++) {
      const x = (Math.random() - 0.5) * 30
      const z = -(Math.random() * 20) - 1
      const y = -3.2
        + Math.sin(x * 0.55) * 0.7
        + Math.cos(z * 0.4) * 0.5
        + Math.sin(x * 1.1 + z * 0.7) * 0.3
        + (Math.random() - 0.5) * 0.2
      dunePos[i * 3]     = x
      dunePos[i * 3 + 1] = y
      dunePos[i * 3 + 2] = z
      // Warm amber gradient
      const t = Math.random()
      duneColors[i * 3]     = 0.75 + t * 0.15
      duneColors[i * 3 + 1] = 0.5 + t * 0.15
      duneColors[i * 3 + 2] = 0.1 + t * 0.1
    }
    const duneGeo = new THREE.BufferGeometry()
    duneGeo.setAttribute('position', new THREE.BufferAttribute(dunePos, 3))
    duneGeo.setAttribute('color', new THREE.BufferAttribute(duneColors, 3))
    const dunes = new THREE.Points(duneGeo, new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    }))
    group.add(dunes)

    // ── Floating Particles (mid-air ambient) ──
    const ambientCount = 2000
    const ambPos = new Float32Array(ambientCount * 3)
    for (let i = 0; i < ambientCount; i++) {
      ambPos[i * 3]     = (Math.random() - 0.5) * 20
      ambPos[i * 3 + 1] = (Math.random() - 0.5) * 8
      ambPos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    const ambGeo = new THREE.BufferGeometry()
    ambGeo.setAttribute('position', new THREE.BufferAttribute(ambPos, 3))
    const ambParticles = new THREE.Points(ambGeo, new THREE.PointsMaterial({
      color: 0xc9973a,
      size: 0.025,
      transparent: true,
      opacity: 0.4,
    }))
    group.add(ambParticles)

    // ── Gold material helpers ──
    const wireMat = (opacity = 0.55) => new THREE.MeshPhongMaterial({
      color: 0xc9973a,
      emissive: 0x3a2500,
      emissiveIntensity: 0.4,
      wireframe: true,
      transparent: true,
      opacity,
    })
    const solidMat = (opacity = 0.18) => new THREE.MeshPhongMaterial({
      color: 0xf4c06f,
      emissive: 0x2a1500,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
    })

    // ── Center Torus Knot ──
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.5, 0.42, 140, 18),
      wireMat(0.5)
    )
    knot.position.set(0, 0.5, 0)
    group.add(knot)

    const knotInner = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.5, 0.42, 140, 18),
      solidMat(0.12)
    )
    knotInner.position.set(0, 0.5, 0)
    group.add(knotInner)

    // ── Floating Geometric Shapes ──
    const shapeDefs = [
      { geo: new THREE.IcosahedronGeometry(0.75, 0), pos: [-3.8, 1.8, -0.5], rx: 0.009, ry: 0.006 },
      { geo: new THREE.IcosahedronGeometry(0.45, 0), pos: [3.5, -0.6, 1.2],  rx: 0.006, ry: 0.01  },
      { geo: new THREE.OctahedronGeometry(0.6, 0),   pos: [-2.8, -1.4, 2.2], rx: 0.011, ry: 0.007 },
      { geo: new THREE.IcosahedronGeometry(0.35, 0), pos: [3.0, 2.2, -0.8],  rx: 0.007, ry: 0.013 },
      { geo: new THREE.OctahedronGeometry(0.4, 0),   pos: [-4.5, 0.2, -1.5], rx: 0.01,  ry: 0.006 },
      { geo: new THREE.TetrahedronGeometry(0.5, 0),  pos: [2.2, -1.8, -1.0], rx: 0.008, ry: 0.009 },
      { geo: new THREE.IcosahedronGeometry(0.28, 0), pos: [-1.5, 2.8, 1.0],  rx: 0.012, ry: 0.008 },
    ]

    const floatingMeshes = shapeDefs.map(def => {
      const solid = new THREE.Mesh(def.geo, solidMat())
      const wire  = new THREE.Mesh(def.geo, wireMat())
      solid.position.set(...def.pos)
      wire.position.set(...def.pos)
      group.add(solid, wire)
      return { solid, wire, rx: def.rx, ry: def.ry, baseY: def.pos[1] }
    })

    // ── Large background Torus ring ──
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(4.5, 0.06, 8, 80),
      wireMat(0.2)
    )
    ring.rotation.x = Math.PI / 2.5
    ring.position.set(0, -1, -4)
    group.add(ring)

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(6, 0.04, 8, 100),
      wireMat(0.12)
    )
    ring2.rotation.x = Math.PI / 3
    ring2.rotation.z = 0.3
    ring2.position.set(0, -0.5, -6)
    group.add(ring2)

    // ── GSAP scroll: camera zooms out ──
    const scrollAnim = gsap.to(camera.position, {
      z: 16,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '30% top',
        scrub: 1.5,
      },
    })

    // ── GSAP intro: knot scales in ──
    gsap.fromTo(knot.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 2, ease: 'elastic.out(1,0.6)', delay: 0.5 })
    gsap.fromTo(knotInner.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 2, ease: 'elastic.out(1,0.6)', delay: 0.5 })
    floatingMeshes.forEach((m, i) => {
      gsap.fromTo([m.solid.scale, m.wire.scale],
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1.2, ease: 'back.out(1.7)', delay: 0.8 + i * 0.12 }
      )
    })

    // ── Mouse parallax ──
    let mouseX = 0, mouseY = 0
    let currentX = 0, currentY = 0
    const onMouse = e => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    // ── Resize ──
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ──
    let rafId
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Torus knot
      knot.rotation.x     += 0.0035
      knot.rotation.y     += 0.0025
      knotInner.rotation.x = knot.rotation.x
      knotInner.rotation.y = knot.rotation.y

      // Floating shapes
      floatingMeshes.forEach((m, i) => {
        m.solid.rotation.x += m.rx
        m.solid.rotation.y += m.ry
        m.wire.rotation.x  = m.solid.rotation.x
        m.wire.rotation.y  = m.solid.rotation.y
        const bob = Math.sin(t * 0.55 + i * 1.1) * 0.14
        m.solid.position.y = m.baseY + bob
        m.wire.position.y  = m.baseY + bob
      })

      // Rings
      ring.rotation.z  += 0.0008
      ring2.rotation.z -= 0.0005

      // Stars drift
      stars.rotation.y += 0.00006

      // Ambient particles
      ambParticles.rotation.y += 0.0004
      ambParticles.rotation.x  = Math.sin(t * 0.1) * 0.05

      // Warm light pulse
      warmLight.intensity = 8 + Math.sin(t * 1.2) * 1.5

      // Mouse parallax — smooth lerp
      currentX += (mouseX * 0.45 - currentX) * 0.04
      currentY += (mouseY * 0.2  - currentY) * 0.04
      group.rotation.y =  currentX
      group.rotation.x = -currentY * 0.4

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      scrollAnim.scrollTrigger?.kill()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
