import Header from "./components/sections/head";
import MovieListing from "./components/movie/MovieListing";
import MovieDetails from "./components/movie/MovieDetails";
import FoodList from "./components/food/FoodList"
import FoodDetail from "./components/food/FoodDetail" 
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
// import SidebarwithHeader from "./components/sections/headerr"
   
function App() {
   

  return (
    <div className="App">
      <Router>
       <Header/>
       <Switch>
          <Route exact path="/" component={MovieListing} />
          <Route exact path="/movie/:movieId" component={MovieDetails} />
          <Route exact path="/food" component={FoodList} />
          <Route exact path="/food/foodId" component={FoodDetail} />
          <Route>404 Not Found! </Route>
       </Switch>

       </Router>
    </div>
     
  );
}
   
export default App;