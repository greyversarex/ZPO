# Design Guidelines: State Enterprise Prosthetic and Orthopedic Plant of Dushanbe

## Design Philosophy
**Brand Personality:** Trustworthy, Technological, Caring, Governmental but Modern
- Medical aesthetic that balances professionalism with warmth
- Modern governmental institution appearance with accessible, patient-focused design
- Emphasis on rehabilitation, dignity, and technological advancement

## Color Palette
- **Primary:** Deep Teal (#0F766E) - Main brand color, headers, key sections
- **Secondary:** Clean White (#F8FAFC) - Backgrounds, cards, clean spaces
- **Accent:** Gold/Amber (#F59E0B) - Call-to-action buttons, highlights (reflecting national emblem)

## Typography
- **Font Family:** Inter or Roboto (clean, modern sans-serif)
- **Language:** All content in Tajik (Cyrillic script)
- Ensure excellent readability for Cyrillic characters across all sizes

## Layout & Structure

### Header (Sticky Navigation)
- Logo placeholder with medical icon
- Site title: "Заводи протезию ортопедии шаҳри Душанбе"
- Navigation links: Асосӣ | Дар бораи мо | Маҳсулот | Ба беморон | Тамос
- Prominent CTA button: "Қабули дархост" (amber accent color)

### Hero Section (Full-width, Impactful)
- **Background Image:** High-quality medical/rehabilitation imagery with dark overlay
- **Headline:** Large, bold: "Барқарорсозии ҳаракат – Таъмини ҳаёти шоиста"
- **Sub-headline:** "Истеҳсоли протезҳо, воситаҳои ортопедӣ ва тавонбахшии маъюбон дар сатҳи давлатӣ"
- **Floating Stats Badges:** Three modern badge cards displaying:
  - "4 Филиал" 
  - "Хизматрасонии ройгон"
  - "Таҷҳизоти муосир"
- Buttons on images must have blurred backgrounds for readability

### About Section (Interactive & Visual)
- Mission statement highlighting rehabilitation and social integration
- Reference to Law on Social Protection
- **Branch Display:** Interactive map or visual list showing 4 locations:
  - Марказ: ш. Душанбе
  - Филиали ш. Хуҷанд
  - Филиали ш. Кӯлоб
  - Филиали ш. Хоруғ

### Products & Services Grid (Hover-Enhanced Cards)
Four main service cards with icons, titles, descriptions:
1. **Протезҳо** - Upper/lower limb prosthetics
2. **Ортопедия** - Orthopedic shoes, insoles (adults/children)
3. **Воситаҳои ёрирасон** - Bandages, corsets, crutches, wheelchairs
4. **Статсионар** - In-patient rehabilitation with accommodation

### Patient Guide Section (Accordion Component)
Clean, accessible accordion with three tabs:
- **Tab 1:** "Кӣ ҳуқуқи ройгон дорад?" (Eligibility - Groups I & II disabled, children under 18, war veterans)
- **Tab 2:** "Ҳуҷҷатҳои зарурӣ" (Required documents - 4-item list)
- **Tab 3:** "Раванди қабул" (Application process steps)

### Legal Base Section
- Reference Government Resolution No. 604 and 448
- Mention Law on Social Protection of Disabled Persons
- Clean, official presentation

### Contact Section
- Address with map placeholder (Dushanbe location)
- Phone numbers (placeholder format: +992...)
- Working hours: Mon-Fri, 8:00-17:00
- Contact form with amber CTA button

## Images Strategy
- **Hero:** Large, full-width medical/rehabilitation scene (keywords: prosthesis, rehabilitation, medical care, doctor with patient)
- **About Section:** Branch locations, facility photos
- **Services Cards:** Product-specific imagery (prosthetics, orthopedic equipment, wheelchairs)
- All images from Unsplash with keywords: medical, prosthesis, doctor, rehabilitation, orthopedic
- Professional, respectful imagery showing dignity and hope

## Animations (Framer Motion)
- Fade-in effects for section entries
- Slide-up animations for cards and content blocks
- Smooth transitions between pages
- Subtle hover effects on service cards
- Keep animations professional and non-distracting

## Responsive Design
- Mobile-first approach ensuring excellent experience on all devices
- Stacked layouts for mobile, grid layouts for desktop
- Touch-friendly accordions and navigation on mobile
- Optimized image sizes for performance

## Spacing & Layout Patterns
- Use Tailwind spacing units: 4, 8, 12, 16, 20 for consistency
- Generous whitespace around sections (py-16 to py-24)
- Card padding: p-6 to p-8
- Container max-width: 7xl for main content areas