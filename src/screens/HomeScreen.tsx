import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  addBook,
  BaseBook,
  Book,
  deleteBook,
  fetchBook,
  fetchBooks,
  updateBook,
} from '../../src/api/books';
import BookCard from '../components/BookCard';
import BookFormScreen from './BookFormScreen';

type HomeState = {
  books: Book[];
  isLoading?: boolean;
};

const HomeScreen = () => {
  const [state, setState] = useState({ books: [] } as HomeState);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();

  useEffect(() => {
    fetchAll();
  }, []);

  const openModal = (book?: Book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedBook(undefined);
    setModalVisible(false);
  };

  const fetchAll = async (): Promise<void> => {
    setState({ books: [], isLoading: true });

    await fetchBooks({
      onSuccess: books => setState({ books: books, isLoading: false }),
      onError: _ => {
        setState({ books: [], isLoading: false });
        Alert.alert('Failed to fetch books');
      },
    });
  };

  const fetch = async (id: string): Promise<void> => {
    setState({ books: [], isLoading: true });
    await fetchBook(id, {
      onSuccess: book => setState({ books: [book], isLoading: false }),
      onError: _ => {
        setState({ books: [], isLoading: false });
        Alert.alert(`Failed to fetch book ${id}`);
      },
    });
  };

  const remove = async (id: string) => {
    setState({
      ...state,
      isLoading: true,
    });

    await deleteBook(id, {
      onSuccess: deletedBook => {
        setState({
          ...state,
          books: state.books.filter(book => book.id !== deletedBook.id),
          isLoading: false,
        });

        Alert.alert('Book deleted successfully');
      },
      onError: error => {
        setState({
          ...state,
          isLoading: false,
        });

        Alert.alert(`Failed to delete book ${id}`);
      },
    });
  };

  const update = async (book: Book) => {
    setState({
      ...state,
      isLoading: true,
    });

    await updateBook(book, {
      onSuccess: updatedBook => {
        closeModal();

        setState({
          ...state,
          books: state.books.map(book =>
            book.id === updatedBook.id ? updatedBook : book
          ),
          isLoading: false,
        });

        Alert.alert('Book updated successfully');
      },
      onError: _ => {
        setState({
          ...state,
          isLoading: false,
        });

        Alert.alert(`Failed to update book ${book.id}`);
      },
    });
  };

  const create = async (book: BaseBook) => {
    setState({
      ...state,
      isLoading: true,
    });

    await addBook(book, {
      onSuccess: newBook => {
        closeModal();

        setState({
          ...state,
          books: [...state.books, newBook],
          isLoading: false,
        });

        Alert.alert('Book added successfully');
      },
      onError: _ => {
        setState({
          ...state,
          isLoading: false,
        });

        Alert.alert('Failed to add book');
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>My Books</Text>

        <AntDesign
          name="pluscircleo"
          size={24}
          color="darkcyan"
          onPress={() => openModal()}
        />
      </View>

      {state.isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={state.books}
          keyExtractor={item => item.id}
          style={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          renderItem={({ item: book }) => (
            <BookCard
              imageURI={book.cover}
              authorName={book.authorName}
              sellerEmail={book.sellerEmail}
              title={book.title}
              description={book.description}
              price={book.price}
              onOpenDetails={() => fetch(book.id)}
              onDelete={() => remove(book.id)}
              onUpdate={() => openModal(book)}
            />
          )}
        />
      )}
      <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
        presentationStyle="formSheet"
        animationType="slide"
      >
        <BookFormScreen
          book={selectedBook}
          onClose={closeModal}
          onCreate={create}
          onUpdate={update}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  loading: { flex: 1, alignSelf: 'center' },
  listContainer: { flex: 1, padding: 16 },
  listSeparator: { height: 16 },
});

export default HomeScreen;
