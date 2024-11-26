import { useRouter } from "next/router";
import { useState } from "react";
import Header from "./header/header.component";
import Navbar from "./navbar/navbar.component";
import CompetenciasRAProgramModule from "./Competencias-RA-Program-module/module.component";

export default function Main() {
    const [selectedOption, setSelectedOption] = useState("home");

    const renderContent = () => {
        switch(selectedOption){
            case "Competencias_RA_module":
                return <CompetenciasRAProgramModule/>
            default:
                return <p>Esta es la pagina principal</p>
        }
    }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="navbar">
          <Navbar onSelect={setSelectedOption}/>
        </div>
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}