# Hypertube 
![Hypertube](https://img.shields.io/github/languages/top/Jukkay/hypertube)

## Description

Hypertube is the last project of Hive Helsinki's web branch. It's a streaming web app similar to Netflix, but it downloads and caches bittorrents to the server and then streams them to the user.

## Features

* Authentication using Next-Auth
* OAuth login and sign up
* Credentials login and signup
* Log in using email verification
* Movie search
* Movie streaming
* Subtitles
* Movie information from IMDB
* Caching of movies for 30 days
* Changing screen name, email, password, and profile picture
* Password reset

## Technologies

* [Create-T3-App](https://beta.create.t3.gg)
* [React.js](https://reactjs.org/)
* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Next-Auth.js](https://next-auth.js.org)
* [Prisma](https://prisma.io)
* [tRPC](https://trpc.io)
* [Docker](https://docker.com)

The project is bootstrapped using Create T3 App, which gives us a basic setup for Next, TypeScript, tRPC, Prisma, and Next-Auth. Next-Auth setup is highly modified to allow credential login and use of custom pages and authentication flow. We're using Next's backend mainly with tRPC but some endpoints are called directly with React Query.

The development environment runs in Docker containers and the Docker files are included in the repository.

## Installation

1. Go to the config/secrets folder and create secrets with:
```
printf "%s" "$(openssl rand -base64 20)" > db_password.secret
printf "%s" "$(openssl rand -base64 10)" > server_token.secret
printf "%s" "$(openssl rand -base64 10)" > refresh_token.secret
```
2. Remove the '-example' postfix from the .env-example file
3. Add your outlook email to EMAIL_SERVER_USER and password to EMAIL_SERVER_PASSWORD
4. OR create and authorize an OAuth app at Github and add the id to GITHUB_ID and the secret to GITHUB_SECRET (use either or both methods depending on which is easier for you)
5. Build the project with ```make eval```
6. Run the project with ```make up-production```
7. Browse to [http://localhost:8080](http://localhost:8080) and log in using your DB credentials (choose PostgreSQL from the dropdown menu).
8. Choose the database called hypertube and click the SQL command tab.
9. Seed the database with:
```
COPY"Movie"(id ,url,imdb_code,title,title_english,title_long,slug,year,rating,runtime,genres,summary,description_full,synopsis,yt_trailer_code,language,mpa_rating,background_image,background_image_original,small_cover_image,medium_cover_image,large_cover_image,state,date_uploaded,date_uploaded_unix)
FROM'/movies_1.tsv'
DELIMITERS  E'\t' CSV header;
COPY"Movie"(id ,url,imdb_code,title,title_english,title_long,slug,year,rating,runtime,genres,summary,description_full,synopsis,yt_trailer_code,language,mpa_rating,background_image,background_image_original,small_cover_image,medium_cover_image,large_cover_image,state,date_uploaded,date_uploaded_unix)
FROM'/movies_2.tsv'
DELIMITERS  E'\t' CSV header;
COPY"Torrent"(url,hash,quality,type,seeds,peers,size,size_bytes,date_uploaded,date_uploaded_unix,"movieId")
FROM '/torrents.tsv'
DELIMITERS E'\t' CSV header;
COPY"Torrent"(url,hash,quality,type,seeds,peers,size,size_bytes,date_uploaded,date_uploaded_unix,"movieId")
FROM '/torrents.tsv'
DELIMITERS E'\t' CSV header;
```
10. Browse to [http://localhost:3000](http://localhost:3000) and sign up.

## :warning: WARNING

This project is purely for educational purposes and we do not advocate or condone piracy in any way. The used torrent API includes copyrighted material so downloading/streaming them might NOT BE LEGAL. Browsing the titles isn't against the law but stream the movies at your own risk. Pressing the play button initiates the download. :warning:
This is also why we won't provide a deployed version of the app.

## Contributors

* [Omar Alsakka](https://github.com/omaralsakka): Front end and visual design
* [Luke Lönnroth](https://github.com/Microsmosis): Streaming, back end and API
* [Ville Niemi](https://github.com/vilniemi): Front end, back end and external API integration
* [Jukka Ylimaula](https://github.com/Jukkay): DevOps, login/signup system, back end and API
