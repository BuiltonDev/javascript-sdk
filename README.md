[![Travis](https://img.shields.io/travis/BuiltonDev/javascript-sdk/master.svg?style=flat-square)](https://travis-ci.org/BuiltonDev/javascript-sdk.svg?branch=master)
[![David](https://img.shields.io/david/BuiltonDev/javascript-sdk.svg?style=flat-square)](https://david-dm.org/BuiltonDev/javascript-sdk)
[![GitHub release](https://img.shields.io/github/release/BuiltonDev/javascript-sdk.svg?style=flat-square)](https://github.com/BuiltonDev/javascript-sdk/releases)
[![license](https://img.shields.io/github/license/BuiltonDev/javascript-sdk.svg?style=flat-square)](LICENSE.md)

# Builton SDK

[Builton](https://www.builton.dev) offers a platform as a service that digitizes core business functions and optimizes resource allocation with baked-in machine learning capabilities. This SDK gives you access to our platform's building blocks and will help you implement its API in a Javascript or browser environment.  Get instant access to modules like Payments, Messaging Tools, User Management and Authentication, Scheduling, Resource Allocation and more.

![Builton logo](https://res.cloudinary.com/dftspnwxo/image/upload/v1554131594/Builton_logo_positiv_wc3j7x.svg)

If you are looking for the service python SDK, take a look at it on [Github](https://github.com/BuiltonDev/python-sdk) and on [PyPI](https://pypi.org/project/builton-sdk/)

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
npm install @builton/core-sdk
```


## Getting started

`new Builton({ apiKey, bearerToken })`

Initialises a new instance of `Builton` configured with your application `apiKey` and a `bearerToken` token from an authentication provider (optional).

- **apiKey {String}**: Your attributed Builton API Key.
- **bearerToken {String}** - *(optional)*: Your JSON Web Token (JWT), from your authentication provider.

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
	bearerToken: authResult.idToken
    });

    var loginBody = {
      first_name: profile.given_name,
      last_name: profile.family_name,
    };

    builton.authenticate.login(loginBody, {}, function(err, user, raw) {
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
	  });
	  const body = {
		first_name: 'demo',
		last_name: 'demo',
	  };
	  builton.users.authenticate(body).then((user) => {
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

### Example: Fetching and updating payment methods

Using a callback:
```js
builton.paymentMethods.get({ urlParams: { size: 5 } }, function(err, paymentMethods) {
  const firstPaymentMethod = paymentMethods[0];
  firstPaymentMethod.update({
		token: ':StripeTokenId:'
  });
});
```

Using promises:
```js
builton.paymentMethods.get({ urlParams: { size: 5 } }).then((paymentMethods) => {
  const firstPaymentMethod = paymentMethods[0];
  firstPaymentMethod.update({
    token: ':StripeTokenId:'
  });
});
```

Using async/await:
```js
// This needs to be within in an `async` function
const paymentMethods = await builton.paymentMethods.get({ urlParams: { size: 5 } });
const firstPaymentMethod = paymentMethods[0];
firstPaymentMethod.update({
  token: ':StripeTokenId:'
});
```

### Example: Updating a payment method by id

```js
builton.paymentMethods.update(':paymentMethodId:', {
  token: ':StripeTokenId:'
});
```

Using the `set` method:

```js
const paymentMethod = builton.paymentMethods.set(':paymentMethodId:');
paymentMethod.update({
  token: ':StripeTokenId:'
});
```

### Example: Using the `set` methods:

The `set` method allows you to create an object without fetching it from the api. I can be useful when working with stored data for example.

```js
const paymentMethod = builton.paymentMethods.set(':paymentMethodId:');
paymentMethod.update({
  token: ':StripeTokenId:'
});
```

With multiple payment methods:
```js
const paymentMethods = builton.paymentMethods.set([':paymentMethodId1:', ':paymentMethodId2:']);
paymentMethods[0].update({
  token: ':StripeTokenId:'
});
```

With full props:
```js
const paymentMethod = builton.paymentMethods.set({<paymentMethodJsonObject>});
paymentMethod.update({
  token: ':StripeTokenId:'
});
```

### Example: Uploading an image

```js
await b.images.create({ imageData, isPublic: true });
```
See the [full example](examples/imageUpload/README.md) for more details.


## Issue Reporting

If you have found a bug or if you have a feature request, please report them to this repository's issues section.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.md) file for more info.
