// this is an example of improting data from JSON
import orders from '../data/orders.json';
import users from '../data/users.json';
import companies from '../data/companies.json';

export default (function () {
    var table=document.createElement('table');
    var thead=document.createElement('thead');
    table.appendChild(thead);
    var head =['transaction_id','user_id','created_at','total','card_number','card_type','order_country','order_ip'];
    thead.innerHTML='<tr><th>Search:</th><th><input onkeyup="" type="text" id="search"></th></tr>'+
    '<tr><th style="cursor:pointer">Transaction ID</th><th style="cursor:pointer">User Info</th><th style="cursor:pointer">Order Date</th><th style="cursor:pointer">Order Amount</th><th>Card Number</th><th style="cursor:pointer">Card Type</th><th style="cursor:pointer">Location</th></tr>';
    var tbody=document.createElement('tbody');
    table.appendChild(tbody);
    let count=0;
    for (var i=0;i<orders.length;i++)
    {
      var newRow=tbody.insertRow(i);
      newRow.id=`order_${i+1}`;
      count=i;
        for (var k=0;k<7;k++)
        {
          var td=document.createElement('td');
          switch(k){
            //case userdiv
            case 1:
              for (var n=0;n<users.length;n++){
                if (users[n].id==orders[i][head[k]]) {
                  if (users[n].gender=="Male") {
                    td.innerHTML=`<a href="#">Mr. ${users[n].first_name} ${users[n].last_name}</a>`;
                  } else if (users[n].gender=="Female") {
                    td.innerHTML=`<a href="#">Mrs. ${users[n].first_name} ${users[n].last_name}</a>`;
                  } else {td.innerHTML='something went wrong';}
                }
              }/*for_n otsuda*/
              td.className='user_data';
              var div=document.createElement('div');
              div.className='user-details';
              div.style.display='none';
              for (var m=0;m<4;m++){
                var p=document.createElement('p');
                switch (m) {
                  case 0:
                  for (var n=0;n<users.length;n++){
                    if (users[n].id==orders[i][head[k]]){
                      p.innerHTML=`Birthday ${convert_d(users[n].birthday)}`;
                    }
                  }
                    break;
                  case 1:
                  for (var n=0;n<users.length;n++){
                    if (users[n].id==orders[i][head[k]]){
                      p.innerHTML=`<img src="${users[n].avatar}" width="100px">`;
                    }
                  }
                    break;
                  case 2:
                    for (var n=0;n<users.length;n++){
                      if (users[n].id==orders[i][head[k]]){
                        for (var h=0;h<companies.length;h++){
                          if (users[n].company_id==companies[h].id){
                            p.innerHTML=`Company: <a href='${companies[h].url}' target='_blank'>${companies[h].title}</a>`;}
                        }
                      }
                    }
                    break;
                  case 3:
                  for (var n=0;n<users.length;n++){
                    if (users[n].id==orders[i][head[k]]){
                      for (var h=0;h<companies.length;h++){
                        if (users[n].company_id==companies[h].id){
                          p.innerHTML=`Industry: ${companies[h].industry}`;}
                      }
                    }
                  }
                    break;
                  default:

                }
                div.appendChild(p);/*for_n----->*/

              }
              td.appendChild(div);
              break;
            //case datetime
            case 2:
              td.innerHTML=convert(orders[i][head[k]]);
              break;
            //case total
            case 3:
              td.innerHTML=`$${orders[i][head[k]]}`;
              break;
            //case card_number
            case 4:
              td.innerHTML=`${orders[i][head[k]].substr(0,2)}xxxxxxxxxx${orders[i][head[k]].substr(-4)}`;
              break;
            //case Location
            case 6:
              td.innerHTML=`${orders[i][head[k]]} (${orders[i][head[k+1]]})`;
              break;
            default:
            td.innerHTML=orders[i][head[k]];
          }
          newRow.appendChild(td);

        //  col.innerHTML=orders[i].[k];

        }


    }



    function convert(timestamp){
      var a = new Date(timestamp * 1000);
      var year = a.getFullYear();
      var month = a.getMonth()+1;
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    }
    function convert_d(timestamp){
      var a = new Date(timestamp * 1000);
      var year = a.getFullYear();
      var month = a.getMonth()+1;
      var date = a.getDate();
      var time = date + '/' + month + '/' + year ;
      return time;
    }
    table.addEventListener('click', hide, false);
    function hide (event) {
      var target = event.target;
      // цикл двигается вверх от target к родителям до table
      while (target != table) {
        if (target.tagName == 'A') {
          //console.log(target.nextSibling);
          target.nextSibling.style.display=='none' ? target.nextSibling.style.display='block' : target.nextSibling.style.display='none';
          return;
        }
        if (target.tagName == 'TH'&& target.innerHTML!='Search:' && target.innerHTML!='<input onkeyup="" type="text" id="search">') {
          console.log(target.innerHTML);
          // Если TH -- сортируем
          console.log('poimal');
          console.log(target.cellIndex);
          sortGrid(target.cellIndex);
        }
        if (target.tagName == 'TH' && target.id=='search') {
          //console.log(target.nextSibling);
          myFunction();
          return;
        }
        target = target.parentNode;
      }
      //console.log('missclick');
    }

    function sortGrid(colNum) {
      // Составить массив из TR
      var rowsArray = [].slice.call(tbody.rows);
      // определить функцию сравнения, в зависимости от типа
      var compare;

      switch (colNum) {
        case 0:
          compare = function(rowA, rowB) {
            //console.log(rowA.cells[colNum].innerHTML);
            if (rowA.cells[colNum].innerHTML.toString() > rowB.cells[colNum].innerHTML.toString()) {
              return 1;
            } else return -1;
          };
          break;
          case 1:
            compare = function(rowA, rowB) {
              //console.log(rowA.cells[colNum].firstChild.innerHTML.substr(4).trim());
              // console.log(rowA.cells[colNum].firstChild.innerHTML.substr(4).trim() > rowB.cells[colNum].firstChild.innerHTML.substr(4).trim());
              if (rowA.cells[colNum].firstChild.innerHTML.substr(4).trim() > rowB.cells[colNum].firstChild.innerHTML.substr(4).trim()) {
                return 1;
              } else return -1;
            };
            break;
          case 3:
            compare = function(rowA, rowB) {
              // console.log(rowA.cells[colNum].innerHTML.substr(1));
              if (Number(rowA.cells[colNum].innerHTML.substr(1)) > Number(rowB.cells[colNum].innerHTML.substr(1))) {
                return 1;
              } else return -1;
            };
            break;
          case 6:
            compare = function(rowA, rowB) {
              // console.log(rowA.cells[colNum].innerHTML);
              if (rowA.cells[colNum].innerHTML.toString() > rowB.cells[colNum].innerHTML.toString()) {
                return 1;
              } else return -1;
            };
            break;
          case 5:
            compare = function(rowA, rowB) {
              // console.log(rowA.cells[colNum].innerHTML);
              if (rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML) {
                return 1;
              } else return -1;
            };
            break;
            case 2:
              compare = function(rowA, rowB) {
                //console.log(rowA.cells[colNum].innerHTML);
                //return new Date(rowA.date) - new Date(rowB.date);
                console.log(Date(rowA.cells[colNum].innerHTML.date) - Date(rowB.cells[colNum].innerHTML.date));

                // if (rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML) {
                //   return 1;
                // } else return -1;
              };
              break;
      }
        // сортировать
        rowsArray.sort(compare);
        //console.log(rowsArray);
        // Убрать tbody из большого DOM документа для лучшей производительности
        table.removeChild(tbody);
        // добавить результат в нужном порядке в TBODY
        // они автоматически будут убраны со старых мест и вставлены в правильном порядке
        for (var i = 0; i < rowsArray.length; i++) {
          // console.log(rowsArray[i]);
          tbody.appendChild(rowsArray[i]);
        }
        thead.getElementsByTagName('TH')[colNum].innerHTML+='<span>&#8595;</span>';
        table.appendChild(tbody);

      }
      function findMedian(data) {
        // extract the .values field and sort the resulting array
        var m = data.map(function(v) {
          return v.values;
        }).sort(function(a, b) {
          return a - b;
        });
        var middle = Math.floor((m.length - 1) / 2); // NB: operator precedence
        if (m.length % 2) {
          return m[middle];
        } else {
          return (m[middle] + m[middle + 1]) / 2.0;
        }
      }
      function stat() {
        let tfoot=document.createElement('tfoot');
        for (let i=0;i<5;i++){
          switch (i){
            case 0:{
              let rowStats=tfoot.insertRow(0);//count+1
              let td=document.createElement('td');
              td.innerHTML='Orders Count';
              rowStats.appendChild(td);
              let td1=document.createElement('td');
              td1.innerHTML=count+1;
              rowStats.appendChild(td1);
              }
              break;
            case 1:{
              let rowStats=tfoot.insertRow(1);//count+2
              let td=document.createElement('td');
              td.innerHTML='Orders Total';
              rowStats.appendChild(td);
              //td.innerHTML=count+2;
              let td1=document.createElement('td');
              let total=0;
              for (let i=0;i<orders.length;i++){
                total+=Number(orders[i]['total']);
              }
              td1.innerHTML='$ '+total.toFixed(2);
              rowStats.appendChild(td1);
              }
              break;
            case 2:{
              let rowStats=tfoot.insertRow(2);//count+3
              let td=document.createElement('td');
              td.innerHTML='Median Value';
              rowStats.appendChild(td);
              //td.innerHTML=count+2;
              let td1=document.createElement('td');
              let total=[];
              for (let i=0;i<orders.length;i++){
                total[i]=Number(orders[i]['total']).toFixed(2);
              }
              total.sort(function(a, b) { return a - b;});
              // console.log(total[Math.floor((total.length - 1) / 2)]);
              // console.log(total);
              td1.innerHTML='$ '+total[Math.floor((total.length - 1) / 2)];
              rowStats.appendChild(td1);
              break;
            }
            case 3:{
              let rowStats=tfoot.insertRow(3);//count+4
              let td=document.createElement('td');
              td.innerHTML='Average Check';
              rowStats.appendChild(td);
              //td.innerHTML=count+2;
              let td1=document.createElement('td');
              let total=0;
              for (let i=0;i<orders.length;i++){
                total+=Number(orders[i]['total']);
              }
              td1.innerHTML='$ '+(total.toFixed(2)/(count+1)).toFixed(2);
              rowStats.appendChild(td1);
              }
              break;
            case 4:{
              let rowStats1=tfoot.insertRow(4);//count+5
              let rowStats2=tfoot.insertRow(5);//count+6
              let td1=document.createElement('td');
              td1.innerHTML='Average Check (Female)';
              rowStats1.appendChild(td1);
              //td.innerHTML=count+2;
              let td2=document.createElement('td');
              let total_fem=0, total_m=0,count_fem=0,count_m=0;
              for (let i=0;i<orders.length;i++){
                for(let n=0;n<users.length;n++){
                  if (orders[i]['user_id']==users[n].id){
                    if (users[n].gender=='Male') {
                      count_m++;
                      total_m+=Number(orders[i]['total']);
                    }
                    if (users[n].gender=='Female') {
                      count_fem++;
                      total_fem+=Number(orders[i]['total']);
                    }
                  }
                }
              }
              console.log(total_fem, count_fem);
              console.log(total_m, count_m);
              let td3=document.createElement('td');
              td3.innerHTML='Average Check (Male)';
              rowStats2.appendChild(td3);
              td2.innerHTML='$ '+(total_fem/count_fem).toFixed(2);
              let td4=document.createElement('td');
              td4.innerHTML='$ '+(total_m/count_m).toFixed(2);
              rowStats1.appendChild(td2);
              rowStats2.appendChild(td4);
              }
              break;
          }
        }
        table.appendChild(tfoot);
      }
      function myFunction() {
        // Declare variables
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      }
      stat();
    // table.onclick = function(event) {
    // if (!event.target.tagName('a')) return;
    // console.log('jopa');
    // event.target.nextSibling.hidden = !event.target.nextSibling.hidden;
    // }
    document.getElementById('app').appendChild(table);
    // YOUR CODE GOES HERE
    // next line is for example only
    //document.getElementById("app").innerHTML += "<h1>Hello WG Forge</h1>";
}());
