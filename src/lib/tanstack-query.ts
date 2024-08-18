import { MutationCache, QueryClient } from "@tanstack/react-query"
import axios from "axios";
import { useState } from "react"
import { toast } from "sonner";

const handleErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    if (error instanceof Error) {
      return error.message;
    }
    return "Ocorreu um erro inesperado.";
  }

  return error?.response?.data?.message || "Ocorreu um erro inesperado.";
}

export const useTanstackQuery = () => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        }
      },
      mutationCache: new MutationCache({
        onError: (error, _variables, _context, mutation) => {
          if (mutation.options.onError) return;

          const errorMessage = handleErrorMessage(error);
          toast.error(errorMessage);
        }
      })
    })
  );

  return queryClient;
}