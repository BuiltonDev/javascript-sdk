# ShareActor SDK

[ShareActor](https://www.shareactor.io) offers software as a service that digitizes core business functions, optimizes resource allocation and provides Data Science driven analysis. This SDK will help you implement its API in a Javascript or browser environment.

## Setup

`new ShareActor({ apiKey, bearerToken, endpoint })`

Initializes a new instance of `Shareactor` configured with your application `apiKey`, the `bearerToken` token from Auth0, and the endpoint of your choice (generally `https://qa.shareactor.io/` for our QA environment or `https://api.shareactor.io/` for our production one).

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

    var sa = new ShareActor(
      'YOUR_SHAREACTOR_API_KEY',
      authResult.idToken,
      'https://qa.shareactor.io/'
    );

    var loginBody = {
      first_name: profile.given_name,
      last_name: profile.family_name,
    };
    
    sa.user().login({ body: loginBody }, function(error, user) {
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
- An **id {String}**, which represent a user ID; *(you will not be able to access any property of the user, until you 'refresh' it)*
- A **Json {Object}**, which represent a User. *(this will create the full object will all its properties)*


**Example: Creation of a User object with no parameter**
**`user()`**

Create an empty user. It is useful if you want to `create`, or `login` a user or get all the users with the `getAll` method.

```js
// Example: Construct a user without any parameter.
var user = sa.user();
console.log(`{user.first_name} {user.last_name}`); //undefined
```

```js
// Example: Construct a user without any parameter, and then log in. It will be populated with the current's user data.
sa.user().login({ body: userBody }, function(error, user) {
  if (error) {
	// Handle error
	return;
  }
  
  console.log(`{user.first_name} {user.last_name}`); //John Doe
  // Update DOM
});
```

```js
// Example: Construct a user without any parameter, and call an accessible function.

// This can only be called if logged as an admin, will throw an error if called as a user.
sa.user().getAll({ urlParams: { page: 2, size: 10 } }, function(error, users) {
  if (error) {
	// Handle error
	return;
  }
  
  console.log(users); //[Object User]
  // Update DOM
});
```

**Example: Creation of a User object with an ID**
**`user(id)`**

This create a partially empty user. It contains the id of the user you want to manipulate but doesn't contain all the properties of that user. It can be populated by calling `get` or `refresh`.

- **id {String}**: User ID.

```js
// Example: Construct a user an ID.

var user = sa.user(userId);
console.log(`{user.first_name} {user.last_name}`); //undefined
```

```js
// Example: Construct a user with an ID, and refresh it.

sa.user(userId).refresh({}, function(error, user) {
  if (error) {
	// Handle error
	return;
  }

  console.log(`{user.first_name} {user.last_name}`); //John Doe
  // Update DOM
});
```

**Example: Creation of a User object with a JSON Object**
**`user(json)`**

You can create a full user from a json object. This will create a full user with all the properties accessible.

- **Json {Object}**: Json object representing a user.

```js
// Example: Construct a user with a JSON Object.

var user = sa.user(userJson);
console.log(`{user.first_name} {user.last_name}`); //John Doe
```



## Common classes and methods

The methods and classes used here are matching the API ones, you can find more details about them in the (API documentation)[https://shareactorio.github.io/slate/].

|       **Classes**       |                                           |                                  User                                 |                            Provider                            |                             Order                            |                            Payment                            |                            Payment Method                            |                            Product                            | Tag |                            Company                            |
|:-----------------------:|-------------------------------------------|:---------------------------------------------------------------------:|:--------------------------------------------------------------:|:------------------------------------------------------------:|:-------------------------------------------------------------:|:--------------------------------------------------------------------:|:-------------------------------------------------------------:|:---:|:-------------------------------------------------------------:|
|     **Constructors**    |                                           |                                                                       |                                                                |                                                              |                                                               |                                                                      |                                                               |     |                                                               |
|                         | *(empty)*                                 |                                   ✓                                   |                                ✓                               |                               ✓                              |                               ✓                               |                                   ✓                                  |                               ✓                               |  ✓  |                               ✓                               |
|                         | *id*                                      |                                   ✓                                   |                                ✓                               |                               ✓                              |                               ✓                               |                                   ✓                                  |                               ✓                               |  ✓  |                               ✓                               |
|                         | *json*                                    |                                   ✓                                   |                                ✓                               |                               ✓                              |                               ✓                               |                                   ✓                                  |                               ✓                               |  ✓  |                               ✓                               |
|       **Methods**       |                                           |                                                                       |                                                                |                                                              |                                                               |                                                                      |                                                               |     |                                                               |
|     get* / refresh*     | *{urlParams, json}, callback*             |       [✓](https://shareactorio.github.io/slate/#retrieve-a-user)      | [✓](https://shareactorio.github.io/slate/#retrieve-a-provider) | [✓](https://shareactorio.github.io/slate/#retrieve-an-order) | [✓](https://shareactorio.github.io/slate/#retrieve-a-payment) | [✓](https://shareactorio.github.io/slate/#retrieve-a-payment-method) | [✓](https://shareactorio.github.io/slate/#retrieve-a-product) |  ✓  | [✓](https://shareactorio.github.io/slate/#retrieve-a-company) |
|          getAll         | *{urlParams, json}, callback*             |       [✓](https://shareactorio.github.io/slate/#list-all-users)       |  [✓](https://shareactorio.github.io/slate/#list-all-providers) |  [✓](https://shareactorio.github.io/slate/#list-all-orders)  |  [✓](https://shareactorio.github.io/slate/#list-all-payments) |  [✓](https://shareactorio.github.io/slate/#list-all-payment-methods) |  [✓](https://shareactorio.github.io/slate/#list-all-products) |  ✓  |                                                               |
|         update*         | *{body, urlParams, json}, callback*       |        [✓](https://shareactorio.github.io/slate/#update-a-user)       |  [✓](https://shareactorio.github.io/slate/#update-a-provider)  |                               ✓                              |   [✓](https://shareactorio.github.io/slate/#update-payment)   |                                   ✓                                  |                               ✓                               |  ✓  |                                                               |
|           del*          | *{urlParams, json}, callback*             |        [✓](https://shareactorio.github.io/slate/#delete-a-user)       |  [✓](https://shareactorio.github.io/slate/#delete-a-provider)  |                               ✓                              |                               ✓                               |   [✓](https://shareactorio.github.io/slate/#delete-payment-method)   |                               ✓                               |  ✓  |                                                               |
|          create         | *{body, urlParams, json}, callback*       |        [✓](https://shareactorio.github.io/slate/#create-a-user)       |  [✓](https://shareactorio.github.io/slate/#add-a-new-provider) |  [✓](https://shareactorio.github.io/slate/#create-an-order)  |                               ✓                               |                                   ✓                                  |                               ✓                               |  ✓  |                                                               |
|          search         | *{query, urlParams, json}, callback*      |         [✓](https://shareactorio.github.io/slate/#search-user)        |                                ✓                               |                                                              |                               ✓                               |                                                                      |                               ✓                               |     |                                                               |

*Those methods require the parent class to have an id at the moment of the call. Either by instantiating it with a *json* Object or an *id* String. The exception of this rule are the User and the Provider objects which will fall back to the currently logged-in user if no *id* is present. 

The methods can have multiple variable in the first parameter Object.
- **urlParams {Object}**: The different parameters you want to send along the query. This is especially useful for pagination or extend. (default: `{}`)
- **body {Object}**: This is the body you will send along the query for creating or updating an object. (required)
- **json {Boolean}**: If true, the promise response will contain a json, otherwise it will create an Object. (default: `False`)
- **query {String}**: String containing the search you want to do. (default: `undefined`)


The second parameter of the methods is a callback.
- **callback {Function(err, res)}**: Will be invoked after the data has been retrieved. First argument is the error. It will be `null` if the method didn't trigger any error. The second argument contains the return value.


## Other methods

### User class

`user.getOrders({urlParams, json}, callback)`

`user.getRating({urlParams}, callback)`

`user.updateAddresses({body, urlParams}, callback)`

`user.login({body, urlParams, json}, callback)`

### Provider class

`provider.getOrders({urlParams, json}, callback)`

`provider.getRating({urlParams}, callback)`

`provider.find({urlParams, json}, callback)`

`provider.getAvailableCount({urlParams}, callback)`

`provider.getAllReports({urlParams}, callback)`

`provider.getReports({urlParams}, callback)`

`provider.getAvailableOverview({urlParams}, callback)`

`provider.getSchedule({urlParams}, callback)`

`provider.getAvailability({urlParams}, callback)`

`provider.getAvailableAt({urlParams}, callback)`

`provider.getProducts({urlParams, json}, callback)`

`provider.postProducts({body, urlParams, json}, callback)`

### Order class

`order.getDeliveries({urlParams}, callback)`

`order.createDelivery({urlParams}, callback)`

`order.pay({body, urlParams, json}, callback)`

`order.cancel({body, urlParams, json}, callback)`

`order.triggerDeliveryAction({body, deliveryId, urlParams}, callback)`

### Tag class

`tag.getProducts({urlParams, json}, callback)`

`tag.getProviders({urlParams, json}, callback)`
