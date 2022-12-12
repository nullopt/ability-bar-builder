import { useState } from "react";
import Popover from "@mui/material/Popover";
import { RemoveCircleOutline } from "@mui/icons-material";
import {
  ConstitutionAbilities,
  DefensiveAbilities,
  MageAbilities,
  MeleeAbilities,
  RangeAbilities,
} from "../../data/ability-icons";
import { useStickyState } from "../../hooks/useStickyState";
import { AbilityCell } from "../AbilityCell";

import "./index.css";
import { BackgroundImage } from "../../data/background-images";

interface AbilityBarContainerProps {
  revo?: boolean;
  barNumbers: boolean;
  slotCount: number;
}

interface SelectableAbilityIconProps {
  index: number;
  imgUrl: string;
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}

interface AbilityStyle {
  icon: string;
  abilities: string[];
}

export interface AbilitySlot {
  imgUrl?: string;
}

const abilityStyles: AbilityStyle[] = [
  {
    icon: "https://runescape.wiki/images/Attack.png",
    abilities: MeleeAbilities,
  },
  {
    icon: "https://runescape.wiki/images/Defence.png",
    abilities: DefensiveAbilities,
  },
  {
    icon: "https://runescape.wiki/images/Constitution.png",
    abilities: ConstitutionAbilities,
  },
  {
    icon: "https://runescape.wiki/images/Ranged.png",
    abilities: RangeAbilities,
  },
  {
    icon: "https://runescape.wiki/images/Magic.png",
    abilities: MageAbilities,
  },
];

const SelectableAbilityIcon = ({
  index,
  imgUrl,
  onClick,
}: SelectableAbilityIconProps) => (
  <img
    key={index}
    src={imgUrl}
    alt=""
    style={{ width: 40, height: 40, margin: 8, cursor: "pointer" }}
    onClick={onClick}
  />
);

export const AbilityBarContainer = ({
  revo,
  barNumbers,
  slotCount,
}: AbilityBarContainerProps) => {
  const [slots, setSlots] = useStickyState<AbilitySlot[]>(
    new Array<AbilitySlot>(slotCount).fill({}),
    "slots"
  );
  const [activeSelection, setActiveSelection] =
    useState<string[]>(MeleeAbilities);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = () => Boolean(anchorEl);
  const id = open() ? "simple-popover" : undefined;

  const swapAbility = (imgUrl?: string) => {
    if (!anchorEl) {
      return;
    }
    let temp = [...slots];
    const index = parseInt(anchorEl.id);
    let item = { ...temp[index] };
    item.imgUrl = imgUrl;
    temp[index] = item;
    setSlots(temp);
    handleClose();
  };

  return (
    <div className={`ability-bar-container ${revo ? "revo" : "manual"}`}>
      {slots.slice(0, slotCount).map((slot, index) => (
        <AbilityCell
          key={index}
          index={index}
          drawBarNumbers={barNumbers}
          slot={slot}
          onClick={handleClick}
        />
      ))}

      <Popover
        id={id}
        open={open()}
        anchorEl={anchorEl}
        onClose={handleClose}
        style={{ borderRadius: 0 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "350px",
            backgroundImage: `url(${BackgroundImage})`,
          }}
        >
          <div id="header">
            {abilityStyles.map((style, index) => (
              <img
                key={index}
                src={style.icon}
                style={{
                  width: 35,
                  height: 35,
                  padding: "10px 10px 0 10px",
                  cursor: "pointer",
                }}
                alt=""
                onClick={() => setActiveSelection(style.abilities)}
              />
            ))}
            <div
              style={{
                display: "inline-flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => swapAbility()}
            >
              <RemoveCircleOutline
                color="error"
                style={{
                  width: 40,
                  height: 40,
                  margin: "10px 10px 0 10px",
                }}
              />
            </div>
          </div>
          <hr style={{ width: 300 }} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {activeSelection.map((ability, index) => (
              <SelectableAbilityIcon
                key={index}
                index={index}
                imgUrl={ability}
                onClick={() => swapAbility(ability)}
              />
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
};
