import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import Products from './components/Products';
import Field from './components/Field';
import Grid from '@mui/material/Grid';

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: blue[100],
    },
    secondary: {
      main: blue[500],
    },
    background: {
      paper: blue[900],
    },
    icon: {
      main: blue[900], // Define the default color for icons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // Set button text color to white
          borderColor: '#FFFFFF', // Set button border color to white
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            color: '#FFFFFF', // Set text field text color to white
          },
          '& .MuiOutlinedInput-root': {
            borderColor: '#FFFFFF', // Set text field border color to white
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Products />
        </Grid>
        {/* <Grid item xs={6}>
          <Field />
        </Grid> */}
      </Grid>
    </ThemeProvider>
  );
}

export default App;
