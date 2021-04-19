# Federative States of Mexico and their Index of Human Development (IDH).

The objective of this project is to present an interactive bar graph using [React](https://reactjs.org/) and [D3.js](https://d3js.org/) library to visually represent the HDI of each state of Mexico from a randomly generated fictitious dataset.

## 📋 Features & Resources
- States of Mexico and their abbreviatures from [Wikipedia](https://es.wikipedia.org/wiki/Plantilla:Abreviaciones_de_los_estados_de_M%C3%A9xico).
- Data: Each entity and year has a random IDH value between 0 and 1.
- Responsiveness:
  - Width>480px: Vertical Bars and labels have the full name of the states.
  - Width<=480px Horizontal Bars and labels have abbreviations of the states.
- Dropdowns that allows to:
  - Select a State that change the color of Its Bar.
  - Select a Year to filter data.
  - Sort the data:
    - Alphabetically (A - Z).
    - Ascending (0 - 1).
    - Descending (1 - 0). 