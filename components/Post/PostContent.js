import { View, Text, StyleSheet } from 'react-native';

function PostContent({ title, description, truncate }) {
  return (
    <View style={styles.postContent}>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postDescription} numberOfLines={truncate}>
        {description}
      </Text>
    </View>
  );
}

export default PostContent;

const styles = StyleSheet.create({
  postContent: {
    marginBottom: 20,
  },
  postTitle: {
    fontFamily: 'plusjakartasans-bold',
    fontSize: 16,
    marginBottom: 6,
  },
  postDescription: {
    fontFamily: 'plusjakartasans-regular',
    color: '#44484b',
  },
});
