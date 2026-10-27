# Bar Restaurant Go Slow

Site vitrine du Bar Restaurant Go Slow, à Atakpamé (Togo).

## Démarrage

```bash
npm install
npm run dev
```

Le site est disponible sur `http://localhost:3000`.

## Scripts

- `npm run dev` : serveur de développement.
- `npm run build` : build de production.
- `npm run start` : serveur de production.
- `npm run lint` : analyse ESLint.
- `npm run typecheck` : vérification TypeScript.
- `npm run format` : formatage Prettier.
- `npm run format:check` : vérification du formatage.

## Structure

- `app/` : routes et fichiers système Next.js.
- `components/` : composants d'interface, sections, panier, formulaires et animations.
- `lib/` : données, formats, WhatsApp et SEO.
- `public/` : images, logo et vidéos.

Les données passent uniquement par `lib/data/index.ts`.
