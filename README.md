# Sara Valls — personal website

A one-page personal website built with Jekyll and Minimal Mistakes 4.24.0.

## Edit the homepage

- Set your name and site description in `_config.yml`.
- Edit the short bio in `index.md`.
- Replace `assets/images/portrait.jpg` to update the photo.
- Customize fonts, colours, and spacing in `assets/css/main.scss`.

The portrait is the original supplied photograph; it has not been retouched.

## Chess replay

The "immortal game" section embeds a standalone replay from `assets/chess/immortal-game.html`. The original PGN was exported from the [Chess.com game](https://www.chess.com/events/2018-spanish-championship-u18/02/Garcia_Sancho_Josep-Valls_Navarro_Sara), Garcia Sancho–Valls Navarro, round 2 of the 2018 Spanish Under-18 Championship (0–1).

The viewer supports individual moves, first/last positions, autoplay, keyboard navigation, and board flipping. The frame resizes to its content on desktop and mobile. All replay assets are hosted locally; the board does not depend on an external iframe service.

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
