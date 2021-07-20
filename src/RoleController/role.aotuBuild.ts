export class aotuBuild {
    harvesters_number: number;
    constructor() {
        this.run();
    }
    run(): void {
        this.harvesters_number = 4;
        //共同数量
        let number = 3;

        // 能量数目
        for (var name in Game.rooms) {
            console.log(
                'Room "' +
                    name +
                    '" has ' +
                    Game.rooms[name].energyAvailable +
                    " energy"
            );
        }

        //harvester数量
        var harvesters = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == "harvester"
        );
        // console.log('Harvesters: ' + harvesters.length);
        // builder数量
        // var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        // console.log('builder: ' + builders.length);
        // updater数量
        var updaters = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == "updater"
        );
        // console.log('updater: ' + updaters.length);

        //最小creeps数量

        if (harvesters.length < number) {
            var newName = "Harvester" + Game.time;
            console.log("Spawning new harvester: " + newName);
            Game.spawns["Spawn1"].spawnCreep(
                [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                newName,
                { memory: { role: "harvester" } }
            );
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
            Game.spawns["Spawn1"].spawnCreep(
                [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                newName,
                { memory: { role: "updater" } }
            );
            // Game.structures
        }
        //打印建造harvester的信息
        if (Game.spawns["Spawn1"].spawning) {
            var spawningCreep =
                Game.creeps[Game.spawns["Spawn1"].spawning.name];
            Game.spawns["Spawn1"].room.visual.text(
                "🛠️" + spawningCreep.memory.role,
                Game.spawns["Spawn1"].pos.x + 1,
                Game.spawns["Spawn1"].pos.y,
                { align: "left", opacity: 0.8 }
            );
        }
    }
}
