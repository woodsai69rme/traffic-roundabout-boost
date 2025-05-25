
# Troubleshooting Guide

## Overview

This troubleshooting guide provides solutions to common issues users may encounter while using Roundabout. The guide is organized by feature area and includes step-by-step solutions for typical problems.

## General Issues

### Login and Authentication Problems

#### Cannot Log In to Account

**Symptoms:**
- Login page shows error message
- Account appears locked or suspended
- Two-factor authentication not working

**Solutions:**

1. **Verify Credentials**
   - Ensure email address is spelled correctly
   - Check that Caps Lock is not enabled
   - Try typing password in a text editor first to verify accuracy

2. **Reset Password**
   - Click "Forgot Password" on the login page
   - Check email inbox and spam folder for reset link
   - Follow the reset link and create a new password
   - Ensure new password meets requirements (8+ characters, mix of letters, numbers, symbols)

3. **Clear Browser Cache**
   - Clear browser cache and cookies
   - Disable browser extensions temporarily
   - Try logging in using an incognito/private browser window

4. **Check Account Status**
   - Verify account hasn't been suspended
   - Contact support if you believe account was incorrectly suspended
   - Check if email address is verified (check for verification email)

#### Two-Factor Authentication Issues

**Symptoms:**
- 2FA codes not working
- Lost access to authentication device
- Authentication app not generating codes

**Solutions:**

1. **Code Timing Issues**
   - Ensure device clock is synchronized
   - Wait for next code if current one was just generated
   - Try the previous code if current one doesn't work

2. **Lost Authentication Device**
   - Use backup codes provided during 2FA setup
   - Contact support with account verification information
   - Disable 2FA temporarily from account settings (if accessible)

3. **Authentication App Problems**
   - Re-sync the authentication app
   - Remove and re-add the account in the app
   - Try using backup authentication method

### Page Loading and Performance Issues

#### Slow Loading Times

**Symptoms:**
- Pages take more than 5 seconds to load
- Content appears to be stuck loading
- Intermittent timeouts

**Solutions:**

1. **Check Internet Connection**
   - Test connection speed using speed test tool
   - Try accessing other websites to confirm connectivity
   - Restart router/modem if connection is slow

2. **Browser Optimization**
   - Close unnecessary browser tabs
   - Disable resource-heavy browser extensions
   - Clear browser cache and temporary files
   - Update browser to latest version

3. **Device Performance**
   - Close other applications using significant memory
   - Restart the device if it's been running for extended periods
   - Check available disk space (ensure at least 10% free)

#### White Screen or Blank Page

**Symptoms:**
- Page loads but shows only white/blank screen
- No content visible after login
- Console shows JavaScript errors

**Solutions:**

1. **JavaScript and Browser Issues**
   - Enable JavaScript in browser settings
   - Disable ad blockers temporarily
   - Try different browser (Chrome, Firefox, Safari, Edge)
   - Clear browser cache completely

2. **Extension Conflicts**
   - Disable all browser extensions
   - Re-enable extensions one by one to identify conflicts
   - Use incognito/private mode to test without extensions

3. **Network and Firewall Issues**
   - Check if corporate firewall is blocking content
   - Try using mobile data instead of WiFi
   - Disable VPN temporarily to test connection

## Platform Connection Issues

### Social Media Platform Authentication

#### Failed to Connect Platform

**Symptoms:**
- Error message during platform connection process
- Redirect fails after authorizing on social platform
- Platform shows as "disconnected" after successful authorization

**Solutions:**

1. **Authorization Process**
   - Ensure you're logged into the correct social media account
   - Check that you have admin permissions for business accounts
   - Clear cookies for the social media platform
   - Disable browser extensions during connection process

2. **Permission Issues**
   - Verify you're granting all requested permissions
   - Check if account has restrictions on third-party app access
   - For business accounts, ensure you have appropriate roles
   - Review platform's third-party app settings

3. **Technical Issues**
   - Try connecting from different browser
   - Disable popup blockers temporarily
   - Check if corporate firewall blocks OAuth redirects
   - Wait 15 minutes and try again (rate limiting)

