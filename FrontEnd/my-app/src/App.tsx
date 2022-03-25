import SidebarWithHeader from "./components/sections/header";
import MovieListing from "./components/movie/MovieListing";
import MovieDetails from "./components/movie/MovieDetails";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import FoodPage from "./pages/Food";
// import SidebarwithHeader from "./components/sections/headerr"
   
function App() {
   

  return (
    <div className="App">
      <Router>
       <SidebarWithHeader children={null}/>
       <Switch>
          <Route exact path="/" component={MovieListing} />
          <Route exact path='/food' component={FoodPage}/>
          <Route exact path="/movie/:movieId" component={MovieDetails} />
          <Route>404 Not Found! </Route>
       </Switch>

       </Router>
    </div>
     
  );
}
   
export default App;