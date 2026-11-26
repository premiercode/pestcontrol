# Elm Fork Pest Solutions: design preview

Design preview prepared by Premier Code Inc.

**Preview URL:** https://pestcontrol.premiercodeinc.com/

This is a generic demo made to show pest control companies in Denton County and the wider DFW area.
**Elm Fork Pest Solutions is a fictional company.** Every phone number, email address, license
number, price, guarantee and review on these pages is a labeled sample. Pest facts come from Texas
A&M AgriLife Extension, the Texas Department of Agriculture and Denton County Public Health.

## The three options

| Option | Concept | Link |
|---|---|---|
| Option A | **The shield.** Deep green and black, with a protective line that draws around the house, strong sans type. | https://pestcontrol.premiercodeinc.com/option-a/ |
| Option B | **Friendly neighborhood.** Bright and family-oriented, with original illustrated pests and house scenes instead of photos. | https://pestcontrol.premiercodeinc.com/option-b/ |
| Option C | **Field guide.** Naturalist editorial style, with public-domain specimen plates, cream paper and serif type. | https://pestcontrol.premiercodeinc.com/option-c/ |

Use the switcher in the bottom-left corner of any page to move between options.
Image credits: https://pestcontrol.premiercodeinc.com/credits.html

## Confirm with the client

Every item below is marked `<!-- PLACEHOLDER -->` in the option pages and must be replaced with the
client's real, verified information before launch.

- **Business name** exactly as it appears on the TDA business license (required in all advertising, 4 TAC §7.152(c)).
- **TPCL business license number** (the sample is `TPCL #000000`).
- **Phone number and email** (the samples are `(940) 555-0187` and `hello@example.com`).
- **Trust points:** licensed applicators, no long-term contracts (Options A, B and C hero).
- **Plan names, prices and inclusions** for Essential, Plus and Complete, the initial service price, and the "Recommended" mark on Option B.
- **Real-estate WDI report** price and turnaround (sample: from $150, 1–2 business days).
- **Re-service guarantee** wording, terms and limits.
- **Service process** and the "what happens next" steps (Options B and C).
- **Commercial service** offering, including TDA consumer information sheets and 48-hour notice signs.
- **Reviews:** replace all three sample reviews with real customer reviews. No stars, counts or platform logos unless they are real (16 CFR Part 465).
- **Service area** cities.
- **Form handling:** form endpoint, spam handling and confirmation emails. The preview form sends nothing.
- **reCAPTCHA v3:** add the script and token field. The honeypot field is already in place.

## Remove at launch

- [ ] The option switcher: the block between `<!-- REMOVE AT LAUNCH: option switcher -->` and `<!-- /REMOVE AT LAUNCH -->` on every page.
- [ ] The two options that were not chosen, and the root redirect page.
- [ ] The "Design preview" bar at the top of each page, and every "Sample" label once real data replaces it.
- [ ] `<meta name="robots" content="noindex, nofollow">` on every page.
- [ ] The `Disallow: /` block in `robots.txt`.
- [ ] Stock photos and their credits, if the client supplies their own photos.

Do not remove `noindex` until the client has signed for the full site.
