import { useSnakeContext } from "../../hooks/useSnake";

import "./Footer.css";

export const Footer = () => {

    const { score, level } = useSnakeContext();


    return (
        <>
        <div className="container">
            <h1 className="score-title">SCORE  {("000000" + score).slice(-6)}</h1>
            <h1 className="level-title">LEVEL  {level}</h1>
        </div>
        </>
    );
}
