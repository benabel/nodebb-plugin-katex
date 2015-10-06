[![npm version](https://badge.fury.io/js/nodebb-plugin-katex.svg)](http://badge.fury.io/js/nodebb-plugin-katex)
[![Dependency Status](https://david-dm.org/benjaminabel/nodebb-plugin-katex.svg)](https://david-dm.org/benjaminabel/nodebb-plugin-katex)

# NodeBB Katex Parser

This NodeBB plugin is a parser that allows users to write posts containing maths formulas in tex format using [Katex](Katex).

To customize options for the parser, please consult the "Katex" page in the administration panel, under the "Plugins" heading.

## Installation

    npm install nodebb-plugin-katex

## Usage

Just wrap your `tex` code inside your posts using these delimiters:

**Brackets delimiters**
- `\\(This is \tex code\\)` for inline display.
- `\\[This is \tex code\\]` for block display.

**Dollars delimiters**
- `$This is \tex code$` for inline display(optionnal: disabled by default, must be set in the admin control panel).
- `$$This is \tex code$$` for block display.

## Features

- Use katex in the server-side to display `tex` code inside posts, summaries and composer preview.
- Adds a `$` button to the composer toolbar to facilitate usage.

![nodebb-plugin-katex.png](https://i.imgur.com/nJDqafD.png)

## Compatibility

This plugin is compatible with nodebb v0.7.x and v0.8.x and with the [nodebb-plugin-markdown](https://github.com/julianlam/nodebb-plugin-markdown/) plugin.

When used in conjonction with the [nodebb-plugin-markdown](https://github.com/julianlam/nodebb-plugin-markdown/), you have to load katex plugin after markdown plugin to enable usage of all buttons of the composer.

## Credits

The code is greatly inspired by those others repositories:

- [nodebb-plugin-markdown](https://github.com/julianlam/nodebb-plugin-markdown/)
- [nodebb-plugin-quickstart](https://github.com/julianlam/nodebb-plugin-markdown/)
- the [auto-render](https://github.com/Khan/KaTeX/blob/master/contrib/auto-render/) extension of the [Katex](https://github.com/Khan/KaTeX/) package.
