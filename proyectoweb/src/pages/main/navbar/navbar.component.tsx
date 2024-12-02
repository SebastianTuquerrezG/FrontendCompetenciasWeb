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
          className={activeTab === "option2" ? styles.active : ""}
          onClick={() => handleSelect("option2")}
        >
          Opción 2
        </li>
        <li
          className={activeTab === "Logout" ? styles.active : ""}
          onClick={handleLogout}
        >
          Cerrar sesión
        </li>
        <li
          className={activeTab === "logout" ? styles.active : ""}
          onClick={() => handleSelect("logout")}
        >
          Logout (no sirve)
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;