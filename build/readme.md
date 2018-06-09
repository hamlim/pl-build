# PL Build

This is a repo to test out different node scripts for build processes for our pattern library.

## Steps:

1.  Run `node ./build/make.js`
2.  See generated files in `build/components/*/docs/*-docs.js`

## TODO:

- [ ] Get changelog if its there
- [ ] Fill out the doc block with actual content (statically in the template)
- [ ] Fill out the rest of the componentData object
- [ ] Statically determine the titles of the demos and pass that to the documentation component (so we can migrate to fragments)
