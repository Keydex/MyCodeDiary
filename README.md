# Code Diary Docs
This is the backend server for the Code Diary Project. This handles authentication using Firebase and supports SSO with social media sites and allows a user to post, edit, and receive code snippets from the react native front end which can be found here. https://github.com/Keydex/Web_App/tree/master/src

## Code Schema

Object that client receives and sends to server.
(Server created dateCreated.

Title | Type | Description
| ------------- | ------------- | ------------- | 
codeEntry | String | Code snippet from user
language | String | Language of code snippet
metaTags | [String] | Tags for code snippet
comment | String | User comment for enty
private | [Number] | 0 if Public, 1 if Private
dateCreated | Date | Date when entry was added

## Rest Requests

Type | URL | Description
| ------------- | ------------- | ------------- |
POST | /api/post/`:userID` | Creates new Code Entry
POST | /api/view/`:userID` | View List of Enteries
GET | /api/view/`:codeID` | Retrieve one Code Entry
PUT | /api/delete/`:codeID` | Delete Code Entry by ID
DELETE | /api/update/`:codeID` | Delete Code Entry by ID 

## Add new Entry
`POST http://serverAddress/api/post/:userID`

* **Data Params**

	Required:
    * `language:string`
    * `metaTags:[string]`
    * `comment:string`

* **Success Response:**

  * **Content:** `{ message : "Code [codeID] has been added" }`

## Get List of Enteries
`POST http://serverAddress/api/view/:userID`
    
* **Data Params**

	Optional Filter Queries:
    * `page:number`
    * `language:string`
    * `tag:string`

* **Success Response:**

  * **Content:** `{ message : "List generator", data:[{codeID:"codeID", title:"title", language:"language"]},...}`

## Get Single Code Entry
`POST http://serverAddress/api/view/:codeID`

* **Data Params**

	Required:
    * `language:string`
    * `metaTags:[string]`
    * `comment:string`

* **Success Response:**

  * **Content:** `{ message : "Request [requestID] has been added" }`

## Update Entry
`POST http://serverAddress/api/post/:userID`

* **Description**

	Create new code entry request
    

* **Data Params**

	Required:
    * `language:string`
    * `metaTags:[string]`
    * `comment:string`

* **Success Response:**

  * **Content:** `{ message : "Request [requestID] has been added" }`

## Delete Entry
`POST http://serverAddress/api/post/:userID`

* **Description**

	Create new code entry request
    

* **Data Params**

	Required:
    * `language:string`
    * `metaTags:[string]`
    * `comment:string`

* **Success Response:**

  * **Content:** `{ message : "Request [requestID] has been added" }`
