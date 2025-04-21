import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type PrimaryButtonProps = {
  text: string;
  onPress: () => Promise<void>;
};

const PrimaryButton = ({ text, onPress }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'darkcyan',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    columnGap: 8,
    marginTop: 32,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default PrimaryButton;
