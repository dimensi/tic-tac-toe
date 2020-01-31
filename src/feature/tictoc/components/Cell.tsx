import React from "react";
import { cn } from "../../../helpers";
import { Players } from "../store";

const players = ["tic", "tac"];
export function Cell({
  player,
  onClick
}: {
  player?: Players;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn("cell", player !== undefined && players[player])}
      onClick={onClick}
    ></div>
  );
}
