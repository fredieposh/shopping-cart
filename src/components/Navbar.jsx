import { Link } from 'react-router';
import '../components/Navbar.css';

export default function Navbar({redDotQuantity, setRedDotQuantity}) {
    function handleNavClick(e) {
        const navButtons = document.querySelectorAll('nav li');
        removeClassNames(navButtons);

        e.target.parentNode.classList.add('selected-page');
        
        if(e.target.innerHTML === 'Cart') {
            document.querySelector('.red-dot').classList.remove('visible');
            handleCartClick(e.target)
        }

    }

    function handleCartClick(element) {
        if(element.classList.contains('visible')) {
            element.classList.remove('visible');
        };

        setRedDotQuantity(0);
    }

    function removeClassNames(elementsList) {
        elementsList.forEach(element => element.classList.remove('selected-page'));
    };

    return (
        <nav>
            <div className="nav-header">
                <p>Terminal Y</p>
            </div>
            <div className="pages">
                <ul>
                    <li className="selected-page"><Link to="/" onClick={handleNavClick}>Home</Link></li>
                    <li><Link to="/shop" onClick={handleNavClick}>Shop</Link></li>
                    <li>
                        <Link to="/cart" onClick={handleNavClick}>Cart</Link>
                        <RedDot 
                        className='red-dot' 
                        style={{height: '50%', width: '30%'}}
                        redDotQuantity={redDotQuantity}
                        />
                    </li>
                </ul>
            </div>
        </nav>
    );
};

function RedDot({redDotQuantity}) {
    return (
        <div className='red-dot' style={{height: '50%', width: '30%'}}>
            {redDotQuantity}
        </div>
    )
}