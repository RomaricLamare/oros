# oros
Projet d'application de e-commerce pour le titre de Concepteur Développeur d'Applications
# Oros project

Welcome to our github repo! This project was made in collaboration during an alternating apprenticeship with 4 group members:

- [Thibaud Delvert](https://github.com/thibaud75)
- [Romaric Lamare](https://github.com/RomaricLamare)
- [Julia Spriggs](https://github.com/julia-spriggs)
- [Alicia Vivier-Merle](https://github.com/aliciavm98)

As we attended this alternating program through the [Wild Code School](https://github.com/WildCodeSchool), this project was worked on remotely by all four of us.

## Deploying to the school server

This project has been deployed to the VPS that was provided by our school, which was unfortunately temporarily available. 

A process of CD (Continuous deployment) has been put into place. So with each new update to our main branch, if the tests that are set up are properly passed, then the new image is sent to our group's dockerhub.

On dockerhub, we have a webhook set up that automatically updates the image to our (site of pre-production)[https://staging.1123-jaune-1.wns.wilders.dev/]

Once everything is verified on our staging site, this new image can either be updated through a different webhook to production, or it can be updated manually through a bash script that is in place on our server. Either option is done by one of our team members to avoid potential bad actors.

## Process of deployment

As mentioned above, the server we deployed on was a VPS that was provided to us by our school.

Here are the steps we took to put everything in place once access to the server was given to us:

- We changed the connection port to a number that would be less easily found, for security reasons
- We installed and configured fail2ban to further protect the server in case of someone trying to connect several times without success
- We installed Caddy and created a Caddyfile as a reverse proxy to manage HTTP requests on our attributed domain
- We installed docker on the server so we wouldn't have to install all the software we needed for our project manually
- We created a group account on Dockerhub to host our images for each repo
- For each of our github repos, we added the username and token for each of our dockerhub repos under the secrets section of github
- Both our front-end and back-end each have their own workflows (you can take a look at how we set up our front-end workflow [here](https://github.com/WildCodeSchool/2311-wns-jaune-oros-front/blob/main/.github/workflows/front-tests.yml) as an example), and they're set up so when a pull request or push on main is created, the tests we created (with Jest) are deployed automatically with github actions, and if the tests pass, then the new image is sent to dockerhub
- On our server, 2 docker compose files were created - one for staging (or pre-production), and the other for production
- We created an nginx.conf file to redirect entering requests from GraphQL to our back-end, and all other requests are sent to the front-end
- For both staging and production, we created a simple bash script that when deployed, it (re-)launches our docker compose file and fetches the latest image that was pushed onto our dockerhub
- We installed webhook on our server, and created a webhook.conf file, where we created 2 webhooks, one for updating the staging side, and the other to update production.
- We updated our Caddyfile so it had our domain and sub-domains - the domain for prod, a sub-domain for staging, and another sub-domain for our webhooks
- On dockerhub, for each repo, we added under the webhook tab the address to our staging webhook, so that each time a new image has been pushed, the webhook will be fired and will update our staging site automatically with our newest version of our code.

Though this was worked on over a period of 6 months, we were only able to dedicate about one week per month on this because of the alternating system of being in school and then working full-time, so we're proud of how far we were able to get our project in a relatively short span of time!
