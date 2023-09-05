/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas, useThree } from "@react-three/fiber";
import { Center, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Box } from "@mui/material";
import { major } from "../sx/colors";

function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return <OrbitControls args={[camera, domElement]} />;
}

function Model({ path }) {
  const { scene } = useGLTF(`${import.meta.env.VITE_STORAGE_HOST}/${path}`);

  return (
    <>
      <Center>
        <Float speed={3} floatIntensity={3}>
          <mesh scale={7}>
            <primitive object={scene} />
          </mesh>
          <Controls />
        </Float>
      </Center>
    </>
  );
}

export default function GenerateModel({ currentModel }) {
  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Canvas style={{ padding: 5, backgroundColor: major}}>
        <ambientLight />
        <Model path={currentModel} />
      </Canvas>
    </Box>
  );
}
