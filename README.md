# Bar Restaurant Go Slow

Site vitrine officiel du Bar Restaurant Go Slow, situé à Atakpamé au Togo.
Le document de référence du projet est [go-slow-cahier-des-charges.md](./go-slow-cahier-des-charges.md).

## Prérequis et installation

Node.js (version 20 ou supérieure recommandée) et npm.

```bash
npm install
```

## Commandes disponibles

- `npm run dev` : lance le serveur de développement local (sur `http://localhost:3000`).
- `npm run lint` : exécute l'analyse statique ESLint.
- `npm run typecheck` : valide les types TypeScript en mode strict (`tsc --noEmit`).
- `npm run build` : génère la version de production optimisée.
- `npm run start` : lance le serveur de production après le build.
- `npm run format` : formate l'ensemble des fichiers avec Prettier et le plugin Tailwind CSS.
- `npm run format:check` : vérifie la conformité du formatage de code.

## Variables d'environnement

Les variables requises sont documentées dans `.env.example`.
Pour le développement local, configurez un fichier `.env.local` :

- `NEXT_PUBLIC_SITE_URL` : URL canonique du site (ex. `http://localhost:3000`).
- `NEXT_PUBLIC_INDEXING` : activer (`true`) ou bloquer (`false`) l'indexation par les moteurs de recherche. En local et en préproduction, cette valeur est à `false` (les métadonnées appliquent `noindex, nofollow` et `robots.txt` applique `Disallow: /`).
- `NEXT_PUBLIC_WHATSAPP_NUMBER` : numéro de téléphone au format international pour les échanges WhatsApp (ex. `22890000000`).
- `NEXT_PUBLIC_MAPS_URL` : lien direct vers la fiche Google Maps.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` : jeton de validation pour la Google Search Console.
- `NEXT_PUBLIC_SANITY_PROJECT_ID` et `NEXT_PUBLIC_SANITY_DATASET` : identifiants du CMS Sanity (utilisés en Phase 2).

## Architecture du projet

- `app/` : App Router Next.js avec routes publiques `(site)` et layout racine.
- `components/ui/` : bibliothèque de composants d'interface réutilisables.
- `components/motion/` : composants et effets d'animation accessibles.
- `lib/data/` : couche d'abstraction des données (plats, catégories, horaires et paramètres).
- `lib/` : utilitaires (formatage, WhatsApp, SEO, easing, animations).
- `public/` : ressources statiques (images des plats, logo, vidéos).

## Checklist pré-lancement

- [ ] Basculer `NEXT_PUBLIC_INDEXING=true` dans l'environnement de production.
- [ ] Renseigner les identifiants réels Sanity et exécuter le script d'initialisation.
- [ ] Confirmer les numéros réels de téléphone et de WhatsApp du restaurant.
- [ ] Renseigner les horaires définitifs (fermeture et dimanche).
- [ ] Supprimer la route interne de démonstration `app/(dev)/ui/page.tsx`.
