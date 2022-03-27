import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";

import SidebarWithHeader from "./components/sections/header";
import MovieListing from "./components/movie/MovieListing";
import MovieDetails from "./components/movie/MovieDetails";
import FoodList from "./components/food/FoodList"

import FoodDetail from "./components/food/FoodDetail" 
import AddFood from "./components/food/AddFood";

import LoginComponent from "./components/user/LoginComponent";
import SignUpComponent from "./components/user/SignUpComponent";
import ConfirmPassComponent from "./components/user/ConfirmPassComponent";
// import SidebarwithHeader from "./components/sections/headerr"
   
function App() {
   

  return (
    <div className="App">
      <Router>
       <Switch>
          <Route exact path="/" component={LoginComponent} />
          <Route exact path="/signUp" component={SignUpComponent} />
          {/* <Route exact path="/updatePassword/:token" component={ConfirmPassComponent} /> */}
          <Route exact path="/movie/:movieId" component={MovieDetails} />
          <Route exact path="/food" component={FoodList} />
          <Route exact path="/food/:name" component={FoodDetail} />  
          <Route exact path="/addFood" component={AddFood} />   
          <Route exact path="/editFood" component={AddFood} />       
          <Route>404 Not Found! </Route>
       </Switch>

       </Router>
    </div>
     
  );
}
   
export default App;