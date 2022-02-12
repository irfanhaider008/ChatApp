import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { SafeAreaView } from 'react-native-safe-area-context'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import { auth, db } from '../firebase'
import CustomListitem from '../components/CustomListitem'





const HomeScreen = ({navigation}) => {

    const [chats,setChats]=useState([]);

    
    

    const signOutUser = () =>{
        auth.signOut().then(()=>{
            navigation.replace('Login')
        })
    }

    useEffect(()=>{

        const unsubscribe = db.collection('chats').onSnapshot(snapshot=>
            setChats(snapshot.docs.map(doc =>({
                id:doc.id,
                data:doc.data()
            }))
            )
        );  

        return unsubscribe;
    },[])

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"ChatApp",
            headerStyle:{backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",

            headerLeft:()=>(
              <View style={{marginLeft:20}}>
                  <TouchableOpacity onPress={()=>navigation.navigate("Profile")} activeOpacity={0.5}>

                  
                  <Avatar rounded source={{uri:auth?.currentUser?.photoURL  }} />
                {/* <Text>{auth?.currentUser?.displayName}</Text> */}
                  
                  
                
                  
                  </TouchableOpacity>
             

              </View>



            ),



            headerRight:()=>(
             <View style={{
                 flexDirection:"row",
                 justifyContent:"space-between",
                 width:80,
                 marginRight:20,
             }}>

<TouchableOpacity  onPress={signOutUser} activeOpacity={0.5}>
                    <SimpleLineIcons name="logout" size={24} color="black" />
                      
                 </TouchableOpacity>

                 <TouchableOpacity  onPress={()=>navigation.navigate("AddChat")} activeOpacity={0.5}>
                    <SimpleLineIcons name="pencil" size={24} color="black" />
                      
                 </TouchableOpacity>

             </View>
            ),
        });

    },[navigation]);

    const enterChat = (id, chatName) =>{
      navigation.navigate("Chat",{
          id,
          chatName,
      });

    };

    

    return (
        <ScrollView style={styles.container}>
        <SafeAreaView>
            
            
           
            
                {chats.map(({id,data:{chatName}})=>(

                
             <CustomListitem key={id} id={id} chatName={chatName}
             
             enterChat={enterChat}/>
             ))}
             
           

            
        </SafeAreaView>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

container:{

    height:'100%' ,

},

})
