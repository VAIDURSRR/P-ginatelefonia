(function(){
var K="cmm-cliente-v1",OWN="5512345678",CYC="5587654321";
var D={on:true,saldo:150,dv:false,dest:"",
hist:[{f:"09/11 10:42",t:"Mensaje",d:"A 55 0000 0000",c:-1.5},{f:"08/11 18:05",t:"Recarga",d:"Monto $100",c:100},{f:"07/11 12:30",t:"Desvío",d:"A 55 8765 4321",c:0}],
rec:[{n:"55 1111 2222",m:"Hola, ¿nos vemos hoy?",f:"09/11 10:42"},{n:"55 3333 4444",m:"Tu recarga fue exitosa",f:"08/11 18:05"},{n:"55 5555 6666",m:"Llámame cuando puedas",f:"05/11 09:10"}],
sent:[{n:"55 0000 0000",m:"Nos vemos a las 5",f:"09/11 10:42"}]};
function load(){try{var s=JSON.parse(localStorage.getItem(K));if(s)return s}catch(e){}return JSON.parse(JSON.stringify(D))}
var S=load();
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
function $(i){return document.getElementById(i)}
function money(n){return(n<0?"-":"")+"$"+Math.abs(n).toFixed(2)}
function p2(n){return("0"+n).slice(-2)}
function now(){var d=new Date();return p2(d.getDate())+"/"+p2(d.getMonth()+1)+" "+p2(d.getHours())+":"+p2(d.getMinutes())}
function digits(s){return String(s).replace(/\D/g,"")}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function msg(t,d,ok){var m=$("msg");if(!m)return;m.className="alert"+(ok?" okm":"");m.innerHTML="<b>"+t+":</b>"+d;m.hidden=false}
function clr(){var m=$("msg");if(m)m.hidden=true}
var KA="cmm-admin-v1";
var AD={users:[
{n:"Ana María López García",t:"55 1234 5678",b:"BBVA",e:true,s:150,m:42,g:63},
{n:"Carlos Ramírez Soto",t:"55 8765 4321",b:"Banorte",e:false,s:20,m:18,g:27},
{n:"Lucía Hernández Cruz",t:"55 4455 6677",b:"Santander",e:false,s:0,m:5,g:7.5},
{n:"Jorge Martínez Díaz",t:"55 2233 4455",b:"HSBC",e:true,s:80,m:61,g:91.5},
{n:"Sofía Torres Vega",t:"55 9988 7766",b:"BBVA",e:true,s:210,m:33,g:49.5},
{n:"Miguel Ángel Ruiz",t:"55 1122 3344",b:"Citibanamex",e:true,s:15,m:27,g:40.5},
{n:"Daniela Flores Pérez",t:"55 6677 8899",b:"Banorte",e:false,s:300,m:9,g:13.5}],
emps:[{n:"Valeria Campos",c:"valeria@central.mx",r:"Administrador"},{n:"Héctor Núñez",c:"hector@central.mx",r:"Operador"},{n:"Paola Mendoza",c:"paola@central.mx",r:"Soporte"}],
tar:{sem:{dia:1.5,noche:1},fin:{dia:2,noche:1.2}},
glob:[{f:"09/11 10:42",u:"55 1234 5678",t:"Mensaje",d:"A 55 0000 0000",c:-1.5},{f:"09/11 09:15",u:"55 2233 4455",t:"Mensaje",d:"A 55 1111 2222",c:-1.5},{f:"08/11 18:05",u:"55 1234 5678",t:"Recarga",d:"Monto $100",c:100},{f:"08/11 16:40",u:"55 9988 7766",t:"Recarga",d:"Monto $200",c:200},{f:"08/11 12:00",u:"Admin",t:"Tarifa",d:"Tarifa de fin de semana actualizada",c:0},{f:"07/11 12:30",u:"55 1234 5678",t:"Desvío",d:"A 55 8765 4321",c:0},{f:"07/11 09:02",u:"55 1122 3344",t:"Conexión",d:"Teléfono conectado",c:0},{f:"06/11 20:11",u:"Admin",t:"Empleado",d:"Alta: Paola Mendoza (Soporte)",c:0}]};
function loadA(){try{var s=JSON.parse(localStorage.getItem(KA));if(s&&s.users)return s}catch(e){}return JSON.parse(JSON.stringify(AD))}
var A=loadA();
function saveA(){try{localStorage.setItem(KA,JSON.stringify(A))}catch(e){}}
function glog(u,t,d,c){A.glob.unshift({f:now(),u:u,t:t,d:d,c:c});
 if(t==="Mensaje"||t==="Recarga"){var x=A.users.filter(function(q){return digits(q.t)===OWN})[0];if(x){x.s=S.saldo;if(t==="Mensaje"){x.m++;x.g+=-c}}}
 saveA()}
function rate(){var d=new Date(),w=d.getDay(),h=d.getHours();return A.tar[(w>=1&&w<=5)?"sem":"fin"][(h>=22||h<7)?"noche":"dia"]}

var pg=document.body.getAttribute("data-page");
if(pg==="inicio"){
 var draw=function(){$("estado").className="st "+(S.on?"on":"off");$("estado").textContent=S.on?"● Conectado":"○ Desconectado";$("saldo").textContent=money(S.saldo)};
 draw();
 $("bOn").onclick=function(){clr();if(S.on){msg("Teléfono ya encendido","Este teléfono ya está conectado.");return}S.on=true;save();draw();msg("Listo","Teléfono conectado.",1)};
 $("bOff").onclick=function(){clr();if(!S.on){msg("Teléfono ya apagado","Este teléfono ya está desconectado.");return}S.on=false;save();draw();msg("Listo","Teléfono desconectado.",1)};
}
if(pg==="enviar"){
 var cost=function(){var n=$("txt").value.length;return(Math.ceil(n/160)||1)*rate()};
 var upd=function(){$("costo").textContent=money(cost())+" · Saldo: "+money(S.saldo)};
 upd();$("txt").oninput=upd;
 $("btn").onclick=function(){clr();var d=$("dest").value.trim(),t=$("txt").value.trim();
  if(digits(d).length<10||!t){msg("Datos incompletos","Escribe un destinatario de 10 dígitos y un mensaje.");return}
  var c=cost();if(S.saldo<c){msg("Saldo insuficiente","No tienes saldo suficiente para enviar el mensaje.");return}
  S.saldo-=c;S.hist.unshift({f:now(),t:"Mensaje",d:"A "+d,c:-c});S.sent.unshift({n:d,m:t,f:now()});save();glog("55 1234 5678","Mensaje","A "+d,-c);
  $("dest").value="";$("txt").value="";upd();msg("Enviado","Mensaje enviado correctamente.",1)};
}
if(pg==="saldo"){
 var ds=function(){$("saldo").textContent=money(S.saldo)};ds();
 var chips=document.querySelectorAll("[data-m]");
 for(var i=0;i<chips.length;i++)chips[i].onclick=function(){$("monto").value=this.getAttribute("data-m")};
 $("btn").onclick=function(){clr();var m=parseFloat($("monto").value);
  if(!(m>0)){msg("Monto inválido","Escribe un monto mayor a cero.");return}
  S.saldo+=m;S.hist.unshift({f:now(),t:"Recarga",d:"Monto "+money(m),c:m});save();glog("55 1234 5678","Recarga","Monto "+money(m),m);ds();$("monto").value="";msg("Recarga exitosa","Se agregaron "+money(m)+" a tu saldo.",1)};
}
if(pg==="desvio"){
 $("dv").checked=S.dv;$("dest").value=S.dest;
 $("btn").onclick=function(){clr();var on=$("dv").checked,d=$("dest").value.trim();
  if(on){var n=digits(d);
   if(n.length<10){msg("Teléfono destino","Escribe un teléfono destino de 10 dígitos.");return}
   if(n===OWN){msg("Desvío a sí mismo","No puedes desviar un teléfono a su propio número.");return}
   if(n===CYC){msg("Desvío cíclico","El teléfono destino ya desvía hacia este número.");return}}
  S.dv=on;S.dest=on?d:"";S.hist.unshift({f:now(),t:"Desvío",d:on?"A "+d:"Desactivado",c:0});save();glog("55 1234 5678","Desvío",on?"A "+d:"Desactivado",0);
  msg("Guardado",on?"Desvío activado hacia "+esc(d)+".":"Desvío desactivado.",1)};
}
if(pg==="bandeja"){
 var show=function(k){var a=S[k],h="";
  for(var i=0;i<a.length;i++)h+="<tr><td>"+esc(a[i].n)+"</td><td>"+esc(a[i].m)+"</td><td>"+a[i].f+"</td></tr>";
  $("lista").innerHTML=h||'<tr><td colspan="3">Sin mensajes</td></tr>';
  $("tR").className=k==="rec"?"a":"";$("tE").className=k==="sent"?"a":""};
 $("tR").onclick=function(){show("rec")};$("tE").onclick=function(){show("sent")};show("rec");
}
if(pg==="historial"){
 var f="Todo";
 var rd=function(){var h="";for(var i=0;i<S.hist.length;i++){var x=S.hist[i];if(f!=="Todo"&&x.t!==f)continue;
  h+="<tr><td>"+x.f+"</td><td>"+x.t+"</td><td>"+esc(x.d)+"</td><td class='"+(x.c<0?"neg":x.c>0?"pos":"")+"'>"+(x.c>0?"+":"")+money(x.c)+"</td></tr>"}
  $("lista").innerHTML=h||'<tr><td colspan="4">Sin movimientos</td></tr>'};
 var ch=document.querySelectorAll("[data-f]");
 for(var j=0;j<ch.length;j++)ch[j].onclick=function(){f=this.getAttribute("data-f");for(var k=0;k<ch.length;k++)ch[k].className="";this.className="a";rd()};
 rd();
}

function chart(id,L,V,f,minw){var n=L.length,w=n<=8?800:Math.max(n*40,320),mx=Math.max.apply(null,V)||1,s='<svg viewBox="0 0 '+w+' 190" style="width:100%;min-width:'+(minw||w)+'px" role="img">';
 for(var i=0;i<n;i++){var bw=w/n,h=V[i]/mx*120,x=i*bw+bw*.15,y=145-h,cx=x+bw*.35;
  s+='<rect x="'+x+'" y="'+y+'" width="'+bw*.7+'" height="'+h+'" rx="4" fill="#2a57a6"/><text x="'+cx+'" y="'+(y-5)+'" font-size="11" text-anchor="middle" fill="#1a2a5c" font-weight="700">'+(f?f(V[i]):V[i])+'</text><text x="'+cx+'" y="165" font-size="11" text-anchor="middle" fill="#5a6a8c">'+L[i]+'</text>'}
 $(id).innerHTML=s+"</svg>"}
if(pg==="login"){$("btn").onclick=function(){clr();var u=$("usr").value.trim(),p=$("pw").value;
 if(!u||!p){msg("Datos incompletos","Escribe tu usuario y contraseña.");return}
 location.href=$("rol").value==="admin"?"ad-dashboard.html":"index.html"}}
if(pg==="adash"){var ms=0,con=0,ing=0;A.users.forEach(function(u){if(u.e)con++;ms+=u.m;ing+=u.g});
 $("k1").textContent=A.users.length;$("k2").textContent=con;$("k3").textContent=ms;$("k4").textContent=money(ing);
 var h="";A.glob.slice(0,5).forEach(function(x){h+="<tr><td>"+x.f+"</td><td>"+esc(x.u)+"</td><td>"+x.t+"</td><td>"+esc(x.d)+"</td></tr>"});$("lista").innerHTML=h;
 $("rt").textContent=money(rate())}
if(pg==="ausr"){var fe="t",q="";
 var rd=function(){var h="",n=0;A.users.forEach(function(u){if(fe==="c"&&!u.e)return;if(fe==="d"&&u.e)return;
  if(q&&(u.n+" "+u.t+" "+u.b).toLowerCase().indexOf(q)<0)return;n++;
  h+="<tr><td>"+esc(u.n)+"</td><td>"+esc(u.t)+"</td><td>"+esc(u.b)+'</td><td><span class="st '+(u.e?"on":"off")+'">'+(u.e?"● Conectado":"○ Desconectado")+"</span></td><td>"+money(u.s)+"</td><td>"+u.m+"</td><td>"+money(u.g)+"</td></tr>"});
  $("lista").innerHTML=h||'<tr><td colspan="7">Sin resultados</td></tr>';$("cnt").textContent=n+" de "+A.users.length+" usuarios"};
 $("q").oninput=function(){q=this.value.toLowerCase().trim();rd()};
 var ch=document.querySelectorAll("[data-e]");
 for(var i=0;i<ch.length;i++)ch[i].onclick=function(){fe=this.getAttribute("data-e");for(var k=0;k<ch.length;k++)ch[k].className="";this.className="a";rd()};
 rd()}
if(pg==="astat"){
 chart("c1",A.users.map(function(u){return"…"+digits(u.t).slice(-4)}),A.users.map(function(u){return u.m}));
 chart("c2",["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],[31,28,35,30,40,18,13]);
 var hl=[],hv=[1,0,0,0,0,1,3,6,10,12,14,13,11,12,13,14,15,14,15,14,11,8,5,3];for(var i=0;i<24;i++)hl.push(i);
 chart("c3",hl,hv,null,900)}
if(pg==="atar"){var T=A.tar;$("t1").value=T.sem.dia;$("t2").value=T.sem.noche;$("t3").value=T.fin.dia;$("t4").value=T.fin.noche;$("rt").textContent=money(rate());
 $("btn").onclick=function(){clr();var v=[1,2,3,4].map(function(i){return parseFloat($("t"+i).value)});
  if(v.some(function(x){return!(x>0)})){msg("Tarifa inválida","Todas las tarifas deben ser mayores a cero.");return}
  A.tar={sem:{dia:v[0],noche:v[1]},fin:{dia:v[2],noche:v[3]}};glog("Admin","Tarifa","Tarifas actualizadas",0);$("rt").textContent=money(rate());
  msg("Guardado","Las nuevas tarifas se aplican a los mensajes nuevos.",1)}}
if(pg==="aemp"){var R=["Administrador","Operador","Soporte"];
 var nadm=function(){return A.emps.filter(function(x){return x.r==="Administrador"}).length};
 var rd2=function(){var h="";A.emps.forEach(function(e,i){var o="";R.forEach(function(r){o+="<option"+(r===e.r?" selected":"")+">"+r+"</option>"});
  h+="<tr><td>"+esc(e.n)+"</td><td>"+esc(e.c)+'</td><td><select data-i="'+i+'">'+o+'</select></td><td><button class="btn r sb" data-d="'+i+'">Eliminar</button></td></tr>'});$("lista").innerHTML=h};
 $("lista").onchange=function(ev){var i=ev.target.getAttribute("data-i");if(i===null)return;clr();var e=A.emps[i],nr=ev.target.value;
  if(e.r==="Administrador"&&nr!=="Administrador"&&nadm()<2){msg("Rol no cambiado","Debe existir al menos un administrador.");ev.target.value=e.r;return}
  e.r=nr;glog("Admin","Empleado","Rol de "+e.n+": "+nr,0);msg("Guardado","Rol actualizado.",1)};
 $("lista").onclick=function(ev){var i=ev.target.getAttribute("data-d");if(i===null)return;clr();var e=A.emps[i];
  if(e.r==="Administrador"&&nadm()<2){msg("No se puede eliminar","Debe existir al menos un administrador.");return}
  A.emps.splice(i,1);glog("Admin","Empleado","Baja: "+e.n,0);rd2();msg("Eliminado",esc(e.n)+" ya no tiene acceso.",1)};
 $("add").onclick=function(){clr();var n=$("en").value.trim(),c=$("ec").value.trim();
  if(!n||c.indexOf("@")<1){msg("Datos incompletos","Escribe el nombre y un correo válido.");return}
  A.emps.push({n:n,c:c,r:$("er").value});glog("Admin","Empleado","Alta: "+n+" ("+$("er").value+")",0);$("en").value="";$("ec").value="";rd2();msg("Agregado","Empleado registrado.",1)};
 rd2()}
if(pg==="ahist"){var ft="Todo",q2="";
 var rd3=function(){var h="",n=0;A.glob.forEach(function(x){if(ft!=="Todo"&&x.t!==ft)return;
  if(q2&&(x.u+" "+x.d+" "+x.t).toLowerCase().indexOf(q2)<0)return;n++;
  h+="<tr><td>"+x.f+"</td><td>"+esc(x.u)+"</td><td>"+x.t+"</td><td>"+esc(x.d)+"</td><td class='"+(x.c<0?"neg":x.c>0?"pos":"")+"'>"+(x.c?(x.c>0?"+":"")+money(x.c):"—")+"</td></tr>"});
  $("lista").innerHTML=h||'<tr><td colspan="5">Sin movimientos</td></tr>';$("cnt").textContent=n+" eventos"};
 $("q").oninput=function(){q2=this.value.toLowerCase().trim();rd3()};
 var c2=document.querySelectorAll("[data-t]");
 for(var j=0;j<c2.length;j++)c2[j].onclick=function(){ft=this.getAttribute("data-t");for(var k=0;k<c2.length;k++)c2[k].className="";this.className="a";rd3()};
 rd3()}
if(pg==="anew"){$("btn").onclick=function(){clr();var g=function(i){return $(i).value.trim()},f=["nom","ape","dir","tel","ban","tar","mail"],i;
  for(i=0;i<f.length;i++)if(!g(f[i])){msg("Datos incompletos","Llena todos los campos para registrar al usuario.");return}
  var t=digits(g("tel"));if(t.length!==10){msg("Teléfono inválido","El número debe tener 10 dígitos.");return}
  if(A.users.some(function(u){return digits(u.t)===t})){msg("Teléfono repetido","Ese número ya está registrado.");return}
  if(g("mail").indexOf("@")<1){msg("Correo inválido","Escribe un correo electrónico válido.");return}
  var nm=g("nom")+" "+g("ape");A.users.push({n:nm,t:t.slice(0,2)+" "+t.slice(2,6)+" "+t.slice(6),b:g("ban"),e:false,s:0,m:0,g:0,mail:g("mail"),dir:g("dir"),tc:"•••• "+digits(g("tar")).slice(-4)});
  glog("Admin","Usuario","Alta: "+nm,0);for(i=0;i<f.length;i++)$(f[i]).value="";msg("Usuario registrado",esc(nm)+" fue agregado correctamente.",1)}}
})();
