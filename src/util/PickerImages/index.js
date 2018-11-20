import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Platform,
    Image,
    View,
    Text,
    ToastAndroid
} from 'react-native'

var ImagePicker = require('react-native-image-picker');
import Icon from 'react-native-vector-icons/Ionicons';

const options = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class CameraButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            photoslen:0
        }
    }
    render() {
        const {type} = this.props;
        let conText;
        if(this.state.photoslen > 0){
            conText = (<View style={styles.countBox}>
                <Image source={this.state.avatarSource} style={css.image}/>
            </View>);
        }
        return (
            <TouchableOpacity
                onPress={this.showImagePicker.bind(this)}
                style={[this.props.style,styles.cameraBtn]}>
                <View>
                    <Icon name="md-camera" color="#aaa" size={34}/>
                    {conText}
                </View>
            </TouchableOpacity>
        )
    }

    showImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }

            else {

                let source;

                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true}
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true}
                }




                let file;
                if(Platform.OS === 'android'){
                    file = response.uri
                }else {
                    file = response.uri.replace('file://', '')
                }


                this.setState({
                    loading:true,
                    photoslen:this.state.photoslen + 1
                });
            }
        });
    }
}
const styles = StyleSheet.create({
    cameraBtn: {
        padding:5
    },
    count:{
        color:'#fff',
        fontSize:12
    },
    fullBtn:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    countBox:{
        position:'absolute',
        right:-5,
        top:-5,
        alignItems:'center',
        backgroundColor:'#34A853',
        width:16,
        height:16,
        borderRadius:8,
        justifyContent:'center'
    },
    image:{
        paddingTop:10,
        height:198,
        width:300,
        alignSelf:'center',
    },
});

export default CameraButton;
