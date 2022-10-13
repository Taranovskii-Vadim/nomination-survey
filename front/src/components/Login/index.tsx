import React, { useRef } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

interface Props {
  isLoading: boolean;
  onLogin: (login: string) => Promise<void>;
}

// TODO include react hook form here and submit form on enter
const Login = ({ isLoading, onLogin }: Props): JSX.Element => {
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
        onClick={() => onLogin(inputRef.current.value)}
      >
        Отправить
      </Button>
    </Flex>
  );
};

export default Login;
