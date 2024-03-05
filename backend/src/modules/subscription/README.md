# Subscription Module

## Initialization

To Initialize the Stripe, Kindly Download the Stripe CLI from [here]("https://stripe.com/docs/stripe-cli")

## Login into Stripe

Login into Stripe Account using cli by

```sh
stripe login
```

## Seeding Stripe

To Seed Stripe with Meta-data and Products, Price, you can use:

```sh
stripe fixtures seed.json
```

# Module Dependencies

To make sure that this module works correctly as expected.

## Create Stripe Customer and Subscription Model At Login

Below is the code example for this

```javascript
const customer = await this.stripeClient.customers.create({
    email: signupDto.email,
    description: 'Registered Writingo Client',
    name: `${signupDto.firstName} ${signupDto.lastName}`,
});

await this.subscriptionService.createModel({
    userID: createUser._id,
    customer_id: customer.id,
});
```

## Make Sure Stripe/webhook Route is Accessible

### Step 1

Make sure that these lines are not included in the main.ts file.

```javascript
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: true, limit: '50mb' }));
```

**Remove above lines if they are present**

Then, configure NestModuleFactory using below

```javascript
const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    bodyParser: false,
});
```

Here BodyParser is important.

### Step 2

Configure you App Module to use Middleware by using below code:

```javascript
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        applyRawBodyOnlyTo(consumer, {
            method: RequestMethod.ALL,
            path: 'subscription/stripe/webhook',
        });
    }
}
```

## Make Sure Stripe Module is Initiatlized Globally

The Stripe Module is initialized globbally because it will be used in Auth Module as well, If you can make it as module imports, it will work as well

```javascript
import { StripeModule } from 'nestjs-stripe';
```

and Import above StripeModule in Any other Module

# Conclusion

If Above Steps are performed, then Stripe Webhooks would work perfectly.
