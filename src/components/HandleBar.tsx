import { StyleSheet, View } from 'react-native';

const HandleBar = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: 46,
    backgroundColor: 'gainsboro',
    borderRadius: 8,
    alignSelf: 'center',
  },
});

export default HandleBar;
