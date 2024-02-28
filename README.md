A simple travel tracker application for a family.
Built using express, database: postgres.

How to run the app?
- Create two tables with the following description:
  - table users (
    	userId serial primary key,
    	userName text,
    	userColor text
    )
  - table userStates (
    	stateId serial primary key,
    	stateCode text,
    	stateName text,
    	userId integer references users(userId)
    )
- In app.js, configure your db properties (@ line 4)

Use command: `npm i` to install all the necessary packages.
Use command: `node app.js` to run the application.
