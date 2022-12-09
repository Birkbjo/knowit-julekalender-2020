const fs=require('fs')

const wordlist=fs.readFileSync('luke15ordbok.txt','utf-8').split('\n').filter(l=>l.length>0)
const ws=new Set()
wordlist.forEach(word=>ws.add(word))

const pairs=fs.readFileSync('luke15ordpar.txt','utf-8').split('\n').filter(l=>l.length>0).map(l=>l.split(', '))

const glues=pairs.map(pair=>{
  const prefix=pair[0]
  const suffix=pair[1]
  const glues=wordlist.filter(word=>word.startsWith(prefix))
    .filter(word=>word!==prefix)
    .map(first=>first.substring(prefix.length))
    .filter(glue=>ws.has(glue+suffix))
  return glues
})
.reduce((a,b)=>[...a,...b])

const result=Object.values(glues.filter(glue=>ws.has(glue)).reduce((a,b)=>{return {...a,[b]:b.length}},{}))
  .reduce((a,b)=>a+b)

console.log(result)