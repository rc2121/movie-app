import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function WatchedMovies(props) {
  const classes = useStyles();
  let { data, addToUnwatch } = props;
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [currentSelectListTitle, setCurrentSelectListTitle] = useState(false);

  useEffect(() => {
    setWatchedMovies(() => data.filter((d) => d.watched === true));
  }, [data]);

  const handleClick = (e, title) => {
    setCurrentSelectListTitle((prev) => (prev === title ? null : title));
  };

  return (
    <div>
      {watchedMovies?.length > 0 ? (
        watchedMovies.map((item, index) => (
          <List
            key={`title-${index}`}
            className={classes.root}
            aria-label="mailbox folders"
          >
            <ListItem button onClick={(e) => handleClick(e, item.title)}>
              <ListItemText primary={item.title} />
            </ListItem>
            {currentSelectListTitle === item.title && (
              <Collapse in={true} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <img
                        src={`https://image.tmdb.org/t/p/w154/${item.poster_path}`}
                        alt="img"
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "16px",
                        }}
                      >
                        <p>
                          <strong>Title:</strong> {item.title}
                        </p>
                        <p>
                          <strong>Voted:</strong> {item.vote_average}
                        </p>
                      </div>
                      <Checkbox
                        checked={item.watched ? true : false}
                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                        onChange={(e) => {
                          addToUnwatch(item.id, false);
                        }}
                      />
                      Watched
                    </ListItemText>
                  </ListItem>
                </List>
              </Collapse>
            )}
            <Divider />
          </List>
        ))
      ) : (
        <Typography style={{ marginTop: '20px', display: "flex", justifyContent: "center" }}>
          No movies found
        </Typography>
      )}
    </div>
  );
}
