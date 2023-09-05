import { major, minor } from "./colors";

const minorButton = {
  backgroundColor: minor,
  color: major,
  fontWeight: "bold",
  "&:hover": { backgroundColor: minor },
};

export { minorButton };
