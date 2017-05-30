# jsonresume-theme-elite

[![Build Status](https://api.travis-ci.org/nass600/jsonresume-theme-elite.svg?branch=master)](https://travis-ci.org/nass600/jsonresume-theme-elite)
[![npm](https://img.shields.io/npm/v/jsonresume-theme-elite.svg)](https://www.npmjs.com/package/jsonresume-theme-elite)
[![npm](https://img.shields.io/npm/dt/jsonresume-theme-elite.svg)](https://www.npmjs.com/package/jsonresume-theme-elite)

Elite resume for [jsonresume](https://jsonresume.org/)

![](docs/img/elite.jpg)

## Installation

```bash
npm install
```

## Resume data

This project comes with a dummy data set contained in the file `resume-sample.json`.
For create your own resume file you can either copy from that file or start a
new one following the jsonresume [schema](https://jsonresume.org/schema/).

All you have to do is having a file named `resume.json` in the project's root
with the data you want to print in your resume.

### Special tweaks

This project respects fully the schema but it has some special cases or improvements over it:

1. `basics.summary`

   You can add html inside such as br, p, strong...

2. `basics.profiles`

   The social network icon preceding the `url` is generated based on `network`.
   `username` is being ignored.
   Allowed values for `network` are:

   + Twitter
   + Youtube
   + Vimeo
   + Facebook
   + Google Plus
   + Instagram
   + Tumblr
   + Pinterest
   + Dribbble
   + Xing
   + Github
   + Bitbucket
   + Stackoverflow
   + Skype

3. `languages`

   For showing the correct country flag on the table you must use
   [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country codes.
   Below you can find the currently supported codes:

   | code | country        |
   |:----:|:---------------|
   | cn   | China          |
   | cz   | Czech Republic |
   | de   | Germany        |
   | dk   | Denmark        |
   | es   | Spain          |
   | fi   | Finland        |
   | fr   | France         |
   | gb   | United Kingdom |
   | gr   | Greece         |
   | hr   | Croatia        |
   | in   | India          |
   | it   | Italy          |
   | jp   | Japan          |
   | kr   | South Korea    |
   | nl   | Netherlands    |
   | no   | Norway         |
   | pl   | Poland         |
   | pt   | Portugal       |
   | ro   | Romania        |
   | ru   | Russia         |
   | se   | Sweden         |
   | tr   | Turkey         |

   If your language country is not in the list open an issue and I will
   be please to add it for you.

4. `work.summary`, `volunteer.summary`, `awards.summary`, `publications.summary`

   If adding **<ul>** and **<li>** to the content the colored bullets will show up.

5. `skills`

   When in "sidebar mode", the data used is only `name` and `level`. The latest
   has to be a number between **0** and **5**.

   In normal mode

6. `certifications`

   Same data structure as awards

## Design Toggles

This resume design provides, for some kind of content, diferent locations and styles.
All this toggles are activated by `scss` variables in the file `src/scss/_variables.scss`
and they are called `$enable-something`


1. `$enable-avatar`

   Will toggle displaying the user avatar (`basics.picture`)

2. `$enable-skills-sidebar`

   Skills could be located either on the sidebar in a more compact form or in the page
   as another regular section.

   By default is located in the sidebar but, if you change the variable
   to false it will show up in the normal content right section.


## Generating your resume in pdf

By default the latest version of resume-cli only supports rendering the
resume in `Letter` format.

I introduce some changes so you are able to generate it in every format
supported by [PhantomJS](http://phantomjs.org/api/webpage/property/paper-size.html):

+ A3
+ A4
+ A5
+ Legal
+ Letter
+ Tabloid

By running the following command you will export it in `A4` format:

```bash
npm run export
```

But if you want to use other supported formats you can run:

```bash
node_modules/.bin/gulp export --page-format A3
```

## Development

If you need to do some modifications in the design you can serve the
resume in the browser by running:

```bash
npm start
```

Then you can access the browser preview of your resume at `localhost:4000`.

If you are going to perform several exchanges you can access the hot reload
version at `localhos:4001` so every time you change something the page
would be reloaded to render the latest changes.


## Credits

+ Ignacio Velazquez <ivelazquez85@gmail.com>
+ Dev setup based on the amazing [Caffeine theme](https://github.com/kelyvin/jsonresume-theme-caffeine)
+ Some of the icons and all the country flags where made by [Freepik](http://www.freepik.com)
