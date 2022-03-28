import SidebarWithHeader from "./components/sections/header";
import MovieListing from "./components/movie/MovieListing";
import MovieDetails from "./components/movie/MovieDetails";
import MoviesPage from "./pages/MoviesPage";
import TandaPage from "./pages/TandaPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import FoodList from "./components/food/FoodList"
import FoodDetail from "./components/food/FoodDetail" 
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import LoginComponent from "./components/user/LoginComponent";
import SignUpComponent from "./components/user/SignUpComponent";
   
function App() {
   

  return (
    <div className="App">
      <Router>
       <Switch>
          <Route exact path="/" component={LoginComponent} />
          <Route exact path="/signUp" component={SignUpComponent} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route exact path="/movies/:movieTitle" component={MovieDetailsPage} />
          <Route exact path="/movies/:movie_title/:sala_name/:start_time" component={TandaPage} />
          <Route exact path="/food" component={FoodList} />
          <Route exact path="/food/foodId" component={FoodDetail} />
          <Route>404 Not Found! </Route>
       </Switch>

       </Router>
    </div>
     
  );
}
   
export default App;