# InternDiary
 
 ## A SOCIAL PLATFORM FOR STUDENTS AND ALUMNI  USING MERN STACK.
 It is a web app using React js as frontend with Google Authentication and jwt authentication and MongoDB as backend.
 It has a login feature with email verification, and only Alumni can post an intern
 opportunity and perform CRUD operations. Students can apply for these, and the list of
 students who applied (with their details and resumes) will be shown on Alumni's dashboard.
 Users can upload profile pictures, resumes, and other details and edit them.
 `It has a feature of voice-controlled navigation and scrolling.`

## How to run this app

1. Ensure you put your Google Oauth client id in the src/index.js folder.
2. Make sure you put your own MONGOURI and JWT_SECRET and have mongodb running on localhost or use a cloud provider 

Install all the server/client npm packages
`npm install --save`

Running the app
`client = npm start`
`server = npm start`
## Voice Navigation commands:-

1.  `go to home` OR `navigate to home` => go to home/index page
2.  `go to login` OR `navigate to login` => go to login page
3.  `go to signup` OR `navigate to signup` => go to the signup page
4. `go to dashboard` OR `navigate to dashboard` => go to your dashboard if logged in.
## Scrolling commands:-
5.  `Scroll down` OR `move down` => for scrolling down
6. `Scroll up` OR `move up` => for scrolling up.
## stop Recognition commands:-
7. `stop recognition` OR `stop listening` => to stop voice controlling / Recognition
8. `stop voice controlling` OR `stop voice control` OR `stop voice recognition` => to stop voice controlling / Recognition
