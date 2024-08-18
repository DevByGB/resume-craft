import { stripe } from "@/lib/stripe"

const creditProductId = process.env.STRIPE_CREDIT_PRODUCT_ID!;

export const GET = async () => {
  const prices = await stripe.prices.list({
    product: creditProductId,
  });

  return Response.json(prices.data ?? []);
}