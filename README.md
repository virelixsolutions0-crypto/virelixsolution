# Virelix Solutions — Website

This is a static multi-page website built for Virelix Solutions, a digital agency. It is built with plain HTML, CSS, and vanilla JavaScript — no framework or build step is required.

## 📁 Project Structure

```
nexora/
├── index.html          Home page
├── about.html          About Us page
├── services.html       Services page (rendered dynamically via JS)
├── portfolio.html      Portfolio / work showcase
├── pricing.html        Pricing plans (rendered dynamically via JS)
├── faq.html            FAQs page
├── contact.html         Contact Us page (form + contact info)
├── privacy.html         Privacy Policy
├── terms.html           Terms & Conditions
├── assets/
│   ├── style.css         All styling (layout, colors, animations, dark mode)
│   └── script.js         All dynamic content and logic (services, pricing, testimonials, FAQs, navigation, forms, dark mode, scroll reveal, etc.)
└── README.md             This file
```

> **Note:** The Blog page (`blog.html`) has been removed from the project, and its link has been removed from the navigation menu and footer on all pages.

## ⚙️ How to Run

No installation or server setup is required. Simply open `index.html` in a browser, or upload the entire `nexora/` folder to any static hosting provider (Netlify, Vercel, GitHub Pages, cPanel, etc.).

For local preview (optional, in case of CORS issues):
```bash
cd nexora
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## 🧩 Where the Content Comes From

Most of the site's dynamic content (`services.html`, `pricing.html`, home page testimonials, FAQs) is loaded from data arrays inside `assets/script.js`, rather than being written directly into the HTML. To update this content, edit **`assets/script.js`** instead of the HTML files.

| Content | Location in `script.js` |
|---|---|
| Services list (titles, descriptions, icons) | `const services = [...]` |
| Pricing plans (Starter/Professional/Enterprise) | `const plans = [...]` |
| Testimonials | `const testimonials = [...]` |
| FAQs | `const faqs = [...]` |
| "Why Choose Us" points | `const whyItems = [...]` |

## 📞 Contact Information (Currently Set)

- **Phone / WhatsApp:** 0349 7098640
- **Location:** Lahore, Punjab, Pakistan
- **Email:** hello@virelixsolutions.com
- **Pricing Currency:** PKR (Pakistani Rupees)

These are set in `contact.html` and `assets/script.js` (WhatsApp button link, map embed). To change them:
- Phone/Address → in the "Call Us" / "Visit Us" section of `contact.html`.
- WhatsApp number → the `<a href="https://wa.me/...">` tag with `id="whatsapp-btn"` at the end of every HTML file.
- Email → in the "Email Us" section of `contact.html`.

## ✏️ Common Edits

**Adding a new service:**
Add a new object inside the `services` array in `script.js`:
```js
{ cat:'Web', icon:'fa-globe', title:'New Service', desc:'Short description here.' }
```

**Updating pricing:**
Edit the `price` field of the relevant plan inside the `plans` array in `script.js` (the "Rs" symbol is already added automatically).

**Adding/removing a testimonial:**
Edit the `testimonials` array in `script.js` — `name`, `role`, and `text` fields.

**Dark mode:**
The site supports automatic light/dark theme toggling via the `themeToggle` button in the top-right of the navigation bar.

## 🛠️ Tech Stack

- HTML5
- CSS3 (custom, no framework)
- Vanilla JavaScript (no React/Vue)
- Font Awesome (icons, via CDN)
- Google Fonts — Poppins & Inter

## 📌 Recent Changes Log

- "Learn More" buttons changed to "Contact Us" (Services page)
- Pricing currency updated to PKR (Pakistani Rupees)
- Blog page and its navigation link removed
- Contact page updated with phone number and address (Lahore, Punjab, Pakistan)
- Testimonials replaced with Pakistani clients (Lahore, Karachi, Islamabad, Faisalabad, Rawalpindi, Multan, Sialkot, Peshawar)
- WhatsApp button linked to the new Pakistani number across all pages
