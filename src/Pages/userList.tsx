import React, {useEffect, useState} from "react";
import '../App.css';
import '../Layout/topbar.tsx';
import List from '@material-ui/core/List';
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
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {useStyles } from "../Styles/style";
import { blockUser, getBlockedUsers, getUsers, unblockUser, User } from "../Api/userApi";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
export const UserListPage = () =>{
    const classes = useStyles();
    const [userList, setUserList] = React.useState<User[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [getUsersTrigger, setUsersTrigger] = React.useState(true);
    const [openBlockConfirmPopUp, setBlockConfirmPopUp] = useState<boolean>(false);
    const [viewBlockedUsers, setViewBlockedUsers] = useState<boolean>(false);
    useEffect(() => {
        !viewBlockedUsers? 
        getUsers().then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            setUserList(r.data?.users || []);
            console.log(r.data);
        }) :
        getBlockedUsers().then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            setUserList(r.data?.users || []);
            console.log(r.data);
        });     
    }, [getUsersTrigger, viewBlockedUsers] );
    const handleUserListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
    };
    const handleCloseBlockConfirmPopUp = () => {
        setBlockConfirmPopUp(false);
    };
    const blockClicked = async () => {
        await blockUser(userList[selectedIndex].id);
        setBlockConfirmPopUp(false);
    };
    const unblockedClicked = async () => {
        await unblockUser(userList[selectedIndex].id);
    }
    return (
        <div className={classes.generalContainer}>
            <List className={classes.ListStyle} subheader={<li/>}>
                <li className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader className={classes.listSubheaderStyle}>
                            <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                 style={{width: '75%'}}>
                                <Box p={1} m={1}>
                                    Name
                                </Box>
                            </Box>
                            <Switch checked={viewBlockedUsers} onChange={() => setViewBlockedUsers(!viewBlockedUsers)}
                                    edge='start'/> 
                            Display only blocked users?                         
                        </ListSubheader>
                        {userList.map((user, index) => {
                            return (
                                <li key={user.id}>
                                    <ListItem className={classes.listItemStyle}
                                              onClick={() => handleUserListItemClick(index)}>
                                        <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                             style={{width: '90%'}}>
                                            <Box p={2} m={1}>
                                                <ListItemText primary={user.name}/>
                                            </Box>
                                        </Box>
                                        {!viewBlockedUsers ?
                                         <Button className={classes.blockButton}
                                         startIcon={<ErrorOutlineIcon/>}
                                         onClick={() => setBlockConfirmPopUp(true)}>Block</Button>
                                         :
                                         <Button className={classes.blockButton}
                                         startIcon={<ErrorOutlineIcon/>}
                                         onClick={unblockedClicked}>Unblock</Button>
                                         }
                                            <Dialog open={openBlockConfirmPopUp}
                                                    keepMounted
                                                    onClose={handleCloseBlockConfirmPopUp}>
                                                <DialogTitle>
                                                    Delete this user?
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Do you really want you block this user?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseBlockConfirmPopUp} color="primary">
                                                        No
                                                    </Button>
                                                    <Button onClick={blockClicked} color="primary">
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
}