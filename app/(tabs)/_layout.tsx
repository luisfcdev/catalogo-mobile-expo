import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {View,StyleSheet,Animated,PanResponder,} from "react-native";
import { useRef } from "react";

export default function TabsLayout() {
  // Estado animado para posição do botão
  const pan = useRef(new Animated.ValueXY()).current;

  // Configuração do gesto de arrastar
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  return (
    <>
      {/* BOTTOM TABS */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2B65EC",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Início",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Configurações",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* BOTÃO FLUTUANTE ARRASTÁVEL */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.fab,
          {
            transform: pan.getTranslateTransform(),
          },
        ]}
      >
        <Ionicons name="add" size={28} color="#FFF" />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2B65EC",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
