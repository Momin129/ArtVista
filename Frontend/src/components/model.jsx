/* eslint-disable react/no-unknown-property */
import { Canvas, useThree } from "@react-three/fiber";
import { Center, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Box } from "@mui/material";
function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return <OrbitControls args={[camera, domElement]} />;
}

function Model() {
  const { scene } = useGLTF(
    "http://localhost:4242/uploads/cat.glb"
  );

  return (
    <>
      <Center>
        <Float speed={3} floatIntensity={3}>
          <mesh scale={5}>
            <primitive object={scene} />
          </mesh>
          <Controls />
        </Float>
      </Center>
    </>
  );
}

export default function GenerateModel() {
  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Canvas style={{ padding: 5, backgroundColor: "black" }}>
        <ambientLight />
        <Model />
      </Canvas>
    </Box>
  );
}
