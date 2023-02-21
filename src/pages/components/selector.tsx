import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { selectOptions, CodeLanguageEnum } from "src/utils";
import { FunctionComponent } from "react";
import styles from "@/styles/Styles.module.css";

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
    <FormControl>
      <Select
        data-testid="codeLanguageSelector"
        value={value}
        onChange={(event) => {
          onCodeLanguageChange(event.target.value as string);
        }}
        displayEmpty
        className={styles.dropdown}
        sx={{
          "& .MuiSelect-select ": {
            display: "flex !important",
            alignItems: "center !important",
          },
        }}
      >
        {codeLanguageOptions.map((language) => (
          <MenuItem
            data-testid={language.name.toLowerCase()}
            value={language.name.toLowerCase()}
            key={language.name.toLowerCase()}
          >
            <img
              style={{ marginRight: "5%" }}
              src={language.icon}
              alt={language.name.toLowerCase()}
            />
            {language.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectLanguages;
