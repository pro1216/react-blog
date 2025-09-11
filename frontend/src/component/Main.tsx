// src/component/Main.tsx
import { useState } from "react";
import { ToggleComponent } from "./ToggleComponent";
import { Link } from "react-router";
import SearchPopover  from "./search/SearchPopover";
import "../styles/searchPopover.css";


export  function Header() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const toggleMenu = (): void => {
        setMenuOpen((prev) => !prev);
    }
    if (menuOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
    return (
        <header className="header">
            <div className={menuOpen ? "hamburger open" : "hamburger"} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h1>My Blog</h1>
            <div id="searchIcon"><SearchPopover  /></div>
            <div id="theme-toggle">
                <ToggleComponent />
            </div>
            <nav id={'mobile-menu'} className={menuOpen ? "show" : "hidden"}>
                <ul>
                    <li><Link to="/">ホーム</Link></li>
                    <li><Link to="/about">自己紹介</Link></li>
                    <li><Link to="/contact">お問い合わせ</Link></li>
                    <li><Link to="/newArticle">新規作成</Link></li>
                </ul>
            </nav>

        </header>
    )
}

export function Footer(): JSX.Element {
    return (
        <footer>
            <p>&copy; 2024 My Blog</p>
        </footer>
    )
}