# Landing Pages & Lead Magnets: Implementation Guide

## Overview

You now have an integrated lead generation system with:
- **6 specialized landing pages** (Doorways) targeting specific health niches
- **Doorways Index page** - hub that lists all 6 pathways
- **Lead Magnets page** - repository of your free training protocols and guides
- **Main site integration** - links from homepage to drive traffic

## Current URLs

All pages are now live and accessible:

### Doorways (Specialized Pathways)
1. `/doorways-index.html` - Hub page listing all 6 pathways
2. `/doorways/amputee-performance-pathway.html`
3. `/doorways/chronic-pain-care-coordination.html`
4. `/doorways/competitive-athlete-performance-system.html`
5. `/doorways/perimenopause-performance-guide.html`
6. `/doorways/postpartum-recovery-guide.html`
7. `/doorways/the-health-guide-over-40.html`

### Lead Magnets
- `/lead-magnets.html` - Free protocols and training guides repository

### Main Site
- `/index.html` - Now includes "Find Your Pathway" section linking to doorways and lead magnets

## How to Drive Traffic & Capture Leads

### Strategy 1: Content Marketing
**Blog posts → Landing Pages → Lead Magnets → Coaching**

Write blog posts about topics relevant to each pathway:
- "Recovery Path After Amputation: Beyond PT" → Amputee Pathway
- "Why Chronic Pain Persists (And How Virtual Coaching Fixes It)" → Chronic Pain Pathway
- "Perimenopause and Performance: What Athletes Need to Know" → Perimenopause Pathway

Add internal links from blog posts to the relevant doorway page.

### Strategy 2: Social Media Funnel
**Instagram/Facebook → Lead Magnet PDFs → Email List → Doorway Pages**

- Post about specific problems (e.g., "knee pain after running")
- Link to the free lead magnet (e.g., "Get the Knee Capacity Protocol")
- Capture email via Formspree on lead-magnets.html
- Follow up with link to the relevant doorway/coaching

### Strategy 3: Direct Outreach
**Email referral partners → Doorway pages → Formspree capture → Book consultation**

Send to:
- Physical therapists
- Orthopedic surgeons
- CrossFit coaches
- Yoga instructors
- Sports medicine doctors

Template: "I've created a free resource for your [amputee/chronic pain] clients: [link to doorway]. It bridges the gap between PT discharge and real-world capability."

### Strategy 4: Paid Ads
**Google Ads / Facebook Ads → Doorway pages → Free resource offer → Email capture**

Run ads targeting:
- "amputee training" → Amputee Pathway
- "chronic pain recovery" → Chronic Pain Pathway
- "competitive athlete performance" → Athlete Pathway
- etc.

## Connecting Landing Pages to Formspree

### Option 1: Add Forms to Each Doorway
Embed a Formspree form on each doorway page offering:
- Free lead magnet download
- Free 15-min consultation booking
- Assessment questionnaire specific to that pathway

Example form structure:
```html
<form action="https://formspree.io/f/mbdnwqea" method="POST">
  <input type="hidden" name="_subject" value="Amputee Pathway Interest" />
  <input type="email" name="email" required />
  <input type="text" name="name" required />
  <select name="interest">
    <option>Free training protocol</option>
    <option>Book consultation</option>
    <option>Send me more info</option>
  </select>
  <button type="submit">Get Resources</button>
</form>
```

### Option 2: Gated Lead Magnets
Make the lead magnets "gated" behind an email capture form:
1. User clicks "Download Protocol"
2. Formspree form appears
3. After submission, link is revealed or email sent with download

(This requires a slight modification to lead-magnets.html with form triggers)

### Option 3: Funnel to Contact Page
Keep current setup:
- Doorways → "Learn More" buttons → Contact page
- Lead Magnets → "Download" → Contact page for email capture

This is simplest to maintain and uses your existing Formspree endpoint.

## Recommended Implementation Path

**Week 1: Activate & Test**
- Links are now live on your homepage
- Test all doorway pages load correctly
- Visit each in an incognito window to verify

**Week 2: Add Email Capture Forms**
- Add Formspree forms to each doorway page
- Use different subject lines (e.g., "Amputee Pathway Interest")
- Test form submissions

**Week 3: Launch Traffic**
- Start a blog post series
- Post on social media with links
- Email referral partners with doorway links

**Week 4: Monitor & Optimize**
- Check Formspree inbox for submissions
- Track which doorway pages get most traffic
- Double down on what's working

## Email Follow-up Sequence

Once leads come in via Formspree, use your Gmail automation:

1. Email lands in your inbox from Formspree
2. Gmail script processes it → Gmail draft is created
3. Draft includes personalized message + calendar link
4. You review and send draft

See `/automation/gmail-formspree-automation.gs` for implementation details.

## SEO Optimization

To boost organic traffic to these pages:

### Doorways Index
- Meta title: "Specialized Health Pathways | Performance Collective"
- H1: "Specialized Health Pathways"
- Target keywords: "performance coaching [health condition]"

### Individual Doorways
- Optimize for specific keywords:
  - Amputee: "amputee training," "prosthetic athlete," "amputee performance"
  - Chronic Pain: "chronic pain recovery," "pain coaching," "virtual pain management"
  - Athlete: "performance coaching," "athlete training program"
  - Perimenopause: "perimenopause training," "menopause fitness"
  - Postpartum: "postpartum fitness," "postpartum recovery coaching"
  - Over 40: "fitness over 40," "athlete over 40 training"

### Lead Magnets
- Meta title: "Free Training Protocols & Health Resources"
- Keywords: "free training programs," "mobility drills," "recovery protocols"

## Tracking & Metrics

Set up tracking:
1. **Google Analytics** - Which pages get traffic, how long people stay, where they go
2. **Formspree submissions** - Track submissions by landing page source
3. **Gmail labels** - Create labels for each pathway (e.g., "Lead - Amputee")

In Formspree dashboard:
- View submission trends by page
- Monitor email delivery
- Export submissions to Google Sheets for CRM use

## Next Steps

1. ✅ **Done** - Pages created and linked
2. **Todo** - Test all pages load and display correctly
3. **Todo** - Add Formspree forms to doorway pages (optional for Week 2)
4. **Todo** - Set up Google Analytics to track traffic
5. **Todo** - Create blog posts linking to relevant doorways
6. **Todo** - Set up social media posting schedule
7. **Todo** - Email referral partners with doorway links

Questions? Review the individual HTML files:
- `doorways-index.html` - Main hub
- `lead-magnets.html` - Free resources
- `index.html` - Updated homepage with new section
- `doorways/*.html` - Individual pathway pages (already existed)
