import React, {Component} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import inputStyles from './styles';
import variables from '../../common/styles/variables';
import {Icon} from '../Icon';
import {FormContext} from '../Form/form-context'

const styles = StyleSheet.create(inputStyles);

export class Input extends Component {
	static contextType = FormContext;

	constructor(props) {
		super(props);
		this.delayIsEditing = null;
		this.handleChange = (value) => {
			this.props.onChange && this.props.onChange(value);
		};
		this.handleBlur = (e) => {
			if (this.props.onBlur) {
				this.props.onBlur(e);
			}
		};
		this.handleFocus = (e) => {
			if (this.props.onFocus) {
				this.props.onFocus(e);
			}
		};
		this.delayTaskMemoize = (duration) => {
			let timeoutId;
			return {
				cancel() {
					clearTimeout(timeoutId);
				},
				delay(task) {
					clearTimeout(timeoutId);
					timeoutId = setTimeout(() => {
						task();
					}, duration || 0);
				}
			};
		};
		this.renderiOS = () => {
			const {editable, ...tmpProps} = this.modProps(this.props);
			return (React.createElement(View, {
					style: [styles.container, this.props.style, {
						flexDirection: 'column',
						justifyContent: 'center'
					}]
				},
				React.createElement(TextInput, Object.assign({}, tmpProps, {
					style: [styles.inputStyle, this.props.inputStyle],
					onChange: () => {
						return;
					},
					onChangeText: this.handleChange,
					onFocus: this.handleFocus.bind(this),
					onBlur: this.handleBlur.bind(this),
					editable: editable && this.context.editable
				}))));
		};
		this.renderAndroidAndWeb = () => {
			const androidClearButtonMode = this.props.clearButtonMode && this.props.clearButtonMode !== 'never';
			const showDelIcon = androidClearButtonMode && this.props.value && this.state.isEditing;
			const {editable, ...tmpProps} = this.modProps(this.props);
			return (React.createElement(View, {
					style: [styles.container, this.props.style, {
						flexDirection: 'row',
						alignItems: 'center'
					}]
				},
				React.createElement(TextInput, Object.assign({}, tmpProps, {
					clearButtonMode: 'never',
					style: [styles.inputStyle, {flex: 1}, this.props.inputStyle],
					onChange: () => {
						return;
					},
					onChangeText: this.handleChange,
					onFocus: (e) => {
						this.handleFocus(e);
						this.delayIsEditing.cancel();
						this.setState({
							isEditing: true
						});
					},
					onBlur: (e) => {
						this.handleBlur(e);
						this.delayIsEditing.delay(() => {
							this.setState({
								isEditing: false
							});
						});
					},
					underlineColorAndroid: 'transparent',
					editable: editable && this.context.editable
				})),
				showDelIcon ?
					React.createElement(TouchableOpacity, {
							onPress: () => {
								// console.log('press delete icon')
								this.handleChange('');
							}
						},
						React.createElement(Icon, {
							source: require(`../../common/images/icons/times-circle.png`),
							size: 15,
							tintColor: variables.mtdGrayLighter
						})) : null));
		};
		this.state = {
			isEditing: false
		};
		this.delayIsEditing = this.delayTaskMemoize(3000);
	}

	componentWillUnmount() {
		this.delayIsEditing.cancel();
	}

	modProps(props) {
		const tmpProps = {
			...props
		};
		if (Platform.OS === 'web') {
			// web 平台不支持该属性
			delete tmpProps.textAlign;
		}
		delete tmpProps.style;
		delete tmpProps.inputStyle;
		return tmpProps;
	}

	render() {
		if (Platform.OS === 'ios') {
			return this.renderiOS();
		} else {
			return this.renderAndroidAndWeb();
		}
	}
}

Input.displayName = 'Input';
Input.defaultProps = {
	onChange: null,
	textAlign: 'left',
	placeholder: '请输入',
	placeholderTextColor: variables.mtdGrayLighter,
	autoFocus: false,
	autoCorrect: true,
	keyboardType: 'default',
	maxLength: null,
	editable: true,
	clearButtonMode: 'while-editing',
	value: ''
};
//# sourceMappingURL=index.js.map
