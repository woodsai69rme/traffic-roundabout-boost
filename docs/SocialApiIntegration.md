
# Social API Integration Documentation

## Overview

The Roundabout WebTraffic platform provides robust integration with various social media platforms, allowing users to connect their accounts, retrieve metrics, and manage their social media presence from a single dashboard.

## Integration Architecture

The integration system follows a layered architecture:

1. **User Interface Layer**: Components for connecting platforms and displaying metrics
2. **Service Layer**: JavaScript/TypeScript services that handle API communication
3. **Data Storage Layer**: Supabase database tables that store connection credentials
4. **External API Layer**: Communication with external social media platform APIs

## Database Structure

The platform connections are stored in the `platform_connections` table with the following structure:

```sql
TABLE: platform_connections
COLUMNS:
- connected | boolean | Nullable: Yes | Default: false
- platform | character varying | Nullable: No | Default: None
- api_key | text | Nullable: Yes | Default: None
- api_secret | text | Nullable: Yes | Default: None
- access_token | text | Nullable: Yes | Default: None
- access_token_secret | text | Nullable: Yes | Default: None
- last_updated | timestamp with time zone | Nullable: Yes | Default: now()
- user_id | uuid | Nullable: No | Default: None
- id | uuid | Nullable: No | Default: gen_random_uuid()
```

Row-Level Security (RLS) policies ensure that users can only access their own platform connections.

## Available Platforms

The system currently supports the following platforms:

1. **YouTube**: Video content metrics and management
2. **Instagram**: Image and story content metrics
3. **Twitter/X**: Tweet engagement and audience metrics
4. **TikTok**: Short video performance metrics
5. **Facebook**: Page and post engagement metrics
6. **LinkedIn**: Professional content performance metrics
7. **Twitch**: Streaming metrics and viewer analytics
8. **Pinterest**: Pin and board performance metrics
9. **Snapchat**: Story and snap engagement metrics

## API Integration Services

The platform provides several services for managing social media integrations:

### `fetchApiConfigurations()`

Retrieves all platform connections for the authenticated user.

**Returns**: Array of SocialApiConfig objects

### `getPlatformConfig(platformId: string)`

Retrieves configuration for a specific platform.

**Parameters**:
- `platformId`: The platform identifier

**Returns**: SocialApiConfig object or null if not found

### `updateApiConfiguration(config: SocialApiConfig)`

Updates or creates a platform connection configuration.

**Parameters**:
- `config`: The platform configuration object

**Returns**: Boolean indicating success

### `disconnectPlatform(platformId: string)`

Disconnects a platform but keeps the configuration.

**Parameters**:
- `platformId`: The platform identifier

**Returns**: Boolean indicating success

### `deletePlatformConnection(platformId: string)`

Completely removes a platform connection.

**Parameters**:
- `platformId`: The platform identifier

**Returns**: Boolean indicating success

### `fetchPlatformMetrics(platform: string)`

Retrieves metrics for a specific platform.

**Parameters**:
- `platform`: The platform identifier

**Returns**: PlatformMetrics object

### `testPlatformConnection(config: SocialApiConfig)`

Tests if a platform connection is valid.

**Parameters**:
- `config`: The platform configuration to test

**Returns**: Boolean indicating if connection was successful

## Authentication Flow

The authentication flow for connecting social media platforms typically follows these steps:

1. User initiates connection from the Platforms page
2. User is redirected to the platform's OAuth authorization page
3. User grants permissions to Roundabout
4. Platform redirects back to Roundabout with an authorization code
5. Roundabout exchanges the code for access tokens
6. Tokens are stored securely in the database

For platforms that use API keys instead of OAuth, users can manually enter their credentials.

## Security Considerations

The platform implements several security measures to protect user credentials:

1. **Encryption**: All API keys and tokens are encrypted in the database
2. **Row-Level Security**: Users can only access their own platform connections
3. **Least Privilege**: Only the minimum required permissions are requested from each platform
4. **Secure Storage**: No credentials are stored in client-side storage or cookies

## Webhook Integration

The platform also supports webhook integration, allowing real-time updates from social media platforms. Webhooks are managed through the `webhooks` table and can be configured to trigger on various events.

## Future Enhancements

Planned enhancements to the social API integration system include:

1. **Automated Content Scheduling**: Schedule posts across multiple platforms
2. **Content Cross-Posting**: Post once and distribute to multiple platforms
3. **Advanced Analytics**: Deeper insights into content performance
4. **AI-Powered Recommendations**: Content and posting time recommendations
5. **Engagement Automation**: Automated responses and engagement

## Troubleshooting

Common issues when connecting platforms:

1. **Authentication Failures**: Check that API keys and secrets are correct
2. **Permission Issues**: Ensure that the correct permissions are being requested
3. **Rate Limiting**: Be aware of platform API rate limits
4. **Token Expiration**: Manage token refresh for platforms with expiring tokens

For additional support, contact the Roundabout technical team.
