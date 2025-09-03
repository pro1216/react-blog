import { App } from "./App"
import '../styles/App.css';
import '../styles/index.css';
import React, { useState } from "react";
import { Link } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    
    const toggleMenu = (): void => {
        setMenuOpen((prev) => !prev);
    }
    return (
        <header className="header">
            <div className={menuOpen ? "hamburger open" : "hamburger"} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h1>My Blog</h1>
            <nav id={'mobile-menu'} className={menuOpen ? "show" : "hidden"}>
                <ul>
                    <li><Link to="/">ホーム</Link></li>
                    <li><Link to="/about">自己紹介</Link></li>
                    <li><Link to="/contact">お問い合わせ</Link></li>
                </ul>
            </nav>

        </header>
    )
}

interface Article {
    _id: string;
    title:string;
    content:string;
}
export const Home: React.FC = () => {
    const [article, setArticle] = useState<Article[]>([{_id:"",title:"",content:""}]);
    const navigate = useNavigate();
    const fetchArticles = async () => {
        try {
            const res = await fetch("http://localhost:3002/api/article");
            if (!res.ok) {
                throw new Error(`HTTPエラー:${res.status}`);
            }
            const data: [] = await res.json();
            setArticle(data);
        } catch (error) {
            console.error("記事取得失敗", error);
        }
    };
    //初回読み取り時反映
    useEffect(() => {
        fetchArticles();
    })
    
    return (
        <main>
            <section id="home">
                <h2>最新記事</h2>
                <article>
                    <h3 >{article[0].title}</h3>
                    <p>{article[0].content}</p>
                    <button onClick= {()=> navigate(`/article/${article[0]._id}`) }>続きを読む</button>
                </article>
            </section>
            <h2>アーカイブス</h2>
            {article.map((ds) => {
                return (
                    <section>
                        <article>
                            <h3 >{ds.title}</h3>
                            <p>{ds.content}</p>
                            <button onClick = {() => navigate(`/article/${ds._id}`)}>続きを読む</button>
                        </article>
                    </section>
                )
            })}
        </main>
    )
}
export const Footer: React.FC = () => {
    return (
        <footer>
            <p>&copy; 2024 My Blog</p>
        </footer>
    )
}