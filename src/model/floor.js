import { BoxGeometry, DoubleSide, Mesh, MeshBasicMaterial, RepeatWrapping, TextureLoader } from "three"

class Floor{
    constructor(options){
        this.options = Object.assign({
            x : 400,
            y : 5,
            z : 400,
            imgUrl : ''
        } ,options)

        this.mesh
        this.init()
    }

    init(){
        const texture = new TextureLoader().load(this.options.imgUrl)
        texture.wrapS = RepeatWrapping
        texture.wrapT = RepeatWrapping
        texture.repeat.set( 5, 5 );
        const geometry = new BoxGeometry(this.options.x ,this.options.y ,this.options.z)
        const material = new MeshBasicMaterial({map:texture, side: DoubleSide})
        this.mesh = new Mesh(geometry ,material)
    }
}

export default Floor