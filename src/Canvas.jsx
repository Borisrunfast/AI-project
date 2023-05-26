import React, {useRef, useEffect} from 'react'

function Canvas() {
    const canvasRef = useRef(null)

    function renderFrame() {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 0.40
        canvas.height = window.innerHeight  * 0.40
        const ctx = canvas.getContext('2d')
        const canvasPosition = canvas.getBoundingClientRect()
        // Bacground black full width and height
        ctx.fillStyle = "#333"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)


        class pen {
            constructor(mouseX, mouseY) {
                this.mouse = []
                this.isDrawing = false
                
            }
            draw() {
                
            }

        }


        canvas.addEventListener('mousemove', (e) => {
            console.log({x: e.clientX, y: e.clientY})
            
        })
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