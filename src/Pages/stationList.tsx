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
  const [open, setOpen] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [newStationName, setName] = React.useState<string>("Generic Location");
  const [stationList, setStationList] = React.useState<Station[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openDeleteConfirmPopUp, setDeleteConfirmPopUp] = useState<boolean>(
    false
  );
  const [openBlockConfirmPopUp, setBlockConfirmPopUp] = useState<boolean>(
    false
  );
  const [openUnblockConfirmPopUp, setUnblockConfirmPopUp] = useState<boolean>(
    false
  );
  const [getStationTrigger, setStationTrigger] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddStation = async () => {
    postStation(newStationName).then((r) => {});
    setOpen(false);
    setStationTrigger(!getStationTrigger);
  };
  const handleChangeName = (location: string) => {
    setName(location);
  };
  const blockClicked = async () => {
    await blockStation(stationList[selectedIndex].id.toString());
    setBlockConfirmPopUp(false);
    setStationTrigger(!getStationTrigger);
  };
  const unblockedClicked = async () => {
    await unblockStation(stationList[selectedIndex].id);
    setUnblockConfirmPopUp(false);
  };
  const deleteClicked = async () => {
    await deleteBikeStation(stationList[selectedIndex].id.toString())
      .then((response) => {
        setDeleteConfirmPopUp(false);
        setStationTrigger(!getStationTrigger);
      })
      .catch((error) => {
        setDeleteConfirmPopUp(false);
        setErrorMsg(error.response.data.message);
        setOpenError(true);
      });
  };
  const handleCloseBlockConfirmPopUp = () => {
    setBlockConfirmPopUp(false);
  };
  const handleCloseUnblockConfirmPopUp = () => {
    setUnblockConfirmPopUp(false);
  };
  const handleCloseDeleteConfirmPopUp = () => {
    setDeleteConfirmPopUp(false);
  };
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  const handleCloseError = () => {
    setOpenError(false);
  };
  const [viewBlockedStations, setViewBlockedStations] = useState<boolean>(false);
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
      <List className={classes.ListStyle} subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listItemStyle}>
              <Box
                className={classes.listBox}
                style={{ width: "50%" }}
              >
                <Box p={0} m={1} style={{ marginRight: "30px" }}>
                  State
                </Box>
                <Box p={0} m={1} style={{ marginRight: "30px" }}>
                  Bikes Count
                </Box>
                <Box p={0} m={1}>
                  Name
                </Box>
              </Box>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                style={{ margin: "5px", marginRight: "40px" }}
                onClick={handleClickOpen}
              >
                new station
              </Button>
              <Dialog disableBackdropClick open={open} onClose={handleClose}>
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                  <form className={classes.container}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="demo-dialog-native">Name</InputLabel>
                      <Input
                        onChange={(event: any) =>
                          handleChangeName(event.target.value)
                        }
                      />
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleAddStation} color="primary">
                    OK
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                disableBackdropClick
                open={openError}
                onClose={handleClose}
              >
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                  <p>{errorMsg}</p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseError} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
              <Switch
                checked={viewBlockedStations}
                onChange={() => setViewBlockedStations(!viewBlockedStations)}
                edge="start"
              />
              Display blocked stations
            </ListSubheader>
            {stationList.map((station, index) => {
              return (
                <li key={station.id}>
                  <ListItem
                    className={classes.listItemStyle}
                    onClick={() => handleListItemClick(index)}
                  >
                    <Box
                      className={classes.listBox}
                      style={{ width: "90%" }}
                    >
                      <Box p={0} m={1}>
                        <ListItemText primary={station.state} />
                      </Box>
                      <Box p={0} m={1} style={{ marginRight: "100px" }}>
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
                          className={classes.blockButton}
                          onClick={() => setBlockConfirmPopUp(true)}
                          startIcon={<ErrorOutlineIcon />}
                        >
                          {" "}
                          Block
                        </Button>
                      ) : (
                        <React.Fragment>
                          <Button
                            variant="contained"
                            className={classes.blockButton}
                            onClick={() => setUnblockConfirmPopUp(true)}
                            startIcon={<ErrorOutlineIcon />}
                          >
                            {" "}
                            Unblock
                          </Button>
                          { station.activeBikesCount != 0 ? null : <Button
                            variant="contained"
                            className={classes.deleteButton}
                            onClick={() => setDeleteConfirmPopUp(true)}
                            startIcon={<DeleteOutlineSharpIcon />}
                          >
                            {" "}
                            Delete
                          </Button>}
                        </React.Fragment>
                      )}
                      <Dialog
                        open={openBlockConfirmPopUp}
                        keepMounted
                        onClose={handleCloseBlockConfirmPopUp}
                      >
                        <DialogTitle>{"Block this station?"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Do you really want to block this station?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseBlockConfirmPopUp}
                            color="primary"
                          >
                            No
                          </Button>
                          <Button onClick={blockClicked} color="primary">
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        open={openDeleteConfirmPopUp}
                        keepMounted
                        onClose={handleCloseDeleteConfirmPopUp}
                      >
                        <DialogTitle>{"Delete this station?"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Do you really want you delete this station?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseDeleteConfirmPopUp}
                            color="primary"
                          >
                            No
                          </Button>
                          <Button onClick={deleteClicked} color="primary">
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        open={openUnblockConfirmPopUp}
                        keepMounted
                        onClose={handleCloseUnblockConfirmPopUp}
                      >
                        <DialogTitle>Unblock this station?</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Do you really want to unblock this station?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseUnblockConfirmPopUp}
                            color="primary"
                          >
                            No
                          </Button>
                          <Button onClick={unblockedClicked} color="primary">
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
