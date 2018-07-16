## Common classes and methods

|    **Classes**   |                                      |                       User                      |                       Provider                      |                       Order                       |                       Payment                      |                       Payment Method                      |                       Product                      | Tag |                          Resource                         |                                      Plan                                      |                         Subscription                        |                        Webhooks                        |                         Event                        |                       Company                      |
|:----------------:|--------------------------------------|:-----------------------------------------------:|:---------------------------------------------------:|:-------------------------------------------------:|:--------------------------------------------------:|:---------------------------------------------------------:|:--------------------------------------------------:|:---:|:---------------------------------------------------------:|:------------------------------------------------------------------------------:|:-----------------------------------------------------------:|:------------------------------------------------------:|:----------------------------------------------------:|:--------------------------------------------------:|
| **Constructors** |                                      |                                                 |                                                     |                                                   |                                                    |                                                           |                                                    |     |                                                           |                                                                                |                                                             |                                                        |                                                      |                                                    |
|                  | *(empty)*                            |                        ✓                        |                          ✓                          |                         ✓                         |                          ✓                         |                             ✓                             |                          ✓                         |  ✓  |                             ✓                             |                                        ✓                                       |                              ✓                              |                            ✓                           |                           ✓                          |                          ✓                         |
|                  | *id*                                 |                        ✓                        |                          ✓                          |                         ✓                         |                          ✓                         |                             ✓                             |                          ✓                         |  ✓  |                             ✓                             |                                        ✓                                       |                              ✓                              |                            ✓                           |                           ✓                          |                          ✓                         |
|                  | *json*                               |                        ✓                        |                          ✓                          |                         ✓                         |                          ✓                         |                             ✓                             |                          ✓                         |  ✓  |                             ✓                             |                                        ✓                                       |                              ✓                              |                            ✓                           |                           ✓                          |                          ✓                         |
|    **Methods**   |                                      |                                                 |                                                     |                                                   |                                                    |                                                           |                                                    |     |                                                           |                                                                                |                                                             |                                                        |                                                      |                                                    |
|  get* / refresh* | *{urlParams, json}, callback*        | [✓](http://reference.kvass.ai/#retrieve-a-user) | [✓](http://reference.kvass.ai/#retrieve-a-provider) | [✓](http://reference.kvass.ai/#retrieve-an-order) | [✓](http://reference.kvass.ai/#retrieve-a-payment) | [✓](http://reference.kvass.ai/#retrieve-a-payment-method) | [✓](http://reference.kvass.ai/#retrieve-a-product) |  ✓  | [✓](http://reference.kvass.ai/#retreive-a-resource-by-id) |                [✓](https://reference.kvass.ai/#retrieve-a-plan)                | [✓](https://reference.kvass.ai/#receive-subscription-by-id) | [✓](https://reference.kvass.ai/#receive-webhook-by-id) | [✓](https://reference.kvass.ai/#receive-event-by-id) | [✓](http://reference.kvass.ai/#retrieve-a-company) |
|      getAll      | *{urlParams, json}, callback*        |  [✓](http://reference.kvass.ai/#list-all-users) |  [✓](http://reference.kvass.ai/#list-all-providers) |  [✓](http://reference.kvass.ai/#list-all-orders)  |  [✓](http://reference.kvass.ai/#list-all-payments) |  [✓](http://reference.kvass.ai/#list-all-payment-methods) |  [✓](http://reference.kvass.ai/#list-all-products) |  ✓  |     [✓](http://reference.kvass.ai/#list-all-resources)    | [✓](https://reference.kvass.ai/#get-list-of-all-plans-associated-with-company) |    [✓](https://reference.kvass.ai/#get-all-subscriptions)   |    [✓](https://reference.kvass.ai/#get-all-webhooks)   |    [✓](https://reference.kvass.ai/#get-all-events)   |                                                    |
|      update*     | *{body, urlParams, json}, callback*  |  [✓](http://reference.kvass.ai/#update-a-user)  |  [✓](http://reference.kvass.ai/#update-a-provider)  |                         ✓                         |   [✓](http://reference.kvass.ai/#update-payment)   |                             ✓                             |                          ✓                         |  ✓  |      [✓](http://reference.kvass.ai/#update-resource)      |                  [✓](https://reference.kvass.ai/#update-plan)                  |     [✓](https://reference.kvass.ai/#update-subscription)    |     [✓](https://reference.kvass.ai/#update-webhook)    |                                                      |                                                    |
|       del*       | *{urlParams, json}, callback*        |  [✓](http://reference.kvass.ai/#delete-a-user)  |  [✓](http://reference.kvass.ai/#delete-a-provider)  |                         ✓                         |                          ✓                         |   [✓](http://reference.kvass.ai/#delete-payment-method)   |                          ✓                         |  ✓  |      [✓](http://reference.kvass.ai/#delete-resource)      |                  [✓](https://reference.kvass.ai/#delete-plan)                  |                                                             |     [✓](https://reference.kvass.ai/#delete-webhook)    |                                                      |                                                    |
|      create      | *{body, urlParams, json}, callback*  |  [✓](http://reference.kvass.ai/#create-a-user)  |  [✓](http://reference.kvass.ai/#add-a-new-provider) |  [✓](http://reference.kvass.ai/#create-an-order)  |                          ✓                         |                             ✓                             |                          ✓                         |  ✓  |   [✓](http://reference.kvass.ai/#create-a-new-resource)   |               [✓](https://reference.kvass.ai/#create-a-new-plan)               |                                                             |    [✓](https://reference.kvass.ai/#create-a-webhook)   |                                                      |                                                    |
|      search      | *{query, urlParams, json}, callback* |   [✓](http://reference.kvass.ai/#search-user)   |                          ✓                          |                                                   |                          ✓                         |                                                           |                          ✓                         |     |                                                           |                                                                                |                               ✓                             |                                                        |    [✓](https://reference.kvass.ai/#events-search)    |                                                    |
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
