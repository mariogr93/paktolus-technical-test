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

import { gameHistoryStorage } from "../../storage/UseLocalStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    display: "flex",
    justifyContent: "center",
  },
  table: {
    minWidth: 650,
  },
}));

const gameHistory = gameHistoryStorage();

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
        <Button onClick={startGame} variant="contained" color="secondary">
          PLAY TIME!!
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
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Result</TableCell>
              <TableCell align="center">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameHistory.map((row) => (
              <TableRow key={row.time}>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{`${row.result.firstNumber} ${row.result.secondNumber} ${row.result.thirdNumber}`}</TableCell>
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
