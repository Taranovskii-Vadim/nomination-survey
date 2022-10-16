import React, { useEffect } from "react";
import {
  Input,
  Button,
  Box,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

import { SignInFormValues } from "src/store/user/types";

interface Props {
  isLoading: boolean;
  onLogin: (login: SignInFormValues) => Promise<void>;
}

// TODO migrate all forms from formik to react-hook-form
const Login = ({ isLoading, onLogin }: Props): JSX.Element => {
  const { control, formState, register, handleSubmit } =
    useForm<SignInFormValues>({
      defaultValues: { login: "" },
    });

  useEffect(() => {
    register("login", {
      required: { value: true, message: "Обязательное поле" },
    });
  }, [register]);

  const { errors } = formState;

  const onSubmit: SubmitHandler<SignInFormValues> = (data) => onLogin(data);

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
            {errors.login ? (
              <FormErrorMessage>{errors.login.message}</FormErrorMessage>
            ) : null}
          </FormControl>
        )}
      />
      <Button mt={4} isFullWidth type="submit" isLoading={isLoading}>
        Отправить
      </Button>
    </Box>
  );
};

export default Login;
