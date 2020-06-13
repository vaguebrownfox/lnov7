// one single location to tweak all the different screen user can visit
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import Brelungrecs from './components/Brelungrecs'; // also includes search modal // initial
import Form from './components/Form'; // form to fill details and add 'patients'
import PnoiControl from './components/PnoiControl'; // recording start/stop, recording location, waveform modal

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="lno">
                <Scene
                    hideNavBar={true}
                    key="brelungrecs"
                    component={Brelungrecs}
                    title="Brelungrecs"
                    initial
                />
                <Scene
                    hideNavBar={true}
                    key="form"
                    component={Form}
                    title="form"
                />
                <Scene
                    hideNavBar={true}
                    key="cpnoi"
                    component={PnoiControl}
                    title="cpnoi"
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
