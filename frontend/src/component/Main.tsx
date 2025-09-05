import '../styles/index.css';
import '../styles/article.css';
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { Link } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    
    const toggleMenu = (): void => {
        setMenuOpen((prev) => !prev);
    }
    if(menuOpen){
        document.body.style.overflow = "hidden";
    }else{
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
    if(article.length < 1 || article[0]._id === ""){
        return (
            <main>
                <p>記事がありません</p>
                <button onClick= {()=> navigate(`/newArticle`) }>記事を追加</button>
            </main>
        );
    } 
    return (
        <main>
            <section id="home">
                <h2>最新記事</h2>
                <article>
                    <div id="article-header">{article[0].title}</div>
                    <div id="article-content"><ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{article[0].content}</ReactMarkdown></div>
                    <button style={{marginTop: "15px"}} onClick = {() => navigate(`/article/${article[0]._id}`)}>続きを読む</button>
                </article>
            </section>
            <h2>アーカイブス</h2>
            {article.map((ds) => {
                return (
                    <section>
                        <article>
                            <div id="article-header">{ds.title}</div>
                            <div id="article-content"><ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{ds.content}</ReactMarkdown></div>
                            <button style={{marginTop: "15px"}} onClick = {() => navigate(`/article/${ds._id}`)}>続きを読む</button>
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