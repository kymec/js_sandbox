function main() {
    let data;
  
    return fetch(`https://api.exchangeratesapi.io/latest`)
      .then((resp) => {
          console.log(resp);
          return resp.json();
      })
      .then(result => data = result)
      .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
      .then(() => {
          //alert(`Yeah, ${JSON.stringify(data)}`);
      })
  }

async function amain() {
let data;

const resp = await fetch(`https://api.exchangeratesapi.io/latest`);
console.log(resp);
data = await resp.json();
await new Promise(resolve => setTimeout(resolve, 1000));
alert(`Yeah, ${JSON.stringify(data)}`);

}
amain()
    .then((value) => console.log(value));
  
  //main()
    //.then(() => console.log('done'))