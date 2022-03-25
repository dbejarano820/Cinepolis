import Header from "./components/sections/head";
import MovieListing from "./components/movie/MovieListing";
import MovieDetails from "./components/movie/MovieDetails";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import SignUpComponent from "./components/movie/SignUpComponent";
// import SidebarwithHeader from "./components/sections/headerr"
   
function App() {
   

  return (
    <div className="App">
      <Router>
       <Header/>
       <Switch>
          <Route exact path="/signUp" component={SignUpComponent} />
          <Route exact path="/movie/:movieId" component={MovieDetails} />
          <Route>404 Not Found! </Route>
       </Switch>

       </Router>
    </div>
     
  );
}
   
export default App;