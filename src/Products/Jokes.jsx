import { React, useEffect, useState } from "react";

const Jokes = () => {
  const [joke, setJoke] = useState([]);
  const [currentJoke, setCurrentJoke] = useState(null);
  const [previousId, setPreviousId] = useState(null);

  useEffect(() => {
    async function getJokes() {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_ten"
      );
      const data = await response.json();
      setJoke(data);
      setCurrentJoke(data[0]);
      setPreviousId(0)
    }

    getJokes();
  }, []);

  const getNewJoke = () => {
    if (joke.length > 1) {
      let newId;
      do {
        newId = Math.floor(Math.random() * joke.length);
      } while (newId === previousId);
      setCurrentJoke(joke[newId]);
      setPreviousId(newId);
    }
  };

  return (
    <div>
      <p>Setup: {currentJoke.setup}</p>
      <p>Punchline: {currentJoke.punchline}</p>
      <button onClick={getNewJoke}>New Joke</button>
    </div>
  );
};

export default Jokes;
