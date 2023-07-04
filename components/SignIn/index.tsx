import styles from "./SignIn.module.scss";
import Logo from "../../assests/images/logo.svg";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../Input";

interface FormDataProps {
  email: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    password: yup.string().required("Bu alan boş bırakılamaz"),
    email: yup
      .string()
      .email("Email formatına uygun olmalı")
      .required("Bu alan boş bırakılamaz"),
  })
  .required();

const SignIn = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    router.push("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.signIn}>
        <Logo />
        <div className={styles.header}>
          <Typography
            className={styles.title}
            variant="header-small"
            color="primary"
          >
            SIGN IN
          </Typography>
          <Typography variant="body-small" color="secondary">
            Enter your credentials to access your account
          </Typography>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputs}>
            <Typography
              className={styles.label}
              variant="body-small"
              color="secondary"
            >
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              render={({
                fieldState: { error },
                field: { value, onChange },
              }) => (
                <Input
                  className={styles.input}
                  fullWidth
                  value={value}
                  onChange={onChange}
                  id="email"
                  placeholder="Enter your email"
                  type="text"
                  error={error?.message}
                />
              )}
            />
            <Typography
              className={styles.label}
              variant="body-small"
              color="secondary"
            >
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              render={({
                fieldState: { error },
                field: { value, onChange },
              }) => (
                <Input
                  className={styles.input}
                  fullWidth
                  value={value}
                  onChange={onChange}
                  id="password"
                  placeholder="Enter your password"
                  type="text"
                  error={error?.message}
                />
              )}
            />
          </div>
          <Button className={styles.button} text="SIGN IN" />
        </form>
        <Typography
          className={styles.forgotPassword}
          variant="body-small"
          color="secondary"
        >
          Forgot your password?{" "}
          <span className={styles.span}>Reset Password</span>
        </Typography>
      </div>
    </div>
  );
};

export default SignIn;
