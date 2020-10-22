import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  }
}));

export default function AddRepair() {
  const classes = useStyles();
  const [firstLoad, setLoad] = React.useState(true);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("1998-04-02T21:11:54")
  );
  const [car, setCar] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");


  const handleDateChange = date => setSelectedDate(date);
  const handleCarChange = event => setCar(event.target.value);
  const handlDescriptionChange = event => setDescription(event.target.value);
  const handlePriceChange = event => setPrice(event.target.value);

  const [message, setMessage] = React.useState("Nic nie zostało zapisane w sesji.");

  async function sampleFunc(toInput) {
    const response = await fetch("/repairs", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(toInput) // body data type must match "Content-Type" header
    });
    let body = await response.json();
    console.log(body.id);
    setMessage(body.id ? "Data sucessfully updated" : "Data updation failed");
  }

  const handleSubmit = variables => {
    const toInput = { car, description, price, dob: selectedDate };
    sampleFunc(toInput);
    setCar("");
    setDescription("");
    setPrice("");
  };

  if (firstLoad) {
    // sampleFunc();
    setLoad(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DriveEtaIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Katalog napraw
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="car"
                value={car}
                label="Auto"
                name="car"
                autoComplete="car"
                onChange={handleCarChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="description"
                name="description"
                variant="outlined"
                required
                fullWidth
                value={description}
                id="description"
                label="Opis"
                onChange={handlDescriptionChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                value={price}
                label="Cena"
                name="price"
                autoComplete="price"
                onChange={handlePriceChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="date"
                label="Data naprawy"
                type="date"
                defaultValue="1998-04-02"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={handleDateChange}
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            preventDefault
            className={classes.submit}
            onClick={handleSubmit}
          >
            Zapisz
          </Button>

          <Grid container justify="center">
            <Grid item>
              <Link to="/view">Tabela napraw</Link>
            </Grid>
          </Grid>
        </form>
        <Typography style={{ margin: 7 }} variant="body1">
          Status: {message}
        </Typography>
      </div>
    </Container>
  );
}
