import React, { useState } from "react";
import styles from "./navbar.module.css";

interface NavbarProps {
  onSelect: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState("none");

  const handleSelect = (option: string) => {
    setActiveTab(option);
    onSelect(option);
  };

  return (
    <nav>
      <ul className={styles.nav}>
        <li
          className={activeTab === "Competencias_RA_module" ? styles.active : ""}
          onClick={() => handleSelect("Competencias_RA_module")}
        >
          Gestionar competencias y ra del programa
        </li>
        <li
          className={activeTab === "option2" ? styles.active : ""}
          onClick={() => handleSelect("option2")}
        >
          Opción 2
        </li>
        <li
          className={activeTab === "option3" ? styles.active : ""}
          onClick={() => handleSelect("option3")}
        >
          Opción 3
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;