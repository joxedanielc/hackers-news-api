import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { selectOptions, CodeLanguageEnum } from "src/utils";
import styles from "@/styles/Styles.module.css";
import { FunctionComponent } from "react";

const SelectLanguages: FunctionComponent<{
  onCodeLanguageChange: (codeLanguage: string) => void;
  value: string;
}> = ({ onCodeLanguageChange, value }) => {
  const codeLanguageOptions: selectOptions[] = [
    {
      name: CodeLanguageEnum.angular,
      icon: `/${CodeLanguageEnum.angular.toLowerCase()}.png`,
    },
    {
      name: CodeLanguageEnum.reactjs,
      icon: `/${CodeLanguageEnum.reactjs.toLowerCase()}.png`,
    },
    {
      name: CodeLanguageEnum.vuesjs,
      icon: `/${CodeLanguageEnum.vuesjs.toLowerCase()}.png`,
    },
  ];

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          data-testid="codeLanguageSelector"
          value={value}
          onChange={(event) => {
            onCodeLanguageChange(event.target.value as string);
          }}
          displayEmpty
          className={styles.dropdown}
        >
          {codeLanguageOptions.map((language) => (
            <MenuItem
              data-testid={language.name.toLowerCase()}
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
};

export default SelectLanguages;
