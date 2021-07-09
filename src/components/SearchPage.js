import React, { useState, useEffect } from "react";
import ErrorModal from "./UI/ErrorModal.js";
import "../Style.css";
import Verbindungsanzeige from "./Verbindungsanzeige.js";
//import Verbindung from "./Verbindung.js";
import Card from "./UI/Card.js";
import classes from "./UI/Card.module.css";
import Startseite from "./Startseite.js";
import Button from "./UI/Button.js";
import { BsArrowLeftRight } from "react-icons/bs";

const SearchPage = (props) => {
  // useState

  const [departureStop, setDepartureStop] = useState("");
  const [destinationStop, setDestinationStop] = useState("");
  const [departureDay, setDepartureDay] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [error, setError] = useState();
  const [clickedBack, setBackClicked] = useState(false);
  const [hideSearchFields, setHideSearchFields] = useState(false);

  let Error = true;

  ////// References zu HTML Elementen //////

  // const departureInputRef = useRef();
  // const destinationInputRef = useRef();
  //const departureTimeInputRef= useRef();
  //const departureDayInputRef = useRef();

  /////// DUMMY TimeOut /////////////

  // Variante A (Lektion 112)

  //   let myTimer;

  //   const [timerIsActive, setTimerIsActive] = useState(false);

  //   const { timerDuration } = props; // using destructuring to pull out specific props values

  //   useEffect(() => {
  //     if (!timerIsActive) {
  //       setTimerIsActive(true);
  //       myTimer = setTimeout(() => {
  //         setTimerIsActive(false);
  //       }, timerDuration);
  //     }
  //   }, [timerIsActive, timerDuration]);

  // Variante B (Lektion 113)

  // setTimeout(() => {
  //   Input oder Funktion die Ausgeführt werden soll
  // }, 500);    // 500ms Pausentimer - Lektion 113

  /// Timeout mit useEffect
  //   useEffect(() => {              // wird direkt ausgeführt bei aufruf der Seite, ausser man hängt einen Array hinten dran
  //     setTimeout(() => {
  //       console.log("Timer ausgeführt");
  //       setFormIsValid(
  //           departureStop === "Gartenstraße"  // Prüfen ob valide Eingabe
  //       );
  //     },500);             // Timer für 500ms
  //     return () => {
  //         console.log('Cleanup')      // CleanUp um eine KeyStroke-Ausführung des UseEffects zu vermeiden und stattdessen nur alle 500ms die Validität zu prüfen
  //         clearTimeout(identifier);   // damit das funktioniert, müsste const identifier = setTimeout(() => {usw. }) verwendet werden
  //     };
  //   }, [departureStop]);    //

  const backClickHandler = () => {
    setBackClicked(true);
  };

  const departureChangeHandler = (event) => {
    setDepartureStop(event.target.value);
    //const enteredDeparture = departureInputRef.current.value;
  };

  //////// Fehlerprüfung - Prevent////////////////

  const errorPrevent = () => {
    if (
      departureStop.trim().length === 0 ||
      //departureStop != "Gartenstraße" ||
      //departureTime.trim().length === 0 ||
      destinationStop.trim().length === 0
    ) {
      return (
        setError({
          title: "Falsche Daten",
          message: "Bitte geben Sie einen passenden Start- und Zielort ein!",
        }) && Error === true
      );
    }
    return Error === false;
  };

  ////////// ErrorHandler /////////

  const errorHandler = () => {
    setError(null);
  };

  ////// Handler ///////

  const searchClickedHandler = () => {
    errorPrevent();
    console.log(Error);
    //{Error? setSearchClicked(false) : setSearchClicked(true)}
    if (Error) {
      return setSearchClicked(true) && console.log("weiter gehts");
    }
    return setSearchClicked(false) && console.log("Fehler Aufgetreten");
  };

  const changeStopHandler = () => {
    let a = departureStop;
    setDepartureStop(destinationStop);
    setDestinationStop(a);
  };

  const destinationStopHandler = (event) => {
    setDestinationStop(event.target.value);
    // const enteredDestinationStop = destinationInputRef.current.value;
  };
  const departureDayHandler = (event) => {
    setDepartureDay(event.target.value);
    //localStorage.setItem()
  };
  const departureTimeHandler = (event) => {
    setDepartureTime(event.target.value);
  };

  /////////////////////////////////////////////
  //// return bei Searchpage Aufruf ///////////
  /////////////////////////////////////////////

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <h1> Verbindungs-Suche </h1>
      <div>
        {hideSearchFields ? null : (
          <div className="container-searchpage">
            <input
              type="text"
              value={departureStop}
              onChange={departureChangeHandler}
              placeholder="Start"
              //ref={departureInputRef}
            />
            <button className="button button-swap" onClick={changeStopHandler}>
              {" "}
              <BsArrowLeftRight size="3em" />
            </button>
            <input
              type="text"
              value={destinationStop}
              onChange={destinationStopHandler}
              placeholder="Ziel"
            />
            <input
              type="date"
              value={departureDay}
              onChange={departureDayHandler}
            />
            <br></br>
            <input
              type="time"
              value={departureTime}
              onChange={departureTimeHandler}
              //ref={destinationInputRef}
            />
            <Button
              className="button button-search"
              onClick={() => {
                searchClickedHandler();
                setHideSearchFields(true);
              }}
            >
              Suchen
            </Button>
          </div>
        )}
        <div className="buttons-search-page">
          {searchClicked ? (
            <Verbindungsanzeige
              departureStop={departureStop}
              destinationStop={destinationStop}
              departureDay={departureDay}
              departureTime={departureTime}
            />
          ) : null}

          {clickedBack ? (
            <Startseite />
          ) : (
            <Button className="button" onClick={backClickHandler} type="submit">
              Zurück zur Startseite
            </Button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
