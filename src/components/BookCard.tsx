import AntDesign from '@expo/vector-icons/AntDesign';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type BookCardProps = {
  imageURI: string;
  authorName: string;
  sellerEmail: string;
  title: string;
  description: string;
  price: string;
  onOpenDetails?: () => Promise<void>;
  onDelete?: () => Promise<void>;
  onUpdate?: () => void;
};

const BookCard = ({
  onOpenDetails,
  onDelete,
  onUpdate,
  ...props
}: BookCardProps) => {
  return (
    <TouchableOpacity disabled={!onOpenDetails} onPress={onOpenDetails}>
      <View style={styles.container}>
        <View style={styles.shadow}>
          <Image style={styles.image} source={{ uri: props.imageURI }} />
        </View>
        <View style={styles.columnSpaceBetween}>
          <View>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>{props.authorName}</Text>

            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={styles.paragraph}
            >
              {props.description}
            </Text>

            <Text style={styles.caption}>
              {props.sellerEmail.toLowerCase()}
            </Text>
          </View>

          <View style={styles.rowSpaceBetween}>
            <Text style={styles.highlight}>{` R$ ${props.price}`}</Text>
            <View style={styles.buttons}>
              {onDelete && onUpdate && (
                <AntDesign
                  name="delete"
                  size={24}
                  color="crimson"
                  style={styles.secondaryButton}
                  onPress={onDelete}
                />
              )}

              {onUpdate && (
                <AntDesign
                  name="edit"
                  size={24}
                  color="white"
                  style={styles.primaryButton}
                  onPress={onUpdate}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e7f2f3',
    borderRadius: 12,
    columnGap: 8,
    padding: 12,
  },
  image: {
    height: 100,
    width: 75,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: -5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  subtitle: { fontSize: 14, marginBottom: 4 },
  paragraph: { fontSize: 14, color: '#6c6c6c', marginBottom: 8 },
  caption: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6c6c6c',
  },
  highlight: { fontSize: 16, fontWeight: 'bold', color: 'darkcyan' },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    marginRight: -12,
    marginBottom: -12,
    justifyContent: 'flex-end',
  },
  primaryButton: {
    backgroundColor: 'darkcyan',
    padding: 8,
    borderEndEndRadius: 12,
  },
  secondaryButton: {
    backgroundColor: 'pink',
    padding: 8,
    borderTopLeftRadius: 8,
  },
  columnSpaceBetween: { flex: 1, justifyContent: 'space-between' },
  rowSpaceBetween: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default BookCard;
