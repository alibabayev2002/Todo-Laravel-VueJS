

import About from './components/About';
import Home from './components/Home';


export default{
    mode: 'history',
    routes : [
        {
            path : '/',
            component : Home
        },
        {
            path : '/about',
            component : About
        }
    ]
}