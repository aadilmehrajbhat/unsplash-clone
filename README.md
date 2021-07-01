# Gallery App for listing photos from Unsplash

This project lists photos from [Unsplash API](https://unsplash.com/documentation). Users can also search photos and also filter the results based on the color, orientation, and order filters. The photos are listed using infinite scroll.

### [Live Demo](https://unsplash-react-clone.netlify.app/)  



![image](https://user-images.githubusercontent.com/26774310/124156866-c12fc080-dab5-11eb-9d2a-e7d6385affcc.png)
![image](https://user-images.githubusercontent.com/26774310/124156898-cc82ec00-dab5-11eb-9c0c-0ddf979a4c4f.png)


## API Key (Client ID)

The Unsplash client Id can be generated using the [developer account](https://unsplash.com/documentation#creating-a-developer-account). The client id is specified in the `.env` file in the project root directory and the environment variable namely `REACT_APP_UNSPLASH_CLIENT_ID` refers to API client id.

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

Each modules can be accessed using the aliases such as `@components` as specified in the `jsconfig.json` and `craco.config.js`. Also for testing as specified in jest config in the `package.json`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
