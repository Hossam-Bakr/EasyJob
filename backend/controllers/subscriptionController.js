const Company = require("../models/companyModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

exports.getSubscription = catchAsync(async (req, res) => {
  if (!req.company.stripeSubscriptionId) {
    return next(new ApiError("You need to create a subscription first", 400));
  }

  const subscription = await stripe.subscriptions.retrieve(
    req.company.stripeSubscriptionId
  );

  const product = await stripe.products.retrieve(
    subscription.items.data[0].price.product
  );

  res.status(200).json({
    status: "success",
    data: {
      id: subscription.id,
      status: subscription.status,
      collectionMethod: subscription.collection_method,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      plan: {
        name: product.name,

        allowedJobPosts: product.metadata.allowedJobPosts,
        allowedUnlocks: product.metadata.allowedUnlocks,
        allowedInvitations: product.metadata.allowedInvitations,
      },
      endedAt: subscription.ended_at
        ? new Date(subscription.ended_at * 1000)
        : null,
      trialStart: subscription.trial_start
        ? new Date(subscription.trial_start * 1000)
        : null,
      trialEnd: subscription.trial_end
        ? new Date(subscription.trial_end * 1000)
        : null,
      cancelAt: subscription.cancel_at
        ? new Date(subscription.cancel_at * 1000)
        : null,
      canceledAt: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000)
        : null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      cancellationDetails: subscription.cancellation_details,
    },
  });
});

exports.createSubscription = catchAsync(async (req, res) => {
  const successUrl = req.body.successUrl;
  const cancelUrl = req.body.cancelUrl;
  let customerId = req.company.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      name: req.company.name,
      email: req.company.email,
    });

    customerId = customer.id;
    await req.company.update({ stripeCustomerId: customerId });
  }

  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer: customerId,
    line_items: [
      {
        price: req.body.priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
  });

  res.status(200).json({
    status: "success",
    data: {
      id: session.id,
      sessionUrl: session.url,
      expiresAt: new Date(session.expires_at * 1000),
      amountTotal: session.amount_total / 100,
      currency: session.currency,
      paymentStatus: session.payment_status,
    },
  });
});

exports.updateSubscription = catchAsync(async (req, res) => {
  if (!req.company.stripeCustomerId || !req.company.stripeSubscriptionId) {
    return next(new ApiError("You need to create a subscription first", 400));
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: req.company.stripeCustomerId,
    return_url: req.body.returnUrl,
  });

  res.status(200).json({
    status: "success",
    data: session,
  });
});

exports.webhookCheckout = catchAsync(async (req, res) => {
  let event = req.body;

  // console.log("🎉🎈 Webhook received 🎉🎈");

  const signature = req.headers["stripe-signature"];
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.sendStatus(400);
  }

  let subscription;
  let company;

  switch (event.type) {
    case "customer.subscription.created":
      // console.log("customer.subscription.created event 🎉🎈");
      subscription = event.data.object;
      company = await Company.findOne({
        where: { stripeCustomerId: subscription.customer },
      });

      company.stripeSubscriptionId = subscription.id;
      await company.save();

      break;

    case "customer.subscription.updated":
      console.log("customer.subscription.updated event 🎉🎈");
      break;

    case "customer.subscription.deleted":
      // console.log("customer.subscription.deleted event 🎉🎈");
      subscription = event.data.object;
      company = await Company.findOne({
        where: { stripeCustomerId: subscription.customer },
      });

      company.stripeSubscriptionId = null;
      await company.save();

      break;

    case "customer.subscription.trial_will_end":
      console.log("customer.subscription.trial_will_end event 🎉🎈");
      break;

    case "payment_method.attached":
      console.log("payment_method.attached event 🎉🎈");
      break;

    default:
      console.log(`Unhandled event type ${event.type}. 🎉🎈`);
  }

  res.status(200).send("Webhook received");
});

// Subscription checks

exports.checkAllowedJobPosts = catchAsync(async (req, res, next) => {
  if (!req.company.stripeSubscriptionId) {
    return next(new ApiError("You need to create a subscription first", 400));
  }

  const subscription = await stripe.subscriptions.retrieve(
    req.company.stripeSubscriptionId
  );

  const product = await stripe.products.retrieve(
    subscription.items.data[0].price.product
  );

  console.log("Job posts used: ", req.company.jobPostsUsed);
  console.log("Allowed job posts: ", product.metadata.allowedJobPosts);

  if (product.metadata.allowedJobPosts <= req.company.jobPostsUsed) {
    return next(new ApiError("You have reached the limit of job posts", 400));
  }

  next();
});
