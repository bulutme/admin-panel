import Button from "../Button";
import Input from "../Input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Form.module.scss";
import ImageUploader from "../ImageUploader";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/contexts";

export interface FormDataProps {
  name: string;
  email: string;
  phone: string;
  domain: string;
  company: string;
}

interface FormProps {
  onSubmit: (value: FormDataProps) => void;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Bu alan boş bırakılamaz"),
    phone: yup.string().matches(phoneRegExp, "Bu alan boş bırakılamaz"),
    domain: yup.string().required("Bu alan boş bırakılamaz"),
    company: yup.string().required("Bu alan boş bırakılamaz"),
    email: yup
      .string()
      .email("Email formatına uygun olmalı")
      .required("Bu alan boş bırakılamaz"),
  })
  .required();

const Form = ({ onSubmit }: FormProps) => {
  const { selectedImage, singleUser } = useContext(Context);

  const { control, handleSubmit, reset } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (singleUser) {
      reset({
        ...singleUser,
        company: singleUser.company.name,
        name: `${singleUser.firstName} ${singleUser.lastName}`,
      });
    }
  }, [singleUser]);

  const [sendErrorToUploader, setSendErrorToUploader] =
    useState<boolean>(false);

  return (
    <form
      onSubmit={handleSubmit((value) => {
        selectedImage && onSubmit(value);
      })}
    >
      <div className={styles.formContainer}>
        <Controller
          name="name"
          control={control}
          render={({ fieldState: { error }, field: { value, onChange } }) => (
            <span className={styles.formLabel}>
              Name&nbsp;:
              <Input
                fullWidth
                value={value}
                onChange={(event) => onChange(event)}
                id="name"
                placeholder="Name"
                type="text"
                error={error?.message}
              />
            </span>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ fieldState: { error }, field: { value, onChange } }) => (
            <span className={styles.formLabel}>
              Email&nbsp;:
              <Input
                fullWidth
                value={value}
                onChange={onChange}
                id="email"
                placeholder="Email"
                type="text"
                error={error?.message}
              />
            </span>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ fieldState: { error }, field: { value, onChange } }) => (
            <span className={styles.formLabel}>
              Phone&nbsp;:
              <Input
                fullWidth
                value={value}
                onChange={onChange}
                id="phone"
                placeholder="Phone"
                type="tel"
                error={error?.message}
              />
            </span>
          )}
        />
        <Controller
          name="domain"
          control={control}
          render={({ fieldState: { error }, field: { value, onChange } }) => (
            <span className={styles.formLabel}>
              Website&nbsp;:
              <Input
                fullWidth
                value={value}
                onChange={onChange}
                id="domain"
                placeholder="Website"
                type="text"
                error={error?.message}
              />
            </span>
          )}
        />
        <Controller
          name="company"
          control={control}
          render={({ fieldState: { error }, field: { value, onChange } }) => (
            <span className={styles.formLabel}>
              Company&nbsp;:
              <Input
                fullWidth
                value={value}
                onChange={onChange}
                id="company"
                placeholder="Company"
                type="text"
                error={error?.message}
              />
            </span>
          )}
        />
        <span className={styles.formLabel}>
          Image&nbsp;:
          <ImageUploader
            isError={sendErrorToUploader}
            defaultValue={singleUser?.image}
          />
        </span>
        <div className={styles.buttonContainer}>
          <Button
            text={singleUser ? "Update" : "Create"}
            onClick={() => {
              if (!selectedImage) {
                setSendErrorToUploader(true);
              }
            }}
            className={styles.createButton}
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
