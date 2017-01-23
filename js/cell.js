// JavaScript Document

function Celda(ren, col, clase, estado){

  this.ren= ren;
  this.col= col;
  this.clase= clase;
  this.DOMelem= null;
  this.id= "gol_"+this.ren+"_"+this.col;
  this.estado= estado;
  
  this.crea= function(){
    this.DOMelem= document.createElement('div');
    if(this.DOMelem==null) return false;
    this.DOMelem.id= this.id; 
    this.DOMelem.className= clase;
    this.DOMelem.addEventListener('click', cambiaEstado, false);
    return true;
  }
  
  this.lee= function(){
    this.DOMelem= document.getElementById(this.id);
    if(this.DOMelem===null) return false;
    this.leeEstado();
    return true;
  }
  
  this.vive= function(){
    if (this.DOMelem.classList)
      this.DOMelem.classList.add("alive");
    this.clase= this.DOMelem.className;
    this.estado= true;
  }

  this.muere= function(){
    if(this.DOMelem.classList)
      this.DOMelem.classList.remove("alive")
    this.clase= this.DOMelem.className;
    this.estado= false;
  }

  this.leeEstado= function(){
    if (this.DOMelem.classList)
      this.estado= this.DOMelem.classList.contains("alive")
    else
      this.estado= !!this.DOMelem.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))
    this.clase= this.DOMelem.className;
  }

}


