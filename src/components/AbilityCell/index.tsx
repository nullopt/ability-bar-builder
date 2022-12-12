import React from "react";
import { BlankAbility } from "../../data/ability-icons";
import { AbilitySlot } from "../AbilityBar";

import "./index.css";

interface AbilityCellProps {
  index: number;
  drawBarNumbers: boolean;
  slot?: AbilitySlot;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const AbilityCell = ({
  index,
  drawBarNumbers,
  slot,
  onClick,
}: AbilityCellProps) => {
  return (
    <div
      key={index}
      id={index.toString()}
      className="cell-container"
      onClick={onClick}
    >
      <div className="ability-slot">
        {slot && (
          <div
            style={{
              background: `url(${slot.imgUrl || BlankAbility}) no-repeat`,
            }}
            className="ability-img"
          ></div>
        )}
        {drawBarNumbers && <div className="ability-txt">{index + 1}</div>}
      </div>
    </div>
  );
};
