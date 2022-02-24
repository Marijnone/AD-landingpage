import React, { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sky, OrbitControls } from "@react-three/drei"
import Grass from "./Grass"

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  )
}

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [15, 15, 10] }}>
        <Sky azimuth={1} inclination={0.5} distance={1000} sunPosition={[20, 1, 0]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Grass />
          <Box position={[-10, 10, 0]} />
        </Suspense>
        <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
      </Canvas>
      <div class="overlay">
        <a href="https://docs.pmnd.rs/react-three-fiber/examples/showcase">
          <b>Spotify</b>
        </a>
        <a class="right" href="https://codesandbox.io/s/baked-ao-f5sgi">
          /csb
        </a>

        <h2>
          AVIFAUNA DREAMS <br />
          High Quality Recorded Soundscapes <br />
        </h2>
      </div>
    </>
  )
}
