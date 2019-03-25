
var mostrar = document.getElementById("resultados");
var root = document.getElementById("totalraiz");

//ESCRIBIR POR MEDIO DE LOS BOTONES

document.getElementById("coseno").addEventListener('click', function () {
var text = document.getElementById('funcion');
//text.value += 'Math.cos(x)';
insertAtCursor(text, 'Math.cos(x)')
});
document.getElementById("seno").addEventListener('click', function () {
var text = document.getElementById('funcion');
//text.value += 'Math.sin(x)';
insertAtCursor(text, 'Math.sin(x)')
});
document.getElementById("tangente").addEventListener('click', function () {
var text = document.getElementById('funcion');
//text.value += 'Math.tan(x)';
insertAtCursor(text, 'Math.tan(x)')
});
document.getElementById("potencia").addEventListener('click', function () {
var text = document.getElementById('funcion');
//text.value += 'Math.pow(x,1)';
insertAtCursor(text, 'Math.pow(x,1)')
});
document.getElementById("euler").addEventListener('click', function () {
var text = document.getElementById('funcion');
//text.value += 'Math.E';
insertAtCursor(text, 'Math.E')
});
document.getElementById("logaritmo").addEventListener('click', function () {
var text = document.getElementById('funcion');
//text.value += 'Math.log(x)';
insertAtCursor(text, 'Math.log(x)')
});

//FUNCION PARA INSERTAR TEXTO EN POSICICION DE CURSOR
function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
    }
}

//FUNCION PARA VALIDAR CAMPO VACIOS
function validar(){
	var funcion=document.getElementById('funcion').value;
	var a=document.getElementById('aa').value;
	var b=document.getElementById('bb').value;
	var tolerancia=document.getElementById('tolerancia').value;
	var enlace=document.getElementById('enlace');

	if(funcion==''){alert('Ingrese una funcion');}
	if(a==''){alert('Ingrese el valor de "A');}
	if(b==''){alert('Ingrese el valor de "B');}
	if(tolerancia==''){alert('Ingrese la tolerancia');}

	if(funcion!='' && a!='' && b!='' && tolerancia!=''){
		if(F(a)*F(b)>0){
			alert('No existe raiz en el intervalo ingresado');
		}else{
			enlace.href="#tabla"
			mostrarTabla();
		}
	}

}

//FUNCION DEL ALGORITOMO E IMPRIMIR EN PANTALLA
function mostrarTabla(){

	var a=document.getElementById('aa').value;
	var b=document.getElementById('bb').value;
	var tolerancia = document.getElementById('tolerancia').value;
	var aa=parseFloat(a);
	var bb=parseFloat(b);
	var t=parseFloat(tolerancia);
	t=Math.abs(t);
	var cont=1;
	var pnanterior=0;
	var pn;
	var fpn;
	var er;  
	var filaDocumento = "";
	var raizzz = "";

    do{

    	pn=(aa+bb)/2;
    	fpn=F(pn);
    	
    	
    		er=(pn-pnanterior)/pn;
    		er=Math.abs(er);
    	
    	pnanterior=pn;

      filaDocumento += "<tr>" +

                          "<td >"+ cont +"</td>"+

                          "<td>"+ aa +"</td>"+

                          "<td>"+ bb +"</td>"+

                          "<td>"+ pn +"</td>"+

                          "<td>"+ fpn +"</td>"+

                          "<td>"+ er +"</td>"+

                       "</tr>";
		
		if(fpn<0){
    		aa=pn;
    	}
    	if(fpn>0){
    		bb=pn;
    	}
		cont=cont+1;

		raizzz="LA RAÍZ ES: "+pn;

		

  }while(t<er && cont<=100);
	mostrar.innerHTML = filaDocumento;
	root.innerHTML = raizzz;
  

}

//FUNCOIN PARA EVALUAR LA FUNCION DEL ALGORITMO
function F(x){
	var funcion=document.getElementById('funcion').value;

	//REEMPLAZAR EQUIS
	var equis = [];
	for(var i = 0; i < funcion.length; i++) {
		if (funcion[i].toLowerCase() === "x") equis.push(i);
	}

	var totalX = equis.length;

	for(var i=0; i<totalX; i++){
		funcion = funcion.replace('x', x)
	}
	
	try {
	    eval(funcion); 
	} catch (e) {
	    if (e instanceof SyntaxError) {
	        alert(e.message);
	    }
	}

    return eval(funcion);
	//return 6*Math.pow(x,3)-2*Math.pow(x,2)-x-1;
	//return Math.pow(x,2)-Math.cos(x)-1;
	//eval(funcion) ;


}