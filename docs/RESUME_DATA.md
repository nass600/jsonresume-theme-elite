# Resume data

This project comes with a dummy data set contained in the file `resume-sample.json`.
For create your own resume file you can either copy from that file or start a
new one following the jsonresume [schema](https://jsonresume.org/schema/).

All you have to do is having a file named `resume.json` in the project's root
with the data you want to print in your resume.

## Special tweaks

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

   If adding **ul** and **li** to the content the colored bullets will show up.

5. `skills`

   When in "sidebar mode", the data used is only `name` and `level`. The latest
   has to be a number between **0** and **5**.

   In normal mode

6. `certifications` (extra data, not in the original schema)

   Same data structure as awards
