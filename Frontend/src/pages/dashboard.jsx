import { Box, Button } from "@mui/material";
import Uploads from "../components/dashboard/uploads";
import Favourites from "../components/dashboard/favourites";
import { useEffect, useState } from "react";
import { fetchFavourites, fetchUserUploads } from "../utility/api";

export default function Dashboard() {
  const [show, setShow] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const [list, setList] = useState([]);
  const [lastUploaded, setLastUploaded] = useState("");

  useEffect(() => {
    (async () => {
      const model = await fetchFavourites();
      setFavourites(model);
    })();
    (async () => {
      try {
        const list = await fetchUserUploads();
        setList(list);
        list.length > 0 && setLastUploaded(list.slice(-1)[0].status);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Box
      sx={{
        height: { xs: 1, md: 1 },
        backgroundColor: "#050215",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          height: { xs: "80%", md: "80%" },
          padding: 5,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2dfdc6",
              color: "black",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#02ca95" },
            }}
            onClick={() => setShow(true)}
          >
            Favourites
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2dfdc6",
              color: "black",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#02ca95" },
            }}
            onClick={() => setShow(false)}
          >
            Uploads
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: 3,
            height: "90%",
            padding: 2,
          }}
        >
          {show && (
            <Favourites favourites={favourites} setFavourites={setFavourites} />
          )}
          {!show && (
            <Uploads
              list={list}
              lastUploaded={lastUploaded}
              setList={setList}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
