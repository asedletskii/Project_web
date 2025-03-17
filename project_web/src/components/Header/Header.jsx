import Button from "../Button/Button";
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <p>
                <Link to="/" className="text">Wishlify</Link>
            </p>
            <div className="button-container">
                <Button>Тарифы</Button>
                <Link to="/about">
                    <Button>О проекте</Button>
                </Link>
                <Link to="/profile">
                <Button className="signup">Войти</Button>
                    </Link>
            </div>
        </header>
    );
}