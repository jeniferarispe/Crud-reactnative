import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Database } from './src/database/Database';
import { LoadingOverlay } from './src/component/LoadingOverlay';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import ManterPessoa from './src/screens/Pessoa/ManterPessoa';
import ListarPessoa from './src/screens/Pessoa/ListarPessoa';


 function ListarPessoas({ navigation }) {
  return <ListarPessoa></ListarPessoa>;
}

function ManterPessoas({ navigation }) {
  return <ManterPessoa></ManterPessoa>;
}

const Drawer = createDrawerNavigator();
export default function App() {

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // Database.ReinitDb().then(() => setIsLoading(false))      
     Database.initDb().then(() => setIsLoading(false))
   }, []);
 
   if (isLoading) {
     return <LoadingOverlay />
   }


   return (
     <NavigationContainer>
       <Drawer.Navigator initialRouteName="ManterPessoa">
         <Drawer.Screen name="Manter Pessoa" component={ManterPessoas} />
         <Drawer.Screen name="Listar Pessoa" component={ListarPessoas} />
        
       </Drawer.Navigator>
     </NavigationContainer>
   );
   }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
