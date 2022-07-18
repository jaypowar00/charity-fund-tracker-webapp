import React, { PureComponent } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import NgoRegister from './Components/NgoRegister';
import UserHome from './Components/UserHome';
import About from './Components/About';
import CharityDetails from './Components/CharityDetails';
import CharityHome from './Components/CharityHome';
import Admin from './Components/Admin';
import NgoDetailForAdmin from './Components/NgoDetailForAdmin';
import Charities from './Components/Charities';
import DonorDonationCard from './Components/DonorDonationCard';
import DonorDonationsList from './Components/DonorDonationsList';
import DonationDetail from './Components/DonationDetail';
import './style.css';

class App extends PureComponent {
  render() {
    return (
      <>
        <ChakraProvider theme={theme}>
          <Box textAlign="center" fontSize="xl">
            <Navbar>
              <Switch>
                <Route exact path="/" component={UserHome} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/about" component={About} />
                <Route exact path="/charities" component={Charities} />
                <Route exact path="/charity" component={CharityHome} />
                <Route
                  exact
                  path="/charity/:username"
                  component={CharityDetails}
                />
                <Route exact path="/ngoRegister" component={NgoRegister} />
                <Route exact path="/admin" component={Admin} />
                <Route
                  exact
                  path="/ngoDetailForAdmin"
                  component={NgoDetailForAdmin}
                />
                <Route exact path="/my-donations" component={DonorDonationsList} />
                <Route exact path="/donations/:id" component={DonationDetail} />
              </Switch>
            </Navbar>
          </Box>
        </ChakraProvider>
      </>
    );
  }
}

export default App;
