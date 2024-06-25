const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../utils/catchAsync");

exports.getAllPlans = catchAsync(async (req, res) => {
  const plans = await stripe.products.list();
  const prices = await stripe.prices.list();

  res.status(200).json({
    status: "success",
    results: plans.data.length,
    // publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    data: plans.data.map((plan) => {
      const price = prices.data.find((price) => price.product === plan.id);
      return {
        id: plan.id,
        name: plan.name,
        priceId: price.id,
        price: price.unit_amount / 100,
        currency: price.currency,
        allowedJobPosts: plan.metadata.allowedJobPosts,
        allowedUnlocks: plan.metadata.allowedUnlocks,
        allowedInvitations: plan.metadata.allowedInvitations,
      };
    }),
  });
});

exports.getPlan = catchAsync(async (req, res) => {
  const plan = await stripe.products.retrieve(req.params.id);
  const prices = await stripe.prices.list();

  const price = prices.data.find((price) => price.product === plan.id);

  res.status(200).json({
    status: "success",
    data: {
      id: plan.id,
      name: plan.name,
      price: price.unit_amount / 100,
      priceId: price.id,
      currency: price.currency,
      allowedJobPosts: plan.metadata.allowedJobPosts,
      allowedUnlocks: plan.metadata.allowedUnlocks,
      allowedInvitations: plan.metadata.allowedInvitations,
    },
  });
});

exports.createPlan = catchAsync(async (req, res) => {
  const {
    name,
    price,
    interval,
    allowedJobPosts,
    allowedUnlocks,
    allowedInvitations,
  } = req.body;

  const plan = await stripe.products.create({
    name,
    metadata: { allowedJobPosts, allowedUnlocks, allowedInvitations },
  });
  const stripePrice = await stripe.prices.create({
    product: plan.id,
    currency: "usd",
    unit_amount: price * 100,
    recurring: { interval },
  });

  res.status(201).json({
    status: "success",
    data: {
      id: plan.id,
      name: plan.name,
      price: stripePrice.unit_amount / 100,
      priceId: stripePrice.id,
      currency: stripePrice.currency,
      allowedJobPosts: plan.metadata.allowedJobPosts,
      allowedUnlocks: plan.metadata.allowedUnlocks,
      allowedInvitations: plan.metadata.allowedInvitations,
    },
  });
});

exports.updatePlan = catchAsync(async (req, res) => {
  const {
    name,
    price,
    interval,
    allowedJobPosts,
    allowedUnlocks,
    allowedInvitations,
  } = req.body;

  const updatedPlan = await stripe.products.update(req.params.id, {
    name,
    metadata: { allowedJobPosts, allowedUnlocks, allowedInvitations },
  });

  const prices = await stripe.prices.list({ product: req.params.id });
  const currentPrice = prices.data[0];

  let updatedPrice = currentPrice;

  if (price && price !== currentPrice.unit_amount / 100) {
    updatedPrice = await stripe.prices.create({
      product: req.params.id,
      currency: currentPrice.currency,
      unit_amount: price * 100,
      recurring: { interval: interval || currentPrice.recurring.interval },
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      id: updatedPlan.id,
      name: updatedPlan.name,
      price: updatedPrice.unit_amount / 100,
      priceId: updatedPrice.id,
      currency: updatedPrice.currency,
      allowedJobPosts: updatedPlan.metadata.allowedJobPosts,
      allowedUnlocks: updatedPlan.metadata.allowedUnlocks,
      allowedInvitations: updatedPlan.metadata.allowedInvitations,
    },
  });
});

exports.deletePlan = catchAsync(async (req, res) => {
  const deleted = await stripe.products.del(req.params.id);

  res.status(204).json({
    status: "success",
    data: deleted,
  });
});
