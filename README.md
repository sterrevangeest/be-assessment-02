**be-assessment-02**

# Meet Me

**Meet Me** is a dating website. This dating website lets you pick a match based on the date idea they have suggested. Besides, the user can filter by age, place, sex and category.

![screenhot](https://github.com/sterrevangeest/be-assessment-02/blob/master/Schermafbeelding%202018-04-08%20om%2021.37.20.png)
![screenhot](https://github.com/sterrevangeest/be-assessment-02/blob/master/Schermafbeelding%202018-04-08%20om%2021.37.35.png)

## Installation 

To start finding matches, in your terminal: 

```
git clone https://github.com/sterrevangeest/be-assessment-02.git
cd be-assessment-02/
npm install
npm start
```

**Important :warning:** this website is still in progress, so some things may not work like you would expect them to work.

## To-do

- [x] Getting server and database working (hello world)
- [x] Showing data from database in ejs
- [ ] Upload, modify and delete data
- [ ] Users can log in and sign up (using sessions)
- [ ] Users can search
- [ ] Matching users
- [ ] Starting a chat
- [ ] Chatting


## Routes
in case you got lost: 

`localhost:8000` 'starting' page, with links to login and sign-up forms.

`localhost:8000/matches` page with all your matches

`localhost:8000/inbox` page with all your chats

`localhost:8000/profile` page with your profile

## Database 

**Meet Me** stores data in a MongoDB. 
To run the database, open a new tab and: 

```
brew install 
brew install mongodb
brew services start mongodb
mongod --dbpath db
mongo
use mydatingwebsite
```

## Packages 

- [Ejs](https://github.com/tj/ejs) 
- [Ejs-lint](https://github.com/RyanZim/EJS-Lint) 
- [Express](https://github.com/expressjs/express) 
- [Mongodb](https://github.com/mongodb/mongo) 
- [Nodemon](https://github.com/remy/nodemon) 














