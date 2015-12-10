(function() {
  'use strict';
  angular.module('civic.pages')
    .controller('HelpCtrl', HelpCtrl)
    .config(helpConfig);

  // @ngInject
  function helpConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('help', {
        url: '/help',
        controller: 'HelpCtrl',
        templateUrl: 'app/pages/help.tpl.html',
        data: {
          titleExp: '"Help"',
          navMode: 'sub'
        }
      })
  }

  // @ngInject
  function HelpCtrl($scope) {
    var vm = $scope.vm = {};
    vm.tabs = {
      main: [
        {
          heading: 'Introduction',
          template: 'app/pages/help_intro.tpl.html',
          active: true
        },
        {
          heading: 'Evidence',
          template: 'app/pages/help_evidence_main.tpl.html',
          active: false
        },
        {
          heading: 'Variants',
          template: 'app/pages/help_variants.tpl.html',
          active: false
        },
        {
          heading: 'Genes',
          template: 'app/pages/help_genes.tpl.html',
          active: false
        },
        {
          heading: 'Variant Groups',
          template: 'app/pages/help_variant_groups.tpl.html',
          active: false
        },
        {
          heading: 'Get Help',
          template: 'app/pages/help_get.tpl.html',
          active: false
        },
        {
          heading: 'Report Problem',
          template: 'app/pages/help_report_problem.tpl.html',
          active: false
        }
      ],
      evidence: [
        {
          heading: 'Overview',
          template: 'app/pages/help_evidence_statement.tpl.html',
          active: true
        },
        {
          heading: 'Variant Origin',
          template: 'app/pages/help_evidence_variant_origin.tpl.html',
          active: false
        },
        {
          heading: 'Evidence Types',
          template: 'app/pages/help_evidence_types.tpl.html',
          active: false
        },
        {
          heading: 'Evidence Levels',
          template: 'app/pages/help_evidence_levels.tpl.html',
          active: false
        },
        {
          heading: 'Trust Ratings',
          template: 'app/pages/help_evidence_trust_ratings.tpl.html',
          active: false
        }
      ],
      variant: [
        {
          heading: 'Overview',
          template: 'app/pages/help_variant_overview.tpl.html',
          active: true
        },
        {
          heading: 'Variant Name',
          template: 'app/pages/help_variant_naming.tpl.html',
          active: false
        },
        {
          heading: 'Variant Summary',
          template: 'app/pages/help_variant_summaries.tpl.html',
          active: false
        },
        {
          heading: 'Variant Coordinates',
          template: 'app/pages/help_variant_coordinates.tpl.html',
          active: false
        }
      ],
      gene: [
        {
          heading: 'Overview',
          template: 'app/pages/help_gene_overview.tpl.html',
          active: true
        },
        {
          heading: 'Gene Summary',
          template: 'app/pages/help_gene_summary.tpl.html',
          active: false
        }
      ],
      variant_group: [
        {
          heading: 'Overview',
          template: 'app/pages/help_variant_group_overview.tpl.html',
          active: true
        },
        {
          heading: 'Variant Group Summary',
          template: 'app/pages/help_variant_group_summary.tpl.html',
          active: false
        },
        {
          heading: 'Create a Variant Group',
          template: 'app/pages/help_variant_group_create.tpl.html',
          active: false
        },
        {
          heading: 'Add to a Variant Group',
          template: 'app/pages/help_variant_group_addto.tpl.html',
          active: false
        }
      ]
    };
  }
})();
