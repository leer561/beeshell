import { FlatList, Text, StyleSheet, View, ActivityIndicator, } from 'react-native';
import React from 'react';
import variables from '../../common/styles/variables';
const styles = StyleSheet.create({
    loadingIndicator: {
        padding: 10,
    }
});
export class Longlist extends React.Component {
    constructor(props) {
        super(props);
        this.flatList = null; // 通过 flatList 对象，调用 FlatList 组件相关方法
        this.handleEndReached = () => {
            const { data, total, onEndReached } = this.props;
            if (!onEndReached) {
                return;
            }
            if (data && data.length && data.length >= total) {
                return;
            }
            if (this.state.loading) {
                return;
            }
            this.setState({
                loading: true,
            }, () => {
                onEndReached().then(() => {
                    this.setState({
                        loading: false
                    });
                }).catch((e) => {
                    this.setState({
                        loading: false
                    });
                });
            });
        };
        this.handleRefresh = () => {
            if (this.state.refreshing) {
                return;
            }
            this.setState({
                refreshing: true
            }, () => {
                this.props.onRefresh().then(() => {
                    this.setState({
                        refreshing: false,
                    });
                }).catch(() => {
                    this.setState({
                        refreshing: false,
                    });
                });
            });
        };
        this.state = {
            refreshing: false,
            loading: false,
        };
    }
    renderFooter() {
        const { data, total, renderFooter } = this.props;
        const { loading } = this.state;
        let footer = null;
        if (renderFooter) {
            footer = renderFooter(loading, data, total);
        }
        if (React.isValidElement(footer)) {
            return footer;
        }
        if (loading) {
            return (React.createElement(View, { style: styles.loadingIndicator },
                React.createElement(ActivityIndicator, { size: 'small', color: '#333' })));
        }
        if (data && !data.length && total === 0) {
            return React.createElement(Text, { style: { padding: variables.mtdHSpacingXL, color: variables.mtdGrayBase, textAlign: 'center' } }, "\u65E0\u6570\u636E");
        }
        if (data && data.length && data.length >= total) {
            return React.createElement(Text, { style: { padding: variables.mtdHSpacingXL, color: variables.mtdGrayBase, textAlign: 'center' } }, "\u65E0\u66F4\u591A\u6570\u636E");
        }
        return null;
    }
    render() {
        const { refreshing } = this.state;
        const { onRefresh } = this.props;
        const retProps = {
            ...this.props,
        };
        if (!onRefresh) {
            delete retProps.refreshing;
            delete retProps.onRefresh;
        }
        else {
            retProps.refreshing = refreshing;
            retProps.onRefresh = this.handleRefresh;
        }
        return (React.createElement(FlatList, Object.assign({}, retProps, { ref: (c) => {
                this.flatList = c;
            }, keyExtractor: (item, index) => {
                return index.toString();
            }, initialNumToRender: this.props.initialNumToRender, onEndReached: this.handleEndReached, onEndReachedThreshold: 0.1, ListFooterComponent: () => {
                return this.renderFooter();
            } })));
    }
}
Longlist.defaultProps = {
    total: 0,
    data: [],
    initialNumToRender: 5
};
//# sourceMappingURL=index.js.map