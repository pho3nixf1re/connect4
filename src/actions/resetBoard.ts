export interface ResetBoardAction {
  type: "RESET_BOARD";
  payload: {};
}

export function resetBoard(): ResetBoardAction {
  return {
    type: "RESET_BOARD",
    payload: {}
  };
}
