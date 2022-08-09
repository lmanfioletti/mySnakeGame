import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import {
    SNAKE_START,
    APPLE_START,
    SPEED,
    DIR_START,
  } from "../constants";


const SnakeContext = createContext();

const SnakeProvider = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: true});
    
    const [score, setScore] = useState();
    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState(APPLE_START);
    const [dir, setDir] = useState(DIR_START);
    const [speed, setSpeed] = useState(null);
    const [level, setLevel] = useState("medium");
    const [gameOver, setGameOver] = useState(false);

    const startGame = () => {
        onClose();
        setSnake(SNAKE_START);
        setApple(APPLE_START);
        setDir(DIR_START);
        setSpeed(SPEED[level]);
        setGameOver(false);
        setScore(0);
    };

    const value = {
        //States
        score,
        setScore,
        snake,
        setSnake,
        apple,
        setApple,
        dir,
        setDir,
        speed,
        setSpeed,
        gameOver,
        setGameOver,
        level,
        setLevel,

        //Modal  
        isOpen,
        onClose,
        onOpen,

        //Func
        startGame,
    };

    return (
        <SnakeContext.Provider value={value}>
            {props.children}
        </SnakeContext.Provider>
    )
};

function useSnakeContext() {
    const context = useContext(SnakeContext);
    if (context === undefined) {
        throw new Error("useSnakeContext must be used within a SnakeProvider");
    }
    return context;
};

export {SnakeProvider, useSnakeContext};


