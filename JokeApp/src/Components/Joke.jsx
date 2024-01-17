
import { useState, useEffect } from 'react';
import styles from './Joke.module.scss';



function JokeApp() {
    const [setup, setSetup] = useState(''); // state variable for the setup
    const [punchline, setPunchline] = useState(''); // state variable for the punchline
    const [showSetup, setShowSetup] = useState(true); // state variable to show or hide the setup
    const [showPunchline, setShowPunchline] = useState(false); // state variable to show or hide the punchline
    const [headerText, setHeaderText] = useState('Want to hear something funny?'); // state variable for the header text
    const [buttonText, setButtonText] = useState('Yes! Tell me!'); // state variable for the button text
    const [showHeader, setShowHeader] = useState(true); // state variable to show or hide the header

    //function to fetch a joke from the API
    const fetchJoke = () => {
        // request a joke from the API
        fetch('https://official-joke-api.appspot.com/random_joke')
            // When the response is received, convert it to JSON
            .then(response => response.json())
            .then(data => {
                setSetup(data.setup); // set the setup state variable
                setPunchline(data.punchline); // set the punchline state variable
                setShowSetup(false); // set showSetup to false to hide the setup when fetching a new joke
                setShowPunchline(false); // set showPunchline to false to hide punchline when fetching a new joke
                setShowHeader(true); // set showHeader to true to show the header when fetching a new joke
                if (setup !== '' || punchline !== '') { //change the header text when fetching a new joke if setup and punchline are not empty(i.e not the first joke)
                    setHeaderText('Okay! Are you ready?');
                }
                if (setup !== '' || punchline !== '') { //change the button text when fetching a new joke if setup and punchline are not empty(i.e not the first joke)
                    setButtonText('Just tell me already!');
                }
            })

            .catch(error => console.error(error));
    };
    // Function to show setup by setting showSetup to true
    const getJoke = () => {
        setShowSetup(true);
        setShowHeader(false);
    }

    // Function to show punchline by setting showPunchline to true
    const getPunchline = () => {
        if (showSetup) { // Only show punchline if setup is already showing
            setShowPunchline(true);
        }
    };

    // fetch a new joke when the component is first rendered
    useEffect(() => {
        fetchJoke();
    }, []);


    return (
        <div className={styles.jokeApp}>
            {showHeader && <h1>{headerText}</h1>}
            <div>
                <button onClick={getJoke}>{buttonText}</button>
                {showSetup && <p>{setup}</p>}  {/* Display the setup of the joke */}
            </div>
            <div>
                <button onClick={getPunchline}>Why?</button>
                {showPunchline && <p>{punchline}</p>}  {/* Displays punchline if showPunchline is true */}
            </div>
            <button className={styles.newJoke} onClick={fetchJoke}>Tell me another one!</button>

        </div>
    );
}


export default JokeApp;