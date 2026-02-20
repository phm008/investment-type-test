# SEO Onboarding Checklist

Domain: `https://invotype.cc/`

## 1) Google Search Console
1. Open Search Console and add a property as `URL prefix` with `https://invotype.cc/`.
2. Choose `HTML tag` verification and copy the token.
3. Replace this value in `index.html`:
   - `google-site-verification`
4. Deploy.
5. Click `Verify` in Search Console.
6. Go to `Sitemaps` and submit:
   - `https://invotype.cc/sitemap.xml`

## 2) Naver Search Advisor
1. Add site `https://invotype.cc/`.
2. Choose `HTML tag` verification and copy the token.
3. Replace this value in `index.html`:
   - `naver-site-verification`
4. Deploy.
5. Complete ownership verification in Naver Search Advisor.
6. Submit sitemap:
   - `https://invotype.cc/sitemap.xml`

## 3) Post-submit Checks
1. Open `https://invotype.cc/robots.txt` and verify sitemap URL exists.
2. Open `https://invotype.cc/sitemap.xml` and verify status `200`.
3. Use URL inspection in both tools for the homepage.
4. Recheck indexing status after 24-72 hours.

## 4) Next SEO Tasks
1. Create dedicated `og-image` (1200x630) and update `og:image`/`twitter:image`.
2. Add indexable static pages for each investment type.
3. Add internal links from homepage to those pages.
