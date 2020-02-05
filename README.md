# Back-End
Back-End Repo


API ENDPOINTS

GET REQUESTS

- Welcome Page: https://bwchefhub.herokuapp.com/
    - returns a welcome page

- Get All Recipes: https://bwchefhub.herokuapp.com/api/recipes
    - any user can view all recipes
    - user does not have to be logged in

- Get Recipes by Id: https://bwchefhub.herokuapp.com/api/recipes/:id
    - any user can view all recipes
    - user does not have to be logged in
    - ":id" represents the recipeID

- Get All Recipes for a single user: https://bwchefhub.herokuapp.com/api/recipes/myrecipes
    - While logged in, user can view all of their recipes that they have posted
    - Get request will have to have an Authorization header which includes token in order to view these recipes

POST REQUESTS

- Registering a new user: https://bwchefhub.herokuapp.com/api/auth/register
    - user will have to pass in a JSON object that contains username (string), password (string), email (string) is required
    - if a user is added, an object is returned which has id and username

- Login : https://bwchefhub.herokuapp.com/api/auth/login
    - user will login using username and password
    - JSON object with username (string), and password (string) is required

- Adding a recipe: https://bwchefhub.herokuapp.com/api/recipes
    -user needs to be logged in
    -user needs to pass in a JSON object that contains a recipe name (string), meal category (string), image href (string), ingredients (string), instructions (string)
    -upon successful post, user will see a message letting them know of a successful post

PUT REQUESTS

- Updating a recipe: https://bwchefhub.herokuapp.com/api/recipes/:id
    - while logged in, user can update their recipes by ID
    - user will have to pass in a JSON object which includes recipe name (string), meal category (string), image href (string), ingredients (string), instructions (string)
    - successful update will result in a JSON object with a message letting user know recipe has been updated

DELETE REQUEST

- Deleting a recipe: https://bwchefhub.herokuapp.com/api/recipes/:id
    - while logged in, user can delete recipe by ID
    - upon successful delete, a message will let user know that recipe has been deleted