import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Game from "./Game";

function createData(id, name, result, time) {
  return { id, name, result, time };
}

const rows = [
  createData("0", "mario", "120", "10:50"),
  createData("1", "jose", "80", "10:50"),
  createData("2", "pedro", "95", "10:50"),
  createData("3", "marcos", "102", "10:50"),
  createData("4", "luis", "30", "10:50"),
  createData("5", "ariel", "42", "10:50"),
  createData("6", "matias", "98", "10:50"),
  createData("7", "arnold", "122", "10:50"),
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

function Content() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const startGame = () => {
    setOpenModal(true);
  };

  const endGame = () => {
    setOpenModal(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Button onClick={startGame} color="inherit">
          START GAME!!
        </Button>
        <Game isOpen={openModal} closeModal={endGame} />
      </Container>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Result</TableCell>
              <TableCell align="center">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.result}</TableCell>
                <TableCell align="center">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Content;
