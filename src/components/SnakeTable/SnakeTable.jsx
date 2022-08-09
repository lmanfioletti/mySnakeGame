import React, { useRef, useEffect } from "react";
import { useInterval } from "../../useInterval";
import {
  CANVAS_SIZE,
  SCALE,
  DIRECTIONS,
} from "../../constants";
import { useSnakeContext } from "../../hooks/useSnake";

export const SnakeTable = () => {
    const canvasRef = useRef();
    const { onOpen, score, setScore, setSnake, setApple, setDir, setSpeed, setGameOver, speed, apple, snake, dir, gameOver} = useSnakeContext();

    useInterval(() => gameLoop(), speed);

    const endGame = () => {
        setSpeed(null);
        setGameOver(true);
        onOpen();
    };

    const moveSnake = ({ keyCode }) => keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

    const createApple = () => apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

    const checkCollision = (piece, snk = snake) => {
        if (
            piece[0] * SCALE >= CANVAS_SIZE[0] ||
            piece[0] < 0 ||
            piece[1] * SCALE >= CANVAS_SIZE[1] ||
            piece[1] < 0
        )
            return true;

        for (const segment of snk) {
            if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
        }
        return false;
    };

    const checkAppleCollision = (newSnake) => {
        if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
            let newApple = createApple();
            while (checkCollision(newApple, newSnake)) {
                newApple = createApple();
            }
            setScore(score + 1);
            setApple(newApple);
            return true;
        }
        return false;
    };

    const gameLoop = () => {
        const snakeCopy = JSON.parse(JSON.stringify(snake));
        const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
        snakeCopy.unshift(newSnakeHead);
        if (checkCollision(newSnakeHead)) endGame();
        if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
        setSnake(snakeCopy);
    };

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.fillStyle = "red";
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.fillStyle = "black";
        context.fillRect(apple[0], apple[1], 1, 1);
    }, [snake, apple, gameOver]);

    return (
        <div role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
            <canvas
                style={{ border: "2px solid black" }}
                ref={canvasRef}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
            />
        </div>
    );
}