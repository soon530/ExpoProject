import {Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function HomeScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Details', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    });
                }}
            />
            <Button
                title="Go to Profile"
                onPress={() => {
                    navigation.navigate('Profile', {
                        name: 'Custom profile header'
                    });
                }}
            />

        </View>
    );
}

function DetailsScreen({route, navigation}) {
    /* 2. Get the param */
    const {itemId, otherParam} = route.params;
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Details Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {otherParam}</Text>
            <Button
                title="Go to Details... again"
                onPress={() =>
                    navigation.push('Details', {
                        itemId: Math.floor(Math.random() * 100),
                    })
                }/>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/>
            <Button title="Go back" onPress={() => navigation.goBack()}/>
            <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
            />
        </View>
    );
}

function ProfileScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Profile Screen</Text>
            <Button
                title="Update the title"
                onPress={() => navigation.setOptions({title: 'Updated!'})}
            />
        </View>
    );
}

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Overview',
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}/>
                <Stack.Screen name="Details" component={DetailsScreen}/>
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={({route}) => ({title: route.params.name})}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
