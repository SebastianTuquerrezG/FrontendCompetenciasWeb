import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "./header/header.component";
import Navbar from "./navbar/navbar.component";
import CompetenciasRAProgramModule from "./Competencias-RA-Program-module/module.component";
import Home from "./Home/home.component";
import { UserProvider, useUserContext } from "@/context/userContext";


export default function Main() {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState("home");

  const { dataAuth } = useUserContext();

  useEffect(() => {
    if(!dataAuth?.token){
      router.push("/login");
    }
  }, [dataAuth]);

  const renderContent = () => {
    switch (selectedOption) {
      case "Competencias_RA_module":
        return <CompetenciasRAProgramModule />
      default:
        return <Home />
    }
  }

  return (
    <div>
      <UserProvider>
      <Header />
      <div className="container">
        <div className="navbar">
          <Navbar onSelect={setSelectedOption} />
        </div>
        <div className="content">
          {renderContent()}
        </div>
      </div>
      </UserProvider>
    </div>
  );
}