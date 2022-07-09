import './App.css';
import React from "react";
import { FormComponent } from './components/Form';
import {AddressComponent} from './components/Address';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    return (
        <div className="App">
            <div className="container">
                <div className="columns">
                    <div className="column column-left">
                    <FormComponent></FormComponent>
                    </div>
                    <div className="column column-right">
                    <AddressComponent/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