#### Platform Connection Keeps Disconnecting

**Symptoms:**
- Platform shows connected but fails when posting
- Frequent "reconnect platform" notifications
- Posts fail with authentication errors

**Solutions:**

1. **Token Refresh Issues**
   - Manually reconnect the platform
   - Check platform's app permissions settings
   - Revoke and re-grant app permissions
   - Update account password if recently changed

2. **Platform Changes**
   - Check if platform updated their API or policies
   - Review Roundabout's status page for known issues
   - Verify account hasn't been restricted by platform
   - Check for platform-specific maintenance windows

### API Rate Limits and Restrictions

#### Hit Rate Limit Error

**Symptoms:**
- "Rate limit exceeded" error messages
- Delayed posting or failed scheduled posts
- Analytics data not updating

**Solutions:**

1. **Immediate Actions**
   - Wait for rate limit window to reset (usually 15 minutes to 1 hour)
   - Reduce frequency of manual actions (posting, checking analytics)
   - Spread out bulk operations over longer time periods

2. **Long-term Solutions**
   - Review posting schedule to ensure sustainable frequency
   - Upgrade subscription plan if higher limits are needed
   - Stagger analytics refreshes across different times
   - Use scheduling instead of manual posting

## Content Creation and Scheduling

### Post Creation Issues

#### Content Not Saving as Draft

**Symptoms:**
- Draft disappears when navigating away
- Changes to content not being saved
- "Save failed" error messages

**Solutions:**

1. **Browser and Connectivity**
   - Check internet connection stability
   - Disable browser extensions that might interfere
   - Try copying content to clipboard before saving
   - Use a different browser to test

2. **Content Issues**
   - Check if content exceeds platform character limits
   - Ensure media files are in supported formats
   - Verify all required fields are completed
   - Remove special characters that might cause issues

#### Media Upload Failures

**Symptoms:**
- Images or videos fail to upload
- "File too large" or "Format not supported" errors
- Upload progress sticks at certain percentage

**Solutions:**

1. **File Requirements**
   - Check file size limits (varies by platform and subscription)
   - Verify file format is supported (JPEG, PNG, MP4, etc.)
   - Compress large files using image/video editing software
   - Ensure filename doesn't contain special characters

2. **Technical Issues**
   - Try uploading smaller files first to test
   - Clear browser cache and cookies
   - Disable antivirus software temporarily
   - Use different network connection if available

### Scheduling Problems

#### Posts Not Publishing at Scheduled Time

**Symptoms:**
- Scheduled posts remain in "scheduled" status
- Posts publish at wrong time
- Missing posts from scheduled queue

**Solutions:**

1. **Time Zone Issues**
   - Verify timezone setting in account preferences
   - Check if daylight saving time affects scheduling
   - Confirm scheduled time is in the future
   - Review platform's local time vs. account timezone

2. **Platform Issues**
   - Check if connected platform has restrictions
   - Verify platform account is still active
   - Reconnect platform if authentication expired
   - Check platform's publishing policies for content type

#### Recurring Posts Not Working

**Symptoms:**
- Only first instance of recurring post publishes
- Recurring schedule creates duplicate posts
- Recurring posts stop after few instances

**Solutions:**

1. **Schedule Configuration**
   - Review recurring post settings and frequency
   - Ensure end date is properly set (or set to "never")
   - Check if content meets platform guidelines for repeated posts
   - Verify sufficient posting slots available in schedule

2. **Content Restrictions**
   - Platforms may limit identical content posting
   - Add variation to recurring posts (date, small text changes)
   - Use content templates instead of exact duplicates
   - Monitor platform policies on repeated content

## Analytics and Reporting

### Data Not Loading or Updating

#### Analytics Dashboard Shows No Data

**Symptoms:**
- Dashboard displays "No data available"
- Analytics appear outdated
- Metrics show zero for all values

**Solutions:**

