/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  Html,
  OrbitControls,
  Stage,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Box } from "@mui/material";
import { major } from "../../sx/colors";
import { Suspense, useRef } from "react";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center style={{ fontSize: 24 }}>
      {Math.round(progress)} % loaded
    </Html>
  );
}

function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return <OrbitControls args={[camera, domElement]} />;
}

function Model({ filename, rotate }) {
  const meshRef = useRef();
  useFrame(() => {
    if (rotate) meshRef.current.rotation.y += 0.01;
  });

  const { scene } = useGLTF(`/model/${filename}`);

  return (
    <>
      <Center>
        <Stage
          adjustCamera
          intensity={0.5}
          shadows="contact"
          environment={null}
        >
          <mesh>
            <primitive ref={meshRef} object={scene} rotate />
          </mesh>
        </Stage>
        {/* <Controls /> */}
      </Center>
    </>
  );
}

export default function GenerateRotateModel({ currentModel, rotate }) {
  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Canvas style={{ padding: 5, backgroundColor: major }}>
        <Suspense fallback={<Loader />}>
          <ambientLight />
          <Model filename={currentModel} rotate={rotate} />
        </Suspense>
      </Canvas>
    </Box>
  );
}
