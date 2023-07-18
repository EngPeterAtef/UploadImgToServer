/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [selectImage, setSelectImage] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
      storageOptions: {
        path: 'images',
        cameraRoll: true,
      },
    };
    launchImageLibrary(options as any, (response: any) => {
      setSelectImage(response.assets[0].uri);
      setIsSelected(true);
      console.log('Response = ', response.assets[0].uri);
    });
  };
  const takeImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
      storageOptions: {
        path: 'images',
        cameraRoll: true,
      },
    };
    launchCamera(options as any, (response: any) => {
      setSelectImage(response.assets[0].uri);
      setIsSelected(true);
      console.log('Response = ', response.assets[0].uri);
    });
  };
  // this function is required to uplaod image to server on this api linkhttps://v2.convertapi.com/upload
  // Content-Disposition: inline; filename="my_file.doc"
  const uplaodImage = () => {
    const data = new FormData();
    data.append('file', {
      uri: selectImage,
      name: 'my_photo.jpg',
      type: 'image/jpg',
    });
    fetch('https://v2.convertapi.com/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    }).then(response => {
      console.log(response);
      Alert.alert('Done', 'Image Uplaoded');
    });
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: backgroundStyle.backgroundColor,
        height: '100%',
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles(backgroundStyle.backgroundColor).scroll}>
        <View style={styles(backgroundStyle.backgroundColor).appBar}>
          <Text style={styles(backgroundStyle.backgroundColor).header}>
            Image Picker
          </Text>
        </View>
        <View style={styles(backgroundStyle.backgroundColor).container}>
          <View>
            <TouchableOpacity
              style={styles(backgroundStyle.backgroundColor).galleryView}
              onPress={pickImage}>
              <Text
                style={styles(backgroundStyle.backgroundColor).buttonGellary}>
                Open Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(backgroundStyle.backgroundColor).galleryView}
              onPress={takeImage}>
              <Text
                style={styles(backgroundStyle.backgroundColor).buttonGellary}>
                Take an image
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles(backgroundStyle.backgroundColor).imgView}>
            <Image
              style={styles(backgroundStyle.backgroundColor).img}
              source={{uri: selectImage}}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'skyblue',
              padding: 20,
              borderRadius: 10,
              display: isSelected ? 'flex' : 'none',
              marginTop: 20,
            }}
            onPress={uplaodImage}>
            <Text style={styles(backgroundStyle.backgroundColor).buttonGellary}>
              Uplaod Image
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (backgroundColor: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: backgroundColor,
    },
    galleryView: {
      backgroundColor: 'skyblue',
      padding: 20,
      borderRadius: 10,
      marginTop: 20,
    },
    buttonGellary: {
      color: '#fff',
      fontSize: 20,
    },
    scroll: {
      width: '100%',
      height: '100%',
    },
    imgView: {
      marginTop: 20,
      width: '80%',
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    img: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    appBar: {
      width: '100%',
      height: 50,
      backgroundColor: 'skyblue',
      justifyContent: 'center',
      alignItems: 'center',
      // borderRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    header: {
      color: '#fff',
      fontSize: 20,
    },
  });

export default App;
