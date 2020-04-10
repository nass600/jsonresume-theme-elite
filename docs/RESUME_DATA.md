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

2. `basics.background`

   Url of the background image behind the main section (top left where the avatar, name and position lies).

3. `basics.profiles`

   The social network icon preceding the `url` is generated based on `network`.
   `username` is being ignored.
   Allowed values for `network` are:

   + [`Angellist`](https://angel.co/)
   + [`Ansible`](https://www.ansible.com/)
   + [`Bitbucket`](https://bitbucket.org/)
   + [`Dribbble`](https://dribbble.com/)
   + [`Facebook`](https://www.facebook.com/)
   + [`Github`](https://github.com/)
   + [`Instagram`](https://www.instagram.com)
   + [`Linkedin`](https://www.linkedin.com/)
   + [`Pinterest`](https://www.pinterest.com/)
   + [`Skype`](https://www.skype.com/)
   + [`Slideshare`](https://www.slideshare.net/)
   + [`Stackoverflow`](http://stackoverflow.com/)
   + [`Stackshare`](https://stackshare.io/)
   + [`Tumblr`](https://www.tumblr.com/)
   + [`Twitter`](https://twitter.com)
   + [`Vimeo`](https://vimeo.com/)
   + [`Xing`](https://www.xing.com/)
   + [`Youtube`](https://www.youtube.com)

4. `work`

   Added the posibility to represent promotions or position changes within the same company. For doing so you need to wrap the related work positions with an extra array like so:

   ```json
   "work": [
        [
            {
                "company": "Pied Piper",
                "position": "CEO",
                "website": "http://piedpiper.com",
                "startDate": "2016-07-01"
            },
            {
                "company": "Pied Piper",
                "position": "CTO",
                "website": "http://piedpiper.com",
                "startDate": "2014-04-13"
            }
        ],
        {
            "company": "Hooli",
            "position": "Software Engineer",
            "website": "http://hooli.com",
            "startDate": "2011-02-01"
        }
   ]
   ```

5. `languages`

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

6. `skills`

   When in `sidebar mode`, the data used is only `name` and `level`. The latest
   has to be a number between **0** and **5**.

7. `certifications` (extra data, not in the original schema)

   Same data structure as awards
