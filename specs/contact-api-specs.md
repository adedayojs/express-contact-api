# Contact Api

> **Note:** Most request are carried out with base url:
```
    /api/contacts
```
---
##  Get All Contacts 
To get list of all contact, send a **`GET`** request to the endpoint below:
```js
GET /api/contacts
```
This is going to return a list of all contactd blocked and unblocked.

***


##  Get All UnBlocked Contacts 
To get list of all unblocked contact, send a **`GET`** request to the endpoint below:
```js
GET /api/contacts?blocked=false
```
---

##  Get All Blocked Contacts 
 To get list of all blocked contact, send a **`GET`** request to the endpoint below:
```js
GET /api/contacts?blocked=true
```
---

##  Add New Contact
 To add a contact to the existing contact list, send a **`POST`** request, with a body to the endpoint:
```js
POST /api/contacts
```

> **Note:** The contant type must be set to application/json and the body must folow this format:
``` json
{
    "firstname":"(any string)",
    "lastname":"(any string)",
    "phone":"(any string)",
    "address":"(any string)"
}
```
if you choose to block a contact by default you should add a property called **`isBlocked`** to the body of your request and it should be set to false. However if you dont specify that, the isBlocked property would be implictly defined and set to false

---

##  Edit Existing Contact
 This can be achieved by making a **`PATCH`** request to the endpoint:
```js
PATCH api/contacts/'firstname'/'lastname'
```

where **`firstname`** and **`lastname`** should be replaced with the person's pre-existing first and last name respectively.

> Also the body of the request should contain those     properties you want to edit

---
##  Add New Information To Existing Contact
 This can be achieved by making a **`PUT`** request to the endpoint:
```js
PUT api/contacts/'firstname'/'lastname'
```

where **`firstname`** and **`lastname`** should be replaced with the person's pre-existing first and last name respectively.

> Also the body of the request should contain **ONLY** those     properties you want to add

---

##  Get Single Contact
### This can be achieved by making a get request to the following api
```js
GET api/contacts/firstname/lastname
```
where firstname and lastname should be replaced with the person's pre-existing first and last name respectively.

---

##  Block Single Contact
### This can be achieved by making a patch request to the following api
```js
PATCH api/contacts/firstname/lastname?blocked=true
```
where firstname and lastname should be replaced with the person's pre-existing first and last name respectively.

---

##  Delete Single Contact
### This can be achieved by making a delete request to the following api
```js
DELETE api/contacts/firstname/lastname
```
where **`firstname`** and **`lastname`** should be replaced with the person's pre-existing first and last name respectively.