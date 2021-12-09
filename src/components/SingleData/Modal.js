import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { img_300, noPic } from "../../config/config";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Grid from "@mui/material/Grid";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import LiveTvIcon from "@mui/icons-material/LiveTv";

export const BasicModal = (props) => {
  const [open, setOpen] = useState(false);
  const [allValues, setAllValues] = useState([]);
  const [video, setVideo] = useState();

  const { values } = props;

  const gettingTvMovieResult = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${values.media_type}/${values.id}?api_key=939724ef137267f56a303d87d09b0b6b&language=en-US`
    );
    setAllValues(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${values.media_type}/${values.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    gettingTvMovieResult();
    fetchVideo();
  }, []);

  return (
    <div>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {props.children}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-body"
      >
        <div className="modal-main">
          <Grid container spacing={2}>
            <Grid item key={values.id} xs={12} md={6} lg={4}>
              <img
                src={
                  values.poster_path
                    ? `${img_300}/${values.poster_path}`
                    : noPic
                }
                alt={values.name || values.title}
                className="ContentModal__portrait"
              />
            </Grid>
            <Grid item key={values.id} xs={12} md={6} lg={8}>
              <div className="modal-info">
                <h2 className="modal-heading">
                  <b> {allValues.tagline}</b>
                </h2>
                {allValues.imdb_id && (
                  <Button
                    variant="text"
                    startIcon={<AddLinkIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.imdb.com/title/${allValues.imdb_id}/?ref_=nv_sr_srsg_0`}
                  >
                    {values.original_title}
                  </Button>
                )}
                <p className="modal-padding movies-info">
                  Genre:
                  {allValues &&
                    allValues?.genres?.map((valuess) => {
                      return " " + valuess.name;
                    })}
                  &nbsp;
                  {values.media_type === "movie" ? (
                    <>
                      <MovieFilterIcon
                        fontSize="small"
                        className="image-fixations"
                      />
                    </>
                  ) : (
                    <>
                      <LiveTvIcon
                        fontSize="small"
                        className="image-fixations"
                      />
                    </>
                  )}
                </p>
                <p className="modal-padding"> {allValues.overview} </p>

                <Button
                  variant="contained"
                  startIcon={<YouTubeIcon />}
                  color="success"
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${video}`}
                >
                  Watch Trailer
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};
