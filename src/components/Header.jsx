import {React, useState} from "react"
import logo from "../gakugeki_logo.jpg"
import "./Header.css"

const Header = () => {
    const style = {
        position: "fixed",
        width:"100%",
        height:"70px",
        textAlign: "left",
        display:"inline-block",
        backgroundColor: "#222",
    }
    const style2 = {
        height:"70px",
        width:"100%"
    }
    const [open,setOpen] = useState(false);
    function menu(){
        setOpen(!open);
    }
    return (
        <header>
        <div style = {style} id="header">
            <img src={logo} alt="ロゴ" className="logo"/>
            <div className="hamburger_position">
                <div className="hamburger_btn" onClick={menu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            {open &&
            <div id="home_link">
                <a href="https://gakugeki-web.web.app">動画ページ</a>
                <a href="https://gakugeki-stage.web.app">ステージ一覧・予約</a>
                <a href="https://gakugeki-rooms.web.app">ルーム一覧・ルーム作成</a>
                <a href="https://gakugeki-introduction.web.app">学檄INFINITE紹介ページ</a>
            </div>}
        </div>
        <div style = {style2}></div>
        </header>
    );
};

export default Header;