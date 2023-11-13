import React, {useState, useEffect} from 'react'
import Particle from './Particle'
import Shop from './Shop'
import cookie from "../images/cookie.png"
import autoclick from "../images/auto-click.png"
import x2click from "../images/x2-click.png"


export default function Main() {
    // state variable to keep track 
    const[cookieCount, updateCookieCount] = useState(0);
    const [particles, setParticles] = useState([]);
    const [autoclickCount, updateAutoClickCount] = useState(0);
    const [x2clickCount, updatex2clickCount] = useState(0);

    const[autoclickPrice, updateAutoClickPrice] = useState(20);
    const[x2clickPrice, updatex2clickPrice] = useState(40);

    
    // load cookie count from local storage on component mount
    useEffect(() =>{
        const storeCookieCount = localStorage.getItem('cookieCount');
        const storeAutoClickCount = localStorage.getItem('autoclickCount');
        const storex2ClickCount = localStorage.getItem('x2clickCount');
        const storeAutoClickPrice = localStorage.getItem('autoclickPrice');
        const storex2ClickPrice = localStorage.getItem('x2clickPrice');

        // check if stored value for variable in local storage
        if(storeCookieCount){
            updateCookieCount(parseInt(storeCookieCount));
        }

        if(storeAutoClickCount){
            updateAutoClickCount(parseInt(storeAutoClickCount));
        }

        if(storex2ClickCount){
            updatex2clickCount(parseInt(storex2ClickCount));
        }


        if(storeAutoClickPrice){
            updateAutoClickPrice(parseInt(storeAutoClickPrice));
        }

        if(storex2ClickPrice){
            updatex2clickPrice(parseInt(storex2ClickPrice));
        }
    }, []);


    function handleCookieCount(e) {
        // update the state and use updated value in local storage
        const hasx2clickCount = localStorage.getItem('x2clickCount') !== null;
        let newCookieCount;
        if(hasx2clickCount) {
            const multiplier = x2clickCount;
            newCookieCount = cookieCount + (2 ** multiplier)
        } 
        else {
            newCookieCount = cookieCount + 1;
        }
        updateCookieCount(newCookieCount);
        localStorage.setItem('cookieCount', newCookieCount);

        // Create a new particle and add it to the particles state
        const newParticle = {x: e.clientX, y: e.clientY};
        setParticles((prevParticles) => [...prevParticles, newParticle]);
    };

    function autoClickCookie() {
        setInterval(() => {
          updateCookieCount((prevCount) => {
            const newCount = prevCount + 1;
            localStorage.setItem('cookieCount', newCount);
            return newCount;
          });
        }, 1000);
    }
      

    function handleUpgradePurchase(upgradeName, upgradeCost) {
        // Check if the user has enough cookies to purchase the upgrade
        if (cookieCount >= upgradeCost) {
          // Deduct the upgrade cost from the cookie count
          const newCookieCount = cookieCount - upgradeCost; 
          updateCookieCount(newCookieCount);
          localStorage.setItem('cookieCount', newCookieCount);

          if(upgradeName === 'autoclick'){
            updateAutoClickCount((prevCount) => prevCount + 1);
            localStorage.setItem('autoclickCount', autoclickCount + 1);	
            autoClickCookie();	

            updateAutoClickPrice((prevPrice) => Math.round(prevPrice * 1.2));
            localStorage.setItem('autoclickPrice', Math.round(autoclickPrice * 1.2));	
          }
          else{
            updatex2clickCount((prevCount) => prevCount + 1);
            localStorage.setItem('x2clickCount', x2clickCount + 1);

            updatex2clickPrice((prevPrice) => Math.round(prevPrice * 2.2));
            localStorage.setItem('x2clickPrice', Math.round(x2clickPrice  * 2.2));	
          }
        } 
        else {
          alert('Not enough cookies to purchase this upgrade!');
        }
    }

    return (
    <div>   
        <main className='cookieGame'>
            {/* Cookie Clicker Play */}
            <section className='cookiePlay'>
                <p><span>{cookieCount}</span> cookies</p>
                <img 
                    src={cookie} 
                    className = 'cookieBtn' 
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
                        img = {autoclick}
                        upgradeName = "Autoclick"
                        upgradePrice = {`${autoclickPrice} cookies`}
                        onPurchase={() => handleUpgradePurchase('autoclick', autoclickPrice)}
                        upgradeCount = {autoclickCount}
                    />
                    <Shop
                        img = {x2click}
                        upgradeName = "x2 click"
                        upgradePrice = {`${x2clickPrice} cookies`}

                        onPurchase={() => handleUpgradePurchase('x2click', x2clickPrice)}
                        upgradeCount = {x2clickCount}
                    />
                </section>
                {/* Player High Score */}
                <section className='HighScore'>
                    <h2>High Score</h2>   
                </section>
            </section>
        </main>
        <div className='cookie-clicks'> {particles.map((particle, index) => (
            <Particle key={index} x={particle.x} y={particle.y} />
            ))}
        </div>
    </div> 
  )
}

