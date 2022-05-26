# Gallery App for listing photos from Unsplash

![GitHub last commit](https://img.shields.io/github/last-commit/aadilmehrajbhat/unsplash-clone)

This project lists photos from [Unsplash API](https://unsplash.com/documentation). Users can also search photos and also filter the results based on the color, orientation, and order filters. The photos are listed using infinite scroll.

### [Live Demo](https://unsplash.aadilmehraj.dev/)


![Screenshot 2022-05-24 at 6 56 01 PM](https://user-images.githubusercontent.com/26774310/170048983-22526723-6289-40aa-914e-6dee25e02b3a.png)


![Screenshot 2022-05-24 at 6 57 13 PM](https://user-images.githubusercontent.com/26774310/170048971-dcff85f8-e1de-48ab-83bc-2a13f1ea8f1d.png)


![Screenshot 2022-05-24 at 6 57 28 PM](https://user-images.githubusercontent.com/26774310/170048941-04e47d74-5b57-4e31-9121-37d3e3de7436.png)




## API Key (Client ID)

The Unsplash client Id can be generated using the [developer account](https://unsplash.com/documentation#creating-a-developer-account). The client id is specified in the `.env.local` file in the project root directory and the environment variable namely `NEXT_PUBLIC_UNSPLASH_CLIENT_ID` refers to API client id.

## Getting started

1. Install the dependencies using `yarn install`
2. Run the project in development mode using `yarn start`

## Project structure

The project source code can be found in the `src` directory. The structure is divided in individual modules as:

1. `components`: Reusable components across the app
2. `hooks`: custom reusable hooks across the app
3. `contexts`: context providers across the app
4. `pages`: application pages
5. `utils`: application helpers
6. `services`: includes apis and other services
7. `assets`: all the application assets
8. `tests`: wrappers and helpers for unit and E2e testing

Each modules can be accessed using the aliases such as `@components` as specified in the `jsconfig.json`. Also for testing as specified in jest config in the `package.json`.
