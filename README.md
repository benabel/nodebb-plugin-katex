# NodeBB Katex Parser

This NodeBB plugin is a parser that allows users to write posts containing maths formulas in tex format using [Katex](Katex).

To customise options for the parser, please consult the "Katex" page in the administration panel, under the "Plugins" heading.

## Installation

    npm install nodebb-plugin-katex

## Usage

Just wrap your `tex` code inside your posts using these delimiters:

**Brackets delimiters**
- `\(This is \tex code\)` for inline display.
- `\[This is \tex code\]` for block display.

**Dollars delimiters**
- `$This is \tex code$` for inline display(optionnal check the admin control panel).
- `$$This is \tex code$$` for block display.

##Features

- Use katex in the server-side to display `tex` code inside posts, summaries and composer preview.
- Adds a `$` button to the composer toolbar to facilitate usage.

## Compatibility

This plugin is compatible with nodebb v0.7.x and with the [nodebb-plugin-markdown](https://github.com/julianlam/nodebb-plugin-markdown/) plugin.

##Credits

The code is greatly inspired by those others repositories:

- [nodebb-plugin-markdown](https://github.com/julianlam/nodebb-plugin-markdown/)
- [nodebb-plugin-quickstart](https://github.com/julianlam/nodebb-plugin-markdown/)
- the [auto-render](https://github.com/Khan/KaTeX/blob/master/contrib/auto-render/) extension of the [Katex](https://github.com/Khan/KaTeX/) package.
