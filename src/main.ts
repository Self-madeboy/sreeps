import { aotuBuild } from "./RoleController/role.aotuBuild";
import { roleHarvester } from "./Role/roleHarvester";
import { roleUpgrader } from "./Role/roleUpgrader";
import { errorMapper } from "../modules/errorMapper";
// 入口函数
export const loop = function () {
    let creepsBuild: aotuBuild = new aotuBuild();
    let roleHarvest: roleHarvester = new roleHarvester();
    let roleUpdate: roleUpgrader = new roleUpgrader();

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
