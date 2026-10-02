# Book Sales

Sales aren't donations. Buyers get no tax deduction, so no US charity is needed in the middle.

## Channels

| Channel | Format | Notes |
| --- | --- | --- |
| **Amazon KDP** | Print, ebook | Largest reach, free print-on-demand. Confirm payout (bank transfer or wire) works for Liberia. |
| **IngramSpark** | Print | Bookstores, libraries, Bookshop.org. Narrower payout options. |
| **Draft2Digital** | Ebook, print | Pays via PayPal or Payoneer. Possibly the easiest payout to Liberia. |
| **Lemon Squeezy / Paddle** | Ebook | Seller of record that handles VAT and sales tax. Higher margin, lower reach. |

## Watch out for

- **Ownership:** the nonprofit should hold the rights and the publisher accounts, not an individual.
- **US withholding:** file a W-8BEN-E with KDP and Ingram, or 30% of US royalties is withheld.
- **Liberian tax:** sales income may be taxable. Confirm with a local accountant.
- **Charity partners:** GlobalGiving and fiscal sponsors handle donations, not sales. A book given as a thank-you for a donation reduces the donor's deduction by the book's value.

## Recommendation

1. Publish on KDP, plus IngramSpark or Draft2Digital, under the nonprofit's accounts.
2. Optionally sell the ebook directly via Lemon Squeezy.
3. Before committing, confirm each platform can pay out to Liberia.

## Decision

KDP first, under a nonprofit-held account. Confirm KDP can pay out to Liberia (likely by wire, since
EFT may not cover it). If it can't, use Draft2Digital for the ebook.

## Site

No checkout on the site. Amazon is the seller of record, so the site links out.

- **Buy link:** one [books2read](https://books2read.com) universal link. It sends each reader to their
  local Amazon store (and other retailers, if listed). It's free and needs a Draft2Digital account,
  but not publishing through Draft2Digital.
- **Content:** the `book` singleton in Sanity (title, cover, blurb, description, buy link).
- **Pages:** `/book`, and the homepage hero once the `book` document is published.
- **`/book/buy`:** what every buy button links to. Redirects to the buy link, or shows "Coming soon"
  until it's set. Use it on print and social posts so the link never changes.
