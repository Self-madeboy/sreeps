export function haveaster(creep: Creep) {
    let target: StructureContainer | Source | ConstructionSite;
    // 如果有缓存的话就获取缓存
    if (creep.memory.targetId)
        target = Game.getObjectById<StructureContainer | Source>(
            creep.memory.sourceId
        );
    const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    // 没有缓存或者缓存失效了就重新获取
    if (!target) {
        // 先尝试获取 container
        const containers = source.pos.findInRange<StructureContainer>(
            FIND_STRUCTURES,
            1,
            {
                filter: (s) => s.structureType === STRUCTURE_CONTAINER,
            }
        );

        // 找到了就把 container 当做目标
        if (containers.length > 0) target = containers[0];
    }
    // 还没找到就找 container 的工地
    if (!target) {
        const constructionSite = source.pos.findInRange(
            FIND_CONSTRUCTION_SITES,
            1,
            {
                filter: (s) => s.structureType === STRUCTURE_CONTAINER,
            }
        );

        if (constructionSite.length > 0) target = constructionSite[0];
    }
    // 如果还是没找到的话就用 source 当作目标
    if (!target) target = source;
    creep.memory.targetId = target.id;

    const range = target instanceof Source ? 1 : 0;
    creep.moveTo(target, { reusePath: 20 });

    // // if creep is bringing energy to the spawn but has no energy left
    // if (creep.memory.working == true && creep.store.energy == 0) {
    //     // switch state
    //     creep.memory.working = false;
    // }
    // // if creep is harvesting energy but is full
    // else if (
    //     creep.memory.working == false &&
    //     creep.store.energy == creep.store.getCapacity()
    // ) {
    //     // switch state
    //     creep.memory.working = true;
    // }

    // // if creep is supposed to transfer energy to the spawn
    // if (creep.memory.working == true) {
    //     // try to transfer energy, if the spawn is not in range
    //     if (
    //         creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) ==
    //         ERR_NOT_IN_RANGE
    //     ) {
    //         // move towards the spawn
    //         creep.moveTo(Game.spawns.Spawn1);
    //     }
    // }
    // // if creep is supposed to harvest energy from source
    // else {
    //     // find closest source
    //     var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    //     // try to harvest energy, if the source is not in range
    //     if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
    //         // move towards the source
    //         creep.moveTo(source);
    //     }
    // }
}
