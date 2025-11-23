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
                    <h3>All The The Finest Brands In One Place</h3>
                </div>
            </div>
            <div className="info-banner">
                <p>Just a taste of the brands you can find here:</p>
                <ul>
                    <li>Shirts</li>
                    <li>Coats</li>
                    <li>Bags</li>
                    <li>Pants</li>
                </ul>
            <button>
                <Link to='shop'>Shop Now!</Link>
            </button>
            </div>
        </div>
    )
}