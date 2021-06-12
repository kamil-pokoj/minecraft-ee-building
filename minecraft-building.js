//Materials
let stone = blocks.block(Block.Stone)
let brick = blocks.block(Block.Bricks)

player.onChatCommand("build",  [], ({  }) => {
    builder.teleportTo(player.position())
    builder.move(SixDirection.Forward, 10)
    buildBuilding(stone, 3, 5, 2, 3)
})

//Build block of flats with chosen height, width, windows height and roofType
//Roof types:
//0-flat roof, 1-flat with balcony, 2-"pyramid" roof
function buildBuilding(blocktype: number, height: number, width: number, windowsHeight: number, roofType: number){
    for (let index = 0; index <= height; index++) {
        buildfloor(blocktype, width)
        buildWindows(windowsHeight, width)
    }
    buildRoof(blocktype, width, roofType)
}

function buildfloor(blocktype: number, floorWidth: number) {
    builder.setOrigin()
    builder.mark()
    builder.shift(floorWidth, 0, floorWidth)
    builder.fill(blocktype)
    builder.teleportToOrigin()
    builder.move(SixDirection.Up, 1)
}

function buildWindows(winHeigt: number, winWidth: number) {
    for (let i = 0; i < winHeigt; i++) {
        for (let j = 0; j < winWidth; j++) {
            builder.mark()
            builder.move(SixDirection.Forward, winWidth)
            builder.line(blocks.block(Block.Glass))
            builder.turn(TurnDirection.Left)
        }
        builder.move(SixDirection.Up, 1)
    }
}

function buildRoof(blocktype: number, roofWidth: number, roofType: number){
    if((roofType == 0) || (roofType == 1) ){
        builder.setOrigin()
        builder.mark()
        builder.shift(roofWidth, 0, roofWidth)
        builder.fill(blocktype)
        builder.teleportToOrigin()
        if(roofType == 1){
            builder.move(SixDirection.Up, 1)
            for (let i = 1; i < roofWidth; i++) {
            builder.mark()
            builder.move(SixDirection.Forward, roofWidth)
            builder.line(blocks.block(Block.OakFence))
            builder.turn(TurnDirection.Left)
            }
        }
    }

    if(roofType ==2 ){
        let newWidth = roofWidth
        for (let i = 0; i < roofWidth - 1; i++) {
            for (let j = 0; j < roofWidth; j++) {
                builder.mark()
                builder.move(SixDirection.Forward, newWidth)
                builder.line(blocks.block(Block.IronBlock))
                builder.turn(TurnDirection.Left)
            }
            builder.shift(1, 1, 1)
            newWidth = newWidth - 2
        }
    }
}