import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./page/home/Home";
import Name from "./page/info/Name";
import Money from "./page/info/Money";
import Detail from "./page/detail/Detail";
import Header from "./components/Header";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/name" element={<Name />} />
        <Route path="/money" element={<Money />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
