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
                <Button className="signup" onClick={""}>Войти</Button>
            </div>
        </header>
    );
}