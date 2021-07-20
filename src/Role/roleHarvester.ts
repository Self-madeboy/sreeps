export class roleHarvester {
    run(creep: Creep): void {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say("🔄 harvest");
        }

        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say("🚧 build");
        }

        if (!creep.memory.building) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {
                    visualizePathStyle: { stroke: "#ffaa00" },
                });
            }
        } else {
            //FIND_CONSTRUCTION_SITES   FIND_STRUCTURES
            if (
                Game.rooms["W42N46"].energyAvailable ==
                Game.rooms["W42N46"].energyCapacityAvailable
            ) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {
                            visualizePathStyle: { stroke: "#ffffff" },
                        });
                    }
                }
            }
            var target = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    );
                },
            });
            if (target.length > 0) {
                if (
                    creep.transfer(target[0], RESOURCE_ENERGY) ==
                    ERR_NOT_IN_RANGE
                ) {
                    creep.moveTo(target[0], {
                        visualizePathStyle: { stroke: "#ffffff" },
                    });
                }
            }
        }
    }
}
