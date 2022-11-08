import React from 'react';
import { observer } from 'mobx-react-lite';
import { Input, Button, Box } from '@chakra-ui/react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import store from 'src/store/user';

import { SignInFormValues } from 'src/store/user/types';

const Login = (): JSX.Element => {
  const { control, handleSubmit } = useForm<SignInFormValues>({
    defaultValues: { login: '' },
  });

  const onSubmit: SubmitHandler<SignInFormValues> = (data) => store.signIn(data);

  return (
    <Box
      mt="35vh"
      as="form"
      maxWidth="sm"
      marginX="auto"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="login"
        control={control}
        render={({ field }) => <Input placeholder="Введите логин" {...field} />}
      />
      <Button mt={4} isFullWidth type="submit" isLoading={store.isSubmit}>
        Отправить
      </Button>
    </Box>
  );
};

export default observer(Login);
