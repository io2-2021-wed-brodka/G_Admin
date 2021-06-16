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
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { useStyles } from "../Styles/style";
import {
  blockUser,
  getActiveUsers,
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
  const [openedBlockUserDialogIndex, setOpenedBlockUserDialogIndex] = useState<number>(-1);
  const [openedUnblockUserDialogIndex, setOpenedUnblockUserDialogIndex] = useState<number>(-1);
  const [openedDeleteUserDialogIndex, setDeleteConfirmPopUp] = useState<number>(-1);
  const [viewBlockedUsers, setViewBlockedUsers] = useState<boolean>(false);
  const [getTechsTrigger, setTechsTrigger] = React.useState(true);
  const [newTechName, setTechName] = React.useState<string>("Generic Name");
  const [newTechPassword, setTechPassword] = React.useState<string>(
    "Generic Password"
  );
  const [openAddTechConfirmPopUp, setAddTechConfirmPopUp] = useState<boolean>(
    false
  );
  useEffect(() => {
    if(!viewBlockedUsers)
            getActiveUsers().then((r) => {
                setUserList(r.users)
            });
        else
            getBlockedUsers().then((r) => {
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
  const handleCloseBlockUserDialog = () => {
    setOpenedBlockUserDialogIndex(-1);
  };
  const handleCloseUnblockUserDialog = () => {
    setOpenedUnblockUserDialogIndex(-1);
  };
  const blockClicked = async () => {
    await blockUser(userList[selectedIndexUsers].id);
    setOpenedBlockUserDialogIndex(-1);
    setUsersTrigger(!getUsersTrigger);
  };
  const unblockedClicked = async () => {
    await unblockUser(userList[selectedIndexUsers].id);
    setOpenedUnblockUserDialogIndex(-1);
    setUsersTrigger(!getUsersTrigger);
  };
  const handleTechListItemClick = (index: number) => {
    setSelectedIndexTechs(index);
  };
  const handleCloseDeleteTechConfirmPopUp = () => {
    setDeleteConfirmPopUp(-1);
  };
  const handleAddTech = async () => {
    await addTech(newTechName, newTechPassword);
    setAddTechConfirmPopUp(false);
    setTechsTrigger(!getTechsTrigger)
  };
  const handleDeleteTech = async () => {
    await deleteTech(techList[selectedIndexTechs].id);
    setDeleteConfirmPopUp(-1);
    setTechsTrigger(!getTechsTrigger)
  };
  const handleChangeNameTech = (nameTech: string) => {
    setTechName(nameTech);
  };
  const handleChangePasswordTech = (passwordTech: string) => {
    setTechPassword(passwordTech);
  };
  const isThisDeleteUserDialogOpened = (dialogIndex: number) => {
    return openedDeleteUserDialogIndex === dialogIndex ? true : false;
  }
  const isThisBlockUserDialogOpened = (dialogIndex: number) => {
    return openedBlockUserDialogIndex === dialogIndex ? true : false;
  }
  const isThisUnblockUserDialogOpened = (dialogIndex: number) => {
    return openedUnblockUserDialogIndex === dialogIndex ? true : false;
  }
  return (
    <div className={classes.generalContainerUsersAndTechs}>
      <Box className={classes.ListStyleUsersAndTechs}>
        <h1 className={classes.pageTitle}>
            USERS
        </h1>
        <List  subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheaderStyle}>
              <Box className={classes.listBox} style={{ width: "40%" }}>
                <Box p={0} m={1}>
                  Name
                </Box>
              </Box>
              <Box>
                <Switch
                  id={`user-switch-blocked`}
                  checked={viewBlockedUsers}
                  onChange={() => setViewBlockedUsers(!viewBlockedUsers)}
                  edge="start"
                />
                Display blocked users
              </Box>
            </ListSubheader>
            {userList.map((user, index) => {
              return (
                <li key={user.id}>
                  <ListItem
                    className={classes.listItemStyle}
                    onClick={() => handleUserListItemClick(index)}
                  >
                    <Box className={classes.listBox} style={{ width: "70%" }}>
                      <Box p={0} m={1}>
                        <ListItemText primary={user.name} />
                      </Box>
                    </Box>
                    {!viewBlockedUsers ? (
                      <Button
                        id={`user-block-confirm-${index}`}
                        className={classes.blockButton}
                        startIcon={<ErrorOutlineIcon />}
                        onClick={() => setOpenedBlockUserDialogIndex(index)}
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        id={`user-unblock-confirm-${index}`}
                        className={classes.blockButton}
                        startIcon={<ErrorOutlineIcon />}
                        onClick={() => setOpenedUnblockUserDialogIndex(index)}
                      >
                        Unblock
                      </Button>
                    )}
                    <Dialog
                      open={isThisBlockUserDialogOpened(index)}
                      keepMounted
                      onClose={handleCloseBlockUserDialog}
                    >
                      <DialogTitle>Block this user?</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Do you really want to block this user?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleCloseBlockUserDialog}
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
                      open={isThisUnblockUserDialogOpened(index)}
                      keepMounted
                      onClose={handleCloseUnblockUserDialog}
                    >
                      <DialogTitle>Unblock this user?</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Do you really want to unblock this user?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleCloseUnblockUserDialog}
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
      </Box>
      <Box className={classes.ListStyleUsersAndTechs}>
        <h1 className={classes.pageTitle}>
            TECHS
        </h1>
        <List subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheaderStyle}>
              <Box
                display="flex"
                flexDirection="row"
                p={0}
                m={1}
                alignSelf="center"
                style={{ width: "50%" }}
              >
                <Box p={0} m={1}>
                  Name
                </Box>
              </Box>
              <Button
                id={`users-add-tech`}
                startIcon={<AddIcon />}
                variant="contained"
                style={{ margin: "5px" }}
                onClick={() => {
                  setAddTechConfirmPopUp(true);
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
                      Name
                      <Input
                        id={`users-add-tech-name`}
                        onChange={(event: any) =>
                          handleChangeNameTech(event.target.value)
                        }
                      />
                      Password
                      <Input
                        id={`users-add-tech-password`}
                        onChange={(event: any) =>
                          handleChangePasswordTech(event.target.value)
                        }
                      />
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button id={`users-add-tech-confirm`} onClick={handleAddTech} color="primary">
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
                      p={0}
                      m={1}
                      alignSelf="center"
                      style={{ width: "70%" }}
                    >
                      <Box p={0} m={1}>
                        <ListItemText primary={user.name} />
                      </Box>
                    </Box>
                    <Button
                      id={`users-remove-tech-${index}`}
                      className={classes.deleteButton}
                      startIcon={<ErrorOutlineIcon />}
                      onClick={() => setDeleteConfirmPopUp(index)}
                    >
                      Delete
                    </Button>
                    <Dialog
                      open={isThisDeleteUserDialogOpened(index)}
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
                        <Button id={`users-remove-tech-confirm`} onClick={handleDeleteTech} color="primary">
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
      </Box>
    </div>
  );
};
