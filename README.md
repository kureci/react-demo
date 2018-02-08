# Welcome to your Ageas assessment #

## Instructions
Within this project you will find a node js backend server for a notes app. Your task is to create a frontend for this server using React.

Your app must allow the user to:
  - create plain text notes
  - view a list of existing notes
  - edit notes
  - delete notes
  
Any features beyond this are up to you, but the app must convey a modern look & feel, and the design must demonstrate responsive design elements.

### Some Advice
  - your code should be easy to follow
  - do not over-engineer your solution
  - pay attention to code correctness (e.g. consider edge cases, error handling etc)
  - this is a single user app that runs locally, so there is no need for multi-user featureds, logins, security etc
  
### Solution delivery
Once your solution is ready to send to us, please change the remote origin of your project and push it to a new public repo from your github or bitbucket account. Please then send us a link to the public repo.

You can change your remote origin by using this command changing `<YOURUSERNAME>` to your github username and `<REPOSITORYNAME>` to the name of your new public repository.
  
`git remote set-url origin https://github.com/<YOURUSERNAME>/<REPOSITORYNAME>.git`

You can check that the change was successful by looking at your remote list.

`git remote -v`
  
## Getting Started

Get the code

    git clone https://github.com/AgeasWebDevTeam/ageasTechTestStarter.git

Install the node dependencies

    cd ageasTechTestStarter/
    npm install

Start the server

    npm start

Feel free to use yarn instead of npm if you prefer.

## Your app

This project contains a `public` directory in the project root. This directory contains `index.html` and `bundle.js`.

Provided you're targetting a div with an id of 'app' in your React bundle, all you need to do to host your React app with this server is to replace our `bundle.js` with yours.

## Server endpoints and responses.

In addition to the documentation below, you will find the file Ageas_Tech_Test_Server.postman_collection.json in the root of this project. You can import this into [postman](https://www.getpostman.com/) to see example calls to each of the endpoints.

### GET 'http://localhost:3333/api/notes'
Return all notes: GET request

Expected output:
```
[
    {
        "id":1,
        "title":"A Title",
        "body":"A Body",
        "createdAt":"2018-02-07T08:54:41.311Z",
        "updatedAt":"2018-02-07T08:54:41.311Z"
    },
    {
        "id":2,
        "title":"Another Note",
        "body":"Another Body",
        "createdAt":"2018-02-07T08:55:27.347Z",
        "updatedAt":"2018-02-07T08:55:27.347Z"
    }
]
```
### GET 'http://localhost:3333/api/notes/:id'
Return single note: GET request

The ID of the note requested is appended to the end of the url. eg: `http://localhost:3333/api/notes/1`

Expected output:
```
{
    "id":1,
    "title":"A Title",
    "body":"A Body",
    "updatedAt":"2018-02-07T08:50:54.106Z",
    "createdAt":"2018-02-07T08:50:54.106Z"
}
```

### POST 'http://localhost:3333/api/notes'
Create note: POST request

Required input:
```
{
    title: "A Title",
    body: "A Body"
}
```

Expected output:
```
{
    "id":1,
    "title":"A Title",
    "body":"A Body",
    "updatedAt":"2018-02-07T08:50:54.106Z",
    "createdAt":"2018-02-07T08:50:54.106Z"
}
```
### PATCH 'http://localhost:3333/api/notes'
Update Note: PATCH request

Required input:
```
{
    id: 1
    title: "Changed Title",
    body: "Changed Body"
}
```

Expected output:
```
{
    "id": 1
    "title": "Changed Title",
    "body": "Changed Body",
    "createdAt":"2018-02-07T08:54:41.311Z",
    "updatedAt":"2018-02-07T09:17:44.693Z"
}
```

### DELETE 'http://localhost:3333/api/notes/:id'
Delete Note: DELETE request

Note id to be deleted is appended to the end of the url. eg: `http://localhost:3333/api/notes/1`

By way of confirmation, the note that has been deleted is returned by the endpoint.

Expected output:
```
{
    "id": 1
    "title": "Changed Title",
    "body": "Changed Body",
    "createdAt":"2018-02-07T08:54:41.311Z",
    "updatedAt":"2018-02-07T09:17:44.693Z"
}
```
