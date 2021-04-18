import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { Routes } from "./router/routes";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>{Routes}</Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
