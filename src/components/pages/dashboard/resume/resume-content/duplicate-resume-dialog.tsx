"use client"

import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { duplicateResume } from "@/db/actions";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  title: string;
}

export const DuplicateResumeDialog = (props: BaseDialogProps) => {
  const [open, setOpen] = useState(false);

  const methods = useForm<FormData>();

  const params = useParams();
  const router = useRouter();

  const resumeId = params.id as string;

  const { mutate: handleDuplicateResume, isPending } = useMutation({
    mutationFn: (title: string) => duplicateResume(resumeId, title),
    onSuccess: (newResume) => {
      toast.success("Currículo duplicado com sucesso.");
      setOpen(false);
      router.push(`/dashboard/resumes/${newResume.id}`);
    }
  })

  const onSubmit = async (data: FormData) => {
    handleDuplicateResume(data.title);
  }

  return (
    <Dialog
      {...props}
      open={open}
      setOpen={setOpen}
      title="Duplicar Currículo"
      description="Será criado um novo currículo com o mesmo conteúdo do atual. Insira o novo título para o currículo."
      content={
        <form className="flex flex-col" onSubmit={methods.handleSubmit(onSubmit)}>
          <Controller
            control={methods.control}
            name="title"
            rules={{ required: "Campo obrigatório" }}
            render={({ field }) => (
              <Input placeholder="Novo título" {...field} />
            )}
          />

          <div className="flex mt-4 ml-auto gap-3">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              Duplicar
            </Button>
          </div>
        </form>
      }
    />
  )
}