import {createStyles, makeStyles, Theme, createMuiTheme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
createStyles({
  formContainer: {
    backgroundColor: '#aec6cf',
    opacity: '0.95',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
    marginTop: '50px',
    width: '300px',
    background: 'linear-gradient(rgba(0,0,255,0.5),transparent)',         
  },
  textFieldStyle: {
      margin: '10px',
      backgroundColor: 'white',
      color: 'white',
      
  },
  welcomeLabel: {
    color: 'white',
    marginTop: '10%',
    fontSize: '35px',
    marginBottom: '20px'
  },
  windowContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  formContainerOverlay: {
    backgroundColor: '#aec6cf',
    opacity: '0.95',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    marginTop: '50px',
    width: '300px',  
    background: 'linear-gradient(rgba(250,0,0,0.5),transparent)',   
       
  },
  welcomeLabelSmall: {
    color: 'white',
    marginTop: '10%',
    fontSize: '15px',
    marginBottom: '20px'
  },
  ListStyle: {
    overflowY: 'auto',
    opacity: '0.92',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '2%',
    marginBottom: '2%',
    },
    ListFont: {
        color: 'white'
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    deleteButton: {
        backgroundColor: '#D11A2A ',
        variant: 'contained',
        margin: '5px'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    generalContainer: {
        height: '91vh',
        display: 'flex',
        flexDirection: 'column'
    },
    listItemStyle:{
        backgroundColor: '#4E4E50',
        color: 'white',
        display: 'flex',
        height: '50px',
        marginBottom: '5px',
        marginTop: '5px',
        borderRadius: '15px',
    },
    blockButton: {
        backgroundColor: '#f2e20e',
        variant: 'contained',
        margin: '5px'
    },
}),
);

export const themeWarning = createMuiTheme({
    palette: {
        primary: {
            main: '#950740'
        }
    },
});