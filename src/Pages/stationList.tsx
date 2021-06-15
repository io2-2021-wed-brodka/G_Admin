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
  Switch,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import {
  blockStation,
  unblockStation,
  deleteBikeStation,
  getStations,
  postStation,
  Station,
  getActiveStations,
  getBlockedStations,
} from "../Api/bikeStationApi";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DeleteOutlineSharpIcon from "@material-ui/icons/DeleteOutlineSharp";
import { themeWarning, useStyles } from "../Styles/style";

function StationListPage() {
  const classes = useStyles();
  const [openNewStationDialog, setOpenNewStationDialog] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [newStationName, setName] = React.useState<string>("Generic Location");
  const [stationList, setStationList] = React.useState<Station[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [newStationBikeLimit, setNewStationBikeLimit] = React.useState(10);
  const [openedDeleteStationDialogIndex, setOpenedDeleteStationDialogIndex] = useState<number>(-1);
  const [openedBlockStationDialogIndex, setOpenedBlockStationDialogIndex] = useState<number>(-1);
  const [openedUnblockStationDialogIndex, setOpenedUnblockStationDialogIndex] = useState<number>(-1);
  const [getStationTrigger, setStationTrigger] = React.useState(true);
  const handleOpenNewStationDialog = () => {
    setOpenNewStationDialog(true);
  };
  const handleCloseNewStationDialog = () => {
    setOpenNewStationDialog(false);
  };
  const handleAddStation = async () => {
    postStation(newStationName, newStationBikeLimit).then((r) => {});
    setOpenNewStationDialog(false);
    setStationTrigger(!getStationTrigger);
  };
  const handleChangeName = (location: string) => {
    setName(location);
  };
  const handleChangeBikeLimit = (bikeLimit: number) => {
    if (bikeLimit > 100) {
      alert("Maximum 100 bikes in station");
      bikeLimit = 100;
    } else if (bikeLimit < 1) {
      alert("Minimum 1 bike in station");
      bikeLimit = 1;
    }
    setNewStationBikeLimit(bikeLimit);
  };
  const handleBlockStation = async () => {
    await blockStation(stationList[selectedIndex].id.toString());
    setOpenedBlockStationDialogIndex(-1);
    setStationTrigger(!getStationTrigger);
  };
  const handleUnblockStation = async () => {
    await unblockStation(stationList[selectedIndex].id);
    setOpenedUnblockStationDialogIndex(-1);
    setStationTrigger(!getStationTrigger);
  };
  const handleDeleteStation = async () => {
    await deleteBikeStation(stationList[selectedIndex].id.toString())
      .then((response) => {
        setOpenedDeleteStationDialogIndex(-1);
        setStationTrigger(!getStationTrigger);
      })
      .catch((error) => {
        setOpenedDeleteStationDialogIndex(-1);
        setErrorMsg(error.response.data.message);
        setOpenError(true);
      });
  };
  const handleCloseBlockStationDialog = () => {
    setOpenedBlockStationDialogIndex(-1);
  };
  const handleCloseUnblockDialog = () => {
    setOpenedUnblockStationDialogIndex(-1);
  };
  const handleCloseDeleteStationDialog = () => {
    setOpenedDeleteStationDialogIndex(-1);
  };
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  const handleCloseError = () => {
    setOpenError(false);
  };
  const [viewBlockedStations, setViewBlockedStations] = useState<boolean>(
    false
  );
  const isThisDeleteStationDialogOpened = (dialogIndex: number) => {
    return openedDeleteStationDialogIndex === dialogIndex ? true : false;
  }
  const isThisBlockStationDialogOpened = (dialogIndex: number) => {
    return openedBlockStationDialogIndex === dialogIndex ? true : false;
  }
  const isThisUnblockStationDialogOpened = (dialogIndex: number) => {
    return openedUnblockStationDialogIndex === dialogIndex ? true : false;
  }
  useEffect(() => {
    !viewBlockedStations
      ? getActiveStations().then((r) => {
          if (r.isError) {
            alert("Error");
            return;
          }
          setStationList(r.data?.stations || []);
        })
      : getBlockedStations().then((r) => {
          if (r.isError) {
            alert("Error");
            return;
          }
          setStationList(r.data?.stations || []);
        });
  }, [getStationTrigger, viewBlockedStations]);
  return (
    <div className={classes.generalContainer}>
      <h1 className={classes.pageTitle}>
          STATIONS
      </h1>
      <List className={classes.ListStyle} subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheaderStyle}>
              <Box className={classes.listBox} style={{ width: "50%" }}>
                <Box p={0} m={1} style={{ width: "90px" }}>
                  State
                </Box>
                <Box p={0} m={1} style={{ width: "90px" }}>
                  Bikes Count
                </Box>
                <Box p={0} m={1}>
                  Name
                </Box>
              </Box>
              <Box style={{marginRight: "40px" }}>
                  <Switch
                    id="stations-switch-blocked"
                    checked={viewBlockedStations}
                    onChange={() => setViewBlockedStations(!viewBlockedStations)}
                    edge="start"
                  />
                  Display blocked stations
              </Box>
              <Button
                startIcon={<AddIcon />}
                id="stations-new"
                variant="contained"
                style={{ margin: "5px"}}
                onClick={handleOpenNewStationDialog}
              >
                new station
              </Button>
              <Dialog disableBackdropClick open={openNewStationDialog}>
                <DialogTitle>New station form</DialogTitle>
                <DialogContent>
                  <form className={classes.container}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="demo-dialog-native">Name</InputLabel>
                      <Input
                        id="stations-add-name"
                        onChange={(event: any) =>
                          handleChangeName(event.target.value)
                        }
                      />
                      Bike limit:
                      <input
                        id="stations-add-limit"
                        type="number"
                        min="1"
                        max="100"
                        step="1"
                        value={newStationBikeLimit}
                        onChange={(event: any) =>
                          handleChangeBikeLimit(event.target.value)
                        }
                      ></input>
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleAddStation} color="primary">
                    OK
                  </Button>
                  <Button onClick={handleCloseNewStationDialog} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                disableBackdropClick
                open={openError}
                onClose={handleCloseNewStationDialog}
              >
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                  <p>{errorMsg}</p>
                </DialogContent>
                <DialogActions>
                  <Button id="stations-add-confirm" onClick={handleCloseError} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
              
            </ListSubheader>
            {stationList.map((station, index) => {
              return (
                <li key={station.id}>
                  <ListItem
                    className={classes.listItemStyle}
                    onClick={() => handleListItemClick(index)}
                  >
                    <Box className={classes.listBox} style={{ width: "90%" }}>
                      <Box p={0} m={1} style={{ width: "90px" }}>
                        <ListItemText primary={station.status} />
                      </Box>
                      <Box p={0} m={1} style={{ width: "90px" }}>
                        <ListItemText primary={station.activeBikesCount} />
                      </Box>
                      <Box p={0} m={1}>
                        <ListItemText primary={station.name} />
                      </Box>
                    </Box>
                    <ThemeProvider theme={themeWarning}>
                      {!viewBlockedStations ? (
                        <Button
                          variant="contained"
                          id={`station-block-confirm-${index}`}
                          className={classes.blockButton}
                          onClick={() => setOpenedBlockStationDialogIndex(index)}
                          startIcon={<ErrorOutlineIcon />}
                        >
                          {" "}
                          Block
                        </Button>
                      ) : (
                        <React.Fragment>
                          <Button
                            variant="contained"
                            id={`station-unblock-confirm-${index}`}
                            className={classes.blockButton}
                            onClick={() => setOpenedUnblockStationDialogIndex(index)}
                            startIcon={<ErrorOutlineIcon />}
                          >
                            {" "}
                            Unblock
                          </Button>
                          {station.activeBikesCount != 0 ? null : (
                            <Button
                              id={`station-remove-${index}`}
                              variant="contained"
                              className={classes.deleteButton}
                              onClick={() => setOpenedDeleteStationDialogIndex(index)}
                              startIcon={<DeleteOutlineSharpIcon />}
                            >
                              {" "}
                              Delete
                            </Button>
                          )}
                        </React.Fragment>
                      )}
                      <Dialog
                        open={isThisBlockStationDialogOpened(index)}
                        keepMounted
                      >
                        <DialogTitle>{"Block this station?"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Do you really want to block this station?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseBlockStationDialog}
                            color="primary"
                          >
                            No
                          </Button>
                          <Button
                            id={`station-block-confirm`} onClick={handleBlockStation} color="primary">
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        open={isThisDeleteStationDialogOpened(index)}
                        keepMounted
                      >
                        <DialogTitle>{"Delete this station?"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Do you really want you delete this station?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseDeleteStationDialog}
                            color="primary"
                          >
                            No
                          </Button>
                          <Button id={`station-remove-confirm`} onClick={handleDeleteStation} color="primary">
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        open={isThisUnblockStationDialogOpened(index)}
                        keepMounted
                      >
                        <DialogTitle>Unblock this station?</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Do you really want to unblock this station?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseUnblockDialog}
                            color="primary"
                          >
                            No
                          </Button>
                          <Button id={`station-unblock-confirm`} onClick={handleUnblockStation} color="primary">
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
}

export default StationListPage;
