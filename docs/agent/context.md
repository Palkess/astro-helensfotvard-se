---
name: Domain Context
description: Business domain, Swedish terminology, and business rules that would cause semantically wrong output if an agent were unaware of them
type: reference
---

## When to consult this file

Consult this file when writing copy, naming routes or slugs, interpreting service descriptions, or making decisions about content structure. Essential for understanding what the site is about and what the business rules are.

---

## Business overview

**Helens Fotvård** is a medical foot care clinic run by a single practitioner (Helen) in Borgholm, on the island of Öland in Sweden. The site is a Swedish-language marketing and contact site — all user-facing content is in Swedish.

**Primary goals of the site:**
1. Present the services offered
2. Allow customers to understand what each treatment involves
3. Direct visitors to book an appointment (via phone/contact, not an online booking system)

---

## Key Swedish terms

These terms have specific professional or regulatory meaning. Using them incorrectly would produce semantically wrong content.

| Swedish term | Meaning | Notes |
|---|---|---|
| **Medicinsk fotvård** | Medical foot care | Implies trained/qualified practitioner — not casual nail painting |
| **Fotvård** | Foot care | General term; "medicinsk fotvård" is the professional specialization |
| **Friskvårdsförmån** | Wellness benefit/allowance | A Swedish tax-deductible employee benefit; employers can pay for treatments qualifying as friskvård. This is a specific legal/tax category. |
| **Fotvård med friskvård** | Foot care under the wellness benefit | The service that qualifies for employer friskvård reimbursement |
| **Nageltrång** | Ingrown toenail | A specific condition — not just tight nails. The treatment involves prevention, correction, and sometimes bracing. |
| **Nagelklippning** | Nail clipping | Professional nail trimming — implies tools and technique beyond home care |
| **Boka tid** | Book a time / Book an appointment | Standard Swedish CTA — used across all call-to-action buttons |
| **Borgholm** | Town on Öland where the clinic is located | |
| **Öland** | Swedish island in the Baltic Sea | Tourist/summer destination — relevant to seasonal context |
| **Tystnadsplikt** | Professional secrecy / confidentiality | Healthcare practitioners in Sweden are legally bound. Relevant if any contact forms or testimonials are added. |

---

## URL and slug conventions

Routes and slugs are Swedish-language and should remain so:
- `/tjanster/` — services (not `/services/`)
- `/tjanster/medicinsk-fotvard` — medical foot care
- `/tjanster/fotvard-med-friskvard` — wellness foot care
- `/tjanster/nagelklippning` — nail clipping
- `/tjanster/nageltrang` — ingrown toenail

Section anchor IDs on the homepage:
- `#tjanster` — services section
- `#kontakt` — contact section

Do not rename these without updating all internal links.

---

## Services

Four services are currently offered (defined in `src/data/services.ts`):

1. **Medicinsk fotvård** (~60 min) — Full treatment: foot bath, callus/corn/wart removal, nail care, massage
2. **Fotvård med friskvård** (~60 min) — Same as above but invoiced as a friskvårdsförmån benefit
3. **Nagelklippning** (~30 min) — Professional nail clipping only
4. **Nageltrång** — Ingrown toenail treatment and prevention

Services 1 and 2 are the same physical treatment — the distinction is purely administrative (how it's billed/invoiced for tax purposes).

---

## Booking flow

The site does **not** have an online booking system. All bookings are done by contacting Helen directly (phone). CTAs ("Boka tid") link to the `#kontakt` anchor section on the homepage. Do not implement or suggest an online booking widget without explicit instruction.

---

## Language

All user-facing content is in **Swedish**. Code, comments, variable names, and file names are in English. Do not introduce Swedish into source code identifiers.

---

## How to contribute to this file

Add entries here when:
- A Swedish term is encountered that has a specific professional or legal meaning in this context
- A business rule is discovered that is not obvious from the code (e.g., "services 1 and 2 are the same treatment")
- Domain knowledge is needed to avoid producing plausible-but-wrong content
