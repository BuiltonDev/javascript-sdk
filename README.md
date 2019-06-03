[![Travis](https://img.shields.io/travis/BuiltonDev/javascript-sdk/master.svg?style=flat-square)](https://travis-ci.org/BuiltonDev/javascript-sdk.svg?branch=master)
[![David](https://img.shields.io/david/BuiltonDev/javascript-sdk.svg?style=flat-square)](https://david-dm.org/BuiltonDev/javascript-sdk)
[![Codacy](https://img.shields.io/codacy/grade/b40e787a54f944abbba4b9e2698c0085.svg?style=flat-square)](https://app.codacy.com/app/Builton/javascript-sdk)
[![Codacy coverage](https://img.shields.io/codacy/coverage/b40e787a54f944abbba4b9e2698c0085.svg?style=flat-square)](https://www.codacy.com/app/Builton/javascript-sdk)
[![GitHub release](https://img.shields.io/github/release/builton/javascript-sdk.svg?style=flat-square)](https://github.com/BuiltonDev/javascript-sdk/releases)
[![license](https://img.shields.io/github/license/BuiltonDev/javascript-sdk.svg?style=flat-square)](LICENSE.md)

# Builton SDK

[Builton](https://www.builton.dev) offers a platform as a service that digitizes core business functions and optimizes resource allocation with baked-in machine learning capabilities. This SDK gives you access to our platform's building blocks and will help you implement its API in a Javascript or browser environment.  Get instant access to modules like Payments, Messaging Tools, User Management and Authentication, Scheduling, Resource Allocation and more.

![Builton logo](https://res.cloudinary.com/dftspnwxo/image/upload/v1554131594/Builton_logo_positiv_wc3j7x.svg)



## Requirement

- A Builton API Key ([get one](https://dashboard.builton.dev)).
- An [Auth0](https://auth0.com/), [Firebase](https://firebase.google.com/docs/auth/) or [Cognito](https://aws.amazon.com/cognito/) account.

## Install

From the [unpkg](https://unpkg.com/) CDN

```html
<script src="https://unpkg.com/@builton/core-sdk@latest/dist/main.bundle.js"></script>
```

From [npm](https://npmjs.org)

```sh
npm install @builton.dev/core-sdk
```


## Getting started

`new Builton({ apiKey, bearerToken, endpoint })`

Initialises a new instance of `Builton` configured with your application `apiKey`, a `bearerToken` token from an authentication provider (optional) and the endpoint of your choice (generally `https://qa.builton.dev/` for our QA environment or `https://api.builton.dev/` for our production one).

- **apiKey {String}**: Your attributed Builton API Key.
- **bearerToken {String}** - *(optional)*: Your JSON Web Token (JWT), from your authentication provider.
- **endpoint {String}**: The endpoint for the environment of your choice (generally `https://api.builton.dev/` or `https://qa.builton.dev/`).

*Note: Accessing the API without a bearerToken will limit the number of endpoints and information you can access.*

### Example (using [Auth0's Lock library](https://github.com/auth0/lock) as an authentication provider)

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
  lock.getUserInfo(authResult.accessToken, function(err, profile) {
    if (err) {
      // Handle error
      return;
    }

    var builton = new Builton({
	apiKey: 'YOUR_Builton_API_KEY',
	bearerToken: authResult.idToken,
	endpoint: 'https://qa.builton.dev/'
    });

    var loginBody = {
      first_name: profile.given_name,
      last_name: profile.family_name,
    };

    builton.user().login({ body: loginBody }, function(err, user, raw) {
      // The raw parameter contains the full response of the query, it's optional but can be useful to access the response's headers.
	  if (err) {
		// Handle error
		return;
	  }

      // Update DOM
    });
  });
});
```

### Example (using [Firebase Authentication's pre-built UI](https://firebase.google.com/docs/auth/web/firebaseui) as an authentication provider)

```html
[...]
<div id="firebaseui-auth-container"></div>
<script src="https://unpkg.com/@builton/core-sdk@latest/dist/main.bundle.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.5.4/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.5.4/firebase-auth.js"></script>
<script src="https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.js"></script>
<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.css" />
[...]
```

```js
firebase.initializeApp({
	apiKey: "YOUR_FIREBASE_API_KEY",
	authDomain: "YOUR_FIREBASE_DOMAIN",
});

var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
callbacks: {
  signInSuccessWithAuthResult: function(authResult) {
	var phoneNumber = authResult.user.phoneNumber;
	authResult.user.getIdToken().then((idToken) => {
	  var builton = new Builton({
		apiKey: config.apiKey,
		bearerToken: idToken,
		endpoint: config.endpoint,
	  });
	  const body = {
		first_name: 'demo',
		last_name: 'demo',
	  };
	  builton.user().login({ body }).then((user) => {
		// Update DOM
	  }).catch(console.warn);
	});
	// User successfully signed in.
	// Return type determines whether we continue the redirect automatically
	// or whether we leave that to developer to handle.
	return false;
  },
},
signInOptions: [
  // Leave the lines as is for the providers you want to offer your users.
  firebase.auth.PhoneAuthProvider.PROVIDER_ID
],
};
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
var product = builton.product();
console.log(product.name); // undefined


// Example: Construct a product without any parameter, and call an accessible function.
builton.product().getAll({}, function(err, products, raw) {
  // The raw parameter contains the full response of the query, it's optional but can be useful to access the response's headers.
  if (err) {
	// Handle error
	return;
  }

  console.log(products); // [Object Product]
  // Update DOM
});
```

You can also use a promise to get the object back:

```js
// Example: Construct a product without any parameter, call an accessible function, and use a Promise.
builton.product().getAll({}).then((products) => {
  console.log(products); // [Object Product]
  // Update DOM
}).catch((err) => {
  // Handle error
  return;
});
```

----

###### Example: Creation of a Product object with an ID
**`product(id)`**

This creates a partially empty product. It contains the ID of the product you want to manipulate but doesn't contain all the properties of that product. It can be populated by calling `get` or `refresh`.

- **id {String}**, product ID

```js
// Example: Construct a product with an ID.
var product = builton.product(productId);
console.log(product.name); // undefined


// Example: Construct a product with an ID and refresh it.
builton.product(userId).get({}, function(err, product, raw) {
  // The raw parameter contains the full response of the query, it's optional but can be useful to access the response's headers.
  if (err) {
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

var product = builton.product(productJson);
console.log(product.name); // Bedroom cleaning
```

The methods and classes used here match those in the API. You can find more details about them in the [API documentation](http://reference.builton.dev/).

## Issue Reporting

If you have found a bug or if you have a feature request, please report them to this repository's issues section.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.md) file for more info.
