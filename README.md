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
- **gridClass** : `grid-5` (5 colonnes) ou `grid-2` (2 colonnes). Ne pas changer sauf pour adapter la mise en page.
- **cards** : la liste des cartes.

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

## Fichiers du projet

| Fichier      | Rôle |
|-------------|------|
| **data.json** | **Contenu éditable** : textes, cartes, liens, vidéos. C’est ici que tu fais les modifications. |
| **index.html** | Structure de la page. En général, ne pas modifier. |
| **script.js**   | Charge `data.json` et affiche le contenu. Ne pas modifier sauf pour une raison précise. |
| **styles.css** | Apparence (couleurs, mise en page). Modifier seulement pour changer le design. |

---

## Erreurs fréquentes avec le JSON

- Oublier une **virgule** entre deux blocs, ou en mettre une en trop après le dernier élément d’un tableau.
- Oublier les **guillemets** autour des clés et des textes.
- Mettre un **retour à la ligne** au milieu d’une chaîne de caractères (reste sur une seule ligne entre les guillemets).

Si la page reste blanche ou affiche « Impossible de charger le contenu », ouvre la console du navigateur (F12 → Console) : le message d’erreur indique souvent à quelle ligne le JSON est invalide.
