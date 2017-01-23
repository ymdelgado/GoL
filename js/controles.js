// JavaScript Document

function iniciar() {
	frec= document.getElementById('frecuencia').value;
    ejecuta= setInterval(check, frec);
	document.getElementById('detener').addEventListener('click', detener, false);
	document.getElementById('autom').disabled= true;
}

function detener(){ 
	document.getElementById('autom').disabled= false;
	clearInterval(ejecuta);
}

function clearIData(){
	detener();
	document.getElementById('patronTitle').innerHTML= "Ningún patrón seleccionado";
	rejilla.ini();
}

function check(){
	rejilla.lee();
	rejilla.check();
}

function getXML(xmlPath, tipo){
	var xmlHttp= new XMLHttpRequest();
	if(xmlHttp){
	xmlHttp.open("POST", xmlPath, true);
	xmlHttp.onreadystatechange= function(){
			if(xmlHttp.readyState===4 && xmlHttp.status===200){
				if(tipo) xmlRejilla(xmlHttp);
				else xmlSelData(xmlHttp);
			}
		};
		xmlHttp.send();
	}
}	
	
function xmlRejilla(xml) {
	var xmlDoc= xml.responseXML;
	var ren= xmlDoc.getElementsByTagName("ren");
	rejilla.ini();
	rejilla.populate(ren);
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

var ejecuta;
var rejilla= new Rejilla(36, 46);
getXML("data/selData.xml", 0);
