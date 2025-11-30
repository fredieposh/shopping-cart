import { Link } from 'react-router'
import './Home.css'

export default function Home() {
    return(
        <div className="home">
            <div className="welcome-banner">
                <div>

                </div>
                <div>
                    <h2>Terminal Y</h2>
                    <h3>All The Finest Brands In One Place</h3>
                </div>
            </div>
            <div className="info-banner">
                <p>Some of the items you can find here:</p>
                <ul>
                    <li>Shirts</li>
                    <li>Coats</li>
                    <li>Bags</li>
                    <li>Pants</li>
                </ul>
            <button>
                <Link to='shop' onClick={() => {
                    const navButtons = document.querySelectorAll('nav li');
                    navButtons.forEach(button => button.classList.remove('selected-page'));
                    document.querySelector('nav li:nth-child(2)').classList.add('selected-page');
                }}>Shop Now!</Link>
            </button>
            </div>
        </div>
    )
}