# GUS-App-Hero

This is an OAP Application for gus Medical Collage

# Modules

**Application Screen**: The Student can fill all the required details in form and able to submit.

**Success Screen**: Once The Student submitted the form successfully then they will see the thank you screen.

# Get Started

To get started with this project, clone the repository to your local machine and install the dependencies using yarn

```
# first clone this project

git clone https://github.com/Incresco/r3-oaf-frontend.git

# run yarn command from root folder
yarn

```

## Folder Structure

```
    │
    ├── apps
    │   ├── desktop
    │   ├── mobile
    │   └── web
    │
    ├── libs
    │   ├── components
    │   ├── icons
    │   └── theme
    │
    ├── packages
    │   ├── shared
    │   └── src
    │
    │
    ├── package.json
    ├── .gitignore
    └── README.md
```

# Deployment Link

1. [dev](http://r3-oaf-app-dev.s3-website.ap-south-1.amazonaws.com/application)
2. [s3Bucket](https://s3.console.aws.amazon.com/s3/buckets/r3-oaf-app-dev?region=ap-south-1&tab=objects)

## Commands

| Command        | Action                                  |
| :------------- | :-------------------------------------- |
| `yarn`         | install the required dependencies       |
| `yarn web`     | run the project in web `localhost:3000` |
| `yarn android` | run the application android emulator    |
| `yarn ios`     | run the application ios emulator        |
| `yarn start`   | start the metro bundle                  |
