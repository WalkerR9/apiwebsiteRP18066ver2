
/*JS Walter Alcides Romero Portillo */

var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td></tr>";
	 var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	    case "joyeria":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarProductos(productos) {
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");   
	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
		}
	}

function obtenerProductos() {
	  fetch('https://retoolapi.dev/2t0Vly/productos')
            .then(res=>res.json())
            .then(data=>{
				productos=data;
				productos.forEach(function (producto) {
					producto.price = parseFloat(producto.price)
				});
				
				listarProductos(data)})
}

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}

function agregarProducto() {
	
	var idp = document.getElementById('idProd');
	var desc = document.getElementById('iddescripcion');
	var prec = document.getElementById('idprecio');
	var tit = document.getElementById('idtitulo');
	var img = document.getElementById('idimagen');
	var cat = document.getElementById('idcat');

	var newProd = {
		id: idp.value,
		description: desc.value,
		price: prec.value,
		title: tit.value,
		image: img.value,
		category: cat.value
	}

	if(idp.value !== "" && desc.value !== "" && prec.value > 0 && tit.value !== "" && img.value !== "", cat.value !== ""){
			
	var addProd
    fetch("https://retoolapi.dev/2t0Vly/productos/",
    {method:"POST",
        body: JSON.stringify(newProd),
        headers : {
            'Accept' : 'application/json',
            'Content-type' : 'application/json; charset = UTF-8'
        }
    })
    .then(response => response.json())
    .then(data=> addProd=data);
	}
	else {
		window.alert("Verifique los datos ingresados")
	}
}

function eliminarProd(){
	var delresult;
	var id = document.getElementById('idProd');
	fetch("https://retoolapi.dev/2t0Vly/productos/"+id.value,
	{ method:"DELETE"})
	.then(response=>response.json())
	.then(data=>delresult=data);
}

function buscarProd () {
	var id = document.getElementById('idProd');
	var desc = document.getElementById('iddescripcion');
	var prec = document.getElementById('idprecio');
	var tit = document.getElementById('idtitulo');
	var img = document.getElementById('idimagen');
	var cat = document.getElementById('idcat');

	for(var i=0; i<productos.length;i++)
	if ( id.value == productos[i].id){
		desc.value = productos[i].description;
		prec.value = productos[i].price;
		tit.value = productos[i].title;
		img.value = productos[i].image;
		cat.value = productos[i].category;
	}
}

function ordenarID () {

}