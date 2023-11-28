/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
const { DropdownMenu, MenuGroup, MenuItem, ToolbarGroup } = wp.components;
import { Fragment, useEffect, useState } from '@wordpress/element';

// editor style
import './editor.scss';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import { softMinifyCssStrings } from '../../helper/softminify';

import {
	alignLeft,
	alignRight,
	alignCenter,
	blockTable as icon,
	tableColumnAfter,
	tableColumnBefore,
	tableColumnDelete,
	tableRowAfter,
	tableRowBefore,
	tableRowDelete,
	table,
} from '@wordpress/icons';

/**
 * Edit function
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		uniqueId,
		blockStyle,
		numRows,
		numColumns,
		tableTool
	} = attributes;

	const tableToolbars = [
		{
			icon: tableRowBefore,
			key: 'insertRowBefore',
			label: __('Insert Row Before', 'custom-domain'),
		},
		{
			icon: tableRowAfter,
			key: 'insertRowAfter',
			label: __('Insert Row After', 'custom-domain'),
		},
		{
			icon: tableRowDelete,
			key: 'deleteRow',
			label: __('Delete Row', 'custom-domain'),
		},
		{
			icon: tableColumnBefore,
			key: 'insertColumnBefore',
			label: __('Insert Column Before', 'custom-domain'),
		},
		{
			icon: tableColumnAfter,
			key: 'insertColumnAfter',
			label: __('Insert Column After', 'custom-domain'),
		},
		{
			icon: tableColumnDelete,
			key: 'deleteColumn',
			label: __('Delete Column', 'custom-domain'),
		},
	];

	const [isGenerateTable, setIsGenerateTable] = useState(false)

	// Unique ID
	useEffect(() => {
		if (!uniqueId) {
			setAttributes({
				uniqueId: 'startup-' + clientId.slice(0, 8),
			});
		}
	}, []);

	// Block Props
	const blockProps = useBlockProps({
		className: 'startup__table',
	});

	// Function to generate a basic editable table based on numRows and numColumns
	const generateTable = () => {
		const rows = [];
		for (let i = 0; i < numRows; i++) {
			const columns = [];
			for (let j = 0; j < numColumns; j++) {
				columns.push(
					<td key={`col-${j}`} contentEditable="true"></td>
				);
			}
			rows.push(<tr key={`row-${i}`}>{columns}</tr>);
		}
		return (
			<table>
				<tbody>{rows}</tbody>
			</table>
		);
	};

	const toggleGenerateTable = () => {
		setIsGenerateTable(!isGenerateTable);
	};

	const insertRowBefore = () => {
		const table = document.querySelector('table');
		if (table) {
			const newRow = document.createElement('tr');
			const currentRow = table.querySelector('tr:first-child');
			table.insertBefore(newRow, currentRow);
			const numColumns = table.querySelector('tr').childElementCount;
			for (let i = 0; i < numColumns; i++) {
				const newCell = document.createElement('td');
				newCell.contentEditable = 'true';
				newRow.appendChild(newCell);
			}
			setAttributes({
				numRows: numRows + 1,
			});
		}
	};

	const insertRowAfter = () => {
		const table = document.querySelector('table');
		if (table) {
			const numRows = table.querySelectorAll('tr').length;
			const newRow = document.createElement('tr');
			const currentRow = table.querySelector(`tr:nth-child(${numRows})`);
			if (currentRow) {
				table.insertBefore(newRow, currentRow.nextSibling);
				const numColumns = currentRow.childElementCount;
				for (let i = 0; i < numColumns; i++) {
					const newCell = document.createElement('td');
					newCell.contentEditable = 'true';
					newRow.appendChild(newCell);
				}
				setAttributes({
					numRows: numRows + 1,
				});
			}
		}
	};

	const deleteRow = () => {
		const table = document.querySelector('table');
		if (table) {
			const numRows = table.querySelectorAll('tr').length;
			if (numRows > 1) {
				table.deleteRow(numRows - 1);
				setAttributes({
					numRows: numRows - 1,
				});
			}
		}
	};

	const insertColumnBefore = () => {
		const table = document.querySelector('table');
		if (table) {
			const rows = table.querySelectorAll('tr');
			rows.forEach((row) => {
				const newCell = document.createElement('td');
				newCell.contentEditable = 'true';
				const currentCell = row.querySelector('td:first-child');
				row.insertBefore(newCell, currentCell);
			});
			setAttributes({
				numColumns: numColumns + 1,
			});
		}
	};

	const insertColumnAfter = () => {
		const table = document.querySelector('table');
		if (table) {
			const rows = table.querySelectorAll('tr');
			rows.forEach((row) => {
				const numCells = row.querySelectorAll('td').length;
				const newCell = document.createElement('td');
				newCell.contentEditable = 'true';
				const currentCell = row.querySelector(`td:nth-child(${numCells})`);
				row.insertBefore(newCell, currentCell.nextSibling);
			});
			setAttributes({
				numColumns: numColumns + 1,
			});
		}
	};

	const deleteColumn = () => {
		const table = document.querySelector('table');
		if (table) {
			const rows = table.querySelectorAll('tr');
			rows.forEach((row) => {
				const numCells = row.querySelectorAll('td').length;
				if (numCells > 1) {
					row.deleteCell(numCells - 1);
				}
			});
			setAttributes({
				numColumns: numColumns - 1,
			});
		}
	};

	const onChangeAction = (selectedAction) => {
		switch (selectedAction) {
			case 'insertRowBefore':
				insertRowBefore();
				break;
			case 'insertRowAfter':
				insertRowAfter();
				break;
			case 'deleteRow':
				deleteRow();
				break;
			case 'insertColumnBefore':
				insertColumnBefore();
				break;
			case 'insertColumnAfter':
				insertColumnAfter();
				break;
			case 'deleteColumn':
				deleteColumn();
				break;
			default:
				break;
		}
	}

	return (
		<Fragment>
			<style>{`${softMinifyCssStrings(blockStyle)}`}</style>
			<Inspector attributes={attributes} setAttributes={setAttributes} />
			<div {...blockProps}>
				{
					<BlockControls group="other">
						<ToolbarGroup>
							<DropdownMenu
								icon='editor-table'
								label={__('Edit Table', 'custom-domain')}
							>
							{({ onClose }) => (
								<MenuGroup>
									{tableToolbars.map((tableToolbar) => {
										return (
											<MenuItem
												onClick={() => {
													setAttributes({ tableTool: tableToolbar.key });
													onChangeAction(tableToolbar.key)
													onClose();
												}}
											>
												{tableToolbar.icon}
												<span style={{ marginLeft: '5px' }}>{tableToolbar.label}</span>
											</MenuItem>
										);
									})}
								</MenuGroup>
							)}
							</DropdownMenu>
						</ToolbarGroup>
					</BlockControls>
				}

				{!isGenerateTable && (
					<Fragment>
						<label>Number of Rows: </label>
						<input
							type="number"
							value={numRows}
							onChange={(e) =>
								setAttributes({
									numRows: parseInt(e.target.value) || 0,
								})
							}
						/>
						<label>Number of Columns: </label>
						<input
							type="number"
							value={numColumns}
							onChange={(e) =>
								setAttributes({
									numColumns: parseInt(e.target.value) || 0,
								})
							}
						/>
						<button className="components-button editor-post-publish-button editor-post-publish-button__button is-primary" onClick={toggleGenerateTable}>Generate Table</button>
					</Fragment>
				)}

				{isGenerateTable && numRows > 0 && numColumns > 0 && generateTable()}
			</div>
		</Fragment>
	);
}
