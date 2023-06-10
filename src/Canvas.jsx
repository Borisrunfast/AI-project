import React, {useRef, useEffect} from 'react'



function Canvas() {
    const canvasRef = useRef(null)
    const mouse = []
    const stroke = []
    
    function renderFrame() {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 0.40
        canvas.height = window.innerHeight  * 0.40
        const ctx = canvas.getContext('2d')
        const canvasPosition = canvas.getBoundingClientRect()
        // Bacground black full width and height
        ctx.fillStyle = "#333"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        let isDrawing = false

        class pen {
            constructor() {
                
            }
            draw(x, y) {
                ctx.fillStyle = '#111111'
                ctx.lineWidth = 3
                ctx.beginPath()
                ctx.moveTo(mouse[0]?.x, mouse[0]?.y)

                for (let i = 0; i < mouse.length; i++) {
                    ctx.lineTo(mouse[i]?.x, mouse[i]?.y)
                }
                ctx.stroke()
            }

        }
        
        canvas.addEventListener('mousedown', () => {
            isDrawing = true
        })
        canvas.addEventListener('mouseup', () => {
            isDrawing = false
            stroke.push(new pen()) 
        })


        canvas.addEventListener('mousemove', (e) => {
            
            if (isDrawing && mouse[mouse.length - 1]?.x !== e.clientX - canvasPosition.left && mouse[mouse.length - 1]?.y !== e.clientY - canvasPosition.top) {
                mouse.push({x: e.clientX - canvasPosition.left, y: e.clientY - canvasPosition.top})
            }
            
        }) 
        
        

        for (let i = 0; i < stroke.length; i++) {
            stroke[i].draw(mouse[mouse.length - 1]?.x, mouse[mouse.length - 1]?.y)
        }
        
    }


    function tick() {
        if (!canvasRef.current) return
        renderFrame()
        requestAnimationFrame(tick)
      }
    
      useEffect(() => {
        requestAnimationFrame(tick)
      }, [])

    return (
        <canvas ref={canvasRef}/>
    )
}

export default Canvas