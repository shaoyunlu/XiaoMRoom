import { BoxGeometry, DoubleSide, Group, MathUtils, Mesh, MeshBasicMaterial, RepeatWrapping, TextureLoader, Vector3 } from "three"

class Cabinet{
    constructor(options){
        this.options = Object.assign({
            width : 0,
            height : 0,
            deep : 0,
            translateX : 0,
            translateY : 0,
            translateZ : 0,
            cabinetBg : '',
            cabinetFg : ''
        } ,options)

        this.group = new Group()
        this.group.name = "cabinet"
        this.group.__self = this

        this.mesh_front_group = new Group()

        // 门开关状态
        this.isOpen = false
        this.init()
    }

    init(){
        let width = this.options.width
        let height = this.options.height
        let deep = this.options.deep

        let sigle_mesh_deep = 1
        let left_height = height -4

        let mesh_up = this.__createMesh(width ,sigle_mesh_deep , deep ,0 ,height ,0)
        let mesh_down = this.__createMesh(width ,sigle_mesh_deep , deep ,0 ,5 ,0)
        let mesh_left = this.__createMesh(sigle_mesh_deep ,left_height ,deep ,-width/2 ,left_height/2 + 4.5)
        let mesh_right = this.__createMesh(sigle_mesh_deep ,left_height ,deep ,width/2 ,left_height/2 + 4.5)
        let mesh_back = this.__createMesh(width ,left_height ,sigle_mesh_deep ,0 ,left_height/2 + 4.5 ,-deep/2)
        let mesh_front = this.__createFgMesh(width ,left_height ,sigle_mesh_deep ,width/2 ,2)

        this.mesh_front_group.position.set(-width/2 ,height/2 ,deep/2)
        this.mesh_front_group.add(mesh_front)

        this.group.add(mesh_up)
        this.group.add(mesh_down)
        this.group.add(mesh_left)
        this.group.add(mesh_right)
        this.group.add(mesh_back)
        this.group.add(this.mesh_front_group)

        this.group.translateX(this.options.translateX)
    }

    __createMesh(x ,y ,z ,tx = 0 ,ty = 0 ,tz = 0){
        let texture = new TextureLoader().load(this.options.cabinetBg)
        let geometry = new BoxGeometry(x ,y ,z)
        let material = new MeshBasicMaterial({map:texture, side: DoubleSide})

        let mesh = new Mesh(geometry ,material)

        mesh.translateX(tx)
        mesh.translateY(ty)
        mesh.translateZ(tz)
                            
        return mesh
    }

    __createFgMesh(x ,y ,z ,tx = 0 ,ty = 0 ,tz = 0){
        let texture = new TextureLoader().load(this.options.cabinetFg)
        let geometry = new BoxGeometry(x ,y ,z)
        let material = new MeshBasicMaterial({map:texture, side: DoubleSide})

        let mesh = new Mesh(geometry ,material)

        mesh.translateX(tx)
        mesh.translateY(ty)
        mesh.translateZ(tz)
                            
        return mesh
    }

    handleClick(){
        var self = this
        this.isOpen = !this.isOpen

        setTimeout(function (){
            if (self.isOpen){
                self.mesh_front_group.rotateY(MathUtils.degToRad(-90))
            }else{
                self.mesh_front_group.rotateY(MathUtils.degToRad(90))
            }
        },500)

        
    }
}

export default Cabinet