import { AxesHelper, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import {getScreenInfo} from '../util/util'

class Room{
    constructor(options){
        this.options = Object.assign({

        },options)
        this.scene = new Scene()
        this.camera = this.__createCamera()
        this.renderer = new WebGLRenderer({antialias : true})
        this.controls
        this.init()
        this.eventInit()
    }

    init(){
        // 辅助坐标系
        this.scene.add(new AxesHelper(250))

        // 相机的初始位置
        this.camera.position.set(0, 200, 500)
        this.camera.lookAt(this.scene.position)

        // 设置renderer
        let {width ,height} = getScreenInfo()
        this.renderer.setSize(width ,height)
        this.renderer.setClearColor(0xb9d3ff ,1)
        document.body.appendChild(this.renderer.domElement)

        // 设置鼠标支持旋转缩放
        this.controls = new OrbitControls(this.camera ,this.renderer.domElement)

        this.render()
    }

    eventInit(){
        const raycaster = new Raycaster()
        const pointer = new Vector2()

        const handleClick = (event)=>{
            var self = this
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1
            pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

            raycaster.setFromCamera(pointer ,this.camera)

            let intersects = raycaster.intersectObjects(this.scene.children)

            if (intersects.length > 0){
                let classObj = self.findObj(intersects[0].object)
                if (!classObj)
                    return false
                // 摄像机给近距离特写
                let __position = classObj.position

                this.camera.position.set(__position.x,__position.y + 200 ,__position.z + 200)
                this.camera.lookAt(__position)

                this.controls.target.set(__position.x,__position.y ,__position.z)
                this.controls.update()

                classObj.__self.handleClick()
            }
        }

        window.addEventListener('click' ,handleClick)
    }

    findObj(object){
        while(object && object.name != "cabinet"){
            object = object.parent
        }
        return object
    }

    render(){
        this.renderer.render(this.scene ,this.camera)
        var __render = this.render.bind(this)
        requestAnimationFrame(__render)
    }

    __createCamera(){
        let {width ,height} = getScreenInfo()
        let k = width / height
        //三维场景显示范围控制系数，系数越大，显示的范围越大
        let s = 200
        return new PerspectiveCamera( 45, width / height, 1, 1000 )
    }
}

export default Room