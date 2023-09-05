import { major, minor } from "./colors";

const size = { height: 1, backgroundColor: major, color: "white" };

const centerAlign = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const stack = { flexDirection: "column" };

const roundBorder = { border: 1, borderColor: minor, borderRadius: 3 };

const card = [
  centerAlign,
  roundBorder,
  stack,
  { height: 400, width: 300, overflow: "hidden", gap: 2, padding: 1 },
];

export { size, centerAlign, stack, roundBorder, card };
