import React, { useState, useEffect, useRef } from 'react';
import Particle from './Particle';
import Shop from './Shop';
import cookie from "../images/cookie.png";
import autoclick from "../images/auto-click.png";
import x2click from "../images/x2-click.png";
import axios from 'axios';

export default function Main() {
    // useState hook that uses a state variable to preserve values
    const [cookieCount, updateCookieCount] = useState(0);
    const [particles, setParticles] = useState([]);
    const [autoclickCount, updateAutoClickCount] = useState(0);
    const [x2clickCount, updatex2clickCount] = useState(0);
    const [startTime, updateStartTime] = useState("");
    const [autoclickPrice, updateAutoClickPrice] = useState(20);
    const [x2clickPrice, updatex2clickPrice] = useState(40);
    const autoclickInterval = useRef(null);

    const userid = useRef(null);
    const highscoreTable = useRef([]);

    // useEffect hook to load data and highscore from server on first load
    useEffect(() => {
        userid.current = localStorage.getItem("userid");
        if (!userid.current) {
            let defaultusr = "cs4650_player"
            userid.current = defaultusr;
            localStorage.setItem("userid", defaultusr);
        }
        console.log("userid = ", JSON.stringify(userid.current));
        
        loadData();
        loadHighscores();
    // eslint-disable-next-line
    }, []);

    // useEffect hook to update autoclickers when autoClickCount updates
    useEffect(() => {
        for (let i = 0; i < autoclickCount; i++)
            autoClickCookie();
        return () => clearInterval(autoclickInterval.current);
    // eslint-disable-next-line
    }, [autoclickCount]);
    //re-run everytime autoclickCount changes. Does not accumulate the effect from previous renders and starts new
    
    // function to save current player data to backend
    async function saveData(exists = true) {
        console.log("attempting save");
        let saveDataStuff = {
            "user": userid.current,
            "startTime": startTime,
            "cookieCount": cookieCount,
            "autoClickCount": autoclickCount,
            "doubleClickCount": x2clickCount,
            "autoClickPrice": autoclickPrice,
            "doubleClickPrice": x2clickPrice
        };
        console.log("savedata content = ", JSON.stringify(saveDataStuff));
        if (exists) {
            await axios.put(`/api/gamesession/${userid.current}/`, saveDataStuff)
                .then((res) => alert("save success!"))
                .catch(() => alert("save failed!"));
        }
        else {
            await axios.post(`/api/gamesession/`, saveDataStuff)
                .catch(() => alert("save failed!"));
        }
    }

    // function to load player data from backend, should run when game is loaded
    async function loadData() {
        console.log("attempting load");
        const playerData = await axios.get(`/api/gamesession/${userid.current}/`)
            .catch((err) => {
                console.log("load failed,", err)
                if (err.response) {
                    if (err.response.status === 404)
                        saveData(false);
                    else
                        alert("load failed!");
                }
                return;
            });
        console.log("server response =", JSON.stringify(playerData.data));
        updateStartTime(playerData.data.startTime);
        updateCookieCount(parseInt(playerData.data.cookieCount));
        updateAutoClickCount(parseInt(playerData.data.autoClickCount));
        updatex2clickCount(parseInt(playerData.data.doubleClickCount));
        updateAutoClickPrice(parseInt(playerData.data.autoClickPrice));
        updatex2clickPrice(parseInt(playerData.data.doubleClickPrice));
    }

    // function to get high scores from backend, also runs on first load
    async function loadHighscores() {
        console.log("resetting table");
        highscoreTable.current = [];
        console.log("getting new table from backend");
        const hstableData = await axios.get(`/api/highscore/`)
            .catch((err) => {
                console.log("highscores didnt load, err =", err);
                alert("highscores failed to load!");
                return;
            });
        console.log("table loaded, populating highscore array");
        let scores = hstableData.data;
        console.log("scores =", JSON.stringify(scores));
        for (let index = 0; index < scores.length; index++) {
            console.log("pushing", JSON.stringify(scores[index]) ,"into table");
            highscoreTable.current.push({ user: scores[index].user, cscore: scores[index].cookieCount });
        }
        console.log("new table =", JSON.stringify(highscoreTable));
    }

    // function to handle increasing count of cookie when clicked
    function handleCookieCount(e) {
        // update state and trigger a re-render
        updateCookieCount(cookieCount + (2 ** x2clickCount));

        // Create a new particle and add it to the particles state
        const newParticle = { x: e.clientX, y: e.clientY };
        setParticles((prevParticles) => [...prevParticles, newParticle]);
    };

    // function to automatically click the click every 1 second
    function autoClickCookie() {
        autoclickInterval.current = setInterval(() => {
            updateCookieCount(cookieCount + 1);
        }, 1000);
    }

    //function to handle purchasing upgrades
    function handleUpgradePurchase(upgradeName, upgradeCost) {
        // check if the user has enough cookies to purchase the upgrade
        if (cookieCount >= upgradeCost) {
            // deduct the upgrade cost from the cookie count
            const newCookieCount = cookieCount - upgradeCost;
            updateCookieCount(newCookieCount);

            // update 'autoclick' and 'x2clickPrice' price to upgrade and num. of times bought
            if (upgradeName === 'autoclick') {
                updateAutoClickCount((prevCount) => prevCount + 1);
                updateAutoClickPrice((prevPrice) => Math.round(prevPrice * 1.2));
            }
            else if (upgradeName === 'x2click'){
                updatex2clickCount((prevCount) => prevCount + 1);
                updatex2clickPrice((prevPrice) => Math.round(prevPrice * 2.2));
            }
        }
        else
            alert('Not enough cookies to purchase this upgrade!');
    }

    return (
        <div>
            <main className='cookieGame'>
                {/* Cookie Clicker Play */}
                <section className='cookiePlay'>
                    <p><span>{cookieCount}</span> cookies</p>
                    <img
                        src={cookie}
                        className='cookieBtn'
                        alt="cookie img"
                        onClick={handleCookieCount}>
                    </img>
                </section>
                {/* Player Side Bar */}
                <section className='playerSideBar'>
                    {/* Player Store */}
                    <section className='Store'>
                        <h2>Store</h2>
                        <Shop
                            img={autoclick}
                            upgradeName="Autoclick"
                            upgradePrice={`${autoclickPrice} cookies`}
                            onPurchase={() => handleUpgradePurchase('autoclick', autoclickPrice)}
                            upgradeCount={autoclickCount} />
                        <Shop
                            img={x2click}
                            upgradeName="x2 click"
                            upgradePrice={`${x2clickPrice} cookies`}

                            onPurchase={() => handleUpgradePurchase('x2click', x2clickPrice)}
                            upgradeCount={x2clickCount} />
                    </section>
                    {/* Player High Score */}
                    <section className='HighScore'>
                        <h2>High Score</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {highscoreTable.current.map((hs, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{hs.user}</td>
                                            <td>{hs.cscore}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    <button type='button' onClick={loadHighscores}>Update Highscore Table</button>
                    <button type='button' onClick={saveData}>Save Game</button>
                    </section>
                </section>
            </main>
            <div className='cookie-clicks'> {particles.map((particle, index) => (
                <Particle key={index} x={particle.x} y={particle.y} />
            ))}
            </div>
        </div>
    );
}


