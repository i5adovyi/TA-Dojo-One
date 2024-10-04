let sum = (start, end) => {
    let total = 0;
    for (let i = start; i <= end; i++) {
      total += i;
    }
    console.log(total);
    return total;
    
  };
  
  sum(1, 100)