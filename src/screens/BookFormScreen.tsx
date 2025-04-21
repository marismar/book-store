import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BaseBook, Book } from '../api/books';
import FormTextInput from '../components/FormTextInput';
import HandleBar from '../components/HandleBar';
import PrimaryButton from '../components/PrimaryButton';

type BookFormProps = {
  // If 'book' is defined, the component is in edit mode; otherwise, it's in add mode.
  book?: Book;
  onClose: () => void;
  onCreate: (book: BaseBook) => Promise<void>;
  onUpdate: (book: Book) => Promise<void>;
};

const BookFormScreen = ({
  book,
  onClose,
  onCreate,
  onUpdate,
}: BookFormProps) => {
  const mode = book ? 'update' : 'create';

  const [title, setTitle] = useState(book?.title ?? '');
  const [description, setDescription] = useState(book?.description ?? '');
  const [authorName, setAuthorName] = useState(book?.authorName ?? '');
  const [cover, setCover] = useState(book?.cover ?? '');
  const [price, setPrice] = useState(book?.price ?? '');
  const [sellerEmail, setSellerEmail] = useState(book?.sellerEmail ?? '');

  const create = async () => {
    await onCreate({
      title,
      description,
      authorName,
      cover,
      price,
      sellerEmail,
    });
  };
  const update = async () => {
    await onUpdate({
      ...book!,
      title,
      description,
      authorName,
      cover,
      price,
      sellerEmail,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <HandleBar />
        <View style={styles.heading}>
          <Text style={styles.title}>
            {`${mode == 'update' ? 'Update' : 'New'} Book`}
          </Text>
          <AntDesign name="close" size={24} color="gray" onPress={onClose} />
        </View>
        <View style={styles.form}>
          <FormTextInput
            label={'Title'}
            value={title}
            onChangeText={setTitle}
            placeholder="Type the book title"
          />

          <FormTextInput
            label={'Description'}
            value={description}
            onChangeText={setDescription}
            placeholder="Type the book description"
          />

          <FormTextInput
            label={'Author Name'}
            value={authorName}
            onChangeText={setAuthorName}
            placeholder="Type the author's name"
          />

          <FormTextInput
            label={'Cover Image URL'}
            value={cover}
            onChangeText={setCover}
            placeholder="Paste the cover image URL"
          />

          <FormTextInput
            label={'Price (R$)'}
            value={price}
            onChangeText={setPrice}
            placeholder="Type the price"
          />

          <FormTextInput
            label={'Seller Email'}
            value={sellerEmail}
            onChangeText={setSellerEmail}
            placeholder="Type the seller's email"
          />

          <PrimaryButton
            text="Save"
            onPress={async () => (mode == 'create' ? create() : update())}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { margin: 16, rowGap: 8 },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  form: { rowGap: 16 },
});

export default BookFormScreen;