1. **Data Refresh Issues**
   - Manually refresh page or browser
   - Click refresh button in analytics dashboard
   - Wait 24-48 hours for new platform connections to populate data
   - Check if analytics are enabled for connected platforms

2. **Platform Permission Issues**
   - Verify analytics permissions granted during platform connection
   - Reconnect platform with full permissions
   - Check if platform has analytics data available (new accounts may have limited data)
   - Review platform's privacy settings that might block data access

#### Incorrect or Missing Metrics

**Symptoms:**
- Metrics don't match platform's native analytics
- Some metrics missing while others display correctly
- Historical data suddenly disappears

**Solutions:**

1. **Data Synchronization**
   - Allow 24-48 hours for data synchronization
   - Check platform's API status (some platforms have delays)
   - Verify date range selected matches expectations
   - Compare with platform's native analytics for accuracy

2. **Platform Limitations**
   - Some platforms limit historical data access
   - Business vs. personal accounts may have different data availability
   - Check if platform changed API access or policies
   - Review data retention policies for different subscription levels

### Report Generation Issues

#### Cannot Export Reports

**Symptoms:**
- Export button doesn't work
- Download never starts or fails
- Empty or corrupted report files

**Solutions:**

1. **Browser and Download Issues**
   - Check browser's download settings and permissions
   - Disable popup blockers temporarily
   - Try exporting smaller date ranges
   - Use different browser or clear cache

2. **Data and Format Issues**
   - Ensure data exists for selected date range
   - Try different export format (PDF vs. CSV)
   - Check if subscription plan includes export features
   - Verify sufficient data available to generate meaningful reports

## AI Content Generator

### AI Not Generating Content

#### No Content Suggestions Appearing

**Symptoms:**
- AI generator shows loading but no results
- "Failed to generate content" error messages
- Generated content appears blank or incomplete

**Solutions:**

1. **Input and Configuration**
   - Provide more specific topic or keywords
   - Check if content parameters are properly selected
   - Try simpler prompts first
   - Ensure target platform is selected

2. **Technical Issues**
   - Check internet connection stability
   - Try different content types or lengths
   - Clear browser cache and retry
   - Wait a few minutes and try again (rate limiting)

#### Poor Quality AI Suggestions

**Symptoms:**
- Generated content doesn't match brand voice
- Suggestions are irrelevant to topic
- Content doesn't fit platform requirements

**Solutions:**

1. **Improve Input Quality**
   - Provide more detailed topic descriptions
   - Include specific keywords or themes
   - Set appropriate tone and style preferences
   - Add context about target audience

2. **Train the AI**
   - Rate generated content to improve future suggestions
   - Save successful content as examples
   - Update brand voice settings with better descriptions
   - Use feedback options to guide AI learning

## Team Collaboration Issues

### Team Member Access Problems

#### Cannot Add Team Members

**Symptoms:**
- Invitation emails not being sent
- New members can't access shared content
- Team member limits exceeded unexpectedly

**Solutions:**

1. **Subscription and Limits**
   - Check current subscription plan limits
   - Verify available team member slots
   - Upgrade plan if more members needed
   - Remove inactive members to free up slots

2. **Invitation Process**
   - Verify email addresses are correct
   - Check spam folders for invitation emails
   - Try sending invitations again after 15 minutes
   - Use admin account to send invitations

#### Permission and Access Issues

**Symptoms:**
- Team members can't edit content they should access
- Wrong permission levels despite correct role assignment
- Content appears as "read-only" when it shouldn't

**Solutions:**

1. **Role Configuration**
   - Review team member roles and permissions
   - Update permissions through team management interface
   - Check if custom permissions override role defaults
   - Verify account has admin rights to change permissions

2. **Content Ownership**
   - Check if content was created by user vs. team
   - Transfer content ownership if needed
   - Review company vs. individual account settings
   - Ensure team workspace is properly configured

## Mobile and Browser Compatibility

### Mobile Device Issues

#### App Not Working on Mobile

