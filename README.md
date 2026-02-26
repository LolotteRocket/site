# Portfolio Ludmila Cheklit — 2D / 3D / JV

Site type « ebook » / portfolio pour une école, mettant en avant tes projets (texturing Medilisation, Substance / Rendu Cycle, film de fin d’année, Instagram).

## Structure du site

1. **Hero (page de couverture)** — Ton **film de fin d’année** (5:19) en vedette avec bouton « Regarder le film ».
2. **Projet de fin d’année** — Section dédiée avec lecteur vidéo.
3. **Medilisation — Texturing** — Grille de **5 objets** (affichés en format image avec placeholders).
4. **Texturing · Substance · Rendu Cycle** — **2 vidéos**.
5. **Dessins** — Lien vers ton **compte Instagram**.

## Personnalisation

### Film de fin d’année (hero + lecteur)

- Dans `index.html` :
  - **Titre** : remplace « Titre de ton film » dans `.hero-title`.
  - **Vidéo en arrière-plan du hero** (optionnel) : dans `.hero-video` > `<source src="chemin/vers/ton-film.mp4" type="video/mp4">`. Si tu mets une source, la vidéo pourra se lancer au clic sur le placeholder.
  - **Lecteur principal** : dans la section `#film-player`, remplace le `.video-placeholder` par ton lecteur, par exemple :
    - Fichier local :  
      `<video src="ton-film.mp4" controls></video>`
    - YouTube :  
      `<iframe src="https://www.youtube.com/embed/ID_VIDEO" allowfullscreen></iframe>`
    - Vimeo :  
      `<iframe src="https://player.vimeo.com/video/ID_VIDEO" allowfullscreen></iframe>`

### Medilisation — 5 objets

- Pour chaque `.card` dans la section `#medilisation`, remplace le bloc `.card-media.placeholder` par une image :
  ```html
  <div class="card-media">
    <img src="chemin/objet1.jpg" alt="Objet 1">
  </div>
  ```
- Adapte le `alt` et le `.card-title` pour chaque objet.

### Vidéos Substance / Rendu Cycle

- Dans la section `#substance`, pour chaque carte remplace le `.video-placeholder` par un `<video>` ou une `<iframe>` (YouTube/Vimeo), comme pour le film.

### Instagram

- Remplace `https://instagram.com/` dans le lien par l’URL de ton compte (ex. `https://instagram.com/ton_compte`).
- Remplace « @ton_compte_instagram » dans le texte par ton vrai @.

## Lancer le site en local

Ouvre `index.html` dans un navigateur, ou utilise un serveur local (ex. avec Live Server sous VS Code / Cursor). Pour des vidéos locales, un serveur local est préférable.

## Erreurs console (YouTube)

Si tu vois des erreurs du type `Failed to load resource: net::ERR_BLOCKED_BY_CLIENT` vers `youtube.com/youtubei/v1/log_event` ou `youtube.com/generate_204`, c’est en général une **extension** (bloqueur de pub, uBlock, Privacy Badger, etc.) qui bloque les requêtes de YouTube (analytics, télémétrie). Ce n’est **pas un bug du site** : la vidéo continue de se lire. Tu peux ignorer ces messages ou désactiver l’extension sur cette page pour avoir une console propre.

## Fichiers

- `index.html` — structure de la page
- `styles.css` — mise en forme (thème sombre, typo Cormorant Garamond + Outfit)
- `script.js` — menu mobile, header au scroll, apparition des sections au scroll
