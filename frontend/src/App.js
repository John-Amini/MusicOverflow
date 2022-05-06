import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AddSongForm from "./components/AddSongForm";
import ListSongs from "./components/ListSongs";
import { loadSongs } from "./store/song";
import UserPage from "./components/userPage";
import Footer from "./components/footer"
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(async () => {
    await dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    await dispatch(loadSongs());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
            <Footer></Footer>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
            <Footer></Footer>
          </Route>
          <Route path="/upload">
              <AddSongForm></AddSongForm>
              <Footer></Footer>
            </Route>
            <Route path= '/users/:id'>
              <UserPage></UserPage>
              <Footer></Footer>
            </Route>
            <Route exact path='/'>
            <ListSongs></ListSongs>
            <Footer></Footer>

            </Route>
            <Route>
                <h1>404 Not Found</h1>
              </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
