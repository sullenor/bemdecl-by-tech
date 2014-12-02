module.exports = function (config) {
    'use strict';

    config.node('deps', function (nodeConfig) {
        nodeConfig.addTechs([
            [ require('enb/techs/levels'), {levels: getLevels()} ],
            [ require('enb/techs/file-provider'), {target: '?.bemdecl.js'} ],
            [ require('enb/techs/deps-old'), {levelsTarget: '?.levels'} ],
            [ require('enb/techs/files'), {} ]
        ]);

        nodeConfig.addTechs([
            [ require('enb/techs/bemdecl-from-deps-by-tech'), {sourceTech: 'js', destTech: 'bemhtml', target: '?.client.bemdecl.js'} ],
            [ require('enb/techs/deps-old'), {bemdeclTarget: '?.client.bemdecl.js', depsTarget: '?.client.deps.js'} ],
        ]);

        nodeConfig.addTargets([
            '?.deps.js',
            '?.client.deps.js'
        ]);
    });

    function getLevels() {
        return [
            {path: 'blocks', 'check': true}
        ].map(function(l) { return config.resolvePath(l); });
    }
};
