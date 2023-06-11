import React, {useRef, useEffect, useState} from 'react'

function Canvas() {
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 0.40
        canvas.height = window.innerHeight  * 0.40
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#333'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#222'
        ctx.lineWidth = 5
        ctxRef.current = ctx
    }, [])
    

    function startDraw({nativeEvent}) {
        
        const {offsetX, offsetY} = nativeEvent
        ctxRef.current.beginPath()
        ctxRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
        console.log(isDrawing)
    }

    function endDraw() {
        ctxRef.current.closePath()
        setIsDrawing(false)
        console.log(isDrawing)
    }

    function draw({nativeEvent}) {
        if (!isDrawing) {
            return
        }
        const {offsetX, offsetY} = nativeEvent
        ctxRef.current.lineTo(offsetX, offsetY)
        ctxRef.current.stroke()
        console.log(isDrawing)
    }


    return (
        <canvas 
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            ref={canvasRef}
        />
    )
}


export default Canvas