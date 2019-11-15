import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity  } from 'react-native';
import { Dimensions } from 'react-native';

export default function InvationCard(props) {
  let imageBase =
  'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/Images/';
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
      <Image
          style={styles.profileImage}
          source={{ uri: imageBase + props.pic }}
        />
        <View style={styles.textSection}>
          <Text>{props.name}</Text>
          <Text>{props.date}</Text>
        </View>
      </View>
      <View  style={styles.topSection2}>
        </View>
      <View style={styles.buttomSection}>
        <TouchableOpacity
          onPress={() => props.declineInvitationCallBack(props.id)}
          style={styles.buttonStyle}>
          <Text
            style={{
              fontFamily: 'Helvetica',
              fontSize: 14,
              color: '#FF3B3B',
            }}>
            X Decline
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.acceptInvitationCallBack(props.id)}
          style={styles.buttonStyle}>
          <Text
            style={{
              fontFamily: 'Helvetica',
              fontSize: 14,
              color: '#38D459',
            }}>
            ✓ Accept
          </Text>
          
        </TouchableOpacity>
         
         
      </View>
     
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: 315,
    height: 433,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  profileImage: {
    width: 50,
    height: 50,
    margin: 10,
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 50,
  },
   topSection2: {
     justifyContent:"flex-end",
    flexDirection: 'column',

  },
  buttonStyle: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
   mapStyle: {
     borderTopColor: 'blue',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 500,
  },
  buttomSection: {
    flexDirection: 'row',
    borderTopColor: '#D8D8D8',
    borderTopWidth: 1,
    height: 52,
    width: '100%',
  },
});
