import React, { useRef } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

interface Props {
  isLoading: boolean;
  getToken: (login: string) => Promise<void>;
}

const Login = ({ isLoading, getToken }: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <Flex
      maxWidth="sm"
      height="85vh"
      marginX="auto"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Input ref={inputRef} marginBottom={4} placeholder="Введите логин" />
      <Button
        isFullWidth
        type="submit"
        isLoading={isLoading}
        onClick={() => getToken(inputRef.current.value)}
      >
        Отправить
      </Button>
    </Flex>
  );
};

export default Login;
