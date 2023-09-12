/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas, useThree } from "@react-three/fiber";
import {
  Center,
  Html,
  OrbitControls,
  Stage,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Box } from "@mui/material";
import { major } from "../sx/colors";
import { Suspense } from "react";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

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
        <Stage
          adjustCamera
          intensity={0.5}
          shadows="contact"
          environment="city"
        >
          <mesh>
            <primitive object={scene} />
          </mesh>
        </Stage>
        <Controls />
      </Center>
    </>
  );
}

export default function GenerateModel({ currentModel }) {
  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Canvas style={{ padding: 5, backgroundColor: major }}>
        <Suspense fallback={<Loader />}>
          <ambientLight />
          <Model path={currentModel} />
        </Suspense>
      </Canvas>
    </Box>
  );
}
