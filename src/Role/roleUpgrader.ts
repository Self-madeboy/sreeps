export class roleUpgrader {
    run(creep: Creep): void {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say("🔄 harvest");
        }
        // console.log(creep.memory.building)

        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say("🚧 build");
        }

        if (creep.memory.building) {
            if (
                creep.upgradeController(creep.room.controller) ==
                ERR_NOT_IN_RANGE
            ) {
                creep.moveTo(creep.room.controller, {
                    visualizePathStyle: { stroke: "#ffaa00" },
                });
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {
                    visualizePathStyle: { stroke: "#ffaa00" },
                });
            }
        }

        // if(creep.store[RESOURCE_ENERGY] == 0) {
        //     var sources = creep.room.find(FIND_SOURCES);
        //     if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(sources[0],{visualizePathStyle: {stroke: '#ffaa00'}});
        //     }
        // }
        // else {
        //     if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ffaa00'}});
        //     }
        // }
    }
}
