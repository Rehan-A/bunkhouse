# The Bunkroom: website review notes

Audit of the current homepage at https://thebunkroom.co.uk/ (GoDaddy Website Builder), checked 28 September 2026. For use in the client proposal.

## Problems found on the current site

### Booking and enquiries
1. **"Book Now" is just a phone link.** Every "Book Now" button only dials 01244 324524. Nobody can ask for a booking with their dates, and people browsing in the evening or from abroad have no easy way to book.
2. **The only form collects too little.** It asks for name, email and phone. There are no dates, room type or number of guests, so every enquiry needs a follow-up before it can be answered.
3. **WhatsApp is hidden.** The WhatsApp link only appears in the contact section at the bottom, not near the prices or the booking buttons.

### Broken or empty content
4. **"Our Rooms" photos don't load.** The images use the builder's lazy-loading and show as blank boxes.
5. **The room photos are tiny.** The two room photos stored on the site are only 275 × 183 pixels, so they look blurry on any modern phone or laptop. Higher-resolution photos are needed.
6. **There is no photo of the Small Double.** Only one double-room photo exists, and it isn't labelled as Small or Standard.
7. **The main photo is mislabelled.** The big header image is the outdoor yarden, but its hidden description (used by screen readers and Google) says "Double room with en-suite".
8. **The "Reviews" section is empty.** It has a heading and nothing under it, which looks worse than no reviews section at all.
9. **One header image is a GoDaddy stock photo**, not a photo of the hostel.

### Leftover builder placeholders
10. An **"Announcement / Learn more"** bar left over from the template.
11. A **"More"** item in the navigation menu that leads nowhere useful.
12. **Empty list items** in the page structure.

### Out of date and off-brand
13. **The copyright says 2022.** It makes the business look closed or neglected.
14. **The footer says "Powered by GoDaddy Website Builder"**, which advertises GoDaddy rather than The Bunkroom.
15. **There's no logo.** The site uses the default GoDaddy app icon (logo-default.png) for phones' home screens and bookmarks.

### Selling points are buried
16. **The location is undersold.** Being 2 minutes from Chester station and 5 minutes' walk from the city centre is the hostel's biggest advantage, but it sits in a paragraph of body text.
17. **Whole-hostel hire (up to 27 people) is buried** at the bottom of the price list, although it is probably the most valuable booking.
18. **There's no map.** The address is shown as text only.

### Consistency and technical
19. **The postcode is written "CH13DU"** (no space) on the site. On Google Maps, 106 Brook Street comes up as **CH1 3DY**, not CH1 3DU. The client should confirm the correct postcode.
20. **The bathroom description contradicts itself.** The intro says the rooms have "hot ensuite showers", but the Small Double is listed with a shared bathroom. The copy should make clear which rooms are en-suite.
21. **The page is heavy.** The HTML alone is about 108 KB before the builder's scripts and styles load.

## How the concept fixes them
- A booking enquiry form that asks for dates, guests and room type. It checks that check-out is after check-in and that there's at least 1 guest, then shows a thank-you message.
- "Request this room" buttons on each room that preselect the room in the form.
- WhatsApp shown in the hero, the group hire section, the contact details, and as a floating button on mobile.
- Location shown as badges in the hero, plus a section with an embedded Google Map and a directions link.
- A green whole-hostel hire band aimed at stag and hen parties, sports teams, school and club trips, and family gatherings.
- Real photos converted to WebP. The header photo's 1.4 MB original is now served at 60–200 KB depending on screen size.
- A copyright year that updates itself, and no builder branding.
- Lighthouse scores on local testing: accessibility 100, performance 99 on desktop and 89–99 on mobile.

## Placeholders still to fill
- `{MY_EMAIL}` in the form's `data-endpoint` in `index.html`: the address FormSubmit sends enquiries to. The first submission triggers a one-time FormSubmit activation email.
- `[Add Small Double photo]` on the Small Double room card.
- `[Add real guest reviews here]`: three placeholder review cards. Only add genuine reviews, with permission.
- Higher-resolution room photos to replace the 275 px originals (`assets/dorm.webp`, `assets/double.webp`).
- Confirm the Standard Double photo really shows the Standard Double. It's the only double-room photo on the current site.
- A real logo, if the hostel has one. The concept uses a simple "B" mark.

## Preview-only settings (remove before going live)
- The "Concept preview prepared for The Bunkroom" banner.
- `<meta name="robots" content="noindex, nofollow">`.
- `robots.txt` disallowing all crawlers. On a GitHub Pages project site this file sits at `/bunkroom-concept/robots.txt`, not the domain root, so crawlers ignore it there. The `noindex` meta tag is what actually keeps the preview out of search results.
