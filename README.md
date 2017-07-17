[![Travis](https://img.shields.io/travis/shareactorIO/javascript-sdk/master.svg?style=flat-square)]()
[![GitHub release](https://img.shields.io/github/release/shareactorIO/javascript-sdk.svg?style=flat-square)]()
[![license](https://img.shields.io/github/license/shareactorIO/javascript-sdk.svg?style=flat-square)]()

# ShareActor SDK

[ShareActor](https://www.shareactor.io) offers software as a service that digitizes core business functions, optimizes resource allocation and provides Data Science driven analysis. This SDK will help you implement its API in a Javascript or browser environment.

![ShareActor logo](https://preview.ibb.co/eAqEfF/Artboard_1.png)

## Requirement

- A ShareActor API Key ([request one](mailto:hello@shareactor.io)).
- An [Auth0](https://auth0.com/) account.

## Install

From CDN

```html
<script src="https://unpkg.com/@shareactor/shareactor-sdk@latest/dist/main.bundle.js"></script>
```

From [npm](https://npmjs.org)

```sh
npm install @shareactor/shareactor-sdk
```


## Getting started

`new ShareActor({ apiKey, bearerToken, endpoint })`

Initialises a new instance of `Shareactor` configured with your application `apiKey`, the `bearerToken` token from Auth0, and the endpoint of your choice (generally `https://qa.shareactor.io/` for our QA environment or `https://api.shareactor.io/` for our production one).

- **apiKey {String}**: Your attributed ShareActor API Key.
- **bearerToken {String}**: Your JSON Web Token (JWT), generally from Auth0.
- **endpoint {String}**: The endpoint for the environment of your choice (generally `https://api.shareactor.io/` or `https://qa.shareactor.io/`).

### Example (using the [Auth0's Lock library](https://github.com/auth0/lock))

```js
var clientId = "YOUR_AUTH0_APP_CLIENTID";
var domain = "YOUR_DOMAIN_AT.auth0.com";
var lock = new Auth0Lock(clientId, domain);

lock.on("authenticated", function(authResult) {
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    var shareactor = new ShareActor(
      'YOUR_SHAREACTOR_API_KEY',
      authResult.idToken,
      'https://qa.shareactor.io/'
    );

    var loginBody = {
      first_name: profile.given_name,
      last_name: profile.family_name,
    };
    
    shareactor.user().login({ body: loginBody }, function(error, user) {
	  if (error) {
		// Handle error
		return;
	  }
    
      // Update DOM
    });
  });
});
```


## Initialisation of a class

A class can be constructed with either:

- No parameter; *(some methods may not be accessible)*
- An **id {String}**, which represent the ID of the object you want to instanciate; *(you will not be able to access any property of the object, until you `refresh` or `get` it)*
- A **Json {Object}**, which represent an Object. *(this will create the full object with all its properties)*


###### Example: Creation of a Product object with no parameter
**`product()`**

Create an empty product. It is useful if you want to `create`, or get all the products with the `getAll` method.

```js
// Example: Construct a product without any parameter.
var product = shareactor.product();
console.log(product.name); // undefined


// Example: Construct a product without any parameter, and call an accessible function.
shareactor.product().getAll({}, function(error, products) {
  if (error) {
	// Handle error
	return;
  }
  
  console.log(products); // [Object Product]
  // Update DOM
});
```

----

###### Example: Creation of a Product object with an ID
**`product(id)`**

This create a partially empty product. It contains the id of the product you want to manipulate but doesn't contain all the properties of that product. It can be populated by calling `get` or `refresh`.

- **id {String}**: Product ID.

```js
// Example: Construct a product with an ID.
var product = shareactor.product(productId);
console.log(product.name); // undefined


// Example: Construct a product with an ID, and refresh it.
shareactor.product(userId).get({}, function(error, product) {
  if (error) {
	// Handle error
	return;
  }

  console.log(product.name); // Bedroom cleaning
  // Update DOM
});
```

----

###### Example: Creation of a Product object with a JSON Object
**`product(json)`**

You can create a full product from a json object. This will create an object with all the properties accessible.

- **Json {Object}**: Json object representing a product.

```js
// Example: Construct a product with a JSON Object.

var product = shareactor.product(productJson);
console.log(product.name); // Bedroom cleaning
```

The methods and classes used here are matching the API ones, you can find more details about them in the [API documentation](https://shareactorio.github.io/slate/).


## Coverage of the SDK

The coverage of this SDK can be found in the [COVERAGE](COVERAGE.md) file.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.md) file for more info.
