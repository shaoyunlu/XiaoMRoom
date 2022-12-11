import Cabinet from "./model/cabinet";
import Floor from "./model/floor";
import Wall from "./model/wall";
import Room from "./room/room";
import { MODE_TYPE_FLOOR} from './util/dict'

class XiaoMRoom{
    constructor(){
        this.room = new Room()
    }

    init(){

    }

    load(json){
        if (typeof json === 'string'){
            json = JSON.parse(json)
        }

        // 创建地板
        this.addFloor(json.floor)

        // 创建墙体
        let wallList = json.wall
        wallList.forEach(wall =>{
            this.addWall(wall)
        })

        // 创建机柜
        let cabinetList = json.cabinet
        cabinetList.forEach(cabinet => {
            this.addCabinet(cabinet)
        })
    }

    save(){

    }

    addFloor(opt){
        let floor = new Floor(opt)
        this.room.scene.add(floor.mesh)
    }

    addWall(opt){
        let wall = new Wall(opt)
        this.room.scene.add(wall.mesh)
    }

    addCabinet(opt){
        let cabinet = new Cabinet(opt)
        this.room.scene.add(cabinet.group)
    }
}

export default XiaoMRoom