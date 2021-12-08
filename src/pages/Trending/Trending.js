import axios from "axios";
import React, { useEffect, useState } from "react";
import { SingleData } from "../../components/SingleData";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);

  const fetchTrendingData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setTrendingData(data?.results);
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  return (
    <div>
      <span> Trending page </span>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {trendingData &&
            trendingData.map((values) => {
              return <SingleData key={values.id} values={values} />;
            })}
        </Grid>
      </Box>
    </div>
  );
};
