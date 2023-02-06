import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { selectOptions } from "src/utils";
import styles from "@/styles/Styles.module.css";

export default function SelectLanguages() {
  const [age, setAge] = React.useState("");
  const [page, setPage] = React.useState(0);

  const codeLanguageOptions: selectOptions[] = [
    {
      name: "Angular",
      icon: "/angular.png",
    },
    {
      name: "Reacts",
      icon: "/reactjs.png",
    },
    {
      name: "Vuesjs",
      icon: "/vuesjs.png",
    },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          className={styles.dropdown}
        >
          {codeLanguageOptions.map((language) => (
            <MenuItem
              value={language.name.toLowerCase()}
              key={language.name.toLowerCase()}
            >
              <img src={language.icon} alt={language.name.toLowerCase()} />
              {language.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
