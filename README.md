# Portfolio — Modifier le site facilement

Tout le contenu du site (textes, cartes, vidéos, liens) est défini dans **un seul fichier** : `data.json`.  
Pour modifier le site, il suffit d’éditer ce fichier — plus besoin de toucher au HTML.

---

## Fichier à modifier : `data.json`

Ouvre `data.json` dans un éditeur de texte. C’est du **JSON** : respecte bien les virgules et les guillemets.  
Après chaque modification, enregistre le fichier et rafraîchis la page dans le navigateur.

---

## 1. Titre du site et description

En haut du fichier, dans `meta` :

- **title** : le titre de l’onglet du navigateur.
- **description** : la description pour le référencement.

---

## 2. En-tête (logo et menu)

Dans `header` :

- **logo** : le texte du logo en haut à gauche.
- **nav** : la liste des liens du menu. Chaque entrée a :
  - **label** : le texte affiché (ex. « Projet phare »).
  - **href** : le lien (ex. `#film`, `#Modelisation`, `#substance`, `#instagram`).

Pour ajouter ou supprimer un lien, ajoute ou supprime un bloc `{ "label": "…", "href": "…" }` dans le tableau `nav`.

---

## 3. Hero (film en haut de page)

Dans `hero` :

- **videoId** : l’ID de la vidéo YouTube.  
  Pour le trouver : ouvre la vidéo sur YouTube → dans l’URL, la partie après `v=`  
  Ex. `https://www.youtube.com/watch?v=91iY8YFuAxg` → l’ID est `91iY8YFuAxg`.
