import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import variables from '../../common/styles/variables';
import tabStyle from './styles';
const styles = StyleSheet.create(tabStyle);
export class Tab extends React.Component {
    constructor() {
        super(...arguments);
        this._itemLayouts = [];
        this._scrollerContentOffsetX = 0;
        this.renderItemContent = (item, index, active) => {
            return [
                React.createElement(View, { key: index }, React.createElement(Text, { style: [
                        styles.text,
                        active ? { color: this.props.activeColor, fontWeight: 'bold' } : {},
                        item.disabled ? { color: variables.mtdGrayLighter } : {}
                    ] }, item.label)),
                React.createElement(View, { key: index + 'l', style: [
                        styles.line,
                        active ? { backgroundColor: this.props.activeColor } : {},
                    ] })
            ];
        };
        this.handleLayoutItem = (index, item, e) => {
            const existed = this._itemLayouts.some((layoutItem) => {
                return layoutItem.index === index;
            });
            !existed && e && e.nativeEvent && this._itemLayouts.push({
                index,
                layout: e.nativeEvent.layout
            });
        };
        this.handleScroll = (e) => {
            e && e.nativeEvent && e.nativeEvent.contentOffset && (this._scrollerContentOffsetX = e.nativeEvent.contentOffset.x);
        };
    }
    scrollTo(index = 0) {
        if (!this.props.scrollable) {
            return;
        }
        this._container.measure((x, y, width) => {
            const distance = this.calucateDistance(index, this._scrollerContentOffsetX, width);
            if (distance == null) {
                return;
            }
            this._scroller.scrollTo({ x: distance, y: 0, animated: true });
        });
    }
    calucateDistance(index, baseX, containerWidth) {
        let distance = null;
        // 对缓存的 _itemLayouts 进行排序
        const layouts = this._itemLayouts.sort((a, b) => {
            return a.index - b.index;
        });
        if (!layouts[index] || !layouts[index].layout) {
            return distance;
        }
        const targetX = layouts[index].layout.x;
        const targetWidth = layouts[index].layout.width;
        let deltaX = null;
        if (baseX <= 0) {
            deltaX = -baseX + targetX + targetWidth - containerWidth;
            if (deltaX >= 0) {
                distance = baseX + deltaX;
            }
        }
        if (baseX > 0) {
            deltaX = -baseX + targetX + targetWidth;
            if (deltaX <= 0) {
                distance = targetX;
            }
            else {
                if (deltaX < targetWidth) {
                    distance = targetX;
                }
                else {
                    deltaX = deltaX - containerWidth;
                    if (deltaX > 0) {
                        distance = baseX + deltaX;
                    }
                }
            }
        }
        return distance;
    }
    renderItems() {
        const { dataItemContainerStyle, dataItemStyle, value, data = [], onChange, renderItem, } = this.props;
        return data.map((item, index) => {
            const active = value === item.value;
            return (React.createElement(TouchableOpacity, { style: [{ flex: 1 }, dataItemContainerStyle], key: index, activeOpacity: 1, onPress: () => {
                    if (item.disabled) {
                        return;
                    }
                    onChange && onChange(item, index);
                }, onLayout: this.handleLayoutItem.bind(this, index, item) }, renderItem ?
                renderItem(item, index, active) :
                React.createElement(View, { style: [styles.item, dataItemStyle] }, this.renderItemContent(item, index, active))));
        });
    }
    render() {
        const { scrollable, style, dataContainerStyle } = this.props;
        const itemViews = this.renderItems();
        return (React.createElement(View, { ref: (c) => { this._container = c; }, style: [styles.container, style] }, scrollable ?
            React.createElement(ScrollView, { ref: (c) => {
                    this._scroller = c;
                }, horizontal: true, showsHorizontalScrollIndicator: false, scrollEventThrottle: 0, onScroll: this.handleScroll },
                React.createElement(View, { collapsable: false, style: [styles.content, dataContainerStyle] }, itemViews)) :
            React.createElement(View, { style: [styles.content, dataContainerStyle] }, itemViews)));
    }
}
Tab.defaultProps = {
    activeColor: variables.mtdGrayBase,
    value: null,
    data: [],
    onChange: null,
    scrollable: false,
};
//# sourceMappingURL=index.js.map