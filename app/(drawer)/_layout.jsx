import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomRightDrawer from "@/components/CustomRightDrawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{drawerPosition:"right",headerShown:false}} drawerContent={(props) => <CustomRightDrawer {...props} />}/>
    </GestureHandlerRootView>
  );
}
