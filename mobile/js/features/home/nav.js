import React from 'react';
import {
    Navigator,
    Text,
    TouchableOpacity
} from 'react-native';
import styles from '../../styles';
import Home from './index';
import LoginButton from '../login/loginButton';

class HomeNav extends React.Component {

    render() {
        return (<Navigator initialRoute={ this.initialRoute() }
                       configureScene={ this.configureScene }
                       renderScene={ this.renderScene }
                       navigationBar={
                           <Navigator.NavigationBar routeMapper={ this.getRouteMapper() } style={ styles.common.navigator } />
        }
        />)
    }

    initialRoute() {
        return {
            title: 'Mock Server',
            back: '',
            component: Home,
            index: 0,
            right: LoginButton
        }
    }

    renderScene(route, navigator) {
        let RouteView = route.component;
        if (route.configureScene) {
            navigator.configureScene = route.configureScene;
        }
        return <RouteView {...route.params} {...this.props} navigator={ navigator } />
    }

    configureScene(route) {
        if (route.sceneConfig) {
            return route.sceneConfig;
        }
        return Navigator.SceneConfigs.FloatFromRight;
    }

    getRouteMapper() {
        let props = this.props;
        var routeMapper = {
            LeftButton(route, navigator, index, navState) {
                if (index === 0) {
                    return null
                }
                const previousRoute = navState.routeStack[index - 1]
                return (
                    <TouchableOpacity onPress={ () => navigator.pop() }>
                        <Text style={ [styles.common.row, styles.layout.text] }>
                            { previousRoute.back || ' < ' }
                        </Text>
                    </TouchableOpacity>
                )
            },
            RightButton(route, navigator, index, navState) {
                var Right = route.right
                if (Right) {
                    return <Right {...props} navigator={ navigator } />
                }
            },
            Title(route, navigator, index, navState) {
                return (
                    <Text style={ [styles.common.row, styles.layout.title] }>
                        { route.title }
                    </Text>
                )
            }
        }

        return routeMapper;
    }

}

export default HomeNav;
