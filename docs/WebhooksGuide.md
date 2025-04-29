
# Roundabout WebTraffic - Webhook Integration Guide

## Overview

Webhooks allow you to receive real-time notifications when specific events occur in Roundabout WebTraffic. By setting up webhook endpoints, you can build integrations that respond immediately to changes in your social media accounts, engagement metrics, and more.

## Getting Started with Webhooks

### What are Webhooks?

Webhooks are user-defined HTTP callbacks that are triggered by specific events. When an event occurs in Roundabout WebTraffic that you've subscribed to, our system sends an HTTP POST request to your configured URL with information about the event.

### Setting Up Webhook Endpoints

To receive webhook notifications:

1. Create an endpoint on your server to receive webhook payloads
2. Register this endpoint with Roundabout WebTraffic
3. Configure which events should trigger notifications

## Managing Webhooks

### Creating a Webhook

1. Navigate to the "Integrations" section in the sidebar
2. Select the "Webhooks" tab
3. Click "Add Webhook"
4. Fill in the required information:
   - Name: A descriptive name for this webhook
   - URL: The endpoint where notifications will be sent
   - Events: Select which events should trigger this webhook
   - Active: Toggle to enable or disable the webhook
5. Click "Create Webhook" to save

### Testing Webhooks

Each webhook can be tested before being fully deployed:

1. From the webhooks list, find the webhook you want to test
2. Click the "Test" button
3. Select an event type to send as a test
4. The system will send a test payload to your endpoint
5. Check your endpoint logs to verify receipt

### Managing Existing Webhooks

From the webhooks management page, you can:
- View all your registered webhooks
- Toggle webhooks on/off to enable/disable them
- Edit webhook configurations
- Delete webhooks you no longer need

## Webhook Events

### Available Event Types

Roundabout WebTraffic supports the following webhook events:

#### Platform Events
- `platform.connected`: Triggered when a new social platform is connected
- `platform.disconnected`: Triggered when a platform is disconnected
- `platform.updated`: Triggered when platform settings are updated

#### Content Events
- `post.created`: Triggered when new content is created
- `post.published`: Triggered when content is published
- `post.engagement`: Triggered when content receives significant engagement
- `post.milestone`: Triggered when content reaches an engagement milestone

#### Analytics Events
- `analytics.daily_summary`: Triggered when daily analytics are compiled
- `analytics.weekly_summary`: Triggered when weekly analytics are compiled
- `analytics.trend_detected`: Triggered when a significant trend is detected

#### Engagement Events
- `follower.gained`: Triggered when a new follower is gained
- `follower.lost`: Triggered when a follower is lost
- `engagement.received`: Triggered when engagement is received on your content
- `message.received`: Triggered when a direct message is received

#### System Events
- `report.generated`: Triggered when a report is generated
- `export.completed`: Triggered when a data export is completed
- `import.completed`: Triggered when a data import is finished

## Webhook Payloads

### Payload Structure

All webhook payloads follow a consistent structure:

```json
{
  "id": "evt_123abc456def",
  "event_type": "post.published",
  "created_at": "2023-05-15T14:22:30Z",
  "data": {
    // Event-specific data
  }
}
```

### Event-Specific Data

Different events include different data in their payloads. Here are examples for common events:

#### Platform Connected

```json
{
  "id": "evt_123abc456def",
  "event_type": "platform.connected",
  "created_at": "2023-05-15T14:22:30Z",
  "data": {
    "platform_id": "platform_123",
    "platform_type": "instagram",
    "username": "your_account"
  }
}
```

#### Post Published

```json
{
  "id": "evt_123abc456def",
  "event_type": "post.published",
  "created_at": "2023-05-15T14:22:30Z",
  "data": {
    "post_id": "post_123",
    "platform": "twitter",
    "content": "Check out our new product!",
    "url": "https://twitter.com/your_account/status/123456",
    "published_at": "2023-05-15T14:22:00Z"
  }
}
```

## Security Considerations

### Signature Verification

To ensure webhook payloads are genuinely from Roundabout WebTraffic, all webhooks include a signature header. You should verify this signature before processing the webhook data.

```javascript
// Example signature verification in Node.js
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const calculatedSignature = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(calculatedSignature)
  );
}

// Usage in an Express handler
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-roundabout-signature'];
  const isValid = verifyWebhookSignature(
    JSON.stringify(req.body),
    signature,
    process.env.WEBHOOK_SECRET
  );
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process the webhook...
  
  return res.status(200).send('Webhook received');
});
```

### Webhook Secrets

Each webhook configuration includes a secret key that's used to sign payloads. Keep this secret secure and don't expose it in client-side code.

### Retry Logic

If your endpoint returns a non-2xx response or times out, Roundabout WebTraffic will retry the webhook delivery:
- First retry: 5 minutes after initial attempt
- Second retry: 15 minutes after initial attempt
- Third retry: 30 minutes after initial attempt
- Fourth retry: 1 hour after initial attempt
- Fifth retry: 2 hours after initial attempt

After 5 failed attempts, the webhook will be marked as failed and won't be retried further.

## Best Practices

### Efficient Processing

1. **Respond quickly to webhooks**:
   - Return a 2xx response as soon as you've received the webhook
   - Process the webhook asynchronously after responding
   - This prevents timeouts and unnecessary retries

2. **Implement idempotency**:
   - Use the webhook ID to prevent duplicate processing
   - This ensures that even if a webhook is delivered multiple times, it's only processed once

3. **Handle high volumes**:
   - Be prepared to handle bursts of webhook events
   - Implement queuing if necessary to manage load

### Troubleshooting

If you're not receiving webhooks:

1. Check that your endpoint is publicly accessible
2. Verify that your server is correctly configured to accept POST requests
3. Check that your endpoint returns 2xx status codes
4. Examine your server logs for any errors
5. Test your webhook endpoint using the "Test" functionality in the dashboard
6. Ensure your webhook is set to "Active" in the dashboard

## Sample Implementations

### Node.js (Express)

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

// Your webhook secret from the Roundabout WebTraffic dashboard
const webhookSecret = process.env.WEBHOOK_SECRET;

app.post('/webhook', (req, res) => {
  // Verify the webhook signature
  const signature = req.headers['x-roundabout-signature'];
  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256', webhookSecret);
  const calculatedSignature = hmac.update(payload).digest('hex');
  
  const isValid = signature === calculatedSignature;
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process based on event type
  switch (req.body.event_type) {
    case 'post.published':
      console.log(`New post published on ${req.body.data.platform}`);
      // Process the post published event
      break;
    
    case 'follower.gained':
      console.log(`New follower gained on ${req.body.data.platform}`);
      // Process the new follower event
      break;
    
    default:
      console.log(`Received webhook: ${req.body.event_type}`);
  }
  
  // Return a success response
  res.status(200).send('Webhook received');
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

## API Reference

For complete details on webhook management via the API, see our [API Documentation](./APIDocumentation.md).

## Support

If you need assistance with webhook integration:

1. Check our [Knowledge Base](https://help.roundabout.webtraffic/webhooks) for common issues
2. Visit the [Developer Forum](https://developers.roundabout.webtraffic/forum) to connect with other developers
3. Contact our [Support Team](mailto:support@roundabout.webtraffic) for direct assistance
