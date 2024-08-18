import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { queryKeys } from "@/constants/query-keys";
import { ApiService } from "@/services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type BuyCreditsDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const BuyCreditsDialog = ({ open, setOpen }: BuyCreditsDialogProps) => {
  const pathname = usePathname();

  const { data } = useQuery({
    queryKey: queryKeys.packages,
    queryFn: ApiService.getPackages,
  });

  const packages = useMemo(() => {
    return (data ?? [])
      .map((item) => ({
        id: item.id,
        credits: Number(item.metadata.amount),
        price: (item.unit_amount ?? 0) / 100,
      }))
      .sort((a, b) => a.credits - b.credits);
  }, [data]);

  const { mutate: handleBuyCredits, isPending } = useMutation({
    mutationFn: (priceId: string) => ApiService.getCheckoutUrl(priceId, pathname),
    onSuccess: (url) => {
      location.href = url;
    }
  });

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title="Comprar créditos"
      description="Escolha um dos pacotes abaixo para comprar créditos e começar a gerar!"
      content={
        <div className="flex flex-col gap-4">
          {packages.map((item) => (
            <Button
              key={item.credits}
              variant="outline"
              className="flex flex-col h-max"
              onClick={() => handleBuyCredits(item.id)}
              disabled={isPending}
            >
              <strong className="font-title font-bold text-2xl">
                {item.credits} créditos
              </strong>
              <span className="text-muted-foreground">
                por apenas R$ {item.price}
              </span>
            </Button>
          ))}
        </div>
      }
    />
  );
};
