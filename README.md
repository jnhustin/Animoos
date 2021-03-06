# Animoos
A site that offers information on Anime. Use the search/filter system to review what you missed, check out the current offerings or check the actors behind the characters you love. [View Site](https://animoos.herokuapp.com/).

![Demo Image](/public/img/demo.png) 
# Initial Approach
### Day 1 
* Plan server structure and routes
* Drew wireframes
* Research and test API calls

###### Home Page wireframes
![1](/public/img/main1.png)
![2](/public/img/main2.png)

###### Description wireframe
* Initial Wireframes
![1](/public/img/descrip1.png)
![1](/public/img/descrip2.png)

# Technologies Used
* AngularJS
* Express/Node
* [Materialize](http://materializecss.com/)
* [FontAwesome](http://fontawesome.io/)
* [SmoothScroll](https://github.com/d-oliveros/ngSmoothScroll)
* [Request-Promise](https://github.com/request/request-promise)
* [Anilist API](https://anilist-api.readthedocs.io/en/latest/)

# Routes
METHOD | URL | Purpose
--- | --- | ---
GET | /browse | receives a query param of an object with filter specifications. queries the Anilist API and returns a result of 40 anime objects.
GET | /search/anime/:title| receives query param of an anime title, queries the API with the search term returns an array of objects that match the search term.
GET | /page-data/anime/:id | receives query param of an anime id, queries the API and returns an object with the anime data
GET | /page-data/character/:id | receives query param of an character id, queries the API and returns an object with the character data
GET | /users | request for all users
POST | /users | receives a user object, checks database for a user or creates a new user
GET | /users/:id | receives an id and queries database for id
PUT | /users/:id | receives an id and user object, queries database per id and updates with database content with the user object
DELETE | users/:id | receives an id and queries database and deletes content matched to that id
POST | /auth | used to assign JWT tokens
# Issues
* This was a project to practice CSS skills, making Angular and Materialize work together was difficult.
* Creating a universal backend route to query the API proved difficult to make a route generic enough to handle the front-end request properly. The Anilist API also does not accept blank entries in their API queries and designing the call around that was interesting.

# Unsolved Problems
* bug due to image sizing with character image size and voice actor image size, hover over actor names produces a twitching effect.
* bug due to image sizing with character image size not all uniform causes mostly empty rows in the all character and staff modal.

# Next Steps
* Complete infinite scroll on main page or implement pagination for filter results
* Prettify user profile page

# Resources Used
* [Background used for shows that do not have a banner](http://www.nmgncp.com/anime-background-wallpaper/3663544.html)
* [App background](http://www.shunvmall.com/anime-wallpaper/47754412.html)
