import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from 'react-native-button';

const {
  Notifications,
  Permissions,
} = Exponent;

class App extends React.Component {
  state = {
    pushToken: null,
    pushTokenError: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Push Notification Sandbox</Text>

        <Button
          onPress={this._getExponentPushToken}
          style={styles.getTokenButton}>
          Get my Exponent push token
        </Button>


        <ExponentPushTokenResult
          pushToken={this.state.pushToken}
          pushTokenError={this.state.pushTokenError}
        />
      </View>
    );
  }

  _getExponentPushToken = () => {
    this._getExponentPushTokenAsync().catch(error => console.error(error));
  };

  async _getExponentPushTokenAsync() {
    try {
      let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
      let pushToken = await Notifications.getExponentPushTokenAsync();
      console.log(`Got Exponent push token: ${pushToken}`);
      this.setState({ pushToken, pushTokenError: null });
    } catch (error) {
      this.setState({ pushToken: null, pushTokenError: error });
    }
  }
}

function ExponentPushTokenResult(props) {
  let { pushToken, pushTokenError } = props;
  if (pushToken) {
    return <Text style={styles.pushToken}>{pushToken}</Text>;
  }

  if (pushTokenError) {
    return (
      <Text style={styles.pushTokenError}>
        {pushTokenError.type}: {pushTokenError.message}
      </Text>
    );
  }

  return null;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 44,
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  getTokenButton: {
    marginTop: 20,
    minHeight: 44,
  },
  pushToken: {
    marginTop: 20,
  },
  pushTokenError: {
    color: 'red',
    marginTop: 20,
  },
});

Exponent.registerRootComponent(App);
