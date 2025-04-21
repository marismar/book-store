import { StyleSheet, Text, TextInput, View } from 'react-native';

type FormInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const FormTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
}: FormInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType="default"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { rowGap: 4 },
  label: { color: '#3F3F3F', fontWeight: '500' },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    borderColor: 'gainsboro',
  },
});

export default FormTextInput;
