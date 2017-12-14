## Common classes and methods



|    **Classes**   |                                      |                            User                            |                            Provider                            |                             Order                            |                            Payment                            |                            Payment Method                            |                            Product                            | Tag |                          Resource                          |                            Company                            |
|:----------------:|--------------------------------------|:----------------------------------------------------------:|:--------------------------------------------------------------:|:------------------------------------------------------------:|:-------------------------------------------------------------:|:--------------------------------------------------------------------:|:-------------------------------------------------------------:|:---:|:----------------------------------------------------------:|:-------------------------------------------------------------:|
| **Constructors** |                                      |                                                            |                                                                |                                                              |                                                               |                                                                      |                                                               |     |                                                            |                                                               |
|                  | *(empty)*                            |                              ✓                             |                                ✓                               |                               ✓                              |                               ✓                               |                                   ✓                                  |                               ✓                               |  ✓  |                              ✓                             |                               ✓                               |
|                  | *id*                                 |                              ✓                             |                                ✓                               |                               ✓                              |                               ✓                               |                                   ✓                                  |                               ✓                               |  ✓  |                              ✓                             |                               ✓                               |
|                  | *json*                               |                              ✓                             |                                ✓                               |                               ✓                              |                               ✓                               |                                   ✓                                  |                               ✓                               |  ✓  |                              ✓                             |                               ✓                               |
|    **Methods**   |                                      |                                                            |                                                                |                                                              |                                                               |                                                                      |                                                               |     |                                                            |                                                               |
|  get* / refresh* | *{urlParams, json}, callback*        | [✓](https://shareactorio.github.io/slate/#retrieve-a-user) | [✓](https://shareactorio.github.io/slate/#retrieve-a-provider) | [✓](https://shareactorio.github.io/slate/#retrieve-an-order) | [✓](https://shareactorio.github.io/slate/#retrieve-a-payment) | [✓](https://shareactorio.github.io/slate/#retrieve-a-payment-method) | [✓](https://shareactorio.github.io/slate/#retrieve-a-product) |  ✓  |  [✓](http://docs.shareactor.io/#retreive-a-resource-by-id) | [✓](https://shareactorio.github.io/slate/#retrieve-a-company) |
|      getAll      | *{urlParams, json}, callback*        |  [✓](https://shareactorio.github.io/slate/#list-all-users) |  [✓](https://shareactorio.github.io/slate/#list-all-providers) |  [✓](https://shareactorio.github.io/slate/#list-all-orders)  |  [✓](https://shareactorio.github.io/slate/#list-all-payments) |  [✓](https://shareactorio.github.io/slate/#list-all-payment-methods) |  [✓](https://shareactorio.github.io/slate/#list-all-products) |  ✓  |     [✓](http://docs.shareactor.io/#list-all-resources)     |                                                               |
|      update*     | *{body, urlParams, json}, callback*  |  [✓](https://shareactorio.github.io/slate/#update-a-user)  |  [✓](https://shareactorio.github.io/slate/#update-a-provider)  |                               ✓                              |   [✓](https://shareactorio.github.io/slate/#update-payment)   |                                   ✓                                  |                               ✓                               |  ✓  |       [✓](http://docs.shareactor.io/#update-resource)      |                                                               |
|       del*       | *{urlParams, json}, callback*        |  [✓](https://shareactorio.github.io/slate/#delete-a-user)  |  [✓](https://shareactorio.github.io/slate/#delete-a-provider)  |                               ✓                              |                               ✓                               |   [✓](https://shareactorio.github.io/slate/#delete-payment-method)   |                               ✓                               |  ✓  |       [✓](http://docs.shareactor.io/#delete-resource)      |                                                               |
|      create      | *{body, urlParams, json}, callback*  |  [✓](https://shareactorio.github.io/slate/#create-a-user)  |  [✓](https://shareactorio.github.io/slate/#add-a-new-provider) |  [✓](https://shareactorio.github.io/slate/#create-an-order)  |                               ✓                               |                                   ✓                                  |                               ✓                               |  ✓  |    [✓](http://docs.shareactor.io/#create-a-new-resource)   |                                                               |
|      search      | *{query, urlParams, json}, callback* |   [✓](https://shareactorio.github.io/slate/#search-user)   |                                ✓                               |                                                              |                               ✓                               |                                                                      |                               ✓                               |     |                                                            |                                                               |

*These methods require the parent class to have an ID at the moment of the call. Either by instantiating it with a *json* Object or an *id* String. The exceptions to this rule are the User and the Provider objects which will fall back to the currently logged-in user if no *id* is present. 

The methods can have multiple variables in the first parameter Object.
- **urlParams {Object}**: The different parameters you want to send with the query. This is especially useful for pagination or extend. (default: `{}`)
- **body {Object}**: This is the body you will send with the query for creating or updating an object. (required)
- **json {Boolean}**: If true, the promise's response will contain a JSON, otherwise it will create an Object. (default: `False`)
- **query {String}**: String containing the search you want to perform. (default: `undefined`)


The second parameter of the methods is a callback.
- **callback {Function(err, res, raw)}**: Will be invoked after the data has been retrieved. The first argument is the error. It will be `null` if the method didn't trigger any error. The second argument contains the return value. The third argument contains the raw [`fetch`](https://fetch.spec.whatwg.org/) response from the query.

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

### Resource class

`resource.createBulk({body, urlParams, json}, callback)`
