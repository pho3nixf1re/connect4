import React from "react";
import cn from "classnames";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { getBoard, getCurrentPlayer, getWinner } from "../reducers/selectors";
import { Row } from "./Row";
import { dropCoin } from "../actions/dropCoin";
import { resetBoard } from "../actions/resetBoard";
import { Color } from "../types";

interface Props {
  board: ReturnType<typeof getBoard>;
  color: ReturnType<typeof getCurrentPlayer>;
  winner: ReturnType<typeof getWinner>;
  dropCoin: typeof dropCoin;
  resetBoard: typeof resetBoard;
  state: any
}

export class BoardComponent extends React.Component<Props> {
  dropCoin = (column: number) => () => {
    // we only allow a player to drop a coin if there is no winner yet
    if (!this.props.winner) {
      this.props.dropCoin(column, this.props.color);
    }
  };

  displayHeader() {
    // only display the winner if there is one
    if (this.props.winner) {
      return <h2>Congratulations, {this.props.winner.color} wins the game!</h2>;
    } else {
      return <h2>It's {this.props.color}'s turn to play</h2>;
    }
  }

  displayRow = (colors: Color[], key: number) => {
    return (
      <Row
        row={key}
        dropCoin={this.dropCoin}
        colors={colors}
        key={`column-${key}`}
        winner={this.props.winner}
      />
    );
  };

  _handleReset = () => {
    this.props.resetBoard();
    console.log(this.props.state)
  };

  render() {
    const classes = cn("Game-Board");
    const gameOver = !this.props.winner;
    const resetButtonClass = gameOver ? 'Game-ResetButton-Finished' : 'Game-ResetButton-InProgress';
    const resetLabel = gameOver ? 'start over' : 'play again';

    return (
      <>
        {this.displayHeader()}

        <div className="Game">
          <div className={classes}>{this.props.board.map(this.displayRow)}</div>
        </div>
        <button className={cn('Game-ResetButton', resetButtonClass)} onClick={this._handleReset}>
          {resetLabel}
        </button>
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  board: getBoard(state),
  color: getCurrentPlayer(state),
  winner: getWinner(state),
  state
});

export const Board = connect(mapState, { dropCoin, resetBoard })(BoardComponent);
