# Cahier des charges : Site vitrine Bar Restaurant Go Slow

**Atakpamé, Togo** · Version 5 · Mise en ligne par phases · Next.js + Sanity + Vercel

---

## 0. Résumé

| Élément | Valeur |
|---|---|
| Client | Bar Restaurant Go Slow, Atakpamé (Togo) |
| Type | Site vitrine + réservation et commande via WhatsApp + espace admin |
| Slogan | Bonne cuisine • Bon moment |
| Stack | Next.js (App Router, TypeScript) · Tailwind CSS · Framer Motion / GSAP · Sanity |
| Hébergement | Vercel. Le nom de domaine est géré par le développeur. **Attention : le plan gratuit (Hobby) est réservé à un usage non commercial, voir §15.** |
| Police | **Quicksand** (Google Fonts, police variable) |
| Stratégie | **Mise en ligne rapide d'une première version (Phase 1)** pour lancer l'indexation Google au plus tôt, puis développement continu par phases sur le site déjà en ligne (§16) |
| Priorité n°1 | Expérience **mobile** fluide et jolie, sans dégrader la version PC |
| Priorité n°2 | Référencement local : *restaurant Atakpamé, nourriture Atakpamé, où manger à Atakpamé, bons plats à Atakpamé* |

---

## 1. Objectifs

1. Présenter le restaurant, ses plats, ses boissons et ses promos.
2. Permettre de **réserver une table** : redirection vers WhatsApp avec un message prérempli (dont le repas souhaité).
3. Permettre de **commander en livraison** (Atakpamé et ses environs) via un message WhatsApp prérempli.
4. Se positionner sur les recherches locales liées à Atakpamé.
5. Donner au restaurant un **espace d'administration** pour ajouter lui-même ses plats, photos, promos et infos pratiques.
6. Offrir une expérience moderne, animée, rapide, sans aspect « généré par IA ».

---

## 2. Stack technique

