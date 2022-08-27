export const rspResult = (bot: number, player: number): string => {
  if ((bot + 1) % 3 == player) {
    return "lose";
  } else if (bot == player) {
    return "draw";
  } else {
    return "win";
  }
};
