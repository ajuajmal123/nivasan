# Nivasan Homes Website — Security, Performance & Code Quality Audit

**Audit date:** 2026-10-28
**Commit audited:** `9cc57e9` (branch `main`, clean working tree)
**Scope:** Every tracked source file under `src/`, plus config (`package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.gitignore`), `public/` assets, git history, and the untracked-but-present `SETUP_INQUIRY.md` (the Google Apps Script backend that the inquiry API depends on).
**Tools run:** `npm audit`, `npx eslint .`, `npx tsc --noEmit`, `npm outdated`, git history secret grep, asset existence check.

> **Remediation status (updated 2026-10-28):** Fixes have been applied to the working tree (not yet committed). Each finding's outcome is in the **Status** column of section 2.
> Results after the fixes: `npm audit` → 0 vulnerabilities · `npm test` → 21/21 passing · `npx eslint .` → 0 errors (1 warning) · `npx tsc --noEmit` → clean · `npm run build` → succeeds.
> File:line references in this report point to the **originally audited** commit `9cc57e9`; some lines have moved since.

---

## 1. Executive summary

### Project overview

| Item | Detail |
|---|---|
| Purpose | Marketing / lead-generation website for Nivasan Homes (real estate developer, Coimbatore) |
| Language | TypeScript (strict mode) |
| Framework | Next.js **16.2.9** App Router, React 19.2.4 |
| Styling / animation | Tailwind CSS v4, Framer Motion 12, Lenis smooth-scroll, GSAP (only ScrollTrigger registered) |
| Build / run | `npm run dev`, `npm run build`, `npm start`; `npm run lint` (ESLint 9 flat config) |
| Tests | **None** (no test runner, no test files, no `test` script) |
| Entry points | `src/app/layout.tsx` (root layout); pages: `/`, `/projects`, `/projects/[id]` (15 statically generated), `/blog`, `/blog/[slug]`, `/gallery`, `/about` and `/contact` (both redirect to anchors on `/`) |
| Only server-side logic | `POST /api/inquiry` ([src/app/api/inquiry/route.ts](src/app/api/inquiry/route.ts)) forwards form data to a Google Apps Script Web App (`GOOGLE_SCRIPT_URL`). The script appends to a Google Sheet and sends two HTML emails (to the sales team and an auto-reply to the submitter). Its source is in `SETUP_INQUIRY.md`. |
| Data | All content is hard-coded in TypeScript (no database). |
| Secrets | `.env` exists locally (contains `GOOGLE_SCRIPT_URL`), is gitignored, and **has never been committed** (checked full history of all 28 commits). No secrets found in tracked files or history. |

### Overall health score: **5 / 10**

The attack surface is small: one unauthenticated form endpoint, no auth, no database, no committed secrets. The real risks are:

1. **The Next.js version has known critical advisories** (several unauthenticated RCE and cache-poisoning advisories), and a non-breaking fix (16.4.3) is available.
2. **The inquiry pipeline can be abused to send branded phishing email** from the company's Google account to any address. Unescaped user input goes into an HTML auto-reply sent to an attacker-chosen recipient, and the rate limit in front of it is weak.
3. **Leads can be silently lost.** If the env var is missing in production, the API still reports success.
4. **Performance is poor.** About 72 MB of unoptimised 2–3 MB PNGs are served through raw `<img>` tags, alongside a 15 MB autoplay hero video and 82 MB of brochure PDFs.
5. **Maintainability.** Project data is duplicated in four places and has already drifted. `/gallery` has 4 broken images, and ESLint reports 11 errors.

---

## 2. Findings table

Severity reflects likely real-world impact for this site. File:line references are for commit `9cc57e9`.

