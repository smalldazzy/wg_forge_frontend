// this is an example of improting data from JSON
import orders from '../data/orders.json';
import users from '../data/users.json';
import companies from '../data/companies.json';

export default (function () {
    var table=document.createElement('table');
    var thead=document.createElement('thead');
    table.appendChild(thead);
    var head =['transaction_id','user_id','created_at','total','card_number','card_type','order_country','order_ip'];
    thead.innerHTML='<th style="cursor:pointer">Transaction ID</th><th style="cursor:pointer">User Info</th><th style="cursor:pointer">Order Date</th><th style="cursor:pointer">Order Amount</th><th>Card Number</th><th style="cursor:pointer">Card Type</th><th style="cursor:pointer">Location</th>';
    var tbody=document.createElement('tbody');
    table.appendChild(tbody);

    for (var i=0;i<orders.length;i++)
    {
      var newRow=tbody.insertRow(i);
      newRow.id=`order_${i+1}`;

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
        if (target.tagName == 'TH') {
          // Если TH -- сортируем
          console.log('poimal');
          console.log(target.cellIndex);
          sortGrid(target.cellIndex);
        }
        if (target.tagName == 'SPAN') {
          // Если TH -- сортируем
          console.log('spalili');
          console.log(target);
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
              // console.log(rowA.cells[colNum].firstChild.innerHTML.substr(4).trim());
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
