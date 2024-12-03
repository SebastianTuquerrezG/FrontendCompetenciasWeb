import React, { ReactEventHandler, useState } from "react";
import styles from "./navbar.module.css";
import { useUserContext } from "@/context/userContext";

interface NavbarProps {
  onSelect: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState("none");
  const { logout } = useUserContext();

  const handleSelect = (option: string) => {
    setActiveTab(option);
    onSelect(option);
  };

  const handleLogout = () => {
    logout();
  }

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
          className={activeTab === "Competencias_RA_Asignature_module" ? styles.active : ""}
          onClick={() => handleSelect("Competencias_RA_Asignature_module")}
        >
          Gestionar competencias y ra de asignatura
        </li>
        <li
          className={activeTab === "Logout" ? styles.active : ""}
          onClick={handleLogout}
        >
          Cerrar sesión
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;