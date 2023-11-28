/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, BaseControl, ColorPalette } = wp.components;

const Inspector = ({ attributes, setAttributes }) => {
	const { textColor } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={__('Startup Blocks Settings', 'startup')}>
				<BaseControl label={__('Color', 'startup')} id="color">
					<ColorPalette
						colors={[
							{ name: 'red', color: '#f00' },
							{ name: 'white', color: '#fff' },
							{ name: 'blue', color: '#00f' },
						]}
						value={textColor}
						onChange={(v) => setAttributes({ textColor: v })}
					/>
				</BaseControl>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
