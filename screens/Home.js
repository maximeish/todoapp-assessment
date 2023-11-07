import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import Constants from "expo-constants";
import { colors } from "../Colors";
import Footer from "../components/Footer";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { openScreen } from "../features/appSlice";
import { useFonts } from "expo-font";
import { fakeData } from "../FakeData";
import NewTodo from "../components/NewTodo";
import { getCurrentEmail } from "../features/userSlice";
import { getUserTodos } from "../actions/AppActions";

const Home = () => {
  let [fontsLoaded] = useFonts({
    "Ubuntu-Light": require("../assets/fonts/Ubuntu-Light.ttf"),
    "Ubuntu-Medium": require("../assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-LightItalic": require("../assets/fonts/Ubuntu-LightItalic.ttf"),
  });
  const currentEmail = useSelector(getCurrentEmail);
  const dispatch = useDispatch();
  const [homeList, setHomeList] = useState([]);
  const [viewEmpty, setViewEmpty] = useState(homeList.length === 0);
  const [viewTodoModal, setViewTodoModal] = useState(false);
  const queryAllUsersTodos = () => {
    getUserTodos(currentEmail, (res) => {
      setHomeList(res.map((todoitem) => todoitem));
    });
  };

  useEffect(() => {
    if (homeList.length > 0) {
      setViewEmpty(false);
    } else {
      setViewEmpty(true);
    }
  }, [homeList]);

  useEffect(() => {
    queryAllUsersTodos();
  }, []);
  return (
    <View style={styles.homecontainer}>
      <Header welcome="Welcome Mary!" />
      <ScrollView
        style={styles.homecontents}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ display: "flex", alignItems: "center" }}>
          {homeList.map((item) => (
            <Todo
              key={item._id}
              todoName={item.todoName}
              completeStatus={item.completeStatus}
              todoId={item._id}
              refreshAction={queryAllUsersTodos}
            />
          ))}
          {viewEmpty && (
            <>
              <Text
                style={[
                  styles.homeEmptySubtitle,
                  fontsLoaded && {
                    fontFamily: "Ubuntu-Medium",
                    marginTop: -15,
                  },
                ]}
              >
                To Do List here
              </Text>
            </>
          )}
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <Footer mid="New" midAction={() => setViewTodoModal(!viewTodoModal)} />
      <NewTodo
        visible={viewTodoModal}
        exitModalAction={() => setViewTodoModal(!viewTodoModal)}
        refreshAction={queryAllUsersTodos}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeEmptySubtitle: {
    color: colors.darkGray,
    fontSize: 30,
    marginBottom: 10,
    textAlign: "center",
    marginTop: 15,
  },
  homeEmptySubsubtitle: {
    color: colors.darkGray,
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    marginTop: 10,
    opacity: 0.5,
  },
  homecontainer: {
    height: Dimensions.get("window").height + Constants.statusBarHeight,
    flex: 1,
    width: Dimensions.get("screen").width,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.clearWhite,
  },
  homecontents: {
    paddingVertical: 20,
    paddingBottom: 200,
  },
  homeImage: {
    width: Dimensions.get("screen").width,
    height: 280,
  },
});
