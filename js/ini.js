// JavaScript Document
function cambiaEstado(){
	if (this.classList && this.classList.contains("alive"))
		this.classList.remove("alive");
	else this.classList.add("alive"); 
}

function check(){
	grid.lee();
	grid.check();
}


function getXML(xmlPath, tipo){
	var xmlHttp= new XMLHttpRequest();
	if(xmlHttp){
	xmlHttp.open("POST", xmlPath, true);
	xmlHttp.onreadystatechange= function(){
			if(xmlHttp.readyState===4 && xmlHttp.status===200){
				if(tipo) xmlGrid(xmlHttp);
				else xmlSelData(xmlHttp);
			}
		};
		xmlHttp.send();
	}
}	
	
function xmlGrid(xml) {
	var xmlDoc= xml.responseXML;
	var ren= xmlDoc.getElementsByTagName("ren");
	grid.ini();
	grid.populate(ren);
}


function selOption(){
	document.getElementById("patronTitle").innerHTML= '<i class="material-icons">select_all</i>'+this.innerHTML;
	getXML(this.path, 1);
}


function xmlSelData(xml) {
	var xmlDoc= xml.responseXML;
	var opt= xmlDoc.getElementsByTagName("opt");
	var selElement= document.getElementById('selector');
	for(var i=0; i<opt.length; i++){
		var liOption= document.createElement('li');
		var id= "sel_"+opt[i].getAttribute('id');
		liOption.id= id;
		liOption.className= "mdl-menu__item";
		liOption.innerHTML= opt[i].getAttribute('tag');
		liOption.path= opt[i].getAttribute('path');
		selElement.appendChild(liOption);
		document.getElementById(id).addEventListener('click',selOption,false);
	}
	return true;
}



$(document).ready(function(){
	
	"use strict";

	$("#pasopaso").click(check);

	$("#autom").click( function(){
	    ejecuta= setInterval(check, $("#frecuencia").val());
	    $("#autom").prop("disabled", true);
	});

    $("#detener").click( function(){
		$("#autom").prop("disabled", false);
		clearInterval(ejecuta);
	});

    $("#borrar").click( function(){
		$("#autom").prop("disabled", false);
		clearInterval(ejecuta);
		$("#patronTitle").html("Ningún patrón seleccionado");
		grid.ini();
    });

	grid.ini();

});

	rows= 36;
	cols= 46;

var ejecuta;
var grid= new Grid(rows, cols);
getXML("data/selData.xml", 0);

