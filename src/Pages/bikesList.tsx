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
  const [openedDeleteBikeDialogIndex, setOpenedDeleteBikeDialogIndex] = useState<number>(-1);
  const [openCreateBikeDialog, setOpenCreateBikeDialog] = useState<boolean>(false);
  const [chosenStationId, setChosenStationId] = React.useState<string>("");
  const [bikeList, setBikeList] = React.useState<Bike[]>([]);
  const [stationList, setStationList] = React.useState<Station[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [getBikesTrigger, setBikesTrigger] = React.useState(true);
  const [noStations, setNoStations] = React.useState(true);
  const handleBikeListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  const handleChangeChosenStation = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setChosenStationId(String(event.target.value));
  };
  const handleCloseDeleteBike = () => {
    setOpenedDeleteBikeDialogIndex(-1);
  };
  const handleDeleteBike = async () => {
    await deleteBike(bikeList[selectedIndex].id);
    setOpenedDeleteBikeDialogIndex(-1);
    setBikesTrigger(!getBikesTrigger);
  };
  const handleOpenCreateBike = () => {
    setChosenStationId(stationList[0].id);
    setOpenCreateBikeDialog(true);
  };

  const handleCloseCreateBike = () => {
    setOpenCreateBikeDialog(false);
  };
  const handleCreateBike = async () => {
    postBike(chosenStationId).then((r) => {});
    setOpenCreateBikeDialog(false);
    setBikesTrigger(!getBikesTrigger);
  };
  const isThisDeleteBikeDialogOpened = (dialogIndex: number) => {
    return openedDeleteBikeDialogIndex === dialogIndex ? true : false
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

      setNoStations(r.data?.stations.length === 0); // czy lista stacji pusta
    });
  }, [getBikesTrigger]);
  return (
    <div className={classes.generalContainer}>
      <h1 className={classes.pageTitle}>
          BIKES
      </h1>
      <List className={classes.ListStyle} subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheaderStyle}>
              <Box className={classes.listBox} style={{ width: "80%" }}>
                <Box p={0} m={1} style={{width: "90px"}}>
                  State
                </Box>
                <Box p={0} m={1}>
                  Station
                </Box>
              </Box>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                id="bikes-new"
                style={{ margin: "3px", lineHeight: 1}}
                onClick={handleOpenCreateBike}
                disabled={noStations}
              >
                new bike
              </Button>
              <Dialog
                disableBackdropClick
                open={openCreateBikeDialog}
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
                        id="bikes-add-station"
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
                  <ListItem className={classes.listItemStyle}
                    onClick={() => handleBikeListItemClick(index)}
                  >
                    <Box className={classes.listBox} style={{ width: "90%" }}>
                      <Box p={0} m={1} style={{width: "90px"}}>
                        <ListItemText primary={bike.status} />
                      </Box>
                      <Box p={0} m={1}>
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
                        onClick={() => setOpenedDeleteBikeDialogIndex(index)}
                      >
                        {" "}
                        DELETE
                      </Button>
                      <Dialog
                        open={isThisDeleteBikeDialogOpened(index)}
                        keepMounted
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
                          <Button onClick={handleDeleteBike} color="primary">
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
