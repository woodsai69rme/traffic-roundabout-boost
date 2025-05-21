
# Troubleshooting Guide

This guide addresses common issues you might encounter while using Roundabout and provides step-by-step solutions to resolve them.

## Table of Contents
- [Account Access Issues](#account-access-issues)
- [Platform Connection Problems](#platform-connection-problems)
- [Content Publishing Errors](#content-publishing-errors)
- [Media Upload Issues](#media-upload-issues)
- [Analytics Discrepancies](#analytics-discrepancies)
- [Performance Problems](#performance-problems)
- [Team Collaboration Challenges](#team-collaboration-challenges)
- [Billing and Subscription Issues](#billing-and-subscription-issues)
- [Mobile Experience Issues](#mobile-experience-issues)
- [API and Integration Errors](#api-and-integration-errors)

## Account Access Issues

### Unable to Log In

**Symptoms:**
- Receiving "Invalid credentials" error despite correct email/password
- Login page refreshes without error message
- Account appears to be locked

**Solutions:**

1. **Reset Your Password**
   - Click "Forgot Password" on the login screen
   - Check both your inbox and spam folder for the reset email
   - Create a new, secure password

2. **Clear Browser Cache and Cookies**
   - Open your browser settings
   - Find the option to clear browsing data
   - Select cookies and cache to clear
   - Try logging in again in a fresh browser session

3. **Try a Different Browser**
   - Some browser extensions or settings can interfere with login
   - Use an alternate browser (Chrome, Firefox, Safari, Edge)
   - Try private/incognito mode

4. **Check Account Status**
   - Your account might be suspended due to billing issues
   - Check for any account notification emails
   - Contact support if you believe your account is active

5. **Check for Maintenance**
   - Visit [status.roundabout.app](https://status.roundabout.app) to check if there's scheduled maintenance

### Two-Factor Authentication Issues

**Symptoms:**
- Not receiving 2FA codes via email or SMS
- Authentication app not generating correct codes
- Backup codes not working

**Solutions:**

1. **Email/SMS Code Issues**
   - Check spam/junk folders for email codes
   - Verify your phone number in account settings
   - Request a new code after waiting 1 minute

2. **Authentication App Problems**
   - Ensure your device's time is synchronized correctly
   - Re-scan the QR code in your account settings
   - Use backup codes if available

3. **Lost Access to 2FA Method**
   - Use your backup codes (if you saved them)
   - Contact support with proof of identity:
     - Account email access
     - Photo ID matching account name
     - Recent invoice or payment details

## Platform Connection Problems

### Failed Platform Connection

**Symptoms:**
- Error message during OAuth authorization
- Platform shows as "Disconnected" despite connection attempt
- "Permission denied" errors

**Solutions:**

1. **Check Platform Status**
   - Visit the status page of the social media platform to check for API issues
   - Some platforms have temporary API outages that affect all third-party tools

2. **Verify Permissions**
   - Ensure you have Admin or appropriate permission level on the account you're trying to connect
   - Business accounts often require specific roles to allow third-party connections

3. **Reconnection Process**
   - Disconnect the platform completely
   - Clear your browser cache and cookies
   - Try connecting again, ensuring you approve all required permissions

4. **Platform-Specific Solutions**
   - **Facebook**: Ensure your account has Business Manager access
   - **Twitter**: Check for any restrictions on your account
   - **Instagram**: Connect through a Facebook Business Page
   - **LinkedIn**: Ensure you're using a Company Page admin account

5. **Check Rate Limits**
   - Some platforms limit how many third-party connections you can establish
   - If you've recently connected/disconnected multiple times, wait 24 hours

### Suddenly Disconnected Platforms

**Symptoms:**
- Platform that was working shows as "Disconnected"
- Content fails to publish to previously connected accounts
- Analytics stop updating

**Solutions:**

1. **Password Changes**
   - If you recently changed your password on the platform, you'll need to reconnect
   - Go to Platforms page and click "Reconnect" for the affected account

2. **Permission Changes**
   - Check if permissions have changed on the platform
   - Verify that your account still has the necessary access level

3. **Token Expiration**
   - Some platforms require periodic re-authentication
   - Click "Reconnect" and follow the authorization process again

4. **Account Changes**
   - If the account ownership or structure changed (e.g., page transferred to Business Manager)
   - Disconnect and reconnect the account to establish a new connection

## Content Publishing Errors

### Scheduled Posts Not Publishing

**Symptoms:**
- Content shows as "Failed" in the calendar
- Post appears as scheduled but never publishes
- Error messages in the post details

**Solutions:**

1. **Check Platform Connection**
   - Verify the platform is still connected properly
   - Look for warning icons on the Platforms page
   - Reconnect any platforms showing authentication issues

2. **Review Platform-Specific Restrictions**
   - Check if content violates platform guidelines
   - Verify media dimensions and file sizes
   - Check if the post contains blocked links
   - Review text length limits

3. **Time Zone Issues**
   - Check your account time zone settings
   - Verify if scheduled time aligns with platform availability
   - Some platforms have restrictions on API posting during certain hours

4. **API Limitations**
   - Check if you've reached API rate limits for the day
   - Some platforms limit the number of posts via API
   - Try scheduling for a later time

5. **Review Error Messages**
   - Check the specific error message in the post details
   - Common codes:
     - 400: Bad request (content issues)
     - 401: Authentication error
     - 403: Permissions issue
     - 429: Rate limit exceeded

### Formatting Issues in Published Content

**Symptoms:**
- Posts publish without line breaks
- Hashtags or mentions not working properly
- Media appears cropped or distorted

**Solutions:**

1. **Platform-Specific Formatting**
   - Each platform handles formatting differently
   - Check platform preview before scheduling
   - Make platform-specific versions of your content

2. **Line Break Issues**
   - Some platforms (especially Instagram) handle line breaks differently
   - Use the platform-specific preview to check formatting
   - Add extra line breaks if necessary

3. **Hashtag and Mention Problems**
   - Verify correct syntax (# for hashtags, @ for mentions)
   - Check that mentioned accounts exist on that specific platform
   - Some platforms have hashtag limitations (quantity, banned tags)

4. **Media Appearance**
   - Use the platform's recommended dimensions
   - Check the platform preview to see how images will be cropped
   - For videos, ensure they meet platform requirements (length, format, size)

## Media Upload Issues

### Failed Media Uploads

**Symptoms:**
- Media upload spinner runs indefinitely
- Error message during upload process
- Media appears to upload but is missing in posts

**Solutions:**

1. **Check File Size and Format**
   - Verify your file is under the platform's size limits:
     - Images: Usually under 20MB
     - Videos: Usually under 1GB (varies by platform)
   - Ensure you're using supported formats:
     - Images: JPG, PNG, GIF
     - Videos: MP4, MOV (H.264 codec)

2. **Image Resolution Issues**
   - Very large images might fail to upload
   - Resize images to recommended dimensions:
     - Facebook: 1200 x 630 pixels
     - Instagram: 1080 x 1080 pixels (square)
     - Twitter: 1200 x 675 pixels
     - LinkedIn: 1200 x 627 pixels

3. **Network Issues**
   - Check your internet connection stability
   - Large files require stable connections
   - Try switching to a wired connection if possible

4. **Browser Issues**
   - Try a different browser
   - Clear cache and cookies
   - Disable browser extensions that might interfere

5. **File Name Problems**
   - Rename files to remove special characters
   - Keep filenames short
   - Avoid spaces and use underscores instead

### Video Processing Problems

**Symptoms:**
- Video uploads but processing takes very long
- Video appears distorted or with poor quality
- Video plays in preview but not in published post

**Solutions:**

1. **Video Format Optimization**
   - Convert videos to recommended formats:
     - MP4 with H.264 codec
     - AAC audio codec
     - 16:9 aspect ratio (square for Instagram)

2. **Resolution and Bitrate**
   - 1080p is usually sufficient (higher isn't always better)
   - Keep bitrate between 3-5 Mbps for optimal quality/size balance
   - Use video compression tools if file size is too large

3. **Length Restrictions**
   - Check platform's maximum video length:
     - Instagram feed: 60 seconds
     - Twitter: 2 minutes 20 seconds
     - Facebook: 240 minutes
     - LinkedIn: 10 minutes

4. **Processing Time**
   - Large videos take longer to process
   - Schedule posts with video well in advance
   - Video preview generation can take several minutes

## Analytics Discrepancies

### Missing or Incomplete Analytics

**Symptoms:**
- Analytics dashboard shows "No data available"
- Metrics are missing for specific platforms
- Data stops updating at a certain point

**Solutions:**

1. **Check Data Update Schedule**
   - Analytics are typically updated every 24 hours
   - Recent data (last 24 hours) may be incomplete
   - Check the "Last updated" timestamp on the dashboard

2. **Platform Connection Issues**
   - Verify all platforms are properly connected
   - Some metrics require specific permissions
   - Reconnect platforms showing analytics errors

3. **API Limitations**
   - Some platforms limit how much historical data is available
   - Certain metrics may have limited data retention periods
   - Check platform-specific documentation for limitations

4. **Date Range Selection**
   - Ensure your selected date range contains data
   - Very recent dates might not have processed data yet
   - Historical data beyond retention period won't be available

5. **Account Changes**
   - If account ownership or access changed, reconnect the platform
   - Business account conversions may reset some analytics connections

### Differences Between Roundabout and Native Analytics

**Symptoms:**
- Engagement numbers don't match native platform reports
- Follower counts are different
- Reach/impression metrics are inconsistent

**Solutions:**

1. **Timing Differences**
   - Check when both systems last updated
   - Platform native analytics might update more frequently
   - Allow 24-48 hours for metrics to align

2. **Metric Definitions**
   - Platforms sometimes define metrics differently
   - Example: "Reach" might include different user categories
   - Check metric definitions in our documentation

3. **Data Processing Methods**
   - Some platforms provide sampled data via API
   - Native analytics might use different calculation methods
   - Cross-platform aggregation may use normalization formulas

4. **Excluded Data Types**
   - API restrictions might prevent certain data from being included
   - Stories/ephemeral content often has limited API data
   - Check if platform has changed its API recently

5. **Refresh Analytics Data**
   - Force a manual update from the Analytics settings page
   - Reconnect the platform if discrepancies persist
   - Contact support if significant discrepancies continue

## Performance Problems

### Dashboard Loading Slowly

**Symptoms:**
- Excessive loading times for analytics pages
- Calendar view takes long to initialize
- Interface feels sluggish or unresponsive

**Solutions:**

1. **Check Internet Connection**
   - Run a speed test to verify your connection
   - Minimum recommended speed: 10 Mbps
   - Connect via ethernet for more stability

2. **Browser Optimization**
   - Clear cache and cookies
   - Close unused tabs and extensions
   - Update your browser to the latest version
   - Try an alternate browser (Chrome or Firefox recommended)

3. **Reduce Data Range**
   - Select smaller date ranges for analytics
   - Filter content to specific platforms
   - Use more specific dashboard filters

4. **Hardware Considerations**
   - Ensure your computer meets minimum requirements
   - Close resource-intensive applications
   - Check if your device needs a restart

5. **Account Size Impact**
   - Accounts with large amounts of data may experience slower loading
   - Consider upgrading to Business/Enterprise plans for better performance
   - Archive old content to improve calendar performance

### Schedule Calendar Visualization Issues

**Symptoms:**
- Calendar doesn't display all scheduled content
- Visual glitches when dragging posts
- Calendar fails to update after changes

**Solutions:**

1. **View Optimization**
   - Switch to week or day view instead of month view
   - Filter by specific platforms to reduce displayed items
   - Use list view for accounts with many scheduled posts

2. **Refresh Calendar Data**
   - Use the refresh button to reload calendar data
   - Try switching between views to force a refresh
   - Log out and back in if persistent issues occur

3. **Browser-Specific Fixes**
   - Try a different browser
   - Disable hardware acceleration in browser settings
   - Update graphics drivers if using desktop application

4. **Clear Application Cache**
   - Go to Settings > Advanced > Clear Cache
   - Reload the application after clearing cache
   - Note: This won't affect your data but will reset some preferences

## Team Collaboration Challenges

### Permission and Access Issues

**Symptoms:**
- Team members can't access certain features
- Content approval workflows not working properly
- Users unable to publish despite having correct roles

**Solutions:**

1. **Verify User Roles**
   - Check assigned roles in Team Management
   - Ensure roles match needed permissions
   - Remember that only Admins and Managers can approve content

2. **Check Specific Permissions**
   - Some features require explicit permissions beyond role
   - Review platform-specific permissions
   - Check custom permission settings if applied

3. **Account Limitations**
   - Verify your plan supports the number of team members
   - Check for any suspended user accounts
   - Ensure team member hasn't exceeded usage limits

4. **Update Invitations**
   - Resend invitations if team members haven't accepted
   - Check if invitation emails went to spam folders
   - Verify correct email addresses for invitations

5. **Role Conflicts**
   - Remove and re-add users with persistent permission issues
   - Don't assign multiple roles to the same user
   - Check for conflicts between team and client access

### Approval Workflow Problems

**Symptoms:**
- Approvers not receiving notifications
- Content stuck in "Pending" status
- Approved content not publishing on schedule

**Solutions:**

1. **Notification Settings**
   - Check that approvers have notifications enabled
   - Verify email addresses for notification delivery
   - Enable in-app notifications in user preferences

2. **Workflow Configuration**
   - Review approval workflow settings
   - Ensure correct users are assigned as approvers
   - Check if multi-level approval is configured correctly

3. **Status Transition Issues**
   - Manually refresh content status page
   - Check if content requires additional approval steps
   - Verify content hasn't been rejected or sent back

4. **Browser Notifications**
   - Enable browser notifications for more immediate alerts
   - Check browser notification permissions
   - Try desktop notifications if available

## Billing and Subscription Issues

### Payment Failures

**Symptoms:**
- Receiving payment failure emails
- Account showing payment warnings
- Features suddenly unavailable due to billing issues

**Solutions:**

1. **Check Payment Method**
   - Verify your card hasn't expired
   - Ensure sufficient funds are available
   - Check if your bank is blocking the transaction

2. **Update Billing Information**
   - Go to Settings > Billing
   - Update payment details if needed
   - Add a backup payment method if available

3. **Address Verification**
   - Ensure billing address matches card information
   - Check for typos in address or postal code
   - Verify the country selection matches your card's origin

4. **Contact Your Bank**
   - Some banks block recurring subscription payments
   - Ask your bank to whitelist Roundabout charges
   - Check for fraud protection blocks

5. **Alternative Payment Methods**
   - Try an alternative payment method (different card, PayPal)
   - Consider annual billing for fewer transaction issues
   - Contact support for wire transfer options (Enterprise)

### Subscription Changes Not Applied

**Symptoms:**
- Upgraded but new features not available
- Downgraded but still being charged at higher rate
- Changes to team seats not reflected

**Solutions:**

1. **Check Effective Date**
   - Subscription changes often apply at next billing cycle
   - Check your subscription details for the effective date
   - Immediate upgrades should apply instantly

2. **Verify Transaction Completion**
   - Check for confirmation email
   - Verify the charge appears on your payment method
   - Review receipt in billing history

3. **Cache and Session Issues**
   - Log out and log back in
   - Clear browser cache and cookies
   - Try accessing from a private/incognito window

4. **Billing Cycle Alignment**
   - Mid-cycle changes may cause prorated charges
   - Check if you're in a transition period
   - Review next invoice date in billing settings

5. **Contact Billing Support**
   - For unresolved issues, contact billing support
   - Provide transaction references and receipt numbers
   - Screenshots of billing portal may be helpful

## Mobile Experience Issues

### Responsive Display Problems

**Symptoms:**
- Interface elements overlapping on mobile
- Buttons or controls not appearing correctly
- Text or images appearing cut off

**Solutions:**

1. **Try Different Orientation**
   - Switch between portrait and landscape
   - Some views are optimized for specific orientations

2. **Browser Updates**
   - Ensure your mobile browser is updated
   - Try an alternate browser (Chrome, Safari, Firefox)

3. **Clear Mobile Cache**
   - Clear browser cache and cookies
   - Try private/incognito browsing mode

4. **Check Device Compatibility**
   - Ensure your device meets minimum requirements:
     - iOS 13 or later
     - Android 8.0 or later
     - Updated WebView components

5. **Use Desktop Mode as Fallback**
   - For critical tasks, request desktop site
   - Note that this isn't optimized for mobile

### Mobile App Issues

**Symptoms:**
- App crashes or freezes
- Features missing compared to web version
- Sync problems between app and web dashboard

**Solutions:**

1. **Update the App**
   - Ensure you have the latest version from app store
   - Enable auto-updates for future releases

2. **Reinstall Application**
   - Uninstall and reinstall for clean installation
   - Ensure sufficient device storage is available

3. **Device-Specific Optimizations**
   - Enable background data for the app
   - Check battery optimization settings
   - Grant necessary permissions (photos, notifications)

4. **Offline Mode Issues**
   - Connect to stable Wi-Fi for syncing
   - Manually trigger sync from settings menu
   - Check offline mode limitations documentation

5. **Clear App Data**
   - Go to device settings > Apps > Roundabout
   - Clear cache and data (note: you'll need to login again)
   - Restart the device after clearing

## API and Integration Errors

### Webhook Delivery Failures

**Symptoms:**
- Webhook events not being received
- Error messages in webhook logs
- Integration actions not triggering

**Solutions:**

1. **Verify Endpoint Accessibility**
   - Ensure your webhook URL is publicly accessible
   - Check server logs for incoming requests
   - Verify firewall settings allow Roundabout IPs

2. **Authentication Issues**
   - Check webhook authentication credentials
   - Regenerate webhook secrets if necessary
   - Verify signatures are being validated correctly

3. **Response Requirements**
   - Ensure endpoint returns 200 OK response
   - Response must be sent within 5 seconds
   - Check for proper response headers

4. **Event Configuration**
   - Verify you've subscribed to the correct events
   - Check event filtering settings
   - Review event payload format expectations

5. **Retry and Logging**
   - Enable webhook retries in settings
   - Check delivery logs in webhook dashboard
   - Set up logging on your receiving endpoint

### API Integration Problems

**Symptoms:**
- API requests returning errors
- Authentication failures with API keys
- Rate limiting messages

**Solutions:**

1. **API Key Validation**
   - Verify API key is active in settings
   - Regenerate API key if you suspect compromise
   - Check IP restriction settings if enabled

2. **Rate Limiting**
   - Review your plan's API request limits
   - Implement request throttling in your integration
   - Consider upgrading for higher limits

3. **Request Formatting**
   - Validate request body format matches documentation
   - Check content-type headers
   - Ensure proper encoding of special characters

4. **Authentication Method**
   - Verify you're using the correct auth method
   - Check token expiration and refresh processes
   - Review API version compatibility

5. **Common Error Codes**
   - 401: Authentication issue (check credentials)
   - 403: Permission denied (check scopes)
   - 429: Rate limit exceeded (implement backoff)
   - 500: Server error (contact support)

## Getting Additional Help

If you've tried the relevant troubleshooting steps and still experience issues:

1. **Contact Support**
   - Email: support@roundabout.app
   - Live chat: Available in dashboard (Business/Enterprise)
   - Phone: +1 (800) 555-0100 (Enterprise plan only)

2. **Provide Helpful Information**
   - Your account email address
   - Specific error messages or screenshots
   - Steps you've already taken to troubleshoot
   - Browser and device information
   - Approximate time when the issue occurred

3. **Check System Status**
   - Visit [status.roundabout.app](https://status.roundabout.app)
   - Subscribe to status updates
   - Check for known issues or maintenance

4. **Community Resources**
   - Search the community forum for similar issues
   - Post questions for community assistance
   - Check knowledge base for updated articles

Our support team is available Monday through Friday, 9am-8pm Eastern Time, with limited weekend coverage for urgent Enterprise issues.