**Symptoms:**
- Interface elements too small or not responsive
- Touch interactions don't work properly
- Content overflows screen boundaries

**Solutions:**

1. **Browser and Device**
   - Use updated mobile browser (Chrome, Safari, Firefox)
   - Clear mobile browser cache and data
   - Try rotating device orientation
   - Increase browser zoom if text too small

2. **Network and Performance**
   - Switch between WiFi and mobile data
   - Close other apps to free up memory
   - Restart device if performance is slow
   - Check if device meets minimum requirements

### Browser Compatibility

#### Features Not Working in Specific Browser

**Symptoms:**
- Some buttons or features don't respond
- Layout appears broken or misaligned
- JavaScript errors in browser console

**Solutions:**

1. **Browser Support**
   - Use supported browsers (Chrome, Firefox, Safari, Edge)
   - Update browser to latest version
   - Enable JavaScript and disable strict privacy settings
   - Try browser's compatibility mode if available

2. **Extension and Settings**
   - Disable browser extensions temporarily
   - Allow cookies and local storage for Roundabout
   - Add Roundabout to browser's trusted sites
   - Reset browser settings if necessary

## Account and Subscription Issues

### Billing and Payment Problems

#### Payment Failed or Subscription Cancelled

**Symptoms:**
- Features suddenly limited or unavailable
- Payment declined notifications
- Subscription shows as "expired" or "cancelled"

**Solutions:**

1. **Payment Method Issues**
   - Update credit card information if expired
   - Check if card was blocked or has insufficient funds
   - Try different payment method
   - Contact bank if payments are being declined

2. **Subscription Management**
   - Review subscription status in account settings
   - Reactivate subscription if accidentally cancelled
   - Contact billing support for payment processing issues
   - Check email for billing notifications or action required

### Data Export and Account Closure

#### Cannot Export Account Data

**Symptoms:**
- Export feature not available
- Download fails or produces empty files
- Some data missing from export

**Solutions:**

1. **Export Process**
   - Check if subscription plan includes data export
   - Try exporting smaller data sets
   - Allow sufficient time for large exports to process
   - Use different browser or clear cache

2. **Data Availability**
   - Some data may have retention limits
   - Verify all platforms are still connected
   - Check if specific data types have export restrictions
   - Contact support for assistance with large data exports

## Emergency Procedures

### Account Compromised

If you suspect your account has been compromised:

1. **Immediate Actions**
   - Change password immediately
   - Enable two-factor authentication
   - Check recent activity log for unauthorized access
   - Revoke access to all connected platforms

2. **Security Review**
   - Review all team members and remove unauthorized users
   - Check scheduled content for anything suspicious
   - Update security settings and notifications
   - Contact support to report security incident

### Critical System Issues

For system-wide outages or critical issues:

1. **Check System Status**
   - Visit Roundabout status page
   - Check social media for service announcements
   - Monitor email for system notifications

2. **Immediate Workarounds**
   - Use platforms' native posting temporarily
   - Save draft content locally
   - Document issues for later reporting
   - Contact support with detailed information

## Getting Additional Help

### When to Contact Support

Contact Roundabout support when:
- Multiple troubleshooting steps haven't resolved the issue
- You encounter error messages not covered in this guide
- Account or billing issues need manual intervention
- Security concerns require immediate attention

### How to Contact Support

1. **In-App Support**
   - Use chat widget in bottom-right corner
   - Submit support ticket through Help menu
   - Include relevant error messages and screenshots

2. **Email Support**
   - Send detailed description to support@roundabout.com
   - Include account email and subscription level
   - Attach screenshots or screen recordings when possible

3. **Phone Support** (Business/Enterprise plans)
   - Call support number provided in account dashboard
   - Have account information ready
   - Available during business hours

### Information to Include in Support Requests

- Account email address
- Subscription plan level
- Browser and operating system versions
- Detailed description of issue and steps taken
- Screenshots or screen recordings of problems
- Error messages (exact text)
- When the issue first occurred

Remember: The support team is here to help, and providing detailed information helps resolve issues faster.
