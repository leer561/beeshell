import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { TopviewGetInstance } from '../../components/Topview';
import variables from '../../common/styles/variables';
import { range } from '../../common/utils';
export class Ruler extends Component {
    constructor(p) {
        super(p);
        this.state = {
            topviewId: null
        };
    }
    componentDidMount() {
        if (this.state.topviewId) {
            return;
        }
        TopviewGetInstance() && TopviewGetInstance().add(this.renderFullScreenView()).then((id) => {
            this.setState({
                topviewId: id
            });
        });
    }
    componentWillUnmount() {
        TopviewGetInstance() && TopviewGetInstance().remove(this.state.topviewId);
    }
    renderFullScreenView() {
        const { direction, style } = this.props;
        return (React.createElement(View, { style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                flexDirection: direction === 'vertical' ? 'column' : 'row',
                alignItems: 'flex-start',
            }, pointerEvents: 'box-none' },
            React.createElement(ScrollView, { style: [
                    {
                        marginLeft: direction === 'vertical' ? 40 : null,
                        marginTop: direction === 'vertical' ? null : 200,
                    },
                    style,
                ], contentContainerStyle: {
                    flexDirection: direction === 'vertical' ? 'column' : 'row',
                    alignItems: 'flex-start'
                }, horizontal: direction === 'horizontal', showsHorizontalScrollIndicator: true, showsVerticalScrollIndicator: true }, range(100).map((item) => {
                const index = item + 1;
                const evenNumber = index % 2 === 0;
                const base = 10;
                const value = index * base;
                const showValue = value % 50 === 0;
                const valueViewHeight = direction === 'vertical' ? base : null;
                const valueViewWidth = direction === 'vertical' ? null : base;
                return (React.createElement(View, { key: item, style: {
                        flexDirection: direction === 'vertical' ? 'row' : 'column'
                    } },
                    React.createElement(View, { style: {
                            height: base,
                            width: base,
                            backgroundColor: evenNumber ? variables.mtdGrayLightest : variables.mtdGrayBase
                        } }),
                    React.createElement(View, { style: {
                            height: valueViewHeight,
                            width: valueViewWidth,
                        } }, showValue ?
                        React.createElement(View, { style: {
                                height: valueViewHeight,
                                width: valueViewWidth,
                                backgroundColor: variables.mtdBrandDanger,
                                justifyContent: 'center',
                                alignItems: 'center'
                            } },
                            React.createElement(Text, { style: {
                                    textAlignVertical: 'center',
                                    textAlign: 'center',
                                    fontSize: 10,
                                    color: '#fff',
                                }, numberOfLines: undefined }, value)) : null)));
            }))));
    }
    render() {
        return null;
    }
}
Ruler.defaultProps = {
    direction: 'vertical'
};
//# sourceMappingURL=index.js.map