import React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Block,
  Button,
  Text,
  Input
} from 'galio-framework';
import AwesomeLoading from 'react-native-awesome-loading';
import Toast from 'react-native-toast-message';
import { DraxProvider, DraxList, DraxViewDragStatus } from 'react-native-drax';
import { colors, commonStyles } from '../../styles';

import {
  CallZCardClassFunction,
  CallController,
} from '../../redux/actions';

const { width, height } = Dimensions.get('screen');

class SectionEditScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      saving: false,
      reseting: false,
      sections: []
    }
  }

  componentDidMount = () => {
    this.fetchSections();
  }

  fetchSections = () => {
    const { selectedZCard } = this.props;

    this.props.getAllSectionEditHTML(
      selectedZCard.id,
      'getAllSectionEditHTML',
      [true],
      (sections) => {
        this.setState({ sections });
        this.setState({ loading: false, reseting: false });
      },
      (msg) => {
        this.setState({ loading: false, reseting: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );
  }

  reset = () => {
    this.setState({ reseting: true });
    this.fetchSections();
  }

  save = () => {
    const { selectedZCard } = this.props;
    const { sections } = this.state;
    this.setState({ saving: true });
    let sectionsIDs = [];
    for (let i = 0; i < sections.length; i++)
      sectionsIDs.push(sections[i].id);

    this.props.update_section_order(
      '/edit-zcard/update_section_order.php',
      {
        zcard_id: selectedZCard.id,
        sections: JSON.stringify(sectionsIDs)
      },
      (msg) => {
        this.setState({ saving: false });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: msg + ' 🎊'
        });
      },
      (msg) => {
        this.setState({ saving: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );
  }

  render = () => {
    const { sections, saving, reseting } = this.state;
    return (
      <DraxProvider>
        <SafeAreaView
          edges={['top', 'left', 'right']}
          style={styles.container}
        >
          <AwesomeLoading indicatorId={7} size={80} isActive={this.state.loading} />
          {sections.length > 0 && <DraxList
            data={sections}
            renderItemContent={({ item }, { viewState, hover }) => (
              <Block
                style={[
                  styles.sectionItem,
                  { backgroundColor: item.tab_color },
                  (viewState?.dragStatus === DraxViewDragStatus.Dragging && hover) ? styles.hover : undefined,
                ]}
              >
                <Text size={18} color={item.tab_font_color} style={{ flexShrink: 1 }}>{item.name}</Text>
              </Block>
            )}
            onItemDragStart={({ index, item }) => {
              // console(`Item #${index} (${item}) drag start`);
            }}
            onItemDragPositionChange={({
              index,
              item,
              toIndex,
              previousIndex,
            }) => {
              // console(`Item #${index} (${item}) dragged to index ${toIndex} (previous: ${previousIndex})`);
            }}
            onItemDragEnd={({
              index,
              item,
              toIndex,
              toItem,
            }) => {
              // console(`Item #${index} (${item}) drag ended at index ${toIndex} (${toItem})`);
            }}
            onItemReorder={({
              fromIndex,
              fromItem,
              toIndex,
              toItem,
            }) => {
              // console(`Item dragged from index ${fromIndex} (${fromItem.id}) to index ${toIndex} (${toItem.id})`);
              const newData = sections.slice();
              newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
              this.setState({ sections: newData });
            }}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
              <Block style={styles.header}>
                <Text style={styles.headerText}>
                  Long-press any list item to drag it to a new position.
                  Dragging an item over the top or bottom edge of the container
                  will automatically scroll the list. Swiping up or down
                  without the initial long-press will scroll the list normally.
                </Text>
              </Block>
            )}
            ListFooterComponent={() => (
              <Block>
                <Block style={commonStyles.divider} />
                <Block row center>
                  <Button
                    color={colors.green}
                    icon='save' iconFamily='AntDesign' iconSize={18}
                    textStyle={{ fontSize: 18 }}
                    loading={saving}
                    size='small'
                    onPress={() => this.save()}
                  > Save</Button>
                  <Button
                    color={colors.gray}
                    icon='reload1' iconFamily='AntDesign' iconSize={18}
                    textStyle={{ fontSize: 18 }}
                    size='small'
                    loading={reseting}
                    onPress={() => this.reset()}
                  > Reset</Button>
                </Block>
              </Block>
            )}
          />}
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
      </DraxProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    selectedZCard: state.selectedZCard,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getAllSectionEditHTML: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    update_section_order: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionEditScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.primary
  },
  sectionItem: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    margin: 4,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hover: {
    borderColor: colors.blue,
    borderWidth: 2,
    transform: [{ rotate: '-5deg' }]
  },
});
