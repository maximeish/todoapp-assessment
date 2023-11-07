import { useFonts } from "expo-font";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { colors } from "../Colors";
import Header from "../components/Header";
import { Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Footer from "../components/Footer";
import Constants from "expo-constants";
import {
  authenticateUser,
  checkIfEmailTaken,
  storeUserData,
} from "../actions/AuthActions";
import { useDispatch } from "react-redux";
import { openScreen } from "../features/appSlice";
import { setUser } from "../features/userSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [signupStatus, setSignupStatus] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const scrollViewRef = useRef(null);

  let [fontsLoaded] = useFonts({
    "Ubuntu-Light": require("../assets/fonts/Ubuntu-Light.ttf"),
    "Ubuntu-Medium": require("../assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-LightItalic": require("../assets/fonts/Ubuntu-LightItalic.ttf"),
  });
  const signUpButtonOnPress = () => {
    if (email.length >= 6 && password.length >= 6) {
      checkIfEmailTaken(
        email,
        () => {
          setErrorMsg("Error: Email Already Taken!");
        },
        () => {
          storeUserData(username, password, () => {
            setUsername("");
            setPassword("");
            setErrorMsg("");
          });
          setSignupStatus(false);
        }
      );
    } else {
      setErrorMsg("Error: Email & Password Minimum 6 Characters!");
    }
  };

  const logInButtonOnPress = () => {
    if (email.length >= 6 && password.length >= 6) {
      authenticateUser(
        email,
        password,
        // if authenticated
        () => {
          dispatch(setUser({ email }));
          dispatch(openScreen({ screen: "home" }));
        },
        // if authentication failed
        () => setErrorMsg("Login Failed: Make sure you've signed up"),
        // if username doesnt exist
        () => setErrorMsg("User doesn't exist. Sign up now!")
      );
    } else {
      setErrorMsg("Email & Password minimum 6 Characters");
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        scrollViewRef.current.scrollToEnd();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <ScrollView ref={scrollViewRef}>
      <View style={styles.authcontainer}>
        <Header
          mid="Auth"
          left="back"
          right={signupStatus ? "login" : "signup"}
          rightAction={() => setSignupStatus(!signupStatus)}
          leftAction={() => {
            dispatch(openScreen({ screen: "splash" }));
          }}
        />
        <Text
          style={[
            styles.authSubtitle,
            fontsLoaded && {
              fontFamily: "Ubuntu-Medium",
            },
          ]}
        >
          {signupStatus ? "Welcome Onboard" : "Welcome Back!"}
        </Text>
        <Text
          style={[
            styles.authSubtitle,
            fontsLoaded && {
              fontFamily: "Ubuntu-Medium",
              fontSize: "small",
            },
          ]}
        >
          {signupStatus ? "Lets help you in completing your tasks" : ""}
        </Text>
        {signupStatus ? (
          <>
            <View style={styles.authInputContainer}>
              <View style={styles.authInputBox}>
                <Text
                  style={[
                    styles.inputlabel,
                    fontsLoaded && { fontFamily: "Ubuntu-Medium" },
                  ]}
                >
                  Full name:
                </Text>
                <TextInput
                  style={[
                    styles.usernameInput,
                    fontsLoaded && { fontFamily: "Ubuntu-Light" },
                  ]}
                  placeholder="Mary Elliot"
                  onChangeText={(val) => setFullName(val)}
                  value={fullName}
                />
              </View>
            </View>
            <View style={styles.authInputContainer}>
              <View style={styles.authInputBox}>
                <Text
                  style={[
                    styles.inputlabel,
                    fontsLoaded && { fontFamily: "Ubuntu-Medium" },
                  ]}
                >
                  Email:
                </Text>
                <TextInput
                  style={[
                    styles.usernameInput,
                    fontsLoaded && { fontFamily: "Ubuntu-Light" },
                  ]}
                  placeholder="mary.elliot@mail.com"
                  onChangeText={(val) => setEmail(val)}
                  value={email}
                />
              </View>
            </View>
            <View style={styles.authInputContainer}>
              <View style={styles.authInputBox}>
                <Text
                  style={[
                    styles.inputlabel,
                    fontsLoaded && { fontFamily: "Ubuntu-Medium" },
                  ]}
                >
                  Password:
                </Text>
                <TextInput
                  style={[
                    styles.usernameInput,
                    fontsLoaded && { fontFamily: "Ubuntu-Light" },
                  ]}
                  placeholder="........."
                  onChangeText={(val) => setPassword(val)}
                  value={password}
                />
              </View>
            </View>
            <View style={styles.authInputContainer}>
              <View style={styles.authInputBox}>
                <Text
                  style={[
                    styles.inputlabel,
                    fontsLoaded && { fontFamily: "Ubuntu-Medium" },
                  ]}
                >
                  Confirm Password:
                </Text>
                <TextInput
                  style={[
                    styles.usernameInput,
                    fontsLoaded && { fontFamily: "Ubuntu-Light" },
                  ]}
                  placeholder="........."
                  secureTextEntry={true}
                  onChangeText={(val) => setCpassword(val)}
                  value={cPassword}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.authInputContainer}>
              <View style={styles.authInputBox}>
                <Text
                  style={[
                    styles.inputlabel,
                    fontsLoaded && { fontFamily: "Ubuntu-Medium" },
                  ]}
                >
                  Email:
                </Text>
                <TextInput
                  style={[
                    styles.usernameInput,
                    fontsLoaded && { fontFamily: "Ubuntu-Light" },
                  ]}
                  placeholder="mary.elliot@mail.com"
                  onChangeText={(val) => setEmail(val)}
                  value={email}
                />
              </View>
            </View>
            <View style={styles.authInputContainer}>
              <Feather name="key" size={24} color={colors.darkBlue} />
              <View style={styles.authInputBox}>
                <Text
                  style={[
                    styles.inputlabel,
                    fontsLoaded && { fontFamily: "Ubuntu-Medium" },
                  ]}
                >
                  Password:
                </Text>
                <TextInput
                  style={[
                    styles.usernameInput,
                    fontsLoaded && { fontFamily: "Ubuntu-Light" },
                  ]}
                  placeholder="........."
                  secureTextEntry={true}
                  onChangeText={(val) => setPassword(val)}
                  value={password}
                />
              </View>
            </View>
          </>
        )}

        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => {
            setSignupStatus(!signupStatus);
            setErrorMsg("");
            setPassword("");
            setUsername("");
          }}
        >
          <Text
            style={[
              styles.hintMsg,
              fontsLoaded && {
                fontFamily: "Ubuntu-Light",
              },
            ]}
          >
            {signupStatus
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
        <View style={{ padding: 10 }}>
          <Text
            style={[
              styles.hintMsg,
              fontsLoaded && {
                fontFamily: "Ubuntu-LightItalic",
                color: "red",
              },
            ]}
          >
            {errorMsg}
          </Text>
        </View>
        <Footer
          mid={signupStatus ? "Register" : "Login"}
          midAction={signupStatus ? signUpButtonOnPress : logInButtonOnPress}
        />
      </View>
    </ScrollView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  keyboardAvoider: {
    height: 100,
    backgroundColor: colors.clearWhite,
  },
  authcontainer: {
    height: Dimensions.get("window").height + Constants.statusBarHeight,
    flex: 1,
    width: Dimensions.get("screen").width,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.clearWhite,
  },
  authImage: {
    width: Dimensions.get("screen").width,
    height: 280,
  },
  authSubtitle: {
    color: "black",
    fontSize: 25,
    marginBottom: 10,
  },
  usernameInput: {
    // backgroundColor: colors.darkBlue,
    fontSize: 20,
    marginBottom: 10,
    fontSize: 14,
    color: colors.darkGray,
  },
  authInputContainer: {
    borderColor: colors.darkBlue,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 20,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  inputlabel: {
    fontSize: 18,
    color: "black",
    paddingTop: 10,
    paddingBottom: 0,
  },
  authInputBox: {
    flex: 1,
    paddingLeft: 15,
    marginLeft: 15,
    borderLeftColor: colors.darkBlue,
    borderLeftWidth: 1,
  },
  hintMsg: {
    fontSize: 14,
    color: colors.darkGray,
  },
});
