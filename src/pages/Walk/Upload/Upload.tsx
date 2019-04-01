import produce from 'immer';
import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import withLoading, { LoadingProps } from 'src/components/base/withLoading';
import PageContainer from 'src/components/container/PageContainer';
import { ImageInterface } from 'src/components/module/ImageWithSticker/ImageWithSticker';
import { uploadImages } from 'src/services/aws/s3';
import { ReducerState } from 'src/store/reducers';
import ImageCard, { AddImageCard } from './ImageCard';
import { texts, views } from './Upload.styles';

interface Props extends LoadingProps, NavigationScreenProps {
  email: ReducerState['user']['email'];
}

interface State {
  memo: string;
  images: ImageInterface[];
}

class Upload extends PureComponent<Props, State> {
  state: State = {
    memo: '',
    images: [{ uri: this.props.navigation.getParam('snapshot') }],
  };

  handleSave = async () => {
    const { navigation, email, toggleLoading } = this.props;
    const now = new Date();
    const uris = this.state.images.map(image => image.nextUri || image.uri);
    const images = await uploadImages({
      email,
      uris,
      table: 'feeds',
      name: now.toUTCString(),
    })(toggleLoading);
    navigation.popToTop();
    navigation.getParam('handleDismiss')();
  };

  handleChangeMemo = (memo: string) => {
    this.setState({ memo });
  };

  handleAddImage = (image: ImageInterface) => {
    this.setState(state =>
      produce(state, draft => {
        draft.images.push(image);
      })
    );
  };

  handleUpdateImage = (image: ImageInterface, index: number) => {
    this.setState(state =>
      produce(state, draft => {
        draft.images[index] = image;
      })
    );
  };

  handleDeleteImage = (index: number) => {
    this.setState(state =>
      produce(state, draft => {
        draft.images.splice(index, 1);
      })
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <PageContainer
        left={{ navigation }}
        center="게시물 작성"
        right={{ view: '완료', handlePress: this.handleSave }}
        bottom={{
          view: (
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={views.listView}
              horizontal={true}
              showsVerticalScrollIndicator={false}>
              <AddImageCard handleLoad={this.handleAddImage} />
              {this.state.images.map((image, index) => (
                <ImageCard
                  key={index}
                  image={image}
                  index={index}
                  navigate={navigation.navigate}
                  handleUpdate={this.handleUpdateImage}
                  handleDelete={this.handleDeleteImage}
                />
              ))}
            </ScrollView>
          ),
          styles: { paddingHorizontal: 0, flexDirection: 'row' },
        }}
        showBorder>
        <TextInput
          value={this.state.memo}
          style={texts.input}
          onChangeText={this.handleChangeMemo}
          placeholder="오늘 산책은 어떠셨나요?"
          placeholderTextColor="#00000048"
        />
      </PageContainer>
    );
  }
}

export default connect((state: ReducerState) => ({
  email: state.user.email,
}))(withLoading(Upload));
