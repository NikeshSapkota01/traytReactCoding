import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { img_300, noPic } from "../../config/config";
import AddLinkIcon from "@mui/icons-material/AddLink";

export const BasicModal = (props) => {
  const [open, setOpen] = useState(false);
  const [allValues, setAllValues] = useState([]);
  const [video, setVideo] = useState();

  const { values } = props;

  const gettingTvMovieResult = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${values.media_type}/${values.id}?api_key=939724ef137267f56a303d87d09b0b6b&language=en-US`
    );
    console.log(`data`, data);
    setAllValues(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${values.media_type}/${values.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  console.log(`allValues`, allValues);

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
      >
        <Box
          sx={{
            width: "90%",
            height: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            display: "flex",
          }}
        >
          <div>
            <img
              src={
                values.poster_path ? `${img_300}/${values.poster_path}` : noPic
              }
              alt={values.name || values.title}
              className="ContentModal__portrait"
            />
          </div>
          <div style={{ marginLeft: "20px" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {allValues.tagline}
            </Typography>
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Genre: {"  "}
              {allValues &&
                allValues?.genres?.map((valuess) => {
                  console.log(`valuess`, valuess);
                  return valuess.name + " ";
                })}
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
              {allValues.overview}
            </Typography>

            <Button
              variant="contained"
              startIcon={<YouTubeIcon />}
              color="secondary"
              target="__blank"
              href={`https://www.youtube.com/watch?v=${video}`}
            >
              Watch Trailer
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
