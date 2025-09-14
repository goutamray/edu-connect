// "use server";

// import { headers } from "next/headers";
// const CURRENCY = "inr";
// import { formatAmountForStripe } from "@/lib/stripe-helpers";
// import { stripe } from "@/lib/stripe";

// export async function createCheckoutSession(data) {
//   console.log(data);

//   const ui_mode = "hosted";
//   const origin = headers().get("origin");
//   const courseId = data.get("courseId");
//   const courseName = data.get("courseName");
//   const coursePrice = data.get("coursePrice");

//   const finalPrice = processPriceForStripe(coursePrice);

//   const checkoutSession = await stripe.checkout.sessions.create({
//     mode: "payment",
//     submit_type: "auto",
//     line_items: [
//       {
//         quantity: 1,
//         price_data: {
//           currency: CURRENCY,

//           product_data: {
//             name: courseName,
//           },

//           unit_amount: formatAmountForStripe(finalPrice, CURRENCY),
//         },
//       },
//     ],

//     ...(ui_mode === "hosted" && {
//       success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,

//       cancel_url: `${origin}/courses`,
//     }),

//     ui_mode,
//   });

//   return {
//     client_secret: checkoutSession.client_secret,

//     url: checkoutSession.url,
//   };
// }

// export async function createPaymentIntent(data) {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: formatAmountForStripe(finalPrice, CURRENCY),

//     automatic_payment_methods: { enabled: true },

//     currency: CURRENCY,
//   });

//   return { client_secret: paymentIntent.client_secret };
// }

"use server";

import { getCourseDetailsById } from "@/quires/courses";

import { headers } from "next/headers";
const CURRENCY = "inr";

import { stripe } from "@/lib/stripe";

function processPriceForStripe(price) {
  let numPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numPrice) || numPrice <= 0) {
    throw new Error("Invalid price");
  }

  const MIN_PRICE = 1; // ₹1 minimum now
  if (numPrice < MIN_PRICE) {
    numPrice = MIN_PRICE;
  }

  // Convert to paise for Stripe
  return Math.round(numPrice * 100);
}

export async function createCheckoutSession(data) {
  const ui_mode = "hosted";
  const origin = headers().get("origin");
  const courseId = data.get("courseId");

  const course = await getCourseDetailsById(courseId);
  const courseName = course?.title;
  const coursePrice = course?.price;

  if (!course) return new Error("Course Not Found");

  const finalPrice = processPriceForStripe(coursePrice);

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,

          product_data: {
            name: courseName,
          },

          unit_amount: finalPrice, // Pass processed price directly
        },
      },
    ],

    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,

      cancel_url: `${origin}/courses`,
    }),

    ui_mode,
  });

  return {
    client_secret: checkoutSession.client_secret,

    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(data) {
  const coursePrice = data.get("coursePrice");
  const finalPrice = processPriceForStripe(coursePrice);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalPrice,

    automatic_payment_methods: { enabled: true },

    currency: CURRENCY,
  });

  return { client_secret: paymentIntent.client_secret };
}
