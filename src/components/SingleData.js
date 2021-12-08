import { img_300, noPic } from "../config/config";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import LiveTvIcon from "@mui/icons-material/LiveTv";

import Badge from "@mui/material/Badge";
export const SingleData = ({ values }) => {
  console.log(`{values}`, values);
  const poster = values.poster_path;
  const title = values.title || values.name;
  // const date = values.first_air_date || values.release_date;
  const media_type = values.media_type;
  const vote_average = values.vote_average;

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  return (
    <Grid item xs={6} sm={6} lg={4}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 7 ? "primary" : "secondary"}
        style={{ left: "98%", position: "relative", top: "10px" }}
      />
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
          minHeight: 150,
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt={title} src={poster ? `${img_300}/${poster}` : noPic} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Rating: {vote_average}/10
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {media_type === "movie" ? (
                    <>
                      <span> Movie </span>
                      <MovieFilterIcon fontSize="small" />
                    </>
                  ) : (
                    <>
                      <span> TV Series </span>
                      <LiveTvIcon fontSize="small" />
                    </>
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{ cursor: "pointer" }}
                  variant="body2"
                  onClick={() =>
                    window.open(`https://www.youtube.com/watch?v=jCEdTq3j-0U`)
                  }
                >
                  Watch Trailer
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
