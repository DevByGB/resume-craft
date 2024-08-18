"use client"

import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog"
import { InputField } from "@/components/ui/input/field";
import { createResume } from "@/db/actions";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner";

type FormData = {
  title: string;
}

export const NewResumeDialog = (props: BaseDialogProps) => {
  const methods = useForm<FormData>();

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const resume = await createResume(data.title);

      toast.success("Currículo criado com sucesso!");
      router.push(`/dashboard/resumes/${resume.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar currículo, tente novamente.");
    }
  }

  return (
    <Dialog
      {...props}
      title="Criar novo currículo"
      description="Para começar, escolha um título para seu currículo"
      content={
        <FormProvider {...methods}>
          <form className="flex flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField label="Título" name="title" required />

            <Button
              type="submit"
              className="w-max mt-6 ml-auto"
            >
              Criar
            </Button>
          </form>
        </FormProvider>
      }
    />
  )
}