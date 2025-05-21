# Landlord

## stack

- react
- react-router
- react-motion
- react-responsive
- radix (maybe, we`ll see..)

## Naming convention

All files are named with capital letters

## Style convention

All style should be written in TailwindCSS, except

- dynamic styles (through motion or react)
- typography
- hovers (optional)

## Folder convention

app/media/icons - all svg icons
app/media/images - all non-svg images and icons

app/components - small components, may depend on each other
app/components/somecomp - special subfolder for component **somecomp** (optional), may store helper fuctions/types
app/blocks - big (usually exclusive for page) blocks, can depend **only** on components
app/routes - page structure files, may depend on components or blocks

## Code convetion

use typescript and types
use react-responsive for mobile
refer to notes (emacs)

## to avoid

- unused imports
- circular dependecies
