import { BoxGeometry, DoubleSide, Mesh, MeshBasicMaterial, RepeatWrapping, TextureLoader, Vector3 } from "three"

class Wall{
    constructor(options){
        this.options = Object.assign({
            x : 400,
            y : 5,
            z : 400,
            translateX : 0,
            translateY : 0,
            translateZ : 0,
            imgUrl : ''
        } ,options)

        this.mesh
        this.init()
    }

    init(){
        const texture = new TextureLoader().load(this.options.imgUrl)
        texture.wrapS = RepeatWrapping
        texture.wrapT = RepeatWrapping
        //texture.repeat.set( 5, 5 );
        const geometry = new BoxGeometry(this.options.x ,this.options.y ,this.options.z)
        const material = new MeshBasicMaterial({map:texture, side: DoubleSide})
        this.mesh = new Mesh(geometry ,material)

        this.mesh.translateX(this.options.translateX)
        this.mesh.translateY(this.options.translateY)
        this.mesh.translateZ(this.options.translateZ)
    }
}

export default Wall