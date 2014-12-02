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
            [ require('enb/techs/bemdecl-from-deps-by-tech'), {sourceTech: 'js', destTech: 'bemhtml', target: '?.client.bemdecl.js'} ]
        ]);

        nodeConfig.addTargets([
            '?.deps.js',
            '?.client.bemdecl.js'
        ]);
    });

    function getLevels() {
        return [
            {path: 'blocks', 'check': true}
        ].map(function(l) { return config.resolvePath(l); });
    }
};
