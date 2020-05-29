import React from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";

//La paginacion en la API GRAPHQL de rickymorty está predeterminada a 20

const FILTERED_QUERY = gql`
  query GetCharactersByName($name: String!, $status: String!, $page: Int) {
    characters(page: $page, filter: { name: $name, status: $status }) {
      info {
        pages
      }
      results {
        id
        name
        image
        status
        species
        type
        gender
        location {
          name
          dimension
        }
      }
    }
  }
`;

let infoplaneta = 0;


const onChange = ()=>{
    infoplaneta = 1;
  
  }

const Character = (props) => {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    FILTERED_QUERY,
    {
      variables: { name: props.name, page: props.page, status: props.status },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (networkStatus === 4) return <p>Refetching...</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Character not found!</p>;

  console.log(infoplaneta);
  console.log(data.characters.info.pages);

  if (infoplaneta === 1) {
    return (
      <div>
        <div>Número de páginas total: {data.characters.info.pages}</div>
        <button onClick={() => refetch()}>Actualizar</button>
        {data.characters.results.map((ch) => (
          <div>
            <img src={ch.image} alt="image" />
            <p key={ch.id}>Nombre: {ch.name}</p>
            <p key={ch.id}>Estado: {ch.status}</p>
            <p key={ch.id}>Especie: {ch.species}</p>
            <p key={ch.id}>Tipo: {ch.type}</p>
            <p key={ch.id}>Género: {ch.gender}</p>
            <div>
              <p>Planeta: </p>
              <p key={ch.id}>Estado: {ch.location.name}</p>
              <p key={ch.id}>Nombre: {ch.location.dimension}</p>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <div>Número de páginas total: {data.characters.info.pages}</div>
        <button onClick={() => refetch()}>Actualizar</button>
        {data.characters.results.map((ch) => (
          <div>
            <img src={ch.image} alt="image" />
            <p key={ch.id}>Nombre: {ch.name}</p>
            <p key={ch.id}>Estado: {ch.status}</p>
            <p key={ch.id}>Especie: {ch.species}</p>
            <p key={ch.id}>Tipo: {ch.type}</p>
            <p key={ch.id}>Género: {ch.gender}</p>
            <button onClick={() => onChange()}>
              Info planeta
            </button>
          </div>
        ))}
      </div>
    );
  }
};

export default Character;
