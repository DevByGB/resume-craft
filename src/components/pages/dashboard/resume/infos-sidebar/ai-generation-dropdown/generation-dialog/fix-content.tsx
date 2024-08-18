import { Button } from "@/components/ui/button";
import { ApiService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { mergician } from "mergician";

type GenerateToFixContentProps = {
  onClose: () => void;
}

export const GenerateToFixContent = ({ onClose }: GenerateToFixContentProps) => {
  const { formState, handleSubmit } = useForm();
  const { getValues, setValue } = useFormContext<ResumeData>();

  const { mutateAsync: handleGenerate } = useMutation({
    mutationFn: ApiService.fixContent,
  })

  const onSubmit = async () => {
    const content = getValues("content");

    const data = await handleGenerate(content);

    const generation = JSON.parse(data.data);
    
    const mergedContent = mergician(content, generation) as ResumeContentData;
    setValue("content", mergedContent);

    toast.success("Conteúdo gerado com sucesso!");

    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p>
        Esta funcionalidade aprimora o conteúdo atual do currículo e também corrige possíveis erros gramaticais.{" "}
        <strong>Lembre-se de preencher o conteúdo antes da geração.</strong>
      </p>

      <p>Isso pode levar alguns segundos, aguarde o resultado.</p>

      <Button
        className="w-max ml-auto"
        type="submit"
        disabled={formState.isSubmitting}
      >
        Gerar conteúdo
      </Button>
    </form>
  )
}