
global.startApp = function(container) {
  let count = 0;
  console.log("Here is the container:", container);
  let table = container.querySelector('tbody');
  let number_of_rows = table.querySelectorAll('tr').length;
  
  //creating 2-d matrix
  let matrix = (new Array(number_of_rows).fill(0)).map(x=>new Array(number_of_rows).fill(0));
  
  //inserting diamond to the matrix
  for (let i =0;i<number_of_rows;i++) {
    let p = Math.floor(Math.random()*8);
    let q = Math.floor(Math.random()*8);
    if (matrix[p][q] ===0) {
      matrix[p][q] = 'diamond';
    } else {
      i--;
    }

  }

  function win_result() {
    let score = matrix.reduce((p,c)=>p+c.reduce((x,y)=>x+ (y===0 ? 1 : 0),0),0);
    alert('You won with score ' + score);
  }

  //higher order function for tracking click event
  function Clicked(i,j) {
    return function (e) {
      let td = e.target;
      if(td.classList.contains("unknown"))
        td.classList.remove("unknown");
      if(matrix[i][j] === 'diamond') {
        td.classList.add('diamond');
        count++;
        if(count === 8) {
          console.log(matrix);
          setTimeout(win_result,500);
        }

      }
      matrix[i][j] = 'visited';
          }
  }
  Array.from(table.querySelectorAll('tr')).forEach((tr,i) => Array.from(tr.querySelectorAll('td')).forEach((td,j) => {
    td.addEventListener('click',Clicked(i,j))
  }))

};
