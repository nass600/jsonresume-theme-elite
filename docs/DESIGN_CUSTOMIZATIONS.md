# Design Customizations

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
