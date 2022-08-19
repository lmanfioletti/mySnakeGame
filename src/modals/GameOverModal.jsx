import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from "@chakra-ui/react"
import { useSnakeContext } from "../hooks/useSnake";

export const GameOverModal = () => {

    const { isOpen, score, startGame, setLevel, level } = useSnakeContext();

    return (
        <>
            <Modal isCentered isOpen={isOpen} >
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader>{score ? "Você perdeu." : "Bem vindo ao Snake Game"}</ModalHeader>
                    <ModalBody>
                        <Text>{
                            score ? "Seu score foi de " + score :
                                "Clique em começar para um novo jogo ou selecione abaixo o nível do jogo"
                        }
                        </Text>
                        <Select defaultValue={level} onChange={(op) => setLevel(op.target.value)}>
                            <option value='easy'>Fácil</option>
                            <option value='medium'>Médio</option>
                            <option value='hard'>Difícil</option>
                            <option value='veryhard'>Muito difícil</option>
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={startGame}>Começar um novo jogo!</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

};