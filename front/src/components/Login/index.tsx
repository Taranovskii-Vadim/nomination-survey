import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Input, Button, Box, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import store from 'src/store/user';

import { SignInFormValues } from 'src/store/user/types';

const Login = (): JSX.Element => {
  const { control, formState, register, handleSubmit } = useForm<SignInFormValues>({
    defaultValues: { login: '' },
  });

  useEffect(() => {
    register('login', {
      required: { value: true, message: 'Обязательное поле' },
    });
  }, [register]);

  const { errors } = formState;

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
        render={({ field }) => (
          <FormControl isInvalid={!!errors.login}>
            <Input placeholder="Введите логин" {...field} />
            {errors.login ? <FormErrorMessage>{errors.login.message}</FormErrorMessage> : null}
          </FormControl>
        )}
      />
      <Button mt={4} isFullWidth type="submit" isLoading={store.isLoading}>
        Отправить
      </Button>
    </Box>
  );
};

export default observer(Login);
