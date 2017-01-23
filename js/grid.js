// JavaScript Document


function Grid(rows, cols){

	this.rows= rows;
	this.cols= cols;
	this.celdas= [];

	// inicializar la cuadricula
	this.ini= function(){
		var i, j;
		var renglon;
		var contGrid= document.createElement('div');

		for(i=0; i<this.rows; i++){
			// ***** crear el div del renglón
			renglon= document.createElement('div');
			renglon.className= "mdl-grid nopadmarg";
			// *****
			this.celdas[i]= [];
			for(j=0; j<this.cols; j++){
				this.celdas[i][j]= new Celda(i, j, 'golGrid', false);
				this.celdas[i][j].crea();
				renglon.appendChild(this.celdas[i][j].DOMelem);
			}
			contGrid.appendChild(renglon);
		}
		var contenedor= document.getElementById('contenedor');
		if(contenedor.firstChild!==null) {
			contenedor.removeChild(contenedor.firstChild);
		}
		contenedor.appendChild(contGrid);

	};
	
	
	// llenar la cuadrícula con data
	this.populate= function(data){
		var idRen, idCol, i, j;
		var col;
		for(i=0; i<data.length; i++){
			idRen= data[i].getAttribute('id');
			col= data[i].getElementsByTagName("col");
			for(j=0; j<col.length; j++){
				idCol= col[j].getAttribute('id');
				if(col[j].getAttribute('stat')==1) grid.celdas[idRen][idCol].vive(); 	
			}
		}
	};
	
	
	// checar toda la cuadrícula y aplicar lógica
	this.check= function(){
		var i, j;
		var peso= 0;
		var vive= [], muere= []; 
		
		for(i=0; i<this.rows; i++){
			for(j=0; j<this.cols; j++){
				peso= this.calcPeso(i, j);
				if(this.celdas[i][j].estado){
					if(peso<2 || peso>3) {
						muere[muere.length]= this.celdas[i][j];
					}
				} else if(peso===3){
					vive[vive.length]= this.celdas[i][j];
				}
			}
		}
		vive.forEach(function (celda){ celda.vive(); } );
		muere.forEach(function (celda){ celda.muere(); } );
	};
	
	this.actualiza= function(){
		this.celdas.forEach( function(row){
			row.forEach( function(cell) {
				if(cell.estado) cell.vive();
				else cell.muere();
			});
		});
	};
	
	// leer la cuadrícula
	this.lee= function(){
		this.celdas.forEach( function(row){
			row.forEach( function(cell) {
				cell.lee();
			});
		});
	};
	
	this.calcPeso= function (ren, col){
		var peso= 0;
		var i, j;
		
		for(i=ren-1; i<=ren+1; i++){
			if(i<0 || i>=this.rows) continue;
			for(j=col-1; j<=col+1; j++){
				if((j<0 || j>=this.cols) || (i==ren && j==col)) continue;
				if(this.celdas[i][j].estado==true) peso++;
			}
		}
		return peso;
	}


}