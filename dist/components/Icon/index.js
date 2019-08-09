import React from 'react';
import { Image } from 'react-native';
import variables from '../../common/styles/variables';
export class Icon extends React.Component {
    render() {
        let { type, size, style, tintColor, source } = this.props;
        const mainStyle = {
            tintColor,
            width: size,
            height: size
        };
        if (size == null) {
            delete mainStyle.width;
            delete mainStyle.height;
        }
        if (!source) {
            source = require(`../../common/images/icons/${type}.png`);
        }
        return (React.createElement(Image, { style: [
                style,
                {
                    ...mainStyle
                }
            ], source: source }));
    }
}
Icon.displayName = 'Icon';
Icon.defaultProps = {
    type: 'angle-down',
    size: 14,
    style: {},
    tintColor: variables.mtdBrandPrimaryDark,
    source: null
};
//# sourceMappingURL=index.js.map