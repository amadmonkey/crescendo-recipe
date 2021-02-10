import Home from './main/Home';
import Recipe from './main/Recipe';
import NewRecipe from './main/NewRecipe';

class Route {
    constructor({ label = "", path = "", component = "", exact = true, loggedin = false, visible = false }) {
        this.label = label;
        this.path = path;
        this.component = component;
        this.exact = exact;
        this.visible = visible;
    }
}

const routes = {
    home: new Route({
        label: "Home",
        path: "/",
        component: Home,
        exact: true,
    }),
    recipe: new Route({
        label: "Recipe",
        path: "/recipe/:id",
        component: Recipe,
        exact: false,
    }),
    new_recipe: new Route({
        label: "New Recipe",
        path: "/new-recipe",
        component: NewRecipe,
        exact: true,
    })
}

export default routes
