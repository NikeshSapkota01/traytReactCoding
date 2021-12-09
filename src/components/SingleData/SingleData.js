import { img_300, noPic } from "../../config/config";
import Card from "@mui/material/Card";
import { CardMedia } from "@mui/material";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import Badge from "@mui/material/Badge";
import "./Singledata.css";
import { BasicModal } from "./Modal";

export const SingleData = ({ values, media_type = "" }) => {
  const poster = values.poster_path || values.profile_path;

  return (
    <BasicModal values={values}>
      <Card className="card">
        <CardMedia
          component="img"
          height="350px"
          alt={values.title || values.name}
          image={poster ? `${img_300}/${poster}` : noPic}
          style={{ objectFit: "contain" }}
        />
        <Badge
          badgeContent={values.vote_average ? values.vote_average : "NA"}
          color={values.vote_average > 7 ? "primary" : "secondary"}
        />
        <CardContent className="content">
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            {values.title}
          </Typography>
          <Typography variant={"caption"}>
            {values.media_type === "movie" || media_type === "movie" ? (
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
          <Divider className="divider" light />
        </CardContent>
      </Card>
    </BasicModal>
  );
};
