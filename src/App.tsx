import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { AbilityBarContainer } from "./components/AbilityBar";
import { PrettoSlider } from "./components/Slider";
import { exportAsImage } from "./utility/export-to-png";
import "./App.css";

function App() {
  const [revo, setRevo] = useState<boolean>(true);
  const [barNumbers, setBarNumbers] = useState<boolean>(true);
  const [actionBarLength, setActionBarLength] = useState<number>(14);

  const exportRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <h2>Ability Bar Builder - nullopt</h2>
      <header className="App-header">
        <FormGroup
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 500,
            marginTop: 15,
          }}
        >
          <FormControlLabel
            style={{ width: 500 }}
            labelPlacement="top"
            control={
              <PrettoSlider
                aria-label="Action Bar Length"
                value={actionBarLength}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={14}
                onChange={(event: Event, value: number | number[]) => {
                  if (value as Number) {
                    setActionBarLength(value as number);
                  }
                }}
              />
            }
            label="Action Bar Length"
          />
          <FormControlLabel
            labelPlacement="start"
            control={
              <Switch
                color="success"
                checked={revo}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setRevo(event.target.checked)
                }
              />
            }
            label="Revolution"
          />
          <FormControlLabel
            labelPlacement="start"
            control={
              <Switch
                color="success"
                checked={barNumbers}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setBarNumbers(event.target.checked)
                }
              />
            }
            label="Keybind Numbers"
          />
        </FormGroup>
        <div ref={exportRef} style={{ backgroundColor: "#282c34" }}>
          <AbilityBarContainer
            revo={revo}
            barNumbers={barNumbers}
            slotCount={actionBarLength}
          />
        </div>
        <Button
          style={{ marginTop: 15 }}
          type="button"
          variant="contained"
          color="success"
          onClick={() => exportAsImage(exportRef.current, "ActionBar")}
        >
          Export to PNG
        </Button>
      </header>
    </div>
  );
}

export default App;
