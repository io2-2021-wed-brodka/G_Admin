import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import "../App.css";
import "../Layout/topbar.tsx";
import List from "@material-ui/core/List";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog/Dialog";
import AddIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import { Bike, deleteBike, getBikes, postBike } from "../Api/bikeApi";
import { getStations, Station } from "../Api/bikeStationApi";
import DeleteOutlineSharpIcon from "@material-ui/icons/DeleteOutlineSharp";
import { themeWarning, useStyles } from "../Styles/style";

const BikeListPage = () => {
  const classes = useStyles();
  const [openDeleteBike, setOpenDeleteBike] = useState<boolean>(false);
  const [openCreateBike, setOpenCreateBike] = useState<boolean>(false);
  const [chosenStationId, setChosenStationId] = React.useState<string>("");
  const [bikeList, setBikeList] = React.useState<Bike[]>([]);
  const [stationList, setStationList] = React.useState<Station[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [getBikesTrigger, setBikesTrigger] = React.useState(true);
  const handleBikeListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  const handleChangeChosenStation = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setChosenStationId(String(event.target.value));
  };
  const handleCloseDeleteBike = () => {
    setOpenDeleteBike(false);
  };
  const deleteBikeClicked = async () => {
    await deleteBike(bikeList[selectedIndex].id);
    setOpenDeleteBike(false);
    setBikesTrigger(!getBikesTrigger);
  };
  const handleOpenCreateBike = () => {
    setChosenStationId(stationList[0].id);
    setOpenCreateBike(true);
  };

  const handleCloseCreateBike = () => {
    setOpenCreateBike(false);
  };
  const handleCreateBike = async () => {
    postBike(chosenStationId).then((r) => {});
    setOpenCreateBike(false);
    setBikesTrigger(!getBikesTrigger);
  };
  useEffect(() => {
    getBikes().then((r) => {
      if (r.isError) {
        alert("Error");
        return;
      }
      setBikeList(r.data?.bikes || []);
    });
    getStations().then((r) => {
      if (r.isError) {
        alert("Error");
        return;
      }
      setStationList(r.data?.stations || []);
    });
  }, [getBikesTrigger]);
  return (
    <div className={classes.generalContainer}>
      <List className={classes.ListStyle} subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheaderStyle}>
              <Box
                display="flex"
                flexDirection="row"
                p={1}
                m={1}
                alignSelf="center"
                style={{ width: "90%" }}
              >
                <Box p={1} m={1}>
                  State
                </Box>
                <Box p={1} m={1} style={{ marginLeft: "6%" }}>
                  Station
                </Box>
              </Box>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                style={{ margin: "5px" }}
                onClick={handleOpenCreateBike}
              >
                NEW BIKE
              </Button>
              <Dialog
                disableBackdropClick
                open={openCreateBike}
                onClose={handleCloseCreateBike}
              >
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                  <form className={classes.container}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="demo-dialog-native">
                        station
                      </InputLabel>
                      <Select
                        native
                        value={chosenStationId}
                        onChange={handleChangeChosenStation}
                        input={<Input />}
                      >
                        {stationList.map((station) => {
                          return (
                            <option value={station.id}> {station.name} </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCreateBike} color="primary">
                    OK
                  </Button>
                  <Button onClick={handleCloseCreateBike} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </ListSubheader>
            {bikeList.map((bike, index) => {
              return (
                <li key={bike.id}>
                  <ListItem
                    style={{
                      backgroundColor: "#69696e",
                      color: "white",
                      display: "flex",
                      height: "50px",
                      marginBottom: "5px",
                      marginTop: "5px",
                      borderRadius: "15px",
                    }}
                    onClick={() => handleBikeListItemClick(index)}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      p={1}
                      m={1}
                      alignSelf="center"
                      style={{ width: "90%" }}
                    >
                      <Box p={2} m={1}>
                        <ListItemText primary={bike.status} />
                      </Box>
                      <Box p={2} m={1}>
                        <ListItemText
                          primary={
                            bike.station == null ? "" : bike.station.name
                          }
                        />
                      </Box>
                    </Box>
                    <ThemeProvider theme={themeWarning}>
                      <Button
                        className={classes.deleteButton}
                        id="delete_bike_button"
                        startIcon={<DeleteOutlineSharpIcon />}
                        onClick={() => setOpenDeleteBike(true)}
                      >
                        {" "}
                        DELETE
                      </Button>
                      <Dialog
                        open={openDeleteBike}
                        keepMounted
                        onClose={handleCloseDeleteBike}
                      >
                        <DialogTitle id="alert-dialog-slide-title">
                          {"Delete this bike?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            Do you really want you delete this bike?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseDeleteBike}
                            color="primary"
                          >
                            No
                          </Button>
                          <Button onClick={deleteBikeClicked} color="primary">
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </ThemeProvider>
                  </ListItem>
                </li>
              );
            })}
          </ul>
        </li>
      </List>
    </div>
  );
};
export default BikeListPage;
