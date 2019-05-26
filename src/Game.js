const DEFAULT_START_VALUES = [1,2,3,4,5,6,7,8,9,1,1,1,2,1,3,1,4,1,5,1,6,1,7,1,8,1,9];
const DEFAULT_WIDTH = 9;

export default class Game {

	constructor( startValues = DEFAULT_START_VALUES, width = DEFAULT_WIDTH ) {
		console.assert( Array.isArray( startValues ) );
		console.assert( Number.isInteger( width ) );

		this.field = startValues;
		this.width = width;
	}

	map( callback ) {
		return this.field.map( callback )
	}

	canCellsBeCrossedOut( index1, index2 ) {
		console.assert( typeof this.field[index1] !== 'undefined', "Invalid first index supplied!")
		console.assert( typeof this.field[index2] !== 'undefined', "Invalid second index supplied!" )
		console.assert( index1 !== index2, "A field cannot be crossed out with itself!" )

		return !this.isCrossedOut( index1 ) &&
			!this.isCrossedOut( index2 ) &&
			this.isNeighbourOf( index1, index2 ) &&
			this.canValuesBeCrossedOut( this.field[index1], this.field[index2] );
	}

	crossOut( index1, index2 ) {
		console.assert( typeof this.field[index1] !== 'undefined' )
		console.assert( typeof this.field[index2] !== 'undefined' )
		console.assert( this.canCellsBeCrossedOut( index1, index2 ) )

		// cross out cells
		this.field[index1] *= -1;
		this.field[index2] *= -1;

		// remove crossed out rows
		let row1 = this.getRowByCellIndex( index1 );
		let row2 = this.getRowByCellIndex( index2 );

		if( this.isRowCrossedOut( row1 ) ) {
			this.removeRow( row1 )
		}

		if( this.isRowCrossedOut( row2 ) ) {
			this.removeRow( row2 )
		}
	}

	isCrossedOut( index ) {
		console.assert( typeof this.field[index] !== 'undefined' )

		return this.field[index] < 0
	}

	isNotCrossedOut( index ) {
		return !this.isCrossedOut( index );
	}

	isRowCrossedOut( row ) {
		for( let i = row * this.width; i < ( row + 1 ) * this.width; i++ ) {
			if( this.isNotCrossedOut( i ) ) {
				return false;
			}
		}
		return true;
	}

	isNeighbourOf( index1, index2 ) {
		console.assert( index1 !== index2 )
		console.assert( !this.isCrossedOut( index1 ) );
		console.assert( !this.isCrossedOut( index2 ) );

		// Make sure index1 is smaller than index2
		if( index1 > index2 ) {
			let tmp = index1;
			index1 = index2;
			index2 = tmp;
		}

		let delta = index2 - index1;
		let remainder = delta % this.width;

		if( remainder === 0 ) {
			// Cells are in the same column; check all cells that are vertically in between
			for( let i = index1 + this.width; i < index2; i += this.width ) {
				if( !this.isCrossedOut( i ) ) {
					return false;
				}
			}
		} else {
			// Cells might be direct neighbours or horizontally adjacent with crossed out cells in between
			for( let i = index1 + 1; i < index2; i++ ) {
				if( !this.isCrossedOut( i ) ) {
					return false;
				}
			}
		}

		return true;
	}

	canValuesBeCrossedOut( val1, val2 ) {
		return val1 === val2 || val1 + val2 === 10;
	}

	getRowByCellIndex( index ) {
		console.assert( typeof this.field[index] !== 'undefined' )

		return Math.floor( index / this.width );
	}

	removeRow( row ) {
		console.assert( this.isRowCrossedOut( row ) );

		this.field.splice( row * this.width, this.width );
	}

	extendField() {
		this.field = this.field.concat( this.field.filter( ( val, index ) => this.isNotCrossedOut( index ) ) );
	}

	isFinished() {
		return this.field.every( (val, index) => this.isCrossedOut( index ) );
	}
}

