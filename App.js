import React, { useState, useEffect } from "react";
import RNLoginApi from "react-native-fido-login-api";
import jwtDecode from "jwt-decode";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const API_KEY =
  "BFuCVG4A8a4lJLBAW_mTGHAQ9h1lGZKrG_GmVHY4UJYfCcPDdgbWKdeAtg0mTXbvd-34LhjfC2PCohG4WH-Lcg==";
const BASE_URI = "https://729a5180-7bc2-11eb-b8e2-dfa0f6b67575.gw.v.loginid.io";

const App = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInput = (text) => {
    setUsername(text);
  };

  const handleLogin = async () => {
    const res = await RNLoginApi.login(username);

    console.log(res);
    if (res.success) {
      alert(`Successfully logged in!: ${username} ${res.jwt}`);
      console.log(jwtDecode(res.jwt));
    } else {
      alert(`Failed to login: ${res.errorMessage}`);
    }
  };

  const handleRegister = async () => {
    const res = await RNLoginApi.registerWithUsername(username);

    if (res.success) {
      alert(`Successfully registered!: ${username} ${res.jwt}`);
      console.log(jwtDecode(res.jwt));
    } else {
      alert(`Failed to register: ${res.errorMessage}`);
    }
  };

  const handleLogout = () => {
    RNLoginApi.logout();
    setIsLoggedIn(false);
    setUsername("");
  };

  useEffect(() => {
    const check = async () => {
      if (await RNLoginApi.hasAccount()) {
        const username = await RNLoginApi.getCurrentUsername();
        if (await RNLoginApi.isLoggedIn()) {
          const token = await RNLoginApi.getCurrentToken();
          setUsername(username);
          setIsLoggedIn(true);
          alert(`${username} is already signed in.`);
          console.log(jwtDecode(token));
        } else {
          alert(`Your account ${username} is not signed in.`);
        }
      } else {
        alert("You do not have an account. Register an account.");
      }
    };
    RNLoginApi.configure(API_KEY, BASE_URI);
    check();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View></View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Username"
            style={styles.textInput}
            value={username}
            onChangeText={handleInput}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, styles.marginTop]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        {isLoggedIn && (
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "snow",
  },
  textInput: {
    fontSize: 20,
    fontWeight: "bold",
    height: 50,
    width: 100,
    color: "snow",
    flex: 1,
    marginLeft: 20,
  },
  inputView: {
    backgroundColor: "#7FC0CF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    marginBottom: 40,
    color: "purple",
  },
  marginTop: {
    marginTop: 30,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "steelblue",
    width: "80%",
    height: 50,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "snow",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default App;
