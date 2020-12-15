function coords() {
    let prev = null
    let xCoord = 100
    let yCoord = 100
ctx.clearRect(-1000,-1000, 1000, 1500)
ctx.beginPath()
//ctx.setTransform(1, 0, 0, 1, 500, 500);
ctx.moveTo(100, 100)
vertices = []
    s.split('').forEach(dir => {
    //console.log('run', dir)
        if(dir == 'H') {
            xCoord += 1
           }
 if(dir == 'V') {
            xCoord -= 1
           }
 if(dir == 'N') {
            yCoord -= 1
           }
 if(dir == 'O') {
            //console.log('ITS O')
            yCoord += 1
           }
    console.log('lineTo', xCoord, yCoord)
    ctx.lineTo(xCoord, yCoord)
    vertices.push({x: xCoord, y: yCoord})
   // ctx.stroke()
    //sleep(250)
    }
)
ctx.stroke()
ctx.closePath()
    return [xCoord, yCoord]


}    