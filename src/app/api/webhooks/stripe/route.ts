import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const POST = async (request: Request) => {
  try {
    const sig = request.headers.get("Stripe-Signature");

    if (!sig) {
      return Response.json({ error: "No signature" }, { status: 400 });
    }

    let event;

    const rawBody = await request.text();

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (error) {
      return Response.json(
        { error: `Webhook Error: ${error}` },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;

        const customerEmail = session?.customer_details?.email as string;

        if (!customerEmail)
          return Response.json({ error: "No customer email" }, { status: 400 });

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          { expand: ["data.price.product"] }
        );

        const product = lineItems.data[0];
        const creditsAmount = Number(product.price?.metadata.amount);

        if (!creditsAmount)
          return Response.json(
            { error: "Invalid credits amount" },
            { status: 400 }
          );

        const user = await db.query.users.findFirst({
          where: eq(users.email, customerEmail),
        });

        if (!user)
          return Response.json({ error: "User not found" }, { status: 404 });

        await db
          .update(users)
          .set({ credits: user.credits + creditsAmount })
          .where(eq(users.email, customerEmail));
        break;
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
};
