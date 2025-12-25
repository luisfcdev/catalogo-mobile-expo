import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Masculino from "../_topTabs/masculino";
import Feminino from "../_topTabs/feminino";

const Tab = createMaterialTopTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#2B65EC" },
        tabBarLabelStyle: { fontWeight: "bold" },
      }}
    >
      <Tab.Screen name="Masculino" component={Masculino} />
      <Tab.Screen name="Feminino" component={Feminino} />
    </Tab.Navigator>
  );
}