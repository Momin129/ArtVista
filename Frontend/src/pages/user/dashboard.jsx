import { Box, Button } from "@mui/material";
import UploadsList from "../../components/user/dashboard/uploadsList";
import Favourites from "../../components/user/dashboard/favourites";
import { useEffect, useState } from "react";
import { fetchFavourites, fetchUserUploads } from "../../utility/api";
import { centerAlign, size, stack } from "../../sx/container";
import { minorButton } from "../../sx/button";
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
    <Box sx={[size, centerAlign, stack]}>
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
            sx={[minorButton]}
            onClick={() => setShow(true)}
          >
            Favourites
          </Button>
          <Button
            variant="contained"
            sx={[minorButton]}
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
            <UploadsList
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
