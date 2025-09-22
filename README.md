# Pro-Tasker App
This is an app that allows registered users to create projects and add tasks to them.
Pojects have names and descriptions. Tasks have statuses and deadlines. 
Any project's title and decription is editable, tasks' name, description and status are also editable.

To intall on your local machine:
fork and clone frontend from this repo: https://github.com/mariiademidova0304/Pro-tasker-frontend
fork and clone backend from this repo: https://github.com/mariiademidova0304/Pro-tasker-backend

After cloning, get to the root directories and run npm install.

Set up evironment variables in your own .env file.
Frontend will need: 
VITE_SERVER_ORIGIN
Backend will need:
PORT
MONGO_URI
JWT_SECRET

App routes:
/ - main route, offers login and register
/register - users can register a new account
/login - users can log in
/dashboard - user's page with all projects
/dashboard/projectId - page of one of user's projects with tasks

API routes:
/api/users/login
/api/users/register

/api/projects - POST to create a project
/api/projects - GET to get all projects
/api/projects/:id - GET a project by ID
/api/projects/:id - PUT to update a project by ID
/api/projects/:id - DELETE a project by ID
/api/projects/:id/tasks - POST to create a task inside the project 
/api/projects/:id/tasks - GET all tasks of the project

/api/tasks/:id - GET a task by ID
/api/tasks/:id - PUT update a task by ID
/api/tasks/:id - DELETE a task by ID

# Resources
Previous labs and SBA work has been reused and tweaked, as well as course materials.

# External sources

Auto-navigation
https://stackoverflow.com/questions/72927893/how-to-redirect-to-home-page-if-user-is-logged-in-in-reactjs-react-router-dom-v6
https://stackoverflow.com/questions/78556899/navigate-vs-usenavigate-in-react-router-dom
Navigate back
https://stackoverflow.com/questions/30915173/react-router-go-back-a-page-how-do-you-configure-history
Token expiration
https://dev.to/egnoel/how-to-verify-jwt-token-expiry-in-reactnext-22dn
https://www.reddit.com/r/reactjs/comments/gmtrie/how_to_logout_automatically_without_refreshing/
Route protection
https://dev.to/vinibgoulart/how-to-protected-a-route-with-jwt-token-in-react-using-context-api-l38
Setting up editing of elements
https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_interactivity_filtering_conditional_rendering



