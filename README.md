# Librarium-server
The server for Librarium app. An online library app for help a library to show book availability online. So librarians can check book availability then booking the book.  
## Links
[API documentation](https://librarium-server.herokuapp.com/documentation/#/Books/get_books)

[deployed server - Librarium Server](https://librarium-server.herokuapp.com/documentation/#/Books/get_books)

[The notes and story behind the app](https://fathn.notion.site/Librarium-b93625d1cc39416182fd5c74d4baa30c)

[front end - Not yet available]()


## Install locally
notes: need mongodb for the database. You can install locally or online


`npm install`

copy the .env.example to .env

`copy .env.example .env`

you can check the name of the database on env. you can edit too to fit your database URI 


set the db URI in .env 

`MONGODB_URI = your_mongodb_uri_for_the_app`



then start the app with `npm run dev`

## TODO
* update authentication and authorization
* add an email verification process
* update validation with JOI
* add unit/integration test
* dealing with image on book
