import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CustomModal from "../modal/Modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAppContext } from "../../context/AppContext";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50vm",
    },
  },
}));

const random = () => Math.round(Math.random() * (9 - 1) + 1);

function Game(props) {
  const classes = useStyles();
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [thirdNumber, setThirdNumber] = useState(0);
  const { state, dispatch } = useAppContext();

  console.log(state.money);

  function getRandom() {
    dispatch({ type: "DECREMENT_MONEY" });
    setFirstNumber(random());
    setSecondNumber(random());
    setThirdNumber(random());
    matchChecker();
  }

  function debug() {
    setFirstNumber(7);
    setSecondNumber(7);
    setThirdNumber(7);
  }

  function endGame() {
    setFirstNumber(0);
    setSecondNumber(0);
    setThirdNumber(0);
    props.closeModal();
  }

  function matchChecker() {
    if ((firstNumber === secondNumber) === thirdNumber) {
      if (firstNumber === 7) {
        return dispatch({ type: "INCREMENT_MONEY", payload: 10 });
      }
      return dispatch({ type: "INCREMENT_MONEY", payload: 5 });
    }
    if (
      firstNumber === secondNumber ||
      secondNumber === thirdNumber ||
      firstNumber === thirdNumber
    ) {
      return dispatch({ type: "INCREMENT_MONEY", payload: 0.5 });
    }
  }

  function saveToTable() {
    dispatch({
      type: "SET_GAME_HISTORY",
      payload: {
        id: state.user.id,
        name: state.user.name,
        result: { firstNumber, secondNumber, thirdNumber },
        time: Date.now(),
      },
    });
  }

  return (
    <CustomModal open={props.isOpen}>
      <Typography variant="h2">GAME!</Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={firstNumber}
          />
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={secondNumber}
          />
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            value={thirdNumber}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button onClick={getRandom} color="inherit">
            PLAY
          </Button>
          <Button onClick={debug} color="inherit">
            DEBUG
          </Button>
          <Button onClick={endGame} color="inherit">
            CLOSE
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default Game;
