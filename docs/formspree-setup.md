# Formspree Setup Guide

This guide explains how to configure Formspree for the Chipverif website forms.

## Overview

The website uses two forms that need to be configured with Formspree:
- **License Application Form** - For VIP License requests
- **Newsletter Subscription Form** - For email newsletter subscriptions

## Step 1: Create Formspree Account

1. Visit [https://formspree.io](https://formspree.io)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

## Step 2: Create License Application Form

1. After logging in, click **"New Form"**
2. Form Name: `License Application` (or your preferred name)
3. Set the form URL to: `license`
4. Configure the form fields to match:
   - `name` - Text field (required)
   - `email` - Email field (required)
   - `company` - Text field (optional)
   - `project` - Textarea (required)
5. Click **"Create Form"**
6. Copy the form ID from the form URL (e.g., `https://formspree.io/f/abc123` → `abc123`)

## Step 3: Create Newsletter Subscription Form

1. Click **"New Form"** again
2. Form Name: `Newsletter Subscription`
3. Set the form URL to: `newsletter`
4. Configure the form fields:
   - `email` - Email field (required)
5. Click **"Create Form"**
6. Copy the form ID from the form URL

## Step 4: Update Form Action URLs

### Update License Application Form

Edit `src/components/LicenseSection.astro`:

Find line 36-40 and update the form action:

```astro
<form
  action="https://formspree.io/f/YOUR_LICENSE_FORM_ID"
  method="POST"
  class="space-y-6"
>
```

Replace `YOUR_LICENSE_FORM_ID` with the actual form ID from Step 2.

### Update Newsletter Subscription Form

Edit `src/components/Footer.astro`:

Find line 46-49 and update the form action:

```astro
<form
  action="https://formspree.io/f/YOUR_NEWSLETTER_FORM_ID"
  method="POST"
  class="flex gap-2"
>
```

Replace `YOUR_NEWSLETTER_FORM_ID` with the actual form ID from Step 3.

## Step 5: Test Forms

1. Submit a test application through the license form on the homepage
2. Submit a test email through the newsletter footer form
3. Check your Formspree dashboard to verify submissions are received
4. Verify you receive email notifications (if configured)

## Optional: Configure Email Notifications

To receive email notifications for form submissions:

1. Go to your form settings in Formspree
2. Navigate to **"Email"** settings
3. Add your email address(es)
4. Customize the email template if desired
5. Save settings

## Troubleshooting

**Form not submitting:**
- Verify the form ID is correct
- Check browser console for errors
- Ensure the form is served over HTTPS (Formspree requirement)

**No email notifications:**
- Check Formspree spam folder
- Verify email address is added in form settings
- Check if emails are being blocked by your email provider

**Form redirects:**
- By default, Formspree redirects to a thank you page
- To use AJAX submission without redirect, add `data-ajax="true"` to the form tag

## Formspree Free Plan Limits

The free Formspree plan includes:
- Up to 2 forms
- 50 submissions per month
- Basic email notifications
- Form submission history

If you need more submissions or features, consider upgrading to a paid plan.

## Additional Resources

- [Formspree Documentation](https://formspree.io/docs)
- [Formspree Pricing](https://formspree.io/pricing)
- [Formspree Support](https://formspree.io/support)
