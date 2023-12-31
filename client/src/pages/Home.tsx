import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import pokemonLogo from "/pokemon-23.svg";
import "./Home.css";

const Home: React.FC = () => {
  const myAPIurl = import.meta.env.VITE_REACT_API_URL;

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokeAPIurl, setpokeAPIurl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon"
  );
  interface Pokemon {
    image: string;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    abilities: string[];
  }

  // Llama a la funcion nextPage por primera vez al montar el componente para que cargue la primera tanda de pokemons
  useEffect(() => {
    getPokemons();
  }, []);

  // Utiliza la respuesta de la API next para cargar la siguiente tanda de pokemons
  const getPokemons = async () => {
    const response = await axios(`${myAPIurl}/getPokemons?url=${pokeAPIurl}`);
    setPokemons(response.data);
  };

  const generateItems = async () => {
    const response = await axios(pokeAPIurl); //Hace un nuevo llamado para obtener la siguiente pagina de la API
    const nextUrl = response.data.next; // Guarda la url de la siguiente pagina
    setpokeAPIurl(nextUrl); // Actualiza el estado a esa nueva url

    const myAPIresponse = await axios(`${myAPIurl}/getPokemons?url=${nextUrl}`);

    const newPokemons = myAPIresponse.data;

    setPokemons([...pokemons, ...newPokemons]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <img
            src={pokemonLogo}
            alt="Pokemon Logo"
            style={{ width: "100px", height: "auto", padding: "5px" }}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            {pokemons.map((pokemon, index) => (
              <IonCol size="12" size-md="4" size-lg="2" key={index}>
                <IonCard mode="md">
                  <img src={pokemon.image} alt="pokemon" />
                  <IonCardHeader>
                    <IonCardTitle color="primary">{pokemon.name}</IonCardTitle>
                    <IonCardSubtitle>
                      Experiencia: {pokemon.base_experience}
                    </IonCardSubtitle>
                    <IonCardSubtitle>Altura: {pokemon.height}</IonCardSubtitle>
                    <IonCardSubtitle>Peso: {pokemon.weight}</IonCardSubtitle>
                    <IonCardSubtitle>
                      Habilidades: {pokemon.abilities}
                    </IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            generateItems();
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent
            className="ion-padding"
            loadingText="Please wait..."
            loadingSpinner="bubbles"
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Home;
