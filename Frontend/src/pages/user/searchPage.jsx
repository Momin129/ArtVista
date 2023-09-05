import { Box, Button, Grid, Typography, CircularProgress } from "@mui/material";
import { size, centerAlign, card } from "../../sx/container";
import CardImage from "../../components/cardImage";
import { minorButton } from "../../sx/button";
import { useEffect, useState } from "react";
import { searchModel } from "../../utility/api/modelSearch";
import { useLocation, useNavigate } from "react-router-dom";
import { minor } from "../../sx/colors";

export default function SearchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { query } = state;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const response = await searchModel(query);
      setList(response);
      setLoading(false);
    })();
  }, [query]);
  return (
    <Box sx={[size, centerAlign]}>
      {loading ? (
        <CircularProgress sx={{ color: minor }} />
      ) : (
        <Grid container spacing={2}>
          {list.length > 0 ? (
            list.map((item, index) => (
              <Grid key={index} item xs={12} md={3} sx={[centerAlign]}>
                <Box sx={card}>
                  <CardImage source={item.thumbnail} />
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      textShadow: "2px 2px 2px black",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={[minorButton, { width: 1 }]}
                    onClick={() =>
                      navigate("/displayModels", {
                        state: { type: item.type, searchModel: item },
                      })
                    }
                  >
                    View
                  </Button>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 34,
                fontWeight: "bold",
                flexGrow: 1,
              }}
            >
              Nothing matched for the search query {`"${query}"`}.
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
}
