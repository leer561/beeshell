import React from 'react';
import { View, Text } from 'react-native';
import { SlideModal } from '../../components/SlideModal';
import variables from '../../common/styles/variables';
export class Popover extends SlideModal {
    constructor(props) {
        super(props);
    }
    getContent() {
        const inner = React.isValidElement(this.props.children) ? this.props.children : (React.createElement(View, { style: [
                {
                    backgroundColor: variables.mtdFillBackdropDark,
                    borderRadius: variables.mtdRadiusXS,
                    paddingHorizontal: variables.mtdHSpacingL,
                    paddingVertical: variables.mtdVSpacingL,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            ] },
            React.createElement(Text, { style: { color: '#fff' } }, this.props.children)));
        return SlideModal.prototype.getContent.call(this, inner);
    }
}
Popover.defaultProps = {
    ...SlideModal.defaultProps,
    backdropOpacity: 0,
    offsetX: 100,
    offsetY: 100,
    direction: 'down',
    align: 'left',
    fullScreenPatch: [true, true, true],
    cancelable: true
};
//# sourceMappingURL=index.js.map