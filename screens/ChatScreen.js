import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import MessageBubble from '../components/Chat/MessageBubble';
import SocketManager from '../SocketManager';

const messagesDummy = [
  {
    message: 'Selamfaogkmapodmgpdamgaodpgmsdgmkgmaklmfakslfmasdsalşmd',
    sender: 'me',
    receiver: 'you',
    createdAt: '10:08',
  },
  { message: 'iii', sender: 'you', receiver: 'me', createdAt: '10:25' },
  { message: 'naber', sender: 'me', receiver: 'you', createdAt: '10:26' },
  {
    message: 'iyi sen FASPFKÖASOPFKSAPOGKÖAPOGKÖAPOMKÖAPD',
    sender: 'you',
    receiver: 'me',
    createdAt: '10:28',
  },
  {
    message: 'iyi ben de faskmlflaksgmaklgmagmkgmaşkgmaşgnmagmakgnmşGKMA',
    sender: 'me',
    receiver: 'you',
    createdAt: '10:31',
  },
  { message: 'napıyosun', sender: 'you', receiver: 'me', createdAt: '10:42' },
  { message: 'hiç', sender: 'me', receiver: 'you', createdAt: '11:55' },
  {
    message: 'hiç ben de FSALJFJLSNFSAONADJLGNADLNAKLFA',
    sender: 'you',
    receiver: 'me',
    createdAt: '12:09',
  },
  { message: 'harika', sender: 'me', receiver: 'you', createdAt: '12:10' },
  {
    message: 'Selamfaogkmapodmgpdamgaodpgmsdgmkgmaklmfakslfmasdsalşmd',
    sender: 'me',
    receiver: 'you',
    createdAt: '10:08',
  },
  { message: 'iii', sender: 'you', receiver: 'me', createdAt: '10:25' },
  { message: 'naber', sender: 'me', receiver: 'you', createdAt: '10:26' },
  {
    message: 'iyi sen FASPFKÖASOPFKSAPOGKÖAPOGKÖAPOMKÖAPD',
    sender: 'you',
    receiver: 'me',
    createdAt: '10:28',
  },
  {
    message: 'iyi ben de faskmlflaksgmaklgmagmkgmaşkgmaşgnmagmakgnmşGKMA',
    sender: 'me',
    receiver: 'you',
    createdAt: '10:31',
  },
  { message: 'napıyosun', sender: 'you', receiver: 'me', createdAt: '10:42' },
  { message: 'hiç', sender: 'me', receiver: 'you', createdAt: '11:55' },
  {
    message: 'hiç ben de FSALJFJLSNFSAONADJLGNADLNAKLFA',
    sender: 'you',
    receiver: 'me',
    createdAt: '12:09',
  },
  { message: 'harika', sender: 'me', receiver: 'you', createdAt: '12:10' },
];

function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(messagesDummy);

  useEffect(() => {
    // Register a callback to receive messages
    SocketManager.receiveMessage(message => {
      console.log('Received message:', message);
      setMessages(messages => [...messages, message]);
    });

    // Optionally, you can unregister the callback when the component unmounts
    return () => {
      SocketManager.socket.off('messageFromServer');
    };
  }, []);

  return (
    <View style={{ flex: 1 }} behavior="padding">
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              justifyContent: item.receiver === 'me' ? 'flex-start' : 'flex-end',
            }}
          >
            <MessageBubble messageObj={item} />
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Your messages"
        />

        <Pressable style={styles.button} onPress={() => SocketManager.sendMessage(message)}>
          <FontAwesome name="send" size={24} color="white" style={{ marginRight: 5 }} />
        </Pressable>
      </View>
    </View>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: 'white',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
  },
  messageInput: {
    backgroundColor: 'white',
    width: '80%',
    height: 60,
    fontSize: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#0084ff',
    width: 50,
    height: 50,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
});
