import { Center, ChakraProvider } from "@chakra-ui/react";
import { Header } from "./components/Header/Header";
import { SnakeTable } from "./components/SnakeTable/SnakeTable";
import { GameOverModal } from "./modals/GameOverModal";
import { SnakeProvider } from "./hooks/useSnake";

const App = () => {
  return (
    <>
      <SnakeProvider>
        <ChakraProvider>
          <Center>
            <Header />
          </Center>
          <Center>
            <SnakeTable />
          </Center>
          <Center>Developed by Lorem ipsum team</Center>
          <GameOverModal />
        </ChakraProvider>
      </SnakeProvider>
    </>
  );
};

export default App;
