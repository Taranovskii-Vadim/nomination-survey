import React, { useRef } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

import UserStore from "src/store/user";

interface Props {
  userStore: UserStore;
}

// TODO include react hook form here and submit form on enter
const Login = ({ userStore }: Props): JSX.Element => {
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
        isLoading={userStore.isLoading}
        onClick={() => userStore.signIn(inputRef.current.value)}
      >
        Отправить
      </Button>
    </Flex>
  );
};

export default Login;
