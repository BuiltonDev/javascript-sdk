[![Travis](https://img.shields.io/travis/shareactorIO/javascript-sdk/master.svg?style=flat-square)](https://travis-ci.org/shareactorIO/javascript-sdk.svg?branch=master)
[![David](https://img.shields.io/david/shareactorIO/javascript-sdk.svg?style=flat-square)](https://david-dm.org/shareactorIO/javascript-sdk)
[![Codacy](https://img.shields.io/codacy/grade/d19b1c3168204a07b0582303138d5cc4.svg?style=flat-square)](https://www.codacy.com/app/ShareActor/javascript-sdk)
[![Codacy coverage](https://img.shields.io/codacy/coverage/d19b1c3168204a07b0582303138d5cc4.svg?style=flat-square)](https://www.codacy.com/app/ShareActor/javascript-sdk)
[![GitHub release](https://img.shields.io/github/release/shareactorIO/javascript-sdk.svg?style=flat-square)](https://github.com/shareactorIO/javascript-sdk/releases)
[![license](https://img.shields.io/github/license/shareactorIO/javascript-sdk.svg?style=flat-square)](LICENSE.md)

# ShareActor SDK

[ShareActor](https://www.shareactor.io) offers a platform as a service that digitizes core business functions and optimizes resource allocation with baked-in machine learning capabilities. This SDK gives you access to our platform's building blocks and will help you implement its API in a Javascript or browser environment.  Get instant access to modules like Payments, Messaging Tools, User Management and Authentication, Scheduling, Resource Allocation and more.

![ShareActor logo](https://preview.ibb.co/eAqEfF/Artboard_1.png)

## Requirement

- A ShareActor API Key ([request one](mailto:hello@shareactor.io)).
- An [Auth0](https://auth0.com/) account.

## Install

From the [unpkg](https://unpkg.com/) CDN

```html
<script src="https://unpkg.com/@shareactor/shareactor-sdk@latest/dist/main.bundle.js"></script>
```

From [npm](https://npmjs.org)

```sh
npm install @shareactor/shareactor-sdk
```


## Getting started

`new ShareActor({ apiKey, bearerToken, endpoint })`

Initialises a new instance of `ShareActor` configured with your application `apiKey`, the `bearerToken` token from Auth0 (optional) and the endpoint of your choice (generally `https://qa.shareactor.io/` for our QA environment or `https://api.shareactor.io/` for our production one).

- **apiKey {String}**: Your attributed ShareActor API Key.
- **bearerToken {String}** - *(optional)*: Your JSON Web Token (JWT), generally from Auth0.
- **endpoint {String}**: The endpoint for the environment of your choice (generally `https://api.shareactor.io/` or `https://qa.shareactor.io/`).

*Note: Accessing the API without a bearerToken will limit the number of endpoints and information you can access.*

### Example (using the [Auth0's Lock library](https://github.com/auth0/lock))

```js
var clientId = "YOUR_AUTH0_APP_CLIENTID";
var domain = "YOUR_DOMAIN_AT.auth0.com";
var lock = new Auth0Lock(clientId, domain, {
  auth: {
    responseType: 'token id_token',
    params: {scope: 'openid app_metadata user_metadata'}
  },
  allowedConnections: ['facebook'],
  container: 'auth0Root'
});

lock.on("authenticated", function(authResult) {
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    var shareactor = new ShareActor({
	apiKey: 'YOUR_SHAREACTOR_API_KEY',
	bearerToken: authResult.idToken,
	endpoint: 'https://qa.shareactor.io/'
    });

    var loginBody = {
      first_name: profile.given_name,
      last_name: profile.family_name,
    };
    
    shareactor.user().login({ body: loginBody }, function(error, user, raw) {
      // The raw parameter contains the full response of the query, it's optional but can be useful to access the response's headers.
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

- No parameter *(some methods may not be accessible)*
- An **id {String}**, which represents the ID of the object you want to instantiate *(you will not be able to access any property of the object, until you `refresh` or `get` it)*
- A **Json {Object}**, which represents an object *(this will create the full object with all its properties)*


###### Example: Creation of a Product object with no parameter
**`product()`**

Create an empty product. It is useful if you want to `create`, or get all the products with the `getAll` method.

```js
// Example: Construct a product without any parameter.
var product = shareactor.product();
console.log(product.name); // undefined


// Example: Construct a product without any parameter, and call an accessible function.
shareactor.product().getAll({}, function(error, products, raw) {
  // The raw parameter contains the full response of the query, it's optional but can be useful to access the response's headers.
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

This creates a partially empty product. It contains the ID of the product you want to manipulate but doesn't contain all the properties of that product. It can be populated by calling `get` or `refresh`.

- **id {String}**, product ID

```js
// Example: Construct a product with an ID.
var product = shareactor.product(productId);
console.log(product.name); // undefined


// Example: Construct a product with an ID and refresh it.
shareactor.product(userId).get({}, function(error, product, raw) {
  // The raw parameter contains the full response of the query, it's optional but can be useful to access the response's headers.
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

You can create a full product from a JSON object. This will create an object with all the properties accessible.

- **Json {Object}**, JSON object representing a product

```js
// Example: Construct a product with a JSON Object.

var product = shareactor.product(productJson);
console.log(product.name); // Bedroom cleaning
```

The methods and classes used here match those in the API. You can find more details about them in the [API documentation](https://shareactorio.github.io/slate/).


## Coverage of the SDK

The coverage of this SDK can be found in the [COVERAGE](COVERAGE.md) file.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them to this repository's issues section.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.md) file for more info.