| Besoin | Choix |
|---|---|
| Framework | Next.js, App Router, TypeScript, pages statiques avec revalidation (ISR) |
| Style | Tailwind CSS |
| Animations | Framer Motion (apparitions, transitions, gestes) + GSAP/ScrollTrigger (hero, scroll) |
| Défilement fluide | Lenis, **PC uniquement** (le défilement natif est conservé sur mobile) |
| CMS / admin | Sanity (plan gratuit), Studio intégré sur `/studio` |
| Images | `next/image` + CDN Sanity (WebP/AVIF, tailles responsives) |
| Panier | Zustand (ou Context) + `localStorage` |
| Hébergement | Vercel (voir la remarque sur l'offre en §15) |
| Statistiques | Google Analytics 4 via `@next/third-parties`, chargé uniquement après accord du visiteur (§19) |
| Mise à jour du contenu | Webhook Sanity → `/api/revalidate` (protégé par un secret) |

**Aucune base de données ni serveur à maintenir.**

---

## 3. Identité visuelle

### 3.1 Couleurs

Valeurs indicatives, à ajuster à la pipette directement sur le fichier du logo.

| Rôle | Valeur |
|---|---|
| Orange (accent unique) | `#F26A1B` |
| Anthracite (texte, sections sombres) | `#2A2A2A` |
| Crème (fond principal) | `#FBF7F0` |
| Crème foncé (cartes, séparateurs) | `#F1E9DC` |

L'orange sert uniquement d'accent : boutons principaux, détails, survols, soulignements animés. Il ne doit jamais couvrir de grandes surfaces.

### 3.2 Typographie : Quicksand

```tsx
// app/layout.tsx
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});
```

Une seule famille pour tout le site : le contraste vient du **poids** et de la **taille**, pas d'un mélange de polices.

| Usage | Poids | Remarques |
|---|---|---|
| Titres principaux (H1) | 700 | taille fluide `clamp(2.5rem, 8vw, 6rem)`, interlettrage légèrement serré |
| Titres de section (H2) | 600 | `clamp(1.75rem, 5vw, 3.5rem)` |
| Texte courant | 400–500 | 16–18 px, interligne 1.6 |
| Détails, étiquettes | 600 | majuscules espacées, petite taille |
| Prix | 700 | couleur orange |

### 3.3 Logo

- Monogramme G/S orange et anthracite, mot « GO SLOW », slogan « BONNE CUISINE • BON MOMENT ».
- À placer dans `public/logo/` : `go-slow.svg` (logo complet), `go-slow-mark.svg` (monogramme seul), versions claire et sombre. Si seul un PNG existe, le vectoriser.
- Favicon et icône d'application dérivés du monogramme.

### 3.4 Ton éditorial

Chaleureux, posé, concret, en français du quotidien. L'esprit « Go Slow » : prendre son temps, bien manger, passer un bon moment. Pas de formules creuses.

---

## 4. Contenu par défaut

### 4.1 Informations pratiques

| Info | Valeur |
|---|---|
| Nom | Bar Restaurant Go Slow |
| Ville | Atakpamé, Togo |
| Téléphone / WhatsApp | **90000000** (provisoire, à remplacer). Lien WhatsApp : `https://wa.me/22890000000` |
| Localisation | https://maps.app.goo.gl/BsTbSbsZThnK3iMM6?g_st=aw |
| Code Plus (fiche Google) | G4CQ+5XV · coordonnées indicatives 7.5199662, 1.1402761 (à vérifier avec le lien Maps) |
| Horaires | **Du lundi au samedi, à partir de 8h** (source : page Facebook). Heure de fermeture et dimanche **à confirmer**. |
| Livraison | Dans Atakpamé et ses environs. Frais confirmés par le restaurant sur WhatsApp. |
| Réseaux | Page Facebook « Go Slow » (lien à ajouter) |

Toutes ces valeurs vivent dans le document Sanity **« Paramètres du site »**, pas dans le code : le restaurant pourra les modifier seul. Les valeurs ci-dessus servent de valeurs initiales.

### 4.2 Menu de départ (provisoire)

Les prix sont fictifs et les descriptions provisoires : le restaurant les remplacera depuis l'admin.

| Plat | Slug | Catégorie | Prix (FCFA) | Description provisoire |
|---|---|---|---|---|
| Ayimolou | `ayimolou` | Plats locaux | 1 500 | Riz et haricots, sauce relevée, accompagnement du jour |
| Foufou | `foufou` | Plats locaux | 1 500 | Pâte d'igname pilée, servie avec sa sauce |
| Akumé | `akume` | Plats locaux | 1 500 | Pâte de maïs, servie avec sauce et garniture |
| Khom | `khom` | Plats locaux | 1 500 | Spécialité togolaise, servie avec sa sauce (description à préciser par le restaurant) |
| Riz au gras | `riz-au-gras` | Plats locaux | 1 500 | Riz parfumé cuit dans une sauce savoureuse |
| Couscous | `couscous` | Plats locaux | 1 500 | Couscous servi avec sauce et viande |
| Spaghetti | `spaghetti` | Classiques | 1 000 | Spaghetti sauce maison, garniture au choix |
| Riz cantonais | `riz-cantonais` | Classiques | 2 000 | Riz sauté aux légumes, œuf et viande |
| Poulet | `poulet` | Classiques | 2 500 | Poulet grillé ou frit, accompagnement au choix |

**Catégories** : Plats locaux · Classiques · Boissons & rafraîchissements (créée mais **masquée tant qu'elle est vide**, le restaurant la remplira).

**Principe** : la source de vérité est Sanity. Si Sanity est vide, le site affiche ces données par défaut (`lib/data/default-dishes.ts`), ce qui évite un site vide au lancement. Un script `scripts/seed.ts` permet d'importer ces 9 plats et leurs photos dans Sanity en une commande, pour que le restaurant les retrouve dans son admin et les modifie.

**Photos** : placées par le développeur dans `public/images/plats/` (voir §14), avec le nom du slug : `ayimolou.jpg`, `foufou.jpg`, etc.

---

## 5. Plan du site

| Route | Contenu |
|---|---|
| `/` | Accueil |
| `/menu` | Menu complet par catégories, avec filtres |
| `/menu/[slug]` | Fiche d'un plat (génération statique de chaque plat) |
| `/promos` | Offres en cours |
| `/galerie` | Photos |
| `/a-propos` | L'esprit Go Slow |
| `/reserver` | Réservation |
| `/commander` | Panier et commande en livraison |
| `/contact` | Adresse, carte, horaires, téléphone, WhatsApp |
| `/studio` | Admin Sanity (non indexé) |

---

## 6. Page d'accueil : sections courtes, pensées mobile

Chaque section tient dans **un à deux écrans de téléphone maximum**, avec un seul message et une seule action.

| # | Section | Mobile | PC |
|---|---|---|---|
| 1 | **Hero vidéo** | Plein écran (100svh), logo, accroche, 2 boutons | Idem, vidéo plus large, texte aligné à gauche |
| 2 | **Bandeau défilant** | Noms des plats en défilement continu (marquee) | Idem, plus rapide |
| 3 | **Plats signatures** | Carrousel horizontal avec accroche (snap), cartes larges | Grille 3 à 4 colonnes |
| 4 | **Promos du moment** | Une carte à la fois, balayage latéral | Deux ou trois cartes côte à côte |
| 5 | **Le principe Go Slow** | Texte court + une photo en alternance | Deux colonnes asymétriques |
| 6 | **Aperçu du menu** | Onglets de catégories, liste compacte avec prix | Deux colonnes, photos plus grandes |
| 7 | **Livraison et réservation** | Deux grandes cartes d'action empilées | Deux colonnes |
| 8 | **Galerie** | Mosaïque défilante 2 colonnes | Mosaïque 4 colonnes |
| 9 | **Infos pratiques** | Horaires, adresse, bouton « Itinéraire », carte | Carte à droite, infos à gauche |
| 10 | **FAQ** | Accordéon animé | Accordéon centré |
| 11 | **Appel final** | « Réserver une table » en grand | Idem |
| 12 | **Pied de page** | Liens, réseaux, logo | Idem sur 3 colonnes |

---

## 7. Hero vidéo (générée avec Google Flow)

**Statut : la vidéo est créée.** Il reste à l'exporter, la compresser (MP4 et WebM), préparer la version verticale et l'image d'aperçu, puis les placer dans `public/video/`.

### 7.1 Fichiers à fournir

```
public/video/
├─ hero.mp4            (H.264, 1920×1080, 6–10 s, boucle, sans audio, ≤ 5 Mo)
├─ hero.webm           (VP9/AV1, même rendu, plus léger)
├─ hero-mobile.mp4     (1080×1920 ou 720×1280, cadrage vertical, ≤ 3 Mo)
└─ hero-poster.jpg     (première image de la vidéo, 1920×1080, ≤ 200 Ko)
```

### 7.2 Comportement

- `autoPlay muted loop playsInline preload="metadata"` pour l'autoplay iOS et Android.
- L'image `hero-poster.jpg` s'affiche immédiatement : c'est elle qui compte pour la performance (LCP).
- La vidéo mobile (cadrage vertical) est servie sur petit écran, la vidéo PC sur grand écran.
- **Repli sur l'image fixe** (sans vidéo) si : `prefers-reduced-motion`, mode économie de données, connexion lente.
- Voile sombre léger sur la vidéo pour garantir la lisibilité du texte (contraste conforme).
- Contenu du hero par-dessus : logo, accroche en deux lignes, boutons **Réserver** et **Commander**, indicateur de défilement discret.

### 7.3 Conseils pour la vidéo

Plans lents (en accord avec « Go Slow ») : vapeur d'un plat, mains qui servent, lumière chaude, détails de table. Boucle propre (fin = début), aucun texte incrusté dans la vidéo.

Si les fichiers dépassent la limite raisonnable du plan gratuit de Vercel (bande passante), les héberger sur un service vidéo gratuit et garder uniquement l'image d'aperçu dans `public/`.

---

## 8. Mobile d'abord, responsive sur tous les écrans

**Principe** : on conçoit d'abord pour un téléphone de 360 px, puis on enrichit pour tablette et PC. Tout doit être testé sur de vrais téléphones.

- **Breakpoints** : base mobile, `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Conteneur maximal : 1280 px.
- **Typographie fluide** avec `clamp()`, aucun texte coupé, aucune barre de défilement horizontale.
- **Zones tactiles** d'au moins 44×44 px, espacement généreux entre les boutons.
- **Barre d'actions fixe en bas** (mobile) : Réserver · Commander · Appeler. Elle respecte `env(safe-area-inset-bottom)` et se masque doucement quand le clavier s'ouvre.
- **Panier en tiroir** qui remonte du bas de l'écran (bottom sheet) sur mobile, panneau latéral sur PC.
- **Carrousels** avec accroche (scroll-snap) et geste de balayage naturel, indicateurs discrets.
- **Menu de navigation** plein écran animé sur mobile, barre horizontale sobre sur PC.
- **Hauteurs** en `svh`/`dvh` pour éviter les sauts dus à la barre d'adresse des navigateurs mobiles.
- **Aucune fonction dépendant du survol** : les effets de survol (PC) ont toujours un équivalent tactile.
- **Images** : tailles adaptées via `sizes`, formats modernes, chargement différé sauf contenu au-dessus de la ligne de flottaison.
- **Polices et scripts** légers : le site doit rester fluide sur un téléphone d'entrée de gamme et une connexion moyenne.
- **PC** : les mises en page s'élargissent (grilles, colonnes asymétriques, grandes photos) sans simple étirement de la version mobile.

---

## 9. Animations

Le mouvement est présent dans tout le site, mais **lent, fluide et au service du contenu**, fidèle à « Go Slow ».

**Réglages communs**
- Easing principal : `cubic-bezier(0.22, 1, 0.36, 1)`
- Durées : 0,5 à 1 s pour les apparitions, 0,2 à 0,3 s pour les micro-interactions
- Décalage en cascade (stagger) de 60 à 100 ms
- Animation de propriétés performantes uniquement (`transform`, `opacity`, `clip-path`)
- Respect de `prefers-reduced-motion` (animations réduites ou supprimées)

**Style : moderne et maîtrisé**

Révélations par masque (`clip-path`), titres qui apparaissent mot par mot, défilement horizontal à inertie, boutons légèrement magnétiques sur PC, parallaxe très discrète, transitions de page fluides (View Transitions). Jamais de rebonds gadget, de particules, d'effets néon ni d'animation qui gêne la lecture.

**Catalogue**

| Où | Animation |
|---|---|
| Chargement | Le monogramme G/S se dessine (trait SVG animé), puis le rideau se lève sur le hero |
| Hero | Titre révélé ligne par ligne, boutons qui apparaissent en décalé, léger effet de profondeur au défilement |
| Défilement | Chaque section apparaît en douceur (fondu + glissement), images révélées par `clip-path` |
| Bandeau | Texte défilant continu avec pause au toucher/survol |
| Cartes de plats | Zoom lent de l'image, prix qui se met en valeur, léger relief au survol (PC) |
| Carrousels | Inertie naturelle, carte active légèrement agrandie |
| Menu | Changement d'onglet avec transition fluide des listes |
| Panier | L'article « vole » vers l'icône du panier, compteur animé, tiroir qui glisse |
| Boutons | Remplissage orange qui monte au survol/appui, léger retour tactile |
| Liens | Soulignement qui se dessine |
| Formulaires | Libellés flottants, validation douce, message de confirmation animé |
| FAQ | Accordéon à hauteur animée, icône qui pivote |
| Pages | Transition discrète entre les pages (fondu et léger glissement) |
| Navigation | Menu mobile plein écran avec liens révélés en cascade |
| Galerie | Visionneuse plein écran avec glissement et zoom |

---

## 10. Fonctionnalités

### 10.1 Réservation (`/reserver`)

Champs : nom, téléphone, date, heure, nombre de personnes, plats souhaités (sélection optionnelle dans le menu), remarque.

Validation : date non passée, heure dans les horaires d'ouverture, nombre de personnes valide.

Au clic sur **« Réserver sur WhatsApp »**, ouverture de :

```
https://wa.me/22890000000?text=<message encodé>
```

Modèle de message :

```
Bonjour Go Slow, je souhaite réserver une table.

Nom : Kossi
Date : samedi 14 novembre, 19h30
Personnes : 4
Plats souhaités : Foufou, Poulet
Remarque : près de la fenêtre si possible
```

### 10.2 Commande en livraison (`/commander`)

1. Ajout des plats au panier depuis le menu et les fiches (quantités modifiables).
2. Formulaire : nom, téléphone, quartier, repère pour trouver l'adresse, remarque.
3. Message WhatsApp prérempli :

```
Bonjour Go Slow, je souhaite commander en livraison.

- 2 × Foufou (3 000 FCFA)
- 1 × Poulet (2 500 FCFA)
Sous-total : 5 500 FCFA (hors frais de livraison)

Nom : …
Téléphone : …
Quartier : …
Repère : …
```

Mention affichée : « Livraison dans Atakpamé et ses environs. Les frais vous sont confirmés sur WhatsApp. » Un plat marqué indisponible ne peut pas être ajouté. Le panier est conservé si la page est rechargée.

### 10.3 Espace admin (Sanity, `/studio`)

Le restaurant gère lui-même, depuis son téléphone ou un ordinateur :

| Document | Champs |
|---|---|
| **Plat** | nom, slug, catégorie, description, prix (FCFA), photo, étiquettes (épicé, végétarien…), plat signature, disponible oui/non |
| **Catégorie** | nom, ordre d'affichage |
| **Promo** | titre, description, image, date de début et de fin, plats concernés, actif oui/non |
| **Galerie** | photos avec légende |
| **Paramètres du site** | téléphone, numéro WhatsApp, adresse, lien Maps, horaires par jour, fermetures exceptionnelles, bandeau d'annonce, réseaux sociaux, texte de livraison |

Accès sécurisé par invitation (e-mail ou Google). Interface en français quand c'est possible, avec des descriptions d'aide sous chaque champ. Les images sont optimisées automatiquement. La route `/studio` est exclue de l'indexation.

À la publication, un webhook déclenche la revalidation des pages concernées : le site est à jour en quelques secondes.

---

## 11. SEO

**Règle d'or** : « Atakpamé » accompagne toujours « Go Slow ».

### 11.1 Balises par page

| Page | Title (modèle) |
|---|---|
| Accueil | Bar Restaurant Go Slow à Atakpamé \| Plats locaux, boissons & livraison |
| Menu | Menu du restaurant Go Slow à Atakpamé \| Foufou, Ayimolou, Akumé… |
| Fiche plat | {Plat} à Atakpamé \| Go Slow |
| Promos | Promotions \| Restaurant Go Slow Atakpamé |
| Réserver | Réserver une table à Atakpamé \| Go Slow |
| Commander | Livraison de repas à Atakpamé \| Go Slow |
| Contact | Adresse, horaires et contact \| Go Slow Atakpamé |

Chaque page a une description unique (150 caractères environ), un seul H1, une hiérarchie H2/H3 logique, des URL propres et des balises canoniques.

### 11.2 Données structurées (JSON-LD)

- `Restaurant` : nom, adresse, coordonnées GPS, téléphone, horaires (`openingHoursSpecification` du lundi au samedi, ouverture 08:00, fermeture à confirmer), cuisine servie, fourchette de prix, menu, `sameAs` (Facebook)
- `Menu` / `MenuItem` pour les plats
- `FAQPage` pour la FAQ
- `BreadcrumbList` pour les fiches

### 11.3 Technique

`sitemap.xml` et `robots.txt` générés automatiquement, `lang="fr"`, Open Graph et Twitter Cards avec image de partage (`public/images/og-default.jpg`, 1200×630), menu en vrai texte (jamais en image), `alt` descriptifs sur toutes les images, statique pour la vitesse.

### 11.4 Contenu

FAQ naturelle, par exemple « Où manger à Atakpamé ? », « Livrez-vous à Atakpamé et dans les environs ? », « Quels sont vos horaires ? », « Comment réserver une table ? ». Descriptions de plats rédigées à la main. **Pas de bourrage de mots-clés.**

### 11.5 Hors site (le plus important pour le local)

1. **Revendiquer la fiche Google Business Profile** (« Vous êtes le propriétaire ? ») puis y ajouter téléphone, horaires, site web, photos et catégories.
2. Encourager les clients à laisser des avis Google.
3. Harmoniser nom, adresse et téléphone sur Facebook et les annuaires où le restaurant apparaît déjà.
4. Déclarer le site dans **Google Search Console** et **Bing Webmaster Tools** et soumettre le sitemap.

*Aucun classement n'est garanti, mais ces bases sont celles qui font remonter un restaurant sur les recherches locales.*

---

## 12. Performance et accessibilité

- Objectif Lighthouse : **90+** en performance, accessibilité, bonnes pratiques et SEO, sur mobile.
- LCP rapide grâce à l'image du hero, polices chargées avec `next/font`, aucun script inutile.
- Contrastes conformes, navigation au clavier, focus visibles, `alt` sur les images, étiquettes de formulaires, `prefers-reduced-motion` respecté.
- Navigateurs ciblés : Chrome, Safari (iOS), Samsung Internet, Firefox, Edge.

---

## 13. Règles « zéro trace d'IA » et signature visuelle

**Principe** : tout ce qui est « de base » (par défaut) est remplacé par une version dessinée pour Go Slow. Le visiteur ne doit reconnaître ni un modèle, ni une bibliothèque, ni un texte générique.

### 13.1 Bordures et formes : stylées, pas génériques

À éviter absolument : la carte à bordure grise de 1 px, ombre légère et coins arrondis identiques partout.

Signature retenue (2 ou 3 de ces idées, appliquées avec cohérence) :

- **Cadres décalés** : un fin trait orange décalé de 8 à 12 px derrière certaines photos, comme un cadre posé en retrait.
- **Coins dessinés** : un seul coin très arrondi ou un angle coupé, inspirés de la feuille du monogramme, au lieu de quatre coins égaux.
- **Photos en formes** : arche, goutte ou feuille pour quelques images clés, au lieu du rectangle partout.
- **Séparateurs dessinés** : traits SVG tracés à la main ou vagues douces à la place des filets droits.
- **Bordures qui se dessinent** : le tracé se complète au survol ou à l'apparition (`stroke-dashoffset`), sans lueur néon.
- **Rayons de coins en nombre limité** : deux valeurs définies dans le thème, jamais « arrondi maximal » sur tout.

### 13.2 Tout ce qui est « par défaut » est personnalisé

- Favicon, titres d'onglet et descriptions : rien de « Create Next App » ni de logo du framework.
- Boutons, champs, cases, sélecteurs de date et d'heure (le sélecteur natif du navigateur est remplacé), accordéons, notifications, infobulles : aucun composant gardé avec son style d'origine.
- Sélection de texte (`::selection` en orange doux), barre de défilement, anneau de focus, curseur sur PC.
- Pages d'erreur 404 et de crash personnalisées, écran de chargement personnalisé (voir §18).
- Aucune mention « généré par », « propulsé par » ou badge de plateforme.

### 13.3 Icônes, images, textes

- **Vraies icônes** : une seule bibliothèque d'icônes vectorielles à trait homogène (par exemple Phosphor), complétée par quelques icônes dessinées pour Go Slow (bol, couverts, livraison, horloge, repère). **Aucun emoji** dans l'interface, les titres ni les métadonnées.
- **Vraies photos** du restaurant et des plats, jamais d'images de banque sans lien avec la cuisine locale.
- **Textes** courts, concrets, en français du quotidien. Pas de formules creuses (« savoir-faire d'exception », « plongez dans », « découvrez notre univers »), pas de tirets longs à répétition, aucun « lorem ipsum ».
- **Code propre** : pas de commentaires génériques, pas de fichiers de démonstration, pas de `console.log`, pas de `TODO` oubliés.

### 13.4 Cohérence

Un seul accent de couleur, des espacements réguliers, des composants cohérents d'une page à l'autre, des mises en page variées et légèrement asymétriques plutôt qu'une suite de sections identiques.

---

## 14. Arborescence du projet

```
go-slow/
├─ app/
│  ├─ (site)/
│  │  ├─ page.tsx                  # Accueil
│  │  ├─ menu/page.tsx
│  │  ├─ menu/[slug]/page.tsx
│  │  ├─ promos/page.tsx
│  │  ├─ galerie/page.tsx
│  │  ├─ a-propos/page.tsx
│  │  ├─ reserver/page.tsx
│  │  ├─ commander/page.tsx
│  │  └─ contact/page.tsx
│  ├─ studio/[[...tool]]/page.tsx
│  ├─ api/revalidate/route.ts
│  ├─ layout.tsx · sitemap.ts · robots.ts
├─ components/ (ui · sections · cart · forms · motion)
├─ lib/
│  ├─ sanity/ (client, requêtes GROQ)
│  ├─ data/default-dishes.ts
│  ├─ whatsapp.ts · seo.ts · format.ts
├─ sanity/ (schémas : dish, category, promo, gallery, siteSettings)
├─ scripts/seed.ts
└─ public/
   ├─ logo/        go-slow.svg · go-slow-mark.svg
   ├─ video/       hero.mp4 · hero.webm · hero-mobile.mp4 · hero-poster.jpg
   └─ images/
      ├─ plats/    ayimolou.jpg · foufou.jpg · akume.jpg · khom.jpg · riz-au-gras.jpg
      │            couscous.jpg · spaghetti.jpg · riz-cantonais.jpg · poulet.jpg
      ├─ salle/    (photos du lieu)
      └─ og-default.jpg
```

**Format des photos de plats** : cadrage 4:3 ou carré, 1200 px de large minimum, JPG ou WebP, lumière naturelle.

---

## 15. Variables d'environnement et déploiement

```env
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # à définir uniquement en Production
NEXT_PUBLIC_WHATSAPP_NUMBER=22890000000
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=...
```

**Remarque importante sur l'offre gratuite de Vercel**

Selon les règles d'utilisation de Vercel, le plan gratuit **Hobby** est réservé à un usage personnel et non commercial ; tout usage commercial demande un plan payant (Pro). Le site d'un restaurant promeut une activité commerciale, donc il entre dans ce cadre. Trois options :

1. **Développer et tester sur Vercel Hobby** (aperçus, essais), puis passer au plan **Pro** au moment de la mise en ligne publique (environ 20 $ par mois d'après les tarifs affichés, à vérifier sur le site de Vercel).
2. **Héberger ailleurs gratuitement** si l'offre gratuite de l'hébergeur autorise l'usage commercial (par exemple Cloudflare). Next.js demande alors une configuration d'adaptation supplémentaire, à vérifier avant de choisir.
3. **Faire prendre en charge l'abonnement par le restaurant**, ce qui reste le plus simple et le plus propre pour un site client.

À décider **avant la mise en ligne publique** (Phase 1).

**Déploiement sur Vercel**

1. Pousser le projet sur GitHub.
2. Importer le dépôt dans Vercel et renseigner les variables d'environnement.
3. Dans Sanity : ajouter le domaine du site dans les origines CORS autorisées, créer le webhook vers `/api/revalidate`, inviter le gérant.
4. Connecter le nom de domaine (géré par le développeur) et soumettre le sitemap à Google Search Console.

---

## 16. Plan de réalisation par phases (mise en ligne rapide)

### 16.1 Principe

Google met du temps à découvrir, explorer puis classer un nouveau site (de quelques jours à plusieurs semaines, sans garantie). Plus le site est en ligne tôt, plus il accumule de signaux : pages indexées, ancienneté, avis, liens. On met donc en ligne **une première version déjà utile et soignée** (Phase 1), puis on continue à construire **sur le site déjà en ligne**, pendant que le référencement commence à travailler.

### 16.2 Règles pour ne rien perdre du référencement

- **URL définitives dès la Phase 1** (`/menu`, `/menu/[slug]`, `/reserver`, `/contact`) : on ne les renomme jamais ensuite.
- **Aucune page « en construction »** : chaque page publiée est complète et propre. Les pages futures n'existent pas encore plutôt que d'être vides.
- **Données abstraites** : les pages lisent leurs données via des fonctions (`getDishes()`, `getSettings()`). En Phase 1 elles lisent `default-dishes.ts` ; en Phase 2 elles lisent Sanity, **sans modifier les pages**.
- **Déploiement continu** : chaque amélioration passe par Git, avec un aperçu avant la mise en production.

### 16.3 Phase 1 : première version en ligne

| Inclus | Reporté à plus tard |
|---|---|
| Fondations : Next.js, Tailwind, Quicksand, thème, navigation, barre d'actions mobile | Admin Sanity |
| **Accueil** : hero vidéo, bandeau défilant, plats signatures, principe Go Slow, aperçu du menu, infos pratiques et carte, FAQ, appel final | Panier complet |
| **Menu** et **fiches des 9 plats** (données locales) | Promos |
| **Contact** (adresse, horaires, carte, WhatsApp, itinéraire) | Galerie, À propos |
| **Réservation** : formulaire vers WhatsApp avec message prérempli | Animations avancées |
| **Livraison** : bouton « Commander en livraison » vers WhatsApp avec message prérempli simple | |
| Animations essentielles : ouverture du hero, apparitions au défilement, boutons, FAQ | |
| **SEO de base complet** : titres et descriptions, JSON-LD (Restaurant, Menu, FAQ), sitemap, robots, Open Graph, favicon | |
| Responsive mobile et PC testé sur de vrais téléphones | |
| **Éléments système personnalisés** : favicon, loader, page 404, page d'erreur, CGU et mentions légales, confidentialité, robots.txt, sitemap (§18) | |
| **Google Analytics 4** avec bandeau de consentement personnalisé et clics clés suivis : réservation, commande, appel, itinéraire (§19) | |

**Le jour de la mise en ligne**

1. Déclarer le site dans Google Search Console et Bing Webmaster Tools, soumettre le sitemap.
2. Revendiquer la fiche Google Business Profile et y ajouter site web, téléphone, horaires, photos.
3. Mettre le lien du site sur la page Facebook et dans les annuaires existants.
4. Demander les premiers avis Google aux clients.
5. Vérifier dans Google Analytics (rapport « Temps réel ») que les visites et les clics WhatsApp remontent bien.

### 16.4 Conditions minimales avant la mise en ligne publique

Ces éléments sont indispensables, car ils seront lus par les clients **et enregistrés par Google** :

- **Le vrai numéro de téléphone/WhatsApp** : un faux numéro enverrait les messages de réservation à un inconnu et serait mémorisé par Google dans les données structurées.
- **Les vrais prix**, ou prix masqués jusqu'à confirmation.
- **Les horaires confirmés** (heure de fermeture, jour de repos).
- **De vraies photos**, au moins pour les plats mis en avant.
- **Un hébergement conforme** (voir §15).

Tant que ces éléments manquent, on publie sur l'adresse d'aperçu de Vercel avec l'indexation **désactivée** (`noindex`). On active l'indexation uniquement le jour du lancement.

### 16.5 Phase 2 : autonomie du restaurant

Sanity et Studio (schémas plat, catégorie, promo, galerie, paramètres), import des 9 plats avec leurs photos, webhook de revalidation, **panier complet** avec commande détaillée sur WhatsApp, promos, événements `ajout_panier` et `promo_clic` dans Google Analytics, prise en main par le gérant (15 minutes).

### 16.6 Phase 3 : finitions et richesse

Galerie, page À propos, animations avancées (monogramme qui se dessine au chargement, transitions entre pages, article qui vole vers le panier, visionneuse de photos), ajustements d'après les retours, audit Lighthouse et accessibilité.

### 16.7 Phase 4 : suivi continu

Suivi dans Search Console, avis Google, nouvelles photos et nouveaux plats, promos saisonnières, mise à jour de la FAQ selon les questions réelles des clients.

---

## 17. Listes de contrôle

### Avant la mise en ligne (Phase 1)

- [ ] Vrai numéro de téléphone et WhatsApp (remplacer 90000000)
- [ ] Heure de fermeture et jour(s) de repos (Facebook indique seulement « du lundi au samedi, à partir de 8h »)
- [ ] Vrais prix des 9 plats (ou prix masqués)
- [ ] Photos des 9 plats (au moins les plats signatures) et de la salle
- [ ] Vidéo du hero exportée : MP4, WebM, version mobile verticale, image d'aperçu
- [ ] Logo en SVG dans `public/logo/`
- [ ] Lien de la page Facebook
- [ ] Coordonnées GPS vérifiées à partir du lien Google Maps
- [ ] Compte Google Analytics créé au nom du restaurant et identifiant de mesure (G-…) récupéré
- [ ] Décision sur l'hébergement conforme (§15)
- [ ] Nom de domaine connecté à Vercel

### Contrôle « zéro trace » avant chaque mise en ligne

- [ ] Favicon personnalisé (plus aucun favicon du framework)
- [ ] Titre et description définis sur toutes les pages
- [ ] Aucun emoji dans l'interface ni dans les métadonnées
- [ ] Aucun composant avec son style d'origine (boutons, champs, sélecteurs de date et d'heure, accordéon, notifications)
- [ ] Bordures conformes à la signature de §13.1 (aucune carte grise générique)
- [ ] Loader testé avec une connexion lente
- [ ] Bandeau de consentement testé (accepter, refuser, « Gérer les cookies »)
- [ ] Rien n'est envoyé à Google Analytics avant l'accord, ni depuis les aperçus
- [ ] Pages 404 et de crash testées (forcer une erreur pour vérifier)
- [ ] CGU, mentions légales et confidentialité présentes et liées dans le pied de page
- [ ] `robots.txt` et `sitemap.xml` vérifiés
- [ ] Aucun texte de démonstration, aucun commentaire de code générique

### Le jour du lancement

- [ ] Indexation activée (retrait du `noindex`)
- [ ] Sitemap soumis à Google Search Console et Bing
- [ ] Fiche Google Business Profile revendiquée et complétée
- [ ] Lien du site ajouté sur Facebook et dans les annuaires
- [ ] Premiers avis Google demandés
- [ ] Google Analytics lié à Search Console, événements clés testés en « Temps réel »

### Phases suivantes

- [ ] Sanity et espace admin (Phase 2)
- [ ] Panier complet (Phase 2)
- [ ] Promos et galerie (Phases 2 et 3)
- [ ] Animations avancées et audit final (Phase 3)

---

## 18. Éléments système obligatoires et personnalisés

| # | Élément | Fichier / route | Spécification | Phase |
|---|---|---|---|---|
| 1 | **Favicon** | `app/icon.svg`, `app/apple-icon.png` (180×180), `favicon.ico` (32×32), `manifest.webmanifest` (icônes 192 et 512) | Monogramme G/S, version lisible en petit, adaptée au mode sombre du navigateur. Couleur du thème : orange. Aucun favicon par défaut. | 1 |
| 2 | **CGU** et **mentions légales** | `/cgu`, `/mentions-legales` | Usage du site, propriété des photos et du logo, réservations et commandes traitées via WhatsApp et confirmées par le restaurant, prix indicatifs, limite de responsabilité, droit applicable, identité du restaurant, hébergeur. Texte en français clair, à faire valider par le restaurant (voir note ci-dessous). | 1 |
| 3 | **Sitemap** | `app/sitemap.ts` | Généré automatiquement : pages, fiches plats, dates de mise à jour. Soumis à Google Search Console et Bing. | 1 |
| 4 | **Loading** | `app/loading.tsx` + loader d'ouverture | Le monogramme G/S se dessine (trait SVG) sur fond crème. Durée maximale d'environ 1,2 s, une seule fois par session. Il ne masque jamais le contenu au HTML (donc aucun impact SEO) et ne retarde pas l'affichage. Squelettes personnalisés (formes de cartes de plats, lueur orange douce) pour les listes. Version réduite si `prefers-reduced-motion`. | 1 |
| 5 | **robots.txt** | `app/robots.ts` | Autorise l'exploration, bloque `/studio` et `/api/`, indique l'adresse du sitemap. Mode « aperçu » : interdit tout et ajoute `noindex` tant que le lancement n'est pas décidé (variable d'environnement). | 1 |
| 6 | **Page 404 personnalisée** | `app/not-found.tsx` | Illustration issue du logo (assiette vide ou monogramme), message dans le ton Go Slow (par exemple « Cette page n'est pas au menu »), boutons « Retour à l'accueil » et « Voir le menu », trois plats suggérés, animation douce. Code HTTP 404 et `noindex`. | 1 |
| 7 | **Vraies icônes, pas d'emojis** | `components/ui/Icon.tsx` | Une seule bibliothèque à trait homogène, taille et épaisseur définies dans le thème, icônes dessinées pour les catégories et les actions. | 1 |
| 8 | **Politique de confidentialité** | `/confidentialite` | Données saisies dans les formulaires (nom, téléphone, quartier, remarque) utilisées uniquement pour composer le message WhatsApp et **non enregistrées sur un serveur** du site ; WhatsApp traite ensuite le message selon sa propre politique ; panier conservé dans le navigateur ; aucune publicité ; mesure d'audience par Google Analytics, **activée seulement après accord du visiteur** (données agrégées, durée de conservation, droit de refuser et de retirer son accord à tout moment) ; carte Google Maps chargée seulement au clic ; contact pour toute demande. | 1 |
| 9 | **Page de crash personnalisée** | `app/error.tsx` et `app/global-error.tsx` | Message rassurant et sans détail technique, bouton « Réessayer », accès direct à la réservation et à l'appel WhatsApp pour ne pas perdre le client, même style que le reste du site. Erreurs consignées dans les journaux de l'hébergeur. | 1 |

**Autres éléments « par défaut » à personnaliser** : sélecteurs de date et d'heure du formulaire de réservation, notifications de confirmation, infobulles, barre de défilement, sélection de texte, anneau de focus, image de partage (`og-default.jpg`).

**Note sur les pages juridiques** : les textes seront rédigés clairement, mais ils doivent être relus et validés par le restaurant, idéalement par un juriste, notamment sur la protection des données personnelles (la loi togolaise de 2019 sur le sujet est à vérifier). Ce document ne remplace pas un avis juridique.

---

## 19. Statistiques et suivi (Google Analytics 4)

### 19.1 Objectif

Voir le flux de visites, d'où viennent les visiteurs, ce qu'ils consultent et ce qu'ils font (réserver, commander, appeler), pour piloter le site et le référencement.

### 19.2 Ce que l'on verra et ce que l'on ne verra pas

| On verra | On ne verra pas |
|---|---|
| Nombre de visiteurs par jour, semaine, mois | L'identité d'un visiteur (nom, téléphone) |
| Pages et plats les plus consultés | Qui est derrière un clic sur WhatsApp |
| Provenance : Google, Facebook, accès direct, liens WhatsApp, annuaires | Les visiteurs qui refusent le suivi (ils ne sont pas comptés) |
| Pays, ville (approximative), langue | |
| Mobile ou PC, navigateur | |
| Jours et heures d'affluence | |
| Clics sur Réserver, Commander, Appeler, Itinéraire | |
| Requêtes de recherche Google (via Search Console liée) | |

Google Analytics fournit des **données agrégées et anonymes** : on sait *combien* et *quel type* de visiteurs, jamais *qui* individuellement. Comme les visiteurs qui refusent le suivi ne sont pas mesurés, les chiffres seront un peu inférieurs à la réalité.

### 19.3 Mise en place technique

1. Créer le compte et la propriété **GA4** avec un compte Google appartenant **au restaurant** (le développeur reçoit un accès administrateur). Récupérer l'identifiant de mesure `G-XXXXXXXXXX`.
2. Définir `NEXT_PUBLIC_GA_ID` **uniquement dans l'environnement de production** de Vercel, jamais dans les aperçus, pour ne pas polluer les statistiques.
3. Charger Google Analytics **uniquement après l'accord** du visiteur, après l'affichage de la page (jamais de façon bloquante).

```tsx
// components/analytics/Analytics.tsx
"use client";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/lib/consent";

export function Analytics() {
  const { analytics } = useConsent(); // vrai seulement après « Accepter »
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !analytics) return null;
  return <GoogleAnalytics gaId={id} />;
}
```

```ts
// lib/track.ts
import { sendGAEvent } from "@next/third-parties/google";

export function track(name: string, params: Record<string, string | number> = {}) {
  try {
    sendGAEvent("event", name, params);
  } catch {}
}
```

*(Interface du paquet `@next/third-parties` à vérifier dans la documentation de la version de Next.js utilisée.)*

### 19.4 Événements suivis

| Événement | Déclencheur | Paramètres |
|---|---|---|
| `reserver_whatsapp` | Clic sur « Réserver sur WhatsApp » | nombre de personnes |
| `commander_whatsapp` | Clic sur « Commander sur WhatsApp » | nombre d'articles, total |
| `appel_clic` | Clic sur « Appeler » | page d'origine |
| `itineraire_clic` | Clic sur « Itinéraire » | page d'origine |
| `plat_vu` | Ouverture d'une fiche plat | nom du plat |
| `ajout_panier` (Phase 2) | Ajout d'un plat au panier | plat, prix |
| `promo_clic` (Phase 2) | Clic sur une promo | titre de la promo |

**Règle** : aucun paramètre ne contient de donnée personnelle (jamais de nom, téléphone, quartier ni remarque saisis par le client).

Dans GA4, marquer `reserver_whatsapp` et `commander_whatsapp` comme **événements clés** pour mesurer les demandes réelles.

### 19.5 Bandeau de consentement (personnalisé)

- Aucun suivi avant l'accord. Refuser doit être aussi simple qu'accepter : deux boutons de même importance, « Accepter » et « Refuser ».
- Pas de bandeau gris standard : une petite feuille qui remonte du bas de l'écran sur mobile, un encart discret en bas à gauche sur PC, avec la signature de bordures de §13.1 et un texte court en français.
- Lien vers la page de confidentialité (§18).
- Choix mémorisé dans le navigateur, modifiable à tout moment via un lien « Gérer les cookies » dans le pied de page.
- Il ne bloque pas la lecture et ne provoque aucun décalage de la mise en page.

### 19.6 Réglages GA4 conseillés

- **Conservation des données** : passer à 14 mois (la valeur par défaut est plus courte).
- **Signaux Google et personnalisation publicitaire** : désactivés.
- **Liaison avec Search Console** : pour voir les recherches qui amènent les visiteurs (« restaurant Atakpamé », etc.).
- **Trafic interne** : exclure les visites du développeur et du restaurant.
- **Accès** : propriétaire = restaurant, développeur = administrateur, gérant éventuel = lecture seule.
- **Liens suivis** : ajouter des paramètres `utm_source`, `utm_medium` et `utm_campaign` aux liens partagés sur Facebook ou WhatsApp pour savoir quelle publication amène des visites.
- **Rapports à consulter chaque semaine** : Acquisition, Pages et écrans, Événements, Détails technologie et lieu.

### 19.7 Performance

Google Analytics est chargé après l'accord, après l'affichage de la page, sans bloquer le rendu. Le score Lighthouse doit rester à **90 ou plus** après son ajout ; sinon, retarder encore le chargement. Aucun suivi depuis les aperçus de développement.

*Variante sans bandeau : un outil d'analyse sans cookies (par exemple Plausible ou Umami) évite le bandeau de consentement, mais il est payant ou à héberger soi-même ; le choix actuel reste Google Analytics.*
