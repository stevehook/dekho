#Dekho

A simple app for storing online presentations.

The back-end is an API server implemented in Node.js on a Postgresql
database. The front-end is a single-page application  written in
Angularjs.

##Setting up development environment

You will need a couple of new Postgres databases:

    $ createdb --no-password dekho_development
    $ createdb --no-password dekho_test

###Seed data

Running the seeds.js script will create the test user, bob@example.com,
with password secret, and some sample data.

    $ node server/data/seeds.js

##Deployment

In order to deploy to Heroku you either need to build the static assets
locally, using `grunt build`, and then push them to you heroku remote,
or you need to be able to run `bower install` and `grunt build` as a
postinstall step after pushing to heroku. I've gone for the local build
option because I had trouble running `grunt build` (specifically the
`sass` task due to dependencies on Ruby and the sass gem despite trying
various buildpacks). To keep the `master` branch clean builds are done in
a `build` branch and pushed from there with a modified `.gitignore` to
include the files built in `server/public`.

##TODO

 - [x] store auth token in local storage and re-establish logged state
     after page refresh.
 - [x] redirect to login form when the user tries to access an authenticated route
 - [x] redirect to home page after successful login and to login page after logout
 - [x] style the login page properly
 - [ ] add a login/logout menu bar
 - [ ] home controller should pull collection of decks from the server
 - [ ] switch to 'as controller' style
