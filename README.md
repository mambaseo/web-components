# Mamba web components

Front-end components loaded live by **mamba.agency** via jsDelivr.

> **Read this before changing anything.**
> Editing a file here does not update the website. The site loads **pinned
> version tags only**. A loose push to `main` changes nothing live — and a
> deleted tag breaks every page still pointing at it.

## Shipping a change

1. Edit the source file (`*.css` / `*.js`).
2. Re-minify. Minified files are what the site actually loads.
3. Recompute the SRI hash for each changed minified file:
   ```bash
   openssl dgst -sha384 -binary <file> | openssl base64 -A
   ```
   If the hash in Webflow does not match the file, the browser refuses to load
   it and the component silently disappears.
4. Commit and push.
5. Tag a new version and publish it as a release:
   ```bash
   git tag v1.0.1 && git push --tags
   ```
   Or on github.com: Releases → Draft a new release → new tag → Publish.
6. In Webflow, update the version number **and** the integrity hash in two
   places: the registered script (Site settings → Custom code) and the
   stylesheet `<link>` in the site Head.

**Never delete a tag.** Older published pages may still reference it.

## Components

### `geo-report-builder/`

Interactive competitive GEO report builder. A prospect enters their domain,
either names their competitors or has them identified, confirms the buyer
prompts to track, and submits. Leads capture through a native Webflow form.

| File | Loaded by the site |
|---|---|
| `mamba-geo.js` | No — readable source |
| `mamba-geo.css` | No — readable source |
| `mamba-geo.min.js` | **Yes** |
| `mamba-geo.min.css` | **Yes** |

Mounted by a 213-byte HTML Embed on the Webflow page:

```html
<div data-mamba-geo
     data-market="Singapore"
     data-vertical="saas"
     data-form-id="mg-geo-form"></div>
```

| Attribute | Values |
|---|---|
| `data-market` | Singapore · UAE · Australia · United States · United Kingdom · Global |
| `data-vertical` | saas · realestate · legal · insurance · ecom · pro |
| `data-form-id` | ID of the hidden Webflow form that captures the lead |

On CMS template pages these accept Webflow field bindings, so a location page
can open the builder with its own city pre-selected.

Swap `MambaGEO.adapters` for real endpoints when the backend exists. Until
then `identifyCompetitors` returns fictional sample brands and the UI carries a
visible prototype note. Both must change before this is reachable by a
prospect.
