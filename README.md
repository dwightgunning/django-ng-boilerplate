# Django-Angular Boilerplate

A starter project for Django + Angular.js.

The major technologies used are:
- [Angular.io](https://angular.io/) ([TypeScript](https://www.typescriptlang.org))
- [SASS](http://sass-lang.com/)
- [Foundation for Sites](https://foundation.zurb.com/sites.html)
- [Django](https://djangoproject.com)
- [Django REST framework](http://www.django-rest-framework.org/).

## Project setup

1. Install the frontend dependencies with Yarn:

```(bash)
yarn
```

2. Install the backend API dependencies with Pipenv:

```(bash)
pipenv install
```

3. Create the database:

```(bash)
python manage.py migrate
```

4. Create a superuser account:

```(bash)
python manage.py createsuperuser
```

5. Run the frontend development server:

```(bash)
ng serve
```

Then navigate to `http://localhost:4200/`.

6. Run the backend API development server:

```(bash)
python manage.py runserver
```

Now navigate to `http://localhost:8000/api/`.

## Development

### Angular.io - Frontend Development with Angular CLI

This frontend for this project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.7.

The frontend developer tooling and experience is consistent with the Angular CLI, with the following adjustments:
 - Linting

#### Linting

tslint and lint-sass are setup for Typescript and SASS.
 - Typescript: `ng lint`
 - SASS: `npm run lint-sass`

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Django - Backend API Development

The backend API for this project is built upon the [Django Framework](https://www.djangoproject.com).

The backed developer tooling and experience is consistent with the Django Framework, with the following adjustments:
 - Linting

#### Linting

Flake8 is setup for Python.
 - Python: `flake8`

#### Further help

To get more help on the Django Framework use `python manage.py help`, go check out the [Django Framework Documentation] and the [Django REST framework API guide](http://www.django-rest-framework.org/#api-guide).

### Linting on git pre-commit

A python script suitable for use as a git pre-commit hook is included at `bin\pre-commit.py`. By default it lints Python, Typescript and SASS files that are staged.

## Deployment

### Heroku

#### First-time deployment

On the first deployment, some initial configuration is required. Click the button to get started:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

 - App name: Pick a name for your project. Note the name needs to be copied into a couple of the config vars (see below).
 - Region: Wherever you like.

##### Config Vars

Heroku config vars impact multiple aspects of the system:
- The Heroku "app"
- The Heroku build pipeline
- The Django and Angular runtime

Several variables **must** be set when first deploying the app:

- ALLOWED_HOSTS: Update the placeholder with the 'App name'.
- API_BASE_URL: Update the placeholder with the 'App name'.

Some variables are optional and/or customisable:
- DEBUG: *Optional*. Set to `true` or `false`.

The following (probably) shouldn't be modified:
 - DISABLE_COLLECTSTATIC
 - EMAIL_BACKEND
 - NPM_CONFIG_PRODUCTION

#### Regular deployments

```(bash)
heroku push
```

#### Running Django commands

```(bash)
heroku run python backend/manage.py check
```

#### Sentry integration

Heroku-Sentry integration is enabled by default via the `app.json` Heroku manifest. The integration
automatically adds the `SENTRY_DSN` config var to the Heroku app.

#### Sentry project/organisation

The integration creates a new Sentry 'organisation' and 'project' for each Heroku app. If you already have 
a Sentry account and an organisation to which the app should be linked, there are two options:

1. Create a project in Sentry and set the SENTRY_DSN config var manually when creating the Heroku app.

2. Create the app and transfer the project to an organisation accessible from your existing user:
- Use the Heroku dashboard to login to Sentry
- Navigate to the Project settings in the Sentry dashboard
- Choose 'transfer ownership' option and enter the username of your pre-existing Sentry account
- Logout of Sentry (this is important as the email sent by Sentry contains a one-time-use code)
- Check your email for the request to transfer ownership. Follow the link.
- Choose an existing organisation to transfer ownership. 

#### Sentry release tracking

To track releases, two Sentry integrations are needed. Firstly, an SCM/Repository (e.g. BitBucket,
Github, GitLab) must be setup. Then the Heroku integration can be added and configured. Detailed 
instructions are given in [this blog post](https://blog.sentry.io/2020/06/10/access-commit-data-for-each-release-with-sentry-and-heroku).

Don't forget to configure the Heroku webhook and check that it appears in the list of integrations.

## Copyright and License Information

Copyright (c) 2015-2020 Dwight Gunning, and individual contributors. All rights reserved.

See the file "LICENSE" for information on the history of this software, terms & conditions for usage, and a DISCLAIMER OF ALL WARRANTIES.
