import { Route, Routes } from "react-router-dom";
import "./App.css";
import Accueil from "./pages/adhérents/accueil/Accueil";
import AccueilCard from "./pages/adhérents/adherentCard/accueilCard/AccueilCard";
import AdherentCard from "./pages/adhérents/adherentCard/AdherentCard";
import Cotisation from "./pages/adhérents/adherentCard/cotisation/Cotisation";
import AdherentList from "./pages/adhérents/adherentList/AdherentList";
import AdherentsAJour from "./pages/adhérents/adherentList/adherentsAJour/AdherentsAJour";
import AdherentsBrouillons from "./pages/adhérents/adherentList/adherentsBrouillons/AdherentsBrouillons";
import AdherentsEnAttentes from "./pages/adhérents/adherentList/adherentsEnAttentes/AdherentsEnAttentes";
import AdherentsExclus from "./pages/adhérents/adherentList/adherentsExclus/AdherentsExclus";
import AdherentsExpires from "./pages/adhérents/adherentList/adherentsExpires/AdherentsExpires";
import AdherentsValides from "./pages/adhérents/adherentList/adherentsValides/AdherentsValides";
import CotisationList from "./pages/adhérents/cotisatonList/CotisationList";
import CreateType from "./pages/adhérents/createType/CreateType";
import EditAdherent from "./pages/adhérents/editAdherent/EditAdherent";
import EditType from "./pages/adhérents/editType/EditType";
import NewAdherent from "./pages/adhérents/newAdherent/NewAdherent";
import Type from "./pages/adhérents/type/Type";
import TypeCard from "./pages/adhérents/typeCard/TypeCard";
import Configuration from "./pages/configuration/Configuration";
import Factures from "./pages/factures/accueil/Factures";
import ListFacture from "./pages/factures/listFacture/ListFacture";
import NewFacture from "./pages/factures/newFacture/newFacture1/NewFacture";
import NewFacture2 from "./pages/factures/newFacture/newFacture2/NewFacture2";
import Stats from "./pages/factures/stats/Stats";
import AccueilGRH from "./pages/grh/accueil/AccueilGRH";
import NouvelleDemande from "./pages/grh/nouvelleDemande/NouvelleDemande";
import Home from "./pages/home/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Routes pour les configurations */}
      <Route path="/configuration" element={<Configuration />} />

      {/* Routes pour les factures */}
      <Route path="/factures" element={<Factures />} />
      <Route path="/factures/new/1" element={<NewFacture />} />
      <Route path="/factures/new/2/:idRef" element={<NewFacture2 />} />
      <Route path="/factures/listfacture" element={<ListFacture />} />
      <Route path="/factures/stats" element={<Stats />} />

      {/* Route pour les adhérents */}
      <Route path="/adherents" element={<Accueil />} />
      <Route path="/adherents/createtype" element={<CreateType />} />
      <Route path="/adherents/type" element={<Type />} />
      <Route path="/adherents/edittype/:ref" element={<EditType />} />
      <Route path="/adherents/typecard/:ref" element={<TypeCard />} />
      <Route path="/adherents/new" element={<NewAdherent />} />
      <Route path="/adherents/card/:id" element={<AdherentCard />}>
        <Route path="index" element={<AccueilCard />} />
        <Route path="cotisation" element={<Cotisation />} />
      </Route>
      <Route path="/adherents/list" element={<AdherentList />} />
      <Route path="/adherents/edit/:id" element={<EditAdherent />} />
      <Route
        path="/adherents/list/brouillons"
        element={<AdherentsBrouillons />}
      />
      <Route path="/adherents/list/valides" element={<AdherentsValides />} />
      <Route
        path="/adherents/list/en-attentes"
        element={<AdherentsEnAttentes />}
      />
      <Route path="/adherents/list/a-jours" element={<AdherentsAJour />} />
      <Route path="/adherents/list/expires" element={<AdherentsExpires />} />
      <Route path="/adherents/list/exclus" element={<AdherentsExclus />} />
      <Route path="/adherents/cotisation-list" element={<CotisationList />} />

      {/* Routes pour le GRH */}
      <Route path="/grh" element={<AccueilGRH />} />
      <Route path="/grh/new-perso" element={<NouvelleDemande />} />
    </Routes>
  );
}

export default App;
