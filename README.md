# Gallery App for listing photos from Unsplash

This project lists photos from [Unsplash API](https://unsplash.com/documentation). Users can also search photos and also filter the results based on the color, orientation, and order filters. The photos are listed using infinite scroll.

### [Live Demo](https://unsplash-react-clone.netlify.app/)

![image](https://user-images.githubusercontent.com/26774310/124156866-c12fc080-dab5-11eb-9d2a-e7d6385affcc.png)
![image](https://user-images.githubusercontent.com/26774310/124156898-cc82ec00-dab5-11eb-9c0c-0ddf979a4c4f.png)

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

Each modules can be accessed using the aliases such as `@components` as specified in the `jsconfig.json`. Also for testing as specified in jest config in the `package.json`.
