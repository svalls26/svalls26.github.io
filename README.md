# Sara Valls — personal website

A personal website with About, Research, and Chess pages, built with Jekyll and Minimal Mistakes 4.24.0.

## Edit the homepage

- Set your name and site description in `_config.yml`.
- Edit the short bio in `index.md`.
- Edit education and work timeline entries in `_data/background.yml`.
- Edit the Research and Chess pages in `research.md` and `chess.md`.
- Change the navigation order in `_data/navigation.yml`.
- Replace `assets/images/portrait.jpg` to update the photo.
- Customize fonts, colours, and spacing in `assets/css/main.scss`.

The portrait is the original supplied photograph; it has not been retouched.

The author profile (portrait, full name, tagline, and contact details) appears only on About. Research and Chess use a centred reading column; all pages keep the site name and navigation in the header.

The background section uses two vertical timelines on desktop and stacks them on phones. Dates and roles are taken from the supplied CV; the Cambridge Research Assistant role is marked as upcoming. Organisation logos are not links and retain accessible names through image alt text or the adjacent visible name. Only Token Flow also displays a separate name. Logo sources are recorded in `assets/images/institutions/SOURCES.md`; SVGs retain their original artwork, and the Token Flow PNG has its dark background removed.

The desktop timelines share entry rows across both columns. Each entry keeps its title, logo, and dates together with consistent spacing, including when a title wraps. Automatic heading permalinks are removed by `assets/js/site.js`, loaded after the theme script.

As visitors scroll through Background, a purple line grows along each timeline and the entries fade gently into view. Revealed entries stay visible when scrolling back up. With reduced motion enabled or JavaScript unavailable, the full background is shown immediately.

## Research page

The Research page presents the MPhil thesis in five sections, with a sticky contents menu on the left on desktop and an in-flow menu on smaller screens. The current section is highlighted as the reader scrolls. The full thesis is linked at the top; the section summaries are drawn from the supplied dissertation. `assets/js/research.js` enhances the standard section links, which also work without JavaScript.

The methodology figure in `_includes/methodology-diagram.html` recreates Sara’s supplied three-phase diagram as a compact inline SVG. It preserves the findings, retrieval pipeline, evaluation, and requirements connections, using the site’s typography and colours. On smaller screens, the figure scrolls horizontally rather than shrinking its labels. It includes a complete text description for screen readers.

The Join Problem includes a two-stage workflow illustration in `_includes/join-process.html` and an interactive manuscript in `_includes/join-explorer.html`. The workflow follows Sara’s supplied visual: an anchor and the full collection, converging candidate paths, a subset for review and a confirmed join. Its SVG arrows and labels match the site palette; the two stages stack on small screens. Three numbered buttons reveal macro, textual-apparatus, and micro cues, with the number of columns included in the macro layer. `assets/js/join-explorer.js` supports pointer, touch and keyboard selection; without JavaScript, all three explanations remain visible. The manuscripts remain unchanged files; CSS framing and SVG viewports show individual fragments without retouching them. The two aleph close-ups match letters in the first and third manuscripts of Sara’s supplied composite, using native-resolution detail crops from Cambridge Digital Library’s original scans. The micro-layer annotation points to the same aleph shown in the first close-up.

The opening photograph sits beside the introductory text on desktop and above it on phones. It is hosted locally and credited to Cambridge University Library via Google Arts & Culture. See `assets/images/research/SOURCES.md` for its source and attribution. The introductory paragraph follows the wording supplied by Sara.

The discovery/confirmation diagram opens the Join Problem section before its explanatory text. The central manuscript’s credit appears immediately below the image, above the macro key. The macro layer overlays column outlines, dashed ruling guides, a column-width bracket and line-spacing marks. Its six-item icon key also includes background colour and ink colour; it appears only while the macro layer is selected. The textual and micro layers retain their brief explanations and visual examples without separate cue lists.

`_includes/head.html` preserves the Minimal Mistakes head and adds a build version to the main stylesheet URL so previews load the latest layout after a rebuild.

The candidate-retrieval section uses an SVG adaptation of dissertation Figure 5.7 in `_includes/retrieval-pipeline.html`, with more space between its three stages and the four original raster panels extracted losslessly from the PDF. It documents the 10,153-fragment dataset, frozen DINOv3 ViT-L/16 features, foreground-token pooling, VLAD and cosine ranking. The results plot preserves the four-bar vector chart from Figure 5.13. Accompanying text explains review depth, iterative traversal recall on two held-out codices, and the assumption that every surfaced recorded partner is recognised. The section links to Chapter 5 for the full evaluation. The pipeline diagram scrolls within its own region on narrow screens.

Genida’at includes a smaller candidate-grid screenshot beside its explanation, a wider comparison screenshot, the prototype link, and the later nine-scholar follow-up study. The supplied SUS plot is retained as vector artwork, alongside participant quotations and the collection-coverage limitation. Both screenshots link to their full-size local images. Screenshot and study provenance are recorded in `assets/images/research/SOURCES.md`.

`assets/js/research-reveals.js` progressively reveals the workflow’s green matching paths, macro annotations and numbered cue controls as they enter the reading area. Reveals persist when scrolling back up. Keyboard focus reveals all explorer controls immediately. JavaScript-disabled and reduced-motion views show complete, static diagrams.

## Chess replay

The Chess page embeds a standalone replay from `assets/chess/immortal-game.html`. The original PGN was exported from the [Chess.com game](https://www.chess.com/events/2018-spanish-championship-u18/02/Garcia_Sancho_Josep-Valls_Navarro_Sara), Garcia Sancho–Valls Navarro, round 2 of the 2018 Spanish Under-18 Championship (0–1).

The viewer supports individual moves, first/last positions, autoplay, keyboard navigation, and board flipping. The frame resizes to its content on desktop and mobile. All replay assets are hosted locally; the board does not depend on an external iframe service.

The classical Cburnett SVG pieces are by Colin M. L. Burnett and contributors, used under the author's BSD license. Source details and the complete notice are in `assets/images/chess/classic/LICENSE.txt`. The pieces are unmodified; the board and surrounding layout are site styling.

Move parsing and legal positions use vendored chess.js 1.4.0 from the npm registry, with package integrity verified at download. Its upstream license is preserved in `assets/js/vendor/chess.LICENSE`.

## Run locally

With Ruby installed, use the repository's helper. It keeps downloaded tools and dependencies inside this checkout:

```sh
./scripts/site install
./scripts/site serve
```

Open <http://127.0.0.1:4000>.

To build the static site:

```sh
./scripts/site build
```

Generated files appear in `_site/`. Dependencies and generated files are ignored by Git.

You can also use standard `bundle install` and `bundle exec jekyll serve` with your own Ruby environment. The project uses Jekyll 3.10 for compatibility with GitHub Pages and this Mac's Ruby version.

## Publishing

This repository is local. A remote repository, hosting, and a custom domain can be added later. Set `url` and, when needed, `baseurl` in `_config.yml` before publishing. GitHub Pages should use a Jekyll build workflow or another host can serve the generated `_site/` folder.
