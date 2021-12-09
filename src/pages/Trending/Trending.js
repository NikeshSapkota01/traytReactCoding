import axios from "axios";
import React, { useEffect, useState } from "react";
import { SingleData } from "../../components/SingleData/SingleData";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CustomPagination } from "../../components/Pagination/CustomPagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [mediaType, setMediaType] = useState("all");
  const [timewindow, setTimewindow] = useState("week");

  const fetchTrendingData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/${timewindow}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setTrendingData(data?.results);
    setTotalPage(data.total_pages);
  };

  const handleChange = (event) => {
    setMediaType(event.target.value);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrendingData();
  }, [page, mediaType, timewindow]);

  return (
    <div>
      <p>
        {mediaType} in {timewindow}
      </p>

      <ThemeProvider theme={darkTheme}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label2">Media Type </InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select2"
            value={mediaType}
            label="Media Type"
            onChange={handleChange}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"movie"}>Movie</MenuItem>
            <MenuItem value={"tv"}>Series</MenuItem>
            <MenuItem value={"person"}>Person</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Time Input </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={timewindow}
            label="Time Window"
            onChange={(event) => setTimewindow(event.target.value)}
          >
            <MenuItem value={"week"}>Week</MenuItem>
            <MenuItem value={"day"}>Daily</MenuItem>\
          </Select>
        </FormControl>
      </ThemeProvider>

      <Grid container spacing={2}>
        {trendingData &&
          trendingData.map((values) => (
            <Grid item key={values.id} xs={12} sm={6} md={6} lg={4}>
              <SingleData key={values.id} values={values} />
            </Grid>
          ))}
      </Grid>

      <CustomPagination setPage={setPage} totalPage={totalPage} />
    </div>
  );
};
