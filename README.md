# Sara Valls — personal website

A one-page personal website built with Jekyll and Minimal Mistakes 4.24.0.

## Edit the homepage

- Set your name and site description in `_config.yml`.
- Edit the short bio in `index.md`.
- Replace `assets/images/portrait.jpg` to update the photo.
- Customize fonts, colours, and spacing in `assets/css/main.scss`.

The portrait is the original supplied photograph; it has not been retouched.

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
