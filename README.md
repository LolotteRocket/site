# Portfolio — Guide pour modifier le site

Ce guide explique comment modifier le site **sans s’y connaître beaucoup**. Tout se fait dans les fichiers du projet.

**Important :** Les numéros de lignes indiqués sont des repères au moment où ce README a été écrit. Dès que tu ajoutes ou supprimes du code, les lignes bougent. Utilise la **recherche** (Ctrl+F ou Cmd+F) avec les mots indiqués pour retrouver le bon endroit.

---

## 1. Changer la vidéo du film (hero, en haut de page)

La vidéo qui joue en haut du site est une **vidéo YouTube**. Il faut modifier **2 endroits**.

### A. Les textes affichés sous la vidéo

**Fichier :** `index.html`  
**Recherche :** `hero-label` ou `Film de fin d'études`

Tu verras un bloc qui ressemble à ça :

```html
<p class="hero-label">Film de fin d'études 2025</p>
<h1 class="hero-title">Papy dans le tiroir</h1>
<p class="hero-desc">Réalisé par Axel Wehbeh et Ludmilla Cheklit — 5 min 19.</p>
```

- **hero-label** → le petit texte au-dessus du titre (ex. « Film de fin d'études 2025 »).
- **hero-title** → le titre principal du film (ex. « Papy dans le tiroir »).
- **hero-desc** → la ligne en dessous (ex. réalisateurs, durée).

Modifie le contenu entre les balises `> ... <` comme tu veux.

### B. L’ID de la vidéo YouTube

**Fichier :** `script.js`  
**Recherche :** `videoId` ou `91iY8YFuAxg`

Tu verras une ligne du type :

```js
videoId: "91iY8YFuAxg",
```

Pour une autre vidéo YouTube :
1. Ouvre la vidéo sur YouTube.
2. Dans l’URL, repère la partie après `v=` :  
   `https://www.youtube.com/watch?v=XXXXXXXX` → l’ID c’est **XXXXXXXX**.
3. Remplace `91iY8YFuAxg` par cet ID entre les guillemets.

Exemple : pour `https://www.youtube.com/watch?v=AbCdEf123`, tu mets `videoId: "AbCdEf123",`.

---

## 2. Section « Modelisation — Texturing » (cartes avec Sketchfab, images, vidéos)

**Fichier :** `index.html`  
**Recherche :** `Modelisation — Texturing` ou `grid grid-5`

Cette section contient une liste de **cartes**. Chaque carte est un bloc entre `<li class="card card-image">` et `</li>`.

### Supprimer une carte

Supprime tout le bloc correspondant, de `<li class="card card-image">` jusqu’à `</li>` (inclus). Il ne doit rester aucun `<li>...</li>` orphelin.

### Ajouter une carte

Copie-colle un bloc entier d’une carte existante (un `<li>...</li>`), puis adapte le contenu.

**Carte avec un modèle Sketchfab (3D) :**

```html
<li class="card card-image">
  <div class="card-media card-media-embed">
    <iframe title="Nom du modèle" frameborder="0" allowfullscreen mozallowfullscreen="true"
      webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking"
      src="https://sketchfab.com/models/XXXXXXXX/embed"></iframe>
  </div>
  <div class="card-info">
    <span class="card-title">Nom affiché sous la carte</span>
  </div>
</li>
```

- Remplace **XXXXXXXX** par l’ID du modèle Sketchfab (tu le trouves dans l’URL d’embed sur Sketchfab).
- Remplace **Nom du modèle** et **Nom affiché sous la carte** par le titre que tu veux.

**Carte avec une image :**

```html
<li class="card card-image">
  <div class="card-media card-media--full">
    <img src="nom_de_ton_fichier.jpg" alt="Description courte" loading="lazy" />
  </div>
  <div class="card-info">
    <span class="card-title">Titre sous l'image</span>
  </div>
</li>
```

- **src** : nom du fichier image (à mettre dans le même dossier que `index.html`, ou mettre le chemin, ex. `images/photo.jpg`).
- **alt** et **card-title** : texte affiché / sous la carte.

**Carte avec une vidéo YouTube :**

```html
<li class="card card-image">
  <div class="card-media card-media-embed">
    <iframe src="https://www.youtube.com/embed/ID_VIDEO_ICI?rel=0" title="Titre de la vidéo"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
  </div>
  <div class="card-info">
    <span class="card-title">Titre sous la vidéo</span>
  </div>
</li>
```

- Remplace **ID_VIDEO_ICI** par l’ID YouTube (comme pour le film, la partie après `v=` dans l’URL).

Tu peux ajouter autant de cartes que tu veux : colle les nouveaux blocs `<li>...</li>` **à l’intérieur** du `<ul class="grid grid-5">`, juste avant la balise `</ul>`.

---

## 3. Section « Texturing · Substance · Rendu Cycle »

**Fichier :** `index.html`  
**Recherche :** `Texturing · Substance` ou `grid grid-2`

Même principe que la section Modelisation : les cartes sont des blocs `<li class="card card-image"> ... </li>` (ou avec une vidéo YouTube comme ci-dessus).

- **Supprimer une carte** : supprime tout le bloc `<li>...</li>` correspondant.
- **Ajouter une carte** : copie un bloc `<li>...</li>` existant dans cette section, colle-le avant `</ul>`, puis modifie le contenu (Sketchfab, image ou YouTube comme dans le paragraphe 2).

Cette section utilise `grid grid-2` : les cartes s’affichent par 2 sur grand écran. Tu peux en mettre 1, 2, 3 ou plus.

---

## 4. Instagram (section Dessins)

**Fichier :** `index.html`  
**Recherche :** `instagram.com` ou `sugarlolotteart`

- Pour **changer de compte** : remplace `sugarlolotteart` par le nom d’utilisateur Instagram voulu dans :
  - l’URL de l’iframe : `src="https://www.instagram.com/NOUVEAU_COMPTE/embed"`
  - le lien en dessous : `href="https://www.instagram.com/NOUVEAU_COMPTE/"`

---

## 5. Rappel sur les numéros de lignes

Dès que tu ajoutes ou supprimes du HTML, les numéros de lignes dans le fichier changent. Ne te fie pas à « ligne 50 » ou « ligne 120 » après avoir modifié la page : utilise toujours la **recherche** (Ctrl+F / Cmd+F) avec les mots-clés donnés (ex. `hero-title`, `grid grid-5`, `card-title`, etc.) pour retrouver l’endroit à modifier.

---

## Fichiers du projet

- **index.html** — tout le contenu (textes, cartes, liens). C’est ici que tu fais la plupart des changements.
- **script.js** — notamment l’ID de la vidéo du film (hero). À modifier seulement pour changer la vidéo du haut de page.
- **styles.css** — apparence (couleurs, mise en page). Pas besoin d’y toucher pour ajouter/supprimer des cartes ou changer les textes.
