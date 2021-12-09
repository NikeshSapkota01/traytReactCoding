import axios from "axios";
import React, { useEffect, useState } from "react";
import { SingleData } from "../../components/SingleData/SingleData";
import Grid from "@mui/material/Grid";
import { CustomPagination } from "../../components/Pagination/CustomPagination";

export const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);

  const fetchMovieData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    setMovieData(data?.results);
    setTotalPage(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovieData();
  }, [page]);

  return (
    <div>
      <span> All the movies are listed here </span>

      <Grid container spacing={2}>
        {movieData &&
          movieData.map((values) => (
            <Grid item key={values.id} xs={12} sm={6} md={6} lg={4}>
              <SingleData key={values.id} values={values} media_type="movie" />
            </Grid>
          ))}
      </Grid>

      <CustomPagination setPage={setPage} totalPage={totalPage} />
    </div>
  );
};
