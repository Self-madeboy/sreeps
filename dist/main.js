'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class aotuBuild {
    constructor() {
        this.run();
    }
    run() {
        this.harvesters_number = 4;
        //共同数量
        let number = 3;
        // 能量数目
        for (var name in Game.rooms) {
            console.log('Room "' +
                name +
                '" has ' +
                Game.rooms[name].energyAvailable +
                " energy");
        }
        //harvester数量
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester");
        // console.log('Harvesters: ' + harvesters.length);
        // builder数量
        // var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        // console.log('builder: ' + builders.length);
        // updater数量
        var updaters = _.filter(Game.creeps, (creep) => creep.memory.role == "updater");
        // console.log('updater: ' + updaters.length);
        //最小creeps数量
        if (harvesters.length < number) {
            var newName = "Harvester" + Game.time;
            console.log("Spawning new harvester: " + newName);
            Game.spawns["Spawn1"].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: "harvester" } });
        }
        // if(builders.length < number) {
        //     var newName = 'builder' + Game.time;
        //     console.log('Spawning new builder: ' + newName);
        //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
        //         {memory: {role: 'builder',energyStructures}});
        // }
        if (updaters.length < number) {
            var newName = "updater" + Game.time;
            console.log("Spawning new updater: " + newName);
            Game.spawns["Spawn1"].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: "updater" } });
            // Game.structures
        }
        //打印建造harvester的信息
        if (Game.spawns["Spawn1"].spawning) {
            var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
            Game.spawns["Spawn1"].room.visual.text("🛠️" + spawningCreep.memory.role, Game.spawns["Spawn1"].pos.x + 1, Game.spawns["Spawn1"].pos.y, { align: "left", opacity: 0.8 });
        }
    }
}

class roleHarvester {
    run(creep) {
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
        }
        else {
            //FIND_CONSTRUCTION_SITES   FIND_STRUCTURES
            if (Game.rooms["W42N46"].energyAvailable ==
                Game.rooms["W42N46"].energyCapacityAvailable) {
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
                    return ((structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                },
            });
            if (target.length > 0) {
                if (creep.transfer(target[0], RESOURCE_ENERGY) ==
                    ERR_NOT_IN_RANGE) {
                    creep.moveTo(target[0], {
                        visualizePathStyle: { stroke: "#ffffff" },
                    });
                }
            }
        }
    }
}

class roleUpgrader {
    run(creep) {
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
            if (creep.upgradeController(creep.room.controller) ==
                ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {
                    visualizePathStyle: { stroke: "#ffaa00" },
                });
            }
        }
        else {
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

// 入口函数
const loop = function () {
    let creepsBuild = new aotuBuild();
    let roleHarvest = new roleHarvester();
    let roleUpdate = new roleUpgrader();
    creepsBuild.run();
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            roleHarvest.run(creep);
        }
        //  if(creep.memory.role == 'builder') {
        //     roleBuilder.run(creep);
        //  }
        if (creep.memory.role == "updater") {
            roleUpdate.run(creep);
            // roleHarvester.run(creep);
        }
    }
    //--------------------------------销毁区域  放在后面
    //销毁死掉的creeps
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Clearing non-existing creep memory:", name);
        }
    }
};

exports.loop = loop;
//# sourceMappingURL=main.js.map
