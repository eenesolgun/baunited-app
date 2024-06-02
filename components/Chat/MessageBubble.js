import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

function MessageBubble({ messageObj }) {
  const [isExceeding, setIsExceeding] = useState(false);

  const handleLayout = useCallback(event => {
    const { width } = event.nativeEvent.layout;
    const predefinedWidth = screenWidth * 0.75;

    if (width > predefinedWidth) setIsExceeding(true);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          paddingRight: isExceeding ? 20 : 55,
          backgroundColor: messageObj.sender === 'me' ? '#0084ff' : '#ededed',
        },
      ]}
      onLayout={handleLayout}
    >
      <Text style={{ color: messageObj.sender === 'me' ? 'white' : '#111111' }}>
        {messageObj.message}
      </Text>
      <View style={styles.timestampContainer}>
        <Text
          style={[styles.createdAt, { color: messageObj.sender === 'me' ? 'white' : '#111111' }]}
        >
          {messageObj.createdAt}
        </Text>
      </View>
    </View>
  );
}

export default MessageBubble;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    maxWidth: screenWidth * 0.8,
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  timestampContainer: {
    position: 'absolute',
    bottom: 8,
    right: 0,
    left: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  createdAt: {
    fontFamily: 'plusjakartasans-regular',
    fontSize: 10,
  },
});