| ID | Category | Severity | File:line | Issue | Recommended fix | Status |
|---|---|---|---|---|---|---|
| S-01 | Security / Dependencies | **Critical** | [package.json:16](package.json#L16) | `next@16.2.9` is in the range of many advisories. `npm audit` lists unauthenticated RCE in the Image Optimization API (GHSA-2xp9-vwfh-vxw4, GHSA-2464-fhr4-w9xw), SSRF in image optimisation (GHSA-cjq9-62q9-8jv4), SSG/ISR cache poisoning (GHSA-4jqv-mc3x-m676, GHSA-mcj8-r9mp-w47p), RCE on Windows-hosted servers (GHSA-p293-qw3h-jr36), and more. The bundled `sharp` and `postcss` are also vulnerable. | Upgrade `next` and `eslint-config-next` to **16.4.3** (semver-minor, flagged non-breaking by `npm audit`). Then run `npm audit fix` for the transitive dev dependencies. | **Fixed**: `next` and `eslint-config-next` 16.4.3, `npm audit fix`; `npm audit` reports 0 vulnerabilities |
| S-02 | Security / Injection (HTML email) | **High** | `SETUP_INQUIRY.md:76-80, 101-106, 118-122` (Apps Script) | User-supplied `name`, `email`, `phone`, `project` and `message` are concatenated **unescaped** into HTML email bodies. The auto-reply goes to the **attacker-supplied `email` address**. Anyone can make the company's Google account send a branded HTML email with attacker-controlled links or content to any inbox. This is a phishing relay. The internal team email is open to the same HTML injection. | Escape HTML in Apps Script before building the body (`&<>"'`). Put only the escaped name in the auto-reply and drop the echoed message, or send plain text. Validate the email format. Consider removing the auto-reply or adding CAPTCHA (see S-03). | **Fixed in `SETUP_INQUIRY.md`; needs manual action**: HTML-escaping and an email-format check added to the Apps Script; you must paste it into Apps Script and redeploy |
| S-03 | Security / Abuse controls | **High** | [route.ts:4-31](src/app/api/inquiry/route.ts#L4-L31), [route.ts:46-47](src/app/api/inquiry/route.ts#L46-L47) | The rate limiter is the only abuse control and is weak. (a) It keys on the **first** `X-Forwarded-For` value, which clients control unless the host overwrites it. (b) It is an in-memory `Map`, so it is per-instance and resets on cold start, giving no real protection on serverless or multi-instance hosting. (c) Expired entries are never evicted, so memory grows without bound. (d) If the header is missing, every client shares the key `127.0.0.1`, so one spammer can lock out all real users. | Use a shared store (e.g. Upstash/Redis or Vercel KV rate limiting). Derive the IP from the platform-trusted source (`x-real-ip` / the right-most trusted hop). Add Cloudflare Turnstile or reCAPTCHA verified server-side. Evict expired keys. | **Partly fixed; needs manual action**: expired entries are now evicted (memory bounded). Trusted-IP header, shared store and CAPTCHA skipped: hosting is GoDaddy and its proxy headers are unconfirmed; you chose to skip CAPTCHA/Upstash |
| S-04 | Reliability / Data loss | **High** | [route.ts:88-106](src/app/api/inquiry/route.ts#L88-L106) | If `GOOGLE_SCRIPT_URL` is unset (e.g. forgotten on a new deployment or preview), the API returns **`status: "success"`** and the lead is discarded. It also logs the full PII payload (name, email, phone, message) with `console.info`. The "development mode" fallback is not limited to development. | Gate the mock on `process.env.NODE_ENV !== "production"`. In production, return 500 and alert. Never log PII. | **Fixed**: returns 503 in production when the URL is missing; dev mock no longer logs personal data |
| S-05 | Security / Input validation | Medium | [route.ts:60-86](src/app/api/inquiry/route.ts#L60-L86) | No server-side schema. No length limits, so multi-MB messages are forwarded to Sheets and email. No email or phone format check. Non-string values pass the truthiness check and are then silently turned into `""` by `sanitizeInput` (e.g. `{"name":123}` stores an empty name). Malformed JSON throws and returns a 500 with the parser's message. | Validate with a schema (e.g. zod): strings only, trimmed, max lengths (name 100, message 2000), email regex, phone `^[+0-9 ()-]{7,20}$`, `project` restricted to the known list. Return 400 on failure. Cap the request body size. | **Fixed**: hand-written validation (types, required, email/phone format, length caps, 20 KB body cap); no new dependency |
| S-06 | Security / Info disclosure | Medium | [route.ts:124, 132, 143-151](src/app/api/inquiry/route.ts#L143-L151); `SETUP_INQUIRY.md:131-136` | Internal error messages are returned to the browser: upstream HTTP status, Apps Script `error.toString()`, JSON parse errors. The forms display `result.message` verbatim ([ContactCTA.tsx:47](src/components/sections/ContactCTA.tsx#L47), [ProjectInquiryForm.tsx:50](src/components/sections/ProjectInquiryForm.tsx#L50)). | Log details server-side and return a generic message to the client. | **Fixed**: generic client messages in the route and the Apps Script (script change needs redeploy) |
| S-07 | Security / Headers | Medium | [next.config.ts:3-5](next.config.ts#L3-L5) | No security headers: no CSP, no `X-Frame-Options`/`frame-ancestors` (the forms can be clickjacked), no HSTS, no `Referrer-Policy`, no `Permissions-Policy`. `X-Powered-By: Next.js` is sent. | Add `headers()` in `next.config.ts` with those headers and `poweredByHeader: false`. The CSP must allow `https://www.google.com` frames for the map embeds and `https://wa.me` links. | **Partly fixed**: `X-Frame-Options`, `frame-ancestors` CSP, HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `poweredByHeader: false`. A full script/style CSP was skipped because it needs browser testing (Framer Motion inline styles, Maps iframes) |
| S-08 | Security / Logging | Low | [route.ts:65](src/app/api/inquiry/route.ts#L65), [route.ts:139](src/app/api/inquiry/route.ts#L139) | The honeypot logs the attacker-controlled `website` value and the IP (log injection / log noise). The parse-failure path logs the entire raw Apps Script response. | Log a truncated or sanitised value, or only a counter. | **Fixed**: honeypot no longer logs the submitted value; upstream response log truncated to 200 chars |
| S-09 | Security / CSRF | Low | [route.ts:60](src/app/api/inquiry/route.ts#L60) | `request.json()` parses the body whatever the `Content-Type`, so any third-party site can submit a cross-origin "simple" `text/plain` POST. Impact is limited to spam because there is no session, but this makes S-02 and S-03 easier to abuse at scale. | Reject requests whose `Content-Type` isn't `application/json`, and check the `Origin` header against the site domain. | **Fixed** (Content-Type must be `application/json`, else 415). `Origin` check skipped: needs the list of production domains |
| S-10 | Security / Hardening | Low | [projects/[id]/page.tsx:872-889](src/app/projects/%5Bid%5D/page.tsx#L872-L889) | JSON-LD is injected with `dangerouslySetInnerHTML` + `JSON.stringify` without escaping `<`. The data is static today, so this is not exploitable, but it becomes an XSS sink if project data ever comes from a CMS. | Use `JSON.stringify(obj).replace(/</g, "\\u003c")`. | **Fixed**: `toJsonLd()` escapes `<` |
| S-11 | Compliance / Privacy | Low | [ContactCTA.tsx:343-351](src/components/sections/ContactCTA.tsx#L343-L351), [ProjectInquiryForm.tsx:174-183](src/components/sections/ProjectInquiryForm.tsx#L174-L183), [route.ts:114-120](src/app/api/inquiry/route.ts#L114-L120) | The consent checkbox ("Compliant with DPDP Act") is enforced only in the browser. Consent is not sent to or stored by the server, so there is no record of consent per lead. | Send `consent: true` and a policy version, reject without it, and store it with a timestamp in the Sheet. | **Skipped**: needs a decision on the consent field and Sheet column, plus an Apps Script change |
| P-01 | Performance / Images | **High** | [ProjectsList.tsx:176](src/app/projects/ProjectsList.tsx#L176), [FeaturedProjects.tsx:118](src/components/sections/FeaturedProjects.tsx#L118), [projects/[id]/page.tsx:944](src/app/projects/%5Bid%5D/page.tsx#L944), [ProjectGallery.tsx:190](src/components/sections/ProjectGallery.tsx#L190), [Lifestyle.tsx:37](src/components/sections/Lifestyle.tsx#L37) | All 50 project images (72 MB in total, many 2–3 MB PNGs, e.g. `public/completed/p8/4.png` at 2.9 MB) are served through raw `<img>` tags with no resizing, modern formats, lazy loading or `sizes`. `/projects` loads about 15 full-size PNGs (~30 MB). The homepage loads 3 (~7.5 MB) plus the video. | Use `next/image` with `sizes` and `placeholder`, or pre-convert to WebP/AVIF at ≤1600 px (typically 150–300 KB each). Add `loading="lazy"` below the fold. | **Fixed**: `next/image` with `fill` + `sizes` on project cards, featured projects, project hero and gallery grid (e.g. 2.9 MB PNG → 300 KB WebP). Lightbox keeps full resolution for zoom; `/gallery` is left as-is (B-01) |
| P-02 | Performance / Media | Medium | [Hero.tsx:16-25](src/components/sections/Hero.tsx#L16-L25); `public/herovideo.mp4` | The 15 MB hero video autoplays on every device, including mobile data, with no `poster` and no `preload` hint. It is the LCP element on the homepage. | Re-encode to roughly 2–4 MB (H.264 + WebM/AV1, 720p for mobile), add `poster`, `preload="metadata"`, and serve a smaller source via `<source media>`. | **Needs manual action**: re-encode the video (needs a video tool and source file) |
| P-03 | Performance / Repo & downloads | Medium | `public/brochures/Nivasan-Vakulam-Brochure.pdf` (62 MB), `public/brochures/Nivasan Swarnapuraa Brochure.pdf` (20 MB) | 82 MB of PDFs are committed to git and served from the app. The loose objects in `.git` total 212 MB, so every clone and deploy is slow. A 62 MB brochure is not usable on mobile. | Compress the PDFs (aim for under 10 MB) and host them on object storage or a CDN. Consider Git LFS for media. | **Needs manual action**: compress and re-host the PDFs; optional git history cleanup |
| P-04 | Performance / Bundle | Medium | [LenisProvider.tsx:5-6, 11, 25-27, 39-54](src/components/layout/LenisProvider.tsx#L5-L54) | `gsap` + `ScrollTrigger` are bundled into every page, but **no ScrollTrigger is created anywhere** (grep confirms). The `scrollerProxy` on `document.body` is dead weight. `@studio-freight/lenis` is the deprecated package name (now `lenis`). | Remove `gsap`, or actually use it. Migrate to the `lenis` package. | **Fixed**: removed unused `gsap`/ScrollTrigger and the dependency. Migration to the `lenis` package skipped (new dependency) |
| P-05 | Performance / Third-party | Low | [ContactCTA.tsx:72-81](src/components/sections/ContactCTA.tsx#L72-L81) | A full Google Maps iframe loads on the homepage as a 35%-opacity decorative background with `pointer-events: none`. That is about 1 MB+ of third-party JS for a picture. | Replace it with a static map image, or remove it. | **Skipped**: design decision (decorative map) |
| P-06 | Performance / Client components | Low | [Footer.tsx:1](src/components/layout/Footer.tsx#L1), [BrandStory.tsx:1](src/components/sections/BrandStory.tsx#L1), [FeaturedProjects.tsx:1](src/components/sections/FeaturedProjects.tsx#L1) | `"use client"` is used on mostly static components. `Footer` is client-side only for `handleScrollToTop`, which is never used. | Make them Server Components and keep animation wrappers (`Reveal`) as small client leaves. | **Skipped**: converting `Footer` to a Server Component would freeze the © year at build time; not needed for any fix |
| B-01 | Bug / Broken page | Medium | [Lifestyle.tsx:85, 95, 105, 115](src/components/sections/Lifestyle.tsx#L85) | `/gallery` references `/images/project1.png`, `/images/project2.png`, `/images/brand_story.png`, `/images/hero_bg.png`. **`public/images/` does not exist**, so all four tiles are broken images on a page that is indexed (it has metadata). | Point them at real assets in `public/completed` / `public/ongoing`, or remove the route. | **Skipped**: need to know which photos `/gallery` should show (content decision) |
| B-02 | Bug / SEO | Medium | [projects/[id]/page.tsx:763-777](src/app/projects/%5Bid%5D/page.tsx#L763-L777) | An unknown project ID renders "Project Not Found" with **HTTP 200** (a soft 404). `dynamicParams` defaults to true, so every random slug is server-rendered and can be cached. The blog page does this correctly with `notFound()`. | Call `notFound()` and add `export const dynamicParams = false`. | **Fixed**: `notFound()` + `dynamicParams = false` (unknown IDs return 404) |
| B-03 | Bug / Data drift | Medium | [projects/[id]/page.tsx:32-722](src/app/projects/%5Bid%5D/page.tsx#L32-L722), [ProjectsList.tsx:14-121](src/app/projects/ProjectsList.tsx#L14-L121), [FeaturedProjects.tsx:15-79](src/components/sections/FeaturedProjects.tsx#L15-L79), [ContactCTA.tsx:56-66](src/components/sections/ContactCTA.tsx#L56-L66), [ProjectGallery.tsx:67-171](src/components/sections/ProjectGallery.tsx#L67-L171) | Project data is duplicated in 4–5 places and has already drifted. The contact-form dropdown is missing 6 of the 15 projects. The gallery alt text says Nivasan Springs is in "Peelamedu" ([ProjectGallery.tsx:168](src/components/sections/ProjectGallery.tsx#L168)), but the project page says Gandhi Nagar, Vilankurichi. The gallery has nine near-identical `getXFeature` functions. | Move to a single `src/data/projects.ts` with typed records including `tag`, `cardImage` and `imageCaptions[]`, and derive every list from it. | **Partly fixed**: Nivasan Springs alt-text location corrected. Data consolidation not selected, so skipped |
| B-04 | Bug / UX state | Medium | [ProjectGallery.tsx:19-43](src/components/sections/ProjectGallery.tsx#L19-L43) | `document.body.style.overflow = "hidden"` is set imperatively and only reset in `handleClose`. Navigating away while the lightbox is open (browser back, a link) leaves the page **permanently unscrollable**. It resets to `"auto"` instead of `""`. The keydown effect captures stale `handleNext`/`handlePrev` (ESLint: 4 `react-hooks` errors). The lightbox has no `role="dialog"`, no focus trap, and its icon buttons have no labels. | Manage scroll lock in a `useEffect` keyed on `isOpen` with cleanup. Use functional updates in the key handler. Add dialog a11y attributes and `aria-label`s. | **Fixed**: scroll lock managed in an effect with cleanup; functional key handlers; `role="dialog"` and button `aria-label`s (focus trap not added) |
| B-05 | Bug / Data formatting | Low | [route.ts:33-41](src/app/api/inquiry/route.ts#L33-L41), [route.ts:84](src/app/api/inquiry/route.ts#L84) | The formula-injection guard prefixes `'` to any value starting with `+` or `-`. Indian numbers entered as `+91…` become `'+91…`, and this altered value is **also used in the emails**: the `tel:'+91…` link breaks and the customer sees the stray quote (`SETUP_INQUIRY.md:78, 103`). | Send the raw validated values. Apply the `'` escaping only when writing to the sheet (in Apps Script), or validate the phone to digits/`+` and store it as text. | **Fixed in `SETUP_INQUIRY.md`; needs manual action**: the script strips the Sheets `'` prefix for email display; Sheet escaping unchanged; redeploy needed |
| B-06 | Quality / Lint | Low | `npx eslint .`, which reports **11 errors, 16 warnings** | Errors: `no-explicit-any` ([route.ts:34, 143](src/app/api/inquiry/route.ts#L34)), component created during render ([StickyCTA.tsx:11-34](src/components/ui/StickyCTA.tsx#L11-L34)), the `react-hooks/immutability` errors in ProjectGallery, and unescaped entities ([projects/[id]/page.tsx:990](src/app/projects/%5Bid%5D/page.tsx#L990), [BrandStory.tsx:147](src/components/sections/BrandStory.tsx#L147), [blog/[slug]/page.tsx:174](src/app/blog/%5Bslug%5D/page.tsx#L174)). Warnings are mostly unused imports and variables. `tsc --noEmit` passes. | Fix the errors and add `npm run lint && tsc --noEmit` to CI (Next 16's `next build` no longer runs lint). | **Fixed**: 0 ESLint errors (was 11). One warning remains, the `<img>` in `/gallery` (B-01) |
| B-07 | Quality / Dead code | Low | `src/components/sections/Statistics.tsx`, `Preloader.tsx`, `Testimonials.tsx`, `WhyChooseUs.tsx`; [Navbar.tsx:8](src/components/layout/Navbar.tsx#L8) (`Button` unused); [Footer.tsx:5, 71](src/components/layout/Footer.tsx#L71); [Logo.tsx:16-17](src/components/ui/Logo.tsx#L16-L17) | Four section components are never imported. The dead ones also **contradict the live site**: "Est. 1996", "28+ years", "1200+ families" ([Statistics.tsx:100-142](src/components/sections/Statistics.tsx#L100-L142), [Preloader.tsx:57](src/components/sections/Preloader.tsx#L57)) against "since 2010", "500+ families" elsewhere. Re-enabling them would publish conflicting claims, which matters for a RERA-regulated advertiser. | Delete the unused components and props. | **Partly fixed**: unused imports, props and handler removed. Unused component files not deleted (you didn't select deletion) |
| B-08 | Quality / Content accuracy | Low | [projects/[id]/page.tsx:83 & 127](src/app/projects/%5Bid%5D/page.tsx#L83), [557 & 600](src/app/projects/%5Bid%5D/page.tsx#L557), [85](src/app/projects/%5Bid%5D/page.tsx#L85), [202 vs 212](src/app/projects/%5Bid%5D/page.tsx#L202) | Blue Heaven 1 and 2 share the same map embed (labelled "Blue Heaven 2"). Echo Point Plaza and Aavaas share one map. Blue Heaven 1's only image is `viveka-4-1.jpg`, which looks like a Viveka Enclave photo. Viveka Enclave's description says "only 41 exclusive 3 BHK villas", while its spec says "41 Villas and 16 Apartments". Two FAQs answer "(To be confirmed by Nivasan Homes sales team.)" (lines 341, 416), which is placeholder text on live pages. | Have the business owner review the content. | **Needs manual action**: business content review |
| B-09 | Quality / Tests | Medium | (repo-wide) | There are no tests. The one critical path (inquiry submission → Sheet + email) is untested, including the honeypot, rate limit, validation and the error paths. | Add Vitest tests for `route.ts` with `fetch` mocked, and one Playwright smoke test covering the form and the project pages. | **Fixed**: Vitest 4.1.12 + 21 tests for `/api/inquiry` (`npm test`). Installed with `--legacy-peer-deps` to work around an npm 11.3 resolver crash |
| B-10 | Config / Docs | Low | [package.json:10](package.json#L10); README "scripts/" section | The `copy-assets` script points to `scripts/copy-assets.js`, which does not exist. The README documents a `scripts/` folder that is not there. | Remove the script entry and fix the README. | **Fixed**: removed the dangling `copy-assets` script and the README `scripts/` entry |
| B-11 | Config / SEO | Low | `src/app/` | There is no `robots.ts`, `sitemap.ts`, `not-found.tsx` or `error.tsx`. There is no `metadataBase` or OG image ([layout.tsx:16-35](src/app/layout.tsx#L16-L35)). The blog `[slug]` metadata returns `{}` for unknown slugs. | Add these files. Set `metadataBase: new URL("https://www.nivasanhomes.com")`. | **Skipped**: needs decisions on which routes to index (e.g. broken `/gallery`) |
| B-12 | Quality / Rendering | Low | [blog/[slug]/page.tsx:102-129](src/app/blog/%5Bslug%5D/page.tsx#L102-L129) vs [blogs.ts:2](src/data/blogs.ts#L2) | The `BlogSection` type allows `"quote"` and `"list"`, but the renderer returns `null` for them, so such content would silently disappear. No current post uses them. | Implement both renderers, or narrow the type. | **Fixed**: blog now renders `quote` and `list` sections |
| B-13 | Quality / Minor | Low | [Navbar.tsx:28-39](src/components/layout/Navbar.tsx#L28-L39), [Navbar.tsx:55-66](src/components/layout/Navbar.tsx#L55-L66) | The scroll listener is not `{ passive: true }`. The hash-scroll effect is missing the `isHome` dependency. | Make the listener passive and fix the effect's dependencies. | **Fixed**: passive scroll listener; `isHome` dependency added |

---

## 3. Critical and High findings in detail

### S-01 (Critical): Vulnerable Next.js version

**Evidence:** [package.json:16](package.json#L16)

```json
"next": "16.2.9",
...
"eslint-config-next": "16.2.9",
```

`npm audit` result: **1 critical, 8 high, 1 moderate**. The critical one is `next` (range `9.3.4-canary.0 - 16.4.0`). The advisories that apply to this app's configuration include:

- **Image Optimization API RCE / SSRF / DoS** (GHSA-2xp9-vwfh-vxw4, GHSA-2464-fhr4-w9xw, GHSA-cjq9-62q9-8jv4, GHSA-q8wf-6r8g-63ch). `/_next/image` is enabled by default and the app uses `next/image` ([Logo.tsx:2](src/components/ui/Logo.tsx#L2)).
- **SSG/ISR cache poisoning** (GHSA-4jqv-mc3x-m676, GHSA-mcj8-r9mp-w47p). All project and blog pages are statically generated.
- **RCE on Windows-hosted servers** (GHSA-p293-qw3h-jr36). This applies if the site is ever self-hosted on Windows, which is the dev OS here.
- Transitive `sharp` (libvips/libheif/librsvg CVEs) and `postcss` advisories are pulled in by `next`.

**Fix:**

```bash
npm install next@16.4.3 eslint-config-next@16.4.3
npm audit fix          # brace-expansion, browserslist, js-yaml, nanoid, source-map-js, zod, baseline-browser-mapping
npm run build && npm run lint
```

`npm audit` marks the Next upgrade as `isSemVerMajor: false`. Before upgrading, read the release notes in `node_modules/next/dist/docs/`, as `AGENTS.md` requires.

---

### S-02 (High): Phishing relay via HTML injection in the Apps Script emails

**Evidence:** `SETUP_INQUIRY.md` (the deployed Google Apps Script):

```javascript
// line 64-66
var customerEmail = data.email || "";
var customerPhone = data.phone || "N/A";
var customerMessage = data.message || "No message provided";
...
// line 101-106 — unescaped interpolation into HTML
"<p>Dear <b>" + customerName + "</b>,</p>" +
...
"<p style='...'>\"" + customerMessage + "\"</p>" +
...
// line 118-122 — sent to whatever address the submitter typed
MailApp.sendEmail({
  to: customerEmail,
  subject: customerSubject,
  htmlBody: customerHtmlBody
});
```

The Next.js route only trims the values and prefixes a quote to formula characters ([route.ts:34-41](src/app/api/inquiry/route.ts#L34-L41)). It does no HTML escaping and no email validation.

**Attack:**
```
POST /api/inquiry
{"name":"Customer</b><h2>Your booking deposit failed</h2><a href='https://evil.example/pay'>Re-pay now</a><b>",
 "email":"victim@example.com","phone":"9999999999","message":"x"}
```
The victim receives a genuine email from the Nivasan Google account, titled "We have received your inquiry - Nivasan Homes", containing the attacker's link. Repeated at scale, this also burns the Google account's sending reputation and MailApp daily quota, which blocks real lead notifications.

**Fix (Apps Script):**

```javascript
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
var customerName    = esc(data.name).slice(0, 100) || "Customer";
var customerEmail   = String(data.email || "").trim();
var customerPhone   = esc(data.phone).slice(0, 20);
var customerMessage = esc(data.message).slice(0, 2000);
var projectName     = esc(data.project) || "General Inquiry";

var EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;
if (customerEmail && EMAIL_RE.test(customerEmail)) {
  // Auto-reply: do NOT echo the free-text message back to an unverified address.
  MailApp.sendEmail({ to: customerEmail, subject: customerSubject, htmlBody: customerHtmlBodyWithoutMessage });
}
```

Also escape the values used in `href='mailto:…'` and `href='tel:…'`. Add matching length and format validation in the Next.js route (S-05) so bad input never reaches the script.

---

### S-03 (High): Rate limiter is spoofable, per-instance and leaky

**Evidence:** [route.ts:4-31](src/app/api/inquiry/route.ts#L4-L31), [route.ts:46-47](src/app/api/inquiry/route.ts#L46-L47)

```ts
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
...
const forwardedFor = request.headers.get("x-forwarded-for");
const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
```

Problems:
- `X-Forwarded-For: <random>` gives a fresh quota on every request wherever the proxy *appends* to the header instead of replacing it (nginx default, many PaaS). On Vercel, the platform sets this header, but the code does not rely on a trusted source.
- The `Map` lives in one function instance. Serverless scale-out and cold starts reset it.
- Entries are never deleted, so with spoofed IPs the `Map` grows until the instance runs out of memory.
- If no header is present, all users share `"127.0.0.1"`, so 5 spam requests block every real customer for 10 minutes.

**Fix (sketch):**

```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 m"),
});

function clientIp(req: Request) {
  // Prefer the platform-set header; never trust the left-most XFF entry.
  return req.headers.get("x-real-ip")
    ?? req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim()
    ?? "unknown";
}

const { success } = await ratelimit.limit(clientIp(request));
```

Also verify a Cloudflare Turnstile or reCAPTCHA token server-side before calling the Apps Script. This is the main defence against S-02 at scale.

---

### S-04 (High): Leads silently discarded when `GOOGLE_SCRIPT_URL` is missing

**Evidence:** [route.ts:88-106](src/app/api/inquiry/route.ts#L88-L106)

```ts
const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
if (!scriptUrl) {
  console.warn("GOOGLE_SCRIPT_URL environment variable is not defined!");
  console.info("Simulated sanitized submission details:", {
    name: cleanName, email: cleanEmail, phone: cleanPhone, project: cleanProject, message: cleanMessage, ...
  });
  return NextResponse.json({ status: "success", message: "Inquiry simulated successfully (Development Mode ...)" });
}
```

There is no `NODE_ENV` check. A production or preview deployment without the variable shows customers "Inquiry Received". The lead is lost, and the customer's PII is written to hosting logs.

**Fix:**

```ts
const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
if (!scriptUrl) {
  if (process.env.NODE_ENV === "production") {
    console.error("[inquiry] GOOGLE_SCRIPT_URL missing in production");
    return NextResponse.json(
      { status: "error", message: "We could not submit your inquiry. Please call +91 98423 23071." },
      { status: 503 },
    );
  }
  console.warn("[inquiry] GOOGLE_SCRIPT_URL not set: dev mock, nothing stored");
  return NextResponse.json({ status: "success", message: "Dev mock: not stored." });
}
```

---

### P-01 (High): ~72 MB of unoptimised images served raw

**Evidence:** All project imagery is rendered with plain `<img>` (ESLint `@next/next/no-img-element` at [ProjectsList.tsx:176](src/app/projects/ProjectsList.tsx#L176), [FeaturedProjects.tsx:118](src/components/sections/FeaturedProjects.tsx#L118), [projects/[id]/page.tsx:944](src/app/projects/%5Bid%5D/page.tsx#L944), [ProjectGallery.tsx:190](src/components/sections/ProjectGallery.tsx#L190), [Lifestyle.tsx:37](src/components/sections/Lifestyle.tsx#L37)):

```tsx
<img src={project.image} alt={project.name} className="w-full h-full object-cover ..." />
```

The source files are PNG photographs of 2.2–2.9 MB each (20+ files over 2 MB; 50 files, 72 MB in total). `/projects` renders 15 cards in a grid. The cards are about 500 px wide, but the browser downloads the full-resolution PNGs, roughly 30 MB for one page view.

**Fix:**

```tsx
import Image from "next/image";

<Image
  src={project.image}
  alt={project.name}
  fill
  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
  className="object-cover ..."
  priority={index < 3}
/>
```

Do this only **after** S-01 (the Image Optimization API is where the critical Next.js CVEs are). Alternatively, pre-convert the assets once with `sharp`/`squoosh` to WebP at ≤1600 px and keep `<img loading="lazy" decoding="async">`.

---

## 4. Prioritised fix plan

| Order | Items | Why this order | Effort |
|---|---|---|---|
| **1. Today** | **S-01** upgrade Next.js to 16.4.3 + `npm audit fix` | Publicly known critical advisories, including unauthenticated RCE paths. One command, non-breaking. | 30 min + smoke test |
| **2. Today** | **S-02** escape HTML / validate email in the Apps Script and redeploy it; **S-04** stop faking success in production | S-02 lets anyone send phishing email from the company's account right now. S-04 can silently lose sales leads. Both are small edits. | 1 h |
| **3. This week** | **S-03** shared rate limit + CAPTCHA; **S-05** zod validation and length caps; **S-06** generic client errors; **B-05** stop corrupting phone numbers | Hardens the only server endpoint and makes S-02 abuse impractical. All changes are in one file. | 0.5–1 day |
| **4. This week** | **S-07** security headers; **S-09** Content-Type/Origin check | Cheap defence-in-depth (clickjacking, HSTS) in `next.config.ts`. | 1–2 h |
| **5. Next sprint** | **P-01**, **P-02**, **P-03** media optimisation | Largest effect on user experience, SEO (Core Web Vitals) and mobile conversion. Do it after S-01 so `next/image` runs on a patched optimiser. | 1 day |
| **6. Next sprint** | **B-01** broken `/gallery` images; **B-02** real 404s; **B-04** scroll-lock bug | Visible bugs that hurt SEO and UX. | 2–3 h |
| **7. Backlog** | **B-03** single project data source; **B-06** lint to zero + CI; **B-07** delete dead code; **B-09** tests for `/api/inquiry`; **P-04**–**P-06**; **B-08**, **B-10**–**B-13**; **S-08**, **S-10**, **S-11** | Maintainability work that prevents future drift and regressions. | 1–2 days total |

---

## 5. Manual actions required (cannot be done from code)

1. **Redeploy the Google Apps Script.** The backend lives in Google, not in this repo. After applying the S-02 fix in the Apps Script editor, create a **new deployment version** (Deploy → Manage deployments → Edit → New version). Otherwise the old vulnerable code keeps serving.
2. **Check the Google account for abuse.** In the sending account's Gmail "Sent" folder and the Sheet, look for inquiries with HTML or `<a href` in the name or message, or many submissions to unrelated email addresses. If you find any, review MailApp quota usage and consider notifying affected recipients.
3. **Treat the Apps Script URL as a secret, and rotate it if it may have leaked.** The Web App is deployed with access "Anyone" (`SETUP_INQUIRY.md:151`), so anyone who knows the `/exec` URL can call it directly and bypass every Next.js control. The URL is **not** in git history, which is good. If it was ever shared (chat, screenshots, a client bundle, a public repo fork), create a new deployment, archive the old one, and update `GOOGLE_SCRIPT_URL`. Consider adding a shared-secret field checked by the script (`if (data.token !== PropertiesService.getScriptProperties().getProperty("TOKEN")) return error`) and sending it from the route.
4. **Confirm `GOOGLE_SCRIPT_URL` is set in every hosting environment** (production *and* preview) until S-04's fix is deployed. Submit a test inquiry on the live site and confirm it reaches the Sheet and the inboxes.
5. **Provision a rate-limit store and CAPTCHA keys** (e.g. an Upstash Redis database and Cloudflare Turnstile site/secret keys) and add them as hosting environment variables for S-03.
6. **Confirm how GoDaddy sets `X-Forwarded-For`** so the rate limiter reads a trusted IP header. Ask GoDaddy support, or check your plan: cPanel Node.js (Passenger/Apache) or a VPS with nginx. Find out whether the proxy *replaces* the header or *appends* to it. Once you know, the limiter in `src/app/api/inquiry/route.ts` can switch to the right-most trusted hop. Until then, a client can spoof the IP to get extra attempts.
   - **GoDaddy + `next/image` (P-01):** image optimisation runs on your server and needs the `sharp` package (installed with Next.js). After deploying, open a project page and confirm the images load. If they don't, run `npm install` on the server so `sharp`'s native binary matches the server's OS.
   - **npm:** `vitest` was installed with `--legacy-peer-deps` because npm 11.3.0 crashes resolving its optional peers. A normal `npm install` / `npm ci` from the lockfile works. Upgrading npm (`npm install -g npm@latest`) should remove the need for the flag on future installs.
7. **Enable HSTS and HTTPS-only at the DNS/CDN layer**, and consider HSTS preload, once S-07 is deployed.
8. **Compress and re-host the brochure PDFs and hero video** (P-02/P-03). This needs the original design files or a PDF/video tool. Optionally rewrite git history with `git filter-repo` or move media to Git LFS to shrink the 212 MB repo. Coordinate with anyone else who has a clone.
9. **Business content review (B-07/B-08):** have Nivasan Homes confirm the founding year (1996 vs 2010), the delivered-unit and family counts, the Blue Heaven 1 photo and map, Viveka Enclave's unit mix, and replace the "(To be confirmed…)" FAQ answers. RERA advertising rules make inaccurate claims a regulatory risk.
10. **Turn on Dependabot or Renovate** on the GitHub repository so future Next.js security releases are proposed automatically.
