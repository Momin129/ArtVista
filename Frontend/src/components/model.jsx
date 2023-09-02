/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas, useThree } from "@react-three/fiber";
import { Center, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Box } from "@mui/material";
import { StorageHost } from "../utility/host";
function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return <OrbitControls args={[camera, domElement]} />;
}

function Model({ path }) {
  const { scene } = useGLTF(`${StorageHost}/${path}`);

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
      <Canvas style={{ padding: 5, backgroundColor: "#050215" }}>
        <ambientLight />
        <Model path={currentModel} />
      </Canvas>
    </Box>
  );
}
