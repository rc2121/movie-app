import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { getMovieList } from "../api/movieList";
import UnwatchedMovies from "../components/UnwatchedMovies";
import WatchedMovies from "../components/WatchedMovies";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    display: "flex",
    flexDirection: "row-reverse",
    padding: "16px",
  },
}));

export default function MovieTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    async function fetched() {
      const movieDetails = await getMovieList();
      setMovies(movieDetails);
      setSearchData(movieDetails);
    }
    fetched();
  }, []);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleWatchedUnwatchedMovies = (id, status) => {
    let movieList = [...searchData];
    movieList.forEach((item) => {
      if (item.id === id) {
        item.watched = status;
      }
    });
    setSearchData(movieList);
  };

  const handleSearch = (e) => {
    const movieList = [...searchData];
    let reg = new RegExp(e.target.value, "i");
    if (e.target.value) {
      const searched = movieList.filter((item) => item.title.match(reg));
      setSearchData(searched);
    } else {
      setSearchData(movies);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <TextField
          id="outlined-basic"
          label="Search My Movies"
          variant="outlined"
          size="small"
          onChange={handleSearch}
        />
      </div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Watched" {...a11yProps(0)} />
          <Tab label="Unwatched" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <WatchedMovies
          data={searchData}
          addToUnwatch={handleWatchedUnwatchedMovies}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UnwatchedMovies
          data={searchData}
          addToWatch={handleWatchedUnwatchedMovies}
        />
      </TabPanel>
    </div>
  );
}
