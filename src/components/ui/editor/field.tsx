import { Controller, useFormContext } from "react-hook-form";
import { FieldWrapper } from "../field-wrapper";
import { Editor } from ".";

type EditorFieldProps = {
  label: string;
  name: string;
  containerClassName?: string;
  required?: boolean;
};

export const EditorField = ({ label, name, required, containerClassName, ...props }: EditorFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required && "Campo obrigatório",
      }}
      render={({ field, fieldState }) => (
        <FieldWrapper label={label} className={containerClassName} error={fieldState?.error}>
          <Editor {...props} {...field} />
        </FieldWrapper>
      )}
    />
  );
};
