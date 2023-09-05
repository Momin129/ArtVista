import { major, minor, textColor } from "./colors";

const size = { height: 1, backgroundColor: major, color: textColor };

const centerAlign = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const stack = { flexDirection: "column" };

const roundBorder = { border: 2, borderColor: minor, borderRadius: 3 };

const card = [
  centerAlign,
  roundBorder,
  stack,
  { height: 400, width: 300, overflow: "hidden", gap: 3, padding: 1 },
];

export { size, centerAlign, stack, roundBorder, card };
