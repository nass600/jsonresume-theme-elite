# Resume data

This project comes with a dummy data set held in the file `resume-sample.json`.
For create your own resume file you can either copy from that file or start a
new one following the jsonresume [schema](https://jsonresume.org/schema/).

All you have to do is having a file named `resume.json` in the project's root
with the data you want to print in your resume.

## Special tweaks

This project respects fully the schema but it has some special cases or improvements over it:

1. `basics.summary, basics.name, awards.summary, *.name`

   You can add html inside such as br, p, strong... 
   
   If adding **ul** and **li** to the content the colored bullets will show up (not in `basics.name`).

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
   + Linkedin
   + Github
   + Bitbucket
   + Stackoverflow
   + Skype

3. `languages`

   For showing the correct country flag you need to use one of the below languages:

   | language       |
   |:---------------|
   | Chinese        |
   | Croatian       |
   | Czech          |
   | Danish         |
   | Dutch          |
   | English        |
   | Finnish        |
   | French         |
   | German         |
   | Greek          |
   | Hindi          |
   | Italian        |
   | Japanese       |
   | Korean         |
   | Norwegian      |
   | Polish         |
   | Portuguese     |
   | Romanian       |
   | Russian        |
   | Spanish        |
   | Swedish        |
   | Turkish        |

   If your language country is not in the list open an issue and I will
   be please to add it for you.

4. `skills`

   When in `sidebar mode`, the data used is only `name` and `level`. The latest
   has to be a number between **0** and **5**.

5. `certifications` (extra data, not in the original schema)

   Same data structure as awards
