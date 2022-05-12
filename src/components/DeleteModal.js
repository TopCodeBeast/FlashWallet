import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Block, Icon, Text, theme } from 'galio-framework';
import Modal from 'react-native-modal';
const { height } = Dimensions.get('screen');

export default class DeleteModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal
                isVisible={this.props.isVisible}
                onBackdropPress={() => this.props.onBackdropPress()}>
                <Block center style={styles.modalContent}>
                    <Block row center>
                        <Icon name="warning" family="antdesign" color="red" size={22} />
                        <Text color="red" size={22}> Are you sure?</Text>
                    </Block>
                    <Block row center style={{ marginTop: 20 }}>
                        <Button
                            size="small"
                            style={{ backgroundColor: "grey" }}
                            icon="close" iconFamily="AntDesign" iconSize={18}
                            textStyle={{ fontSize: 18 }}
                            onPress={() => this.props.onCancel()}
                        > No</Button>
                        <Button
                            size="small"
                            icon="trash" iconFamily="entypo" iconSize={18}
                            textStyle={{ fontSize: 18 }}
                            onPress={() => this.props.onDelete()}
                        > Yes</Button>
                    </Block>
                </Block>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: theme.SIZES.BASE * 2,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        maxHeight: height / 2
    },
});