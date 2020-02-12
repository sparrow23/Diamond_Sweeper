
global.startApp = function(container) {
  let count = 0;
  let table = container.querySelector('tbody');
  let number_of_rows = table.querySelectorAll('tr').length;
  let lastvisited = null;

  //creating 2-d matrix with pre fill data
  let matrix = (new Array(number_of_rows).fill(0))
                .map( () =>
                    new Array(number_of_rows).fill(0)
                );

  // adding random diamonds
  for (let i =0;i<number_of_rows;i++){
    let p = Math.floor(Math.random()*8);
    let q = Math.floor(Math.random()*8);
    if (matrix[p][q] ===0) {
      matrix[p][q] = 'diamond';
    } else {
      i--;
    }
  }

  function win_result() {
    let score = matrix.reduce((p,c)=>p+c.reduce((x,y)=>x+ (y===0 ? 1 : 0),0),0)
    alert('You won with score ' + score);
  }


  //onclick function
  function Clicked(i,j) {
    return function (e) {
      e.stopPropagation();
      let td = e.target;
      if(td===lastvisited){
        return
      }
      if(lastvisited){
        lastvisited.classList.remove("arrow")
      }
       td.classList.remove("unknown")
       console.log(matrix[i][j], td)
      if(matrix[i][j] === 'diamond') {
        td.classList.add('diamond');
        count++;
        if(count === 8) {
         setTimeout(win_result,500);
        }
      } else if(matrix[i][j] === 0) {
        let near =nearest(i,j,matrix);
        if(near) {
         
          td.classList.add('arrow');
          let [l,m] = near;
          let angle = getAngle(i,j,l,m);
	  td.style.transform ="rotate("+angle+"deg)";
          lastvisited = td;
        }

      }
      matrix[i][j] = 'visited';
      }
  }
  
  // adding listner
  Array.from(table.querySelectorAll('tr'))
                      .forEach( (tr,i) =>
                            Array.from(tr.querySelectorAll('td > div'))
                                                  .forEach( (td,j) => {
                                                                  td.addEventListener('click',Clicked(i,j))
                                                                      }
                                                  )
                      )
};

function getAngle(i,j,l,m) {
  if(i==l) {
    if(j<m){
      return 0;
    }else if(j>m)  {
      return 180;
    }
    else {
      return null;
    }
  } else if(i<l){
    if(j<m){
      return 45;
    }else if(j>m)  {
      return 135;
    } else {
      return 90;
    }

  } else if(i>l) {
    if(j<m){
      return 315;
    }else if(j>m)  {
      return 225;
    } else {
      return 270;
    }

  }
}



//BFS logic for showing nearest dimond direction
function nearest(i,j,matrix)
  {
    let q = [];
    let explored = new Set();
    q.push([i,j]);
    explored.add(JSON.stringify([i,j]));
    // We'll continue till our queue gets empty
    while (q.length) {
      console.log(JSON.stringify(q));
      let [l,m] = q.shift();
      if (matrix[l][m] === 'diamond'){
        console.log(l,m);
        return [l,m]
      }
      //adding all sibling nodes
      push(q,l-1,m-1,explored);
      push(q,l-1,m,explored);
      push(q,l-1,m+1,explored);
      push(q,l,m-1,explored);
      push(q,l,m+1,explored);
      push(q,l+1,m-1,explored);
      push(q,l+1,m,explored);
      push(q,l+1,m+1,explored);
    }
    return  null;
  }
  //push function according to conditions
  function push(q,i,j,explored){
    if(!explored.has(JSON.stringify([i,j]))){
      if(i>=0 && i<8 && j>=0 && j<8) {
        explored.add(JSON.stringify([i,j]));
        q.push([i,j])
      }
    }
  }