This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Please install all dependencies by running:
### `yarn install`

Upon completion of installation you can run:
### `yarn start`

To run test, do the following:
### `yarn test`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Additional Notes and Assumption of the Project.
This should do the following thing:
* **Showing all BikEEE advertisement data on src/DATABASE/data.csv**
  * such data.csv has been transformed into data.json manually
* **Showing 3 the models that are currently offered most often**
  * The valid naming format of BikEEE Model is UPPERCASE and without "-" (if any, replaced by "space")
  * The application will rank all BikkEEE Model according to its number of advertised on BikEEE. The most frequently advertised Model should be in the 1st rank, while the bigest rank should be given to the Model that advertised 1 time. In case there are two or more Model has the same number of Advertised, they should have equal rank.
  * At the end, the app will show all Model in 1st rank to 3rd rank.
