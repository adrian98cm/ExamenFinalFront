import React, { useState } from "react";
import "./App.css";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import Character from "./components/Character";
import CharacterFiltered from "./components/CharacterFiltered";

//La paginacion en la API GRAPHQL de rickymorty está predeterminada a 20

const httpLink = new HttpLink({
  uri: "https://rickandmortyapi.com/graphql",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

function App() {
  const [name, setName] = useState(null);
  const [status, setStatus] = useState(null);
  const [pages, setPages] = useState(1);

  const onSearch = (name) => {
    setName(name);
  };

  const updatePages = (cant) => {
    if(pages >= 1 ){
      setPages(pages+cant)
    }
  }


  return (
    <ApolloProvider client={client}>
      <div className="App-header">
        <button
          className="boton_personalizado"
          onClick={(e) => setStatus("alive")}
        >
          Vivos
        </button>

        <button
          className="boton_personalizado"
          onClick={(e) => setStatus("dead")}
        >
          Muertos
        </button>

        <button
          className="boton_personalizado"
          onClick={(e) => setStatus(null)}
        >
          Todos
        </button>
      </div>

      <div className="App-content">
        <input id="name" placeholder="Nombre" />
        <button
          className="boton_personalizado"
          onClick={(e) => onSearch(document.getElementById("name").value)}
        >
          Buscar
        </button>
        {name !== null && status == null ? (
          <Character name={name} page={pages} />
        ) : null}
        {name !== null && status !== null ? (
          <CharacterFiltered name={name} status={status} page={pages} />
        ) : null}
      </div>

      <div className="footer ">
        <button
          className="boton_personalizado"
          onClick={(e) => setPages(pages - 1)}
        >
          Anterior pagina
        </button>
        Página: {pages}
        <button
          className="boton_personalizado"
          onClick={(e) => setPages(pages + 1)}
        >
          Siguiente pagina
        </button>
      </div>
    </ApolloProvider>
  );
}

export default App;

//{name !== null && status !== null ? <CharacterFiltered name={name} status={status}/> : null}
//onClick={(e) => setPages(pages - 1)