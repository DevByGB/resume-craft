import { decrementUserCredits } from "@/db/actions";
import { getUserCredits } from "@/db/queries";
import { openai } from "@/lib/openai";
import { isValidJSON } from "@/lib/utils";
import { z } from "zod";

const schema = z.object({
  content: z.object({}).passthrough(),
});

export const POST = async (request: Request) => {
  try {
    const credits = await getUserCredits();

    if (credits <= 0) {
      return Response.json({ message: "Créditos insuficientes." }, { status: 403 });
    }

    const body = await request.json();

    const { content } = schema.parse(body);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
          Baseado no JSON abaixo, avalie todos os campos alterando o conteúdo de todos eles, aprimorando o texto para parecer mais claro e profissional, pois será usado em currículos.
          Também corrija erros gramaticais e de concordância, se necessário.
          Mantenha dados pessoais, links, emails, etc. como estão, apenas altere o texto dos campos.

          **Lembre-se de retornar um JSON válido e bem formatado.**

          **JSON:**

          ${JSON.stringify(content, null, 2)}
        `,
        },
      ],
    });

    const json = completion.choices[0].message.content ?? "";

    if (!isValidJSON(json)) throw new Error("JSON inválido.");

    await decrementUserCredits(1);

    return Response.json({ data: json });
  } catch (error) {
    return Response.json(
      { message: "Ocorreu um erro inesperado.", error },
      { status: 500 }
    );
  }
};
