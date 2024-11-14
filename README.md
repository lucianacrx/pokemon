# React Assignment - Pokedex - Pokemon Detail App

## Overview

In this assignment, we'll be rendering a collection of pokemon, with data populated from PokeApi, and then we'll also fetch and render an individual pokemon's details when selected.



## Judging Criteria

The primary purpose of this exercise is to illustrate familiarity with react, and to create something visually presentable.

Main aspects:
- fetch data from an api
- state management
- UI / UX - note the details in the figma file. one criteria will be how close to the designs we can get. Details for assets, spacing, etc are provided in the figma. Note: the app should be responsive, eg. content stays centered, items wrap on screen width change. - two browser width are provided. (Our product team emphasizes attention to detail, according to the provided specifications.)

Figma file:
https://www.figma.com/community/file/1412899654438592175/pokemon-app



## Setup

A basic app (vite react-ts) has been provided, with some setup already done, currently rendering mock data. Feel free to edit any of these files to your liking. For styling, tailwindcss is provided, but feel free to add whatever library you are comfortable with.

Overview of notable directories:
```
src
|-- assets
|   |
|   |-- information-icons // icons used with the labels for weight, height, category, ability
|   |
|   |-- png-icons // icons for the pokemon's types
|   |
|   |-- vector // vectors for the pokemon's background where the sprite / image is displayed
|   |
|   |-- mockAllPokemon.ts // mock data list of pokemon
|   |
|   |-- mockDetailPidgeotto.ts // mock data of a single pokemon
|
|-- fetchers // fetch calls hitting the api
|
|-- helpers // helper function to format api response to a format consumed by the app, and a helper function that returns the color / image to use for a given pokemon's type
```

To run the app:
`npm install` to install dependencies
`npm run dev` to start the app
(or similar yarn commands, if using yarn)



## Pokeapi Reference

documentation:
https://pokeapi.co/docs/v2



## Acceptance Criteria #1

On app load, fetch pokemon data from `https://pokeapi.co/api/v2/pokemon?limit=151`, and render a collection of pokemon names

- display a list of names, arranged vertically



## Acceptance Criteria #2

When a pokemon in the list is clicked, we should see the selected pokemon's details displayed in the detail panel

the details panel should include the selected pokemon's:
- sprite / image
- name
- id
- types
- weight, height, species, ability



## Acceptance Criteria #3

Implementation of the details panel (card) should follow the specified designs in the figma.

Criteria:
- layout / alignment
- padding
- responsiveness
- colors / icons
- font sizes