- **ariaLabel** : texte pour l’accessibilité (ex. titre du film).
- **label** : le petit texte au-dessus du titre (ex. « Film de fin d'études 2025 »).
- **title** : le titre principal du film.
- **desc** : la ligne en dessous (réalisateurs, durée, etc.).
- **scrollHint** : le texte « Défiler » sous le hero.

---

## 4. Sections avec des cartes (Modélisation, Substance)

Les sections **Modélisation — Texturing** et **Texturing · Substance · Rendu Cycle** sont dans `sections` :

- **modelisation** : première section (grille 5 colonnes).
- **substance** : deuxième section (grille 2 colonnes).

Pour chaque section tu as :

- **id** : identifiant pour les ancres (ne pas changer sauf si tu sais ce que tu fais).
- **title** : titre de la section.
- **intro** : texte d’introduction sous le titre.
- **gridClass** : `grid-5` (5 colonnes), `grid-2` (2 colonnes) ou `grid-3` (3 colonnes, ex. section Mini jeu). Ne pas changer sauf pour adapter la mise en page.

### Section Mini jeu (sections.minijeu)

La section **Mini jeu** affiche jusqu’à **3 cartes par ligne** (`gridClass: "grid-3"`). Elle accepte les mêmes types que Modélisation/Substance, plus le type **embed** (jeu avec optionnel **lien** sur la carte).

**Carte jeu embarqué (embed) — couverture, popup au clic, lien optionnel**

Une seule carte par jeu : image de couverture, clic pour ouvrir le jeu en popup, et **si tu ajoutes un lien** (GitHub, itch.io…), un bouton apparaît sous le titre pour y aller. Sans lien, pas de bouton.

Exemple minimal (sans lien) :

```json
{
  "type": "embed",
  "url": "https://example.github.io/MonJeu/",
  "title": "Mon jeu",
  "width": 960,
  "height": 600,
  "cover": {
    "src": "mon-jeu-cover.jpg",
    "alt": "Capture d’écran du jeu"
  }
}
```

Avec un **lien** (ex. code source, page itch.io) — ajoute l’objet **link** :

```json
{
  "type": "embed",
  "url": "https://example.github.io/MonJeu/",
  "title": "Mon jeu",
  "width": 960,
  "height": 600,
  "cover": { "src": "mon-jeu-cover.jpg", "alt": "Mon jeu" },
  "link": {
    "href": "https://github.com/user/MonJeu",
    "text": "Voir le repo GitHub"
  }
}
```

- **url** : URL du jeu (GitHub Pages, itch.io embed, etc.).
- **title** : titre sous la carte.
- **width** / **height** : ratio dans la popup (optionnel).
- **cover** : optionnel. **src** = image de couverture, **alt** = texte de remplacement. Sans **cover**, un placeholder avec icône « jouer » s’affiche.
- **link** : optionnel. **href** = URL du lien, **text** = texte du bouton. Si **link** est absent, aucun bouton n’est affiché.

Dans la section Mini jeu tu peux aussi utiliser **image**, **youtube** et **sketchfab** (même format que dans Modélisation). Le type **link** seul existe aussi (voir tutoriel plus bas) si tu veux une carte qui ne fait qu’afficher un lien, sans jeu.

---

### Tutoriels — Mini jeu et liens

**Jeu avec lien GitHub**

Tu héberges le jeu sur GitHub Pages et tu veux un bouton « Voir le code » sur la carte :

1. Dans `sections.minijeu.cards`, ajoute une carte **embed** avec **url** = l’URL du jeu (ex. `https://ton-user.github.io/NomDuJeu/`).
2. Ajoute **link** avec **href** = l’URL du dépôt GitHub (ex. `https://github.com/ton-user/NomDuJeu`) et **text** = `"Voir le repo GitHub"` (ou le libellé de ton choix).
3. Optionnel : **cover** avec une capture d’écran du jeu.

Le bouton s’affiche sous le titre ; au clic sur la couverture, le jeu s’ouvre en popup.

**Jeu avec lien itch.io**

Même principe : une carte **embed** avec **url** = l’URL de la page du jeu sur itch.io (ex. `https://ton-compte.itch.io/ton-jeu`). Si tu préfères que le clic ouvre itch.io au lieu d’un embed en popup, tu peux mettre **url** vers la page itch.io et **link** avec le même href et **text** = `"Jouer sur itch.io"`. (Tu peux aussi garder **url** pour un autre hébergeur du jeu et **link** pour itch.io.)

**Carte lien seule (sans jeu)**

Pour une carte qui ne fait qu’afficher un lien (pas de jeu en popup), tu peux utiliser le type **link** dans la section Mini jeu :

```json
{
  "type": "link",
  "href": "https://github.com/user/repo",
  "title": "Titre de la carte",
  "linkText": "Voir le projet"
}
```

- **href** : URL du lien.
- **title** : titre de la carte.
- **linkText** : optionnel, texte sous la carte (sinon = title).
- **image** : optionnel. `{ "src": "image.jpg", "alt": "..." }` pour une miniature.

Cette forme n’est pas dans le `data.json` de base ; tu l’ajoutes si tu en as besoin.

### Types de cartes

Chaque carte a un **type** et un **title** (titre affiché sous la carte).

**Carte Sketchfab (modèle 3D)**  
Exemple :

```json
{
  "type": "sketchfab",
  "sketchfabId": "87f79275ce46411f9182e4b21c0c596b",
  "embedParams": "?transparent=1",
  "title": "biblically accurate angel"
}
```

- **sketchfabId** : l’ID du modèle (dans l’URL d’embed sur Sketchfab).
- **embedParams** : optionnel (ex. `"?transparent=1"` ou `"?camera=0"`). Tu peux omettre la ligne si tu n’en as pas besoin.

**Carte image**  
Exemple :

```json
{
  "type": "image",
  "src": "ref_pirate.webp",
  "alt": "Pirate",
  "title": "Pirate"
}
```

- **src** : nom du fichier image (à placer dans le même dossier que `index.html`, ou avec un chemin comme `images/photo.jpg`).
- **alt** : texte de remplacement pour l’image.
- **title** : titre sous la carte.

**Carte vidéo YouTube**  
Exemple :

```json
{
  "type": "youtube",
  "videoId": "Hk5unyklg0s",
  "title": "Vidéo texturing"
}
```

- **videoId** : l’ID YouTube (comme pour le hero, la partie après `v=` dans l’URL).

### Ajouter / supprimer une carte

- **Ajouter** : copie un bloc de carte existant dans le tableau **cards** de la section, colle-le avant la dernière `]`, puis modifie les champs (type, title, sketchfabId / src / videoId, etc.).
- **Supprimer** : supprime tout le bloc `{ … }` de la carte, et la virgule qui précède (ou qui suit) pour garder un JSON valide.

---

## 5. Section Instagram (Dessins)

Dans `instagram` :

- **title** : titre de la section (ex. « Dessins »).
- **intro** : texte d’introduction.
- **username** : le nom d’utilisateur Instagram (ex. `sugarlolotteart`).  
  Pour changer de compte, remplace uniquement cette valeur.
- **linkText** : le texte du lien sous l’embed (ex. « Voir le profil sur Instagram »).

---

## 6. Pied de page

Dans `footer` :

- **name** : nom affiché dans le footer.
- **tagline** : sous-titre (ex. « Portfolio 2D / 3D / JV »).

---

## 7. Fichiers du projet

| Fichier      | Rôle |
|-------------|------|
| **data.json** | **Contenu éditable** : textes, cartes, liens, vidéos. C’est ici que tu fais les modifications. |
| **index.html** | Structure de la page. En général, ne pas modifier. |
| **script.js**   | Charge `data.json` et affiche le contenu. Ne pas modifier sauf pour une raison précise. |
| **styles.css** | Apparence (couleurs, mise en page). Modifier seulement pour changer le design. |

---

## 8. Erreurs fréquentes avec le JSON

- Oublier une **virgule** entre deux blocs, ou en mettre une en trop après le dernier élément d’un tableau.
- Oublier les **guillemets** autour des clés et des textes.
- Mettre un **retour à la ligne** au milieu d’une chaîne de caractères (reste sur une seule ligne entre les guillemets).

Si la page reste blanche ou affiche « Impossible de charger le contenu », ouvre la console du navigateur (F12 → Console) : le message d’erreur indique souvent à quelle ligne le JSON est invalide.
