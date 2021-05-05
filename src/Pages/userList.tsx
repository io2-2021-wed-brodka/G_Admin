import React, { useEffect, useState } from "react";
import "../App.css";
import "../Layout/topbar.tsx";
import List from "@material-ui/core/List";
import {
  ListItem,
  ListItemText,
  ListSubheader,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  Switch,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { useStyles } from "../Styles/style";
import {
  blockUser,
  getBlockedUsers,
  getUsers,
  unblockUser,
  User,
} from "../Api/userApi";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AddIcon from "@material-ui/icons/Add";
import { addTech, deleteTech, getTechs } from "../Api/techApi";
export const UserListPage = () => {
  const classes = useStyles();
  const [userList, setUserList] = React.useState<User[]>([]);
  const [techList, setTechList] = React.useState<User[]>([]);
  const [selectedIndexUsers, setSelectedIndexUsers] = React.useState(-1);
  const [selectedIndexTechs, setSelectedIndexTechs] = React.useState(-1);
  const [getUsersTrigger, setUsersTrigger] = React.useState(true);
  const [openBlockConfirmPopUp, setBlockConfirmPopUp] = useState<boolean>(
    false
  );
  const [openUnblockConfirmPopUp, setUnblockConfirmPopUp] = useState<boolean>(
    false
  );
  const [viewBlockedUsers, setViewBlockedUsers] = useState<boolean>(false);
  const [getTechsTrigger, setTechsTrigger] = React.useState(true);
  const [newTechName, setTechName] = React.useState<string>("Generic Name");
  const [newTechPassword, setTechPassword] = React.useState<string>(
    "Generic Password"
  );
  const [openDeleteTechConfirmPopUp, setDeleteConfirmPopUp] = useState<boolean>(
    false
  );
  const [openAddTechConfirmPopUp, setAddTechConfirmPopUp] = useState<boolean>(
    false
  );
  useEffect(() => {
    !viewBlockedUsers
      ? getUsers().then((r) => {
          if (r.isError) {
            alert("Error");
            return;
          }
          setUserList(r.data?.users || []);
        })
      : getBlockedUsers().then((r) => {
          if (r.isError) {
            alert("Error");
            return;
          }
          setUserList(r.data?.users || []);
        });
  }, [getUsersTrigger, viewBlockedUsers]);
  useEffect(() => {
    getTechs().then((r) => {
      if (r.isError) {
        alert("Error");
        return;
      }
      setTechList(r.data?.techs || []);
    });
  }, [getTechsTrigger]);
  const handleUserListItemClick = (index: number) => {
    setSelectedIndexUsers(index);
  };
  const handleCloseBlockConfirmPopUp = () => {
    setBlockConfirmPopUp(false);
  };
  const handleCloseUnblockConfirmPopUp = () => {
    setUnblockConfirmPopUp(false);
  };
  const blockClicked = async () => {
    await blockUser(userList[selectedIndexUsers].id);
    setBlockConfirmPopUp(false);
  };
  const unblockedClicked = async () => {
    await unblockUser(userList[selectedIndexUsers].id);
    setUnblockConfirmPopUp(false);
  };
  const handleTechListItemClick = (index: number) => {
    setSelectedIndexTechs(index);
  };
  const handleCloseDeleteTechConfirmPopUp = () => {
    setDeleteConfirmPopUp(false);
  };
  const handleAddTechConfirmPopUp = () => {
    addTechClicked();
    setAddTechConfirmPopUp(false);
  };
  const deleteTechClicked = async () => {
    await deleteTech(techList[selectedIndexTechs].id);
    setDeleteConfirmPopUp(false);
  };
  const addTechClicked = async () => {
    await addTech({ name: newTechName, passworld: newTechPassword });
    setAddTechConfirmPopUp(false);
  };
  const handleChangeNameTech = (nameTech: string) => {
    setTechName(nameTech);
  };
  const handleChangePasswordTech = (passwordTech: string) => {
    setTechPassword(passwordTech);
  };
  return (
    <div className={classes.generalContainerUsersAndTechs}>
      <List className={classes.ListStyleUsersAndTechs} subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheaderStyle}>
              <Box
                display="flex"
                flexDirection="row"
                p={1}
                m={1}
                alignSelf="center"
              >
                <Box p={1} m={1}>
                  User name
                </Box>
              </Box>
              <Switch
                checked={viewBlockedUsers}
                onChange={() => setViewBlockedUsers(!viewBlockedUsers)}
                edge="start"
              />
              Only blocked?
            </ListSubheader>
            {userList.map((user, index) => {
              return (
                <li key={user.id}>
                  <ListItem
                    className={classes.listItemStyle}
                    onClick={() => handleUserListItemClick(index)}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      p={1}
                      m={1}
                      alignSelf="center"
                      style={{ width: "70%" }}
                    >
                      <Box p={2} m={1}>
                        <ListItemText primary={user.name} />
                      </Box>
                    </Box>
                    {!viewBlockedUsers ? (
                      <Button
                        className={classes.blockButton}
                        startIcon={<ErrorOutlineIcon />}
                        onClick={() => setBlockConfirmPopUp(true)}
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        className={classes.blockButton}
                        startIcon={<ErrorOutlineIcon />}
                        onClick={() => setUnblockConfirmPopUp(true)}
                      >
                        Unblock
                      </Button>
                    )}
                    <Dialog
                      open={openBlockConfirmPopUp}
                      keepMounted
                      onClose={handleCloseBlockConfirmPopUp}
                    >
                      <DialogTitle>Block this user?</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Do you really want you block this user?
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
                      open={openUnblockConfirmPopUp}
                      keepMounted
                      onClose={handleCloseUnblockConfirmPopUp}
                    >
                      <DialogTitle>Unblock this user?</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Do you really want you unblock this user?
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
                  </ListItem>
                </li>
              );
            })}
          </ul>
        </li>
      </List>
      <List className={classes.ListStyleUsersAndTechs} subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheaderStyle}>
              <Box
                display="flex"
                flexDirection="row"
                p={1}
                m={1}
                alignSelf="center"
                style={{ width: "75%" }}
              >
                <Box p={1} m={1}>
                  Tech name
                </Box>
              </Box>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                style={{ margin: "5px" }}
                onClick={() => {
                  setAddTechConfirmPopUp(false);
                }}
              >
                new tech
              </Button>
              <Dialog
                disableBackdropClick
                open={openAddTechConfirmPopUp}
                onClose={() => setAddTechConfirmPopUp(false)}
              >
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                  <form className={classes.container}>
                    <FormControl className={classes.formControl}>
                      <InputLabel>Name</InputLabel>
                      <Input
                        onChange={(event: any) =>
                          handleChangeNameTech(event.target.value)
                        }
                      />
                      <InputLabel>Password</InputLabel>
                      <Input
                        onChange={(event: any) =>
                          handleChangePasswordTech(event.target.value)
                        }
                      />
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleAddTechConfirmPopUp} color="primary">
                    OK
                  </Button>
                  <Button
                    onClick={() => setAddTechConfirmPopUp(false)}
                    color="primary"
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </ListSubheader>
            {techList.map((user, index) => {
              return (
                <li key={user.id}>
                  <ListItem
                    className={classes.listItemStyle}
                    onClick={() => handleTechListItemClick(index)}
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
                        <ListItemText primary={user.name} />
                      </Box>
                    </Box>
                    <Button
                      className={classes.blockButton}
                      startIcon={<ErrorOutlineIcon />}
                      onClick={() => setDeleteConfirmPopUp(true)}
                    >
                      Block
                    </Button>
                    <Dialog
                      open={openDeleteTechConfirmPopUp}
                      keepMounted
                      onClose={handleCloseDeleteTechConfirmPopUp}
                    >
                      <DialogTitle>Delete this tech?</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Do you really want to delete this tech?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleCloseDeleteTechConfirmPopUp}
                          color="primary"
                        >
                          No
                        </Button>
                        <Button onClick={deleteTechClicked} color="primary">
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
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
