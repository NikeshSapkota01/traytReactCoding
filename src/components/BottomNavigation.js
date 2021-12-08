import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import { useNavigate } from "react-router-dom";

export const MainNavigation = () => {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
  }, [value, navigate]);

  return (
    <Box>
      <Paper
        bgcolor="#2d313a"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
          <BottomNavigationAction label="Movies" icon={<MovieFilterIcon />} />
          <BottomNavigationAction label="TV shows" icon={<LiveTvIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
