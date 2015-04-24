(function() {
  'use strict';
  angular.module('civic.events')
    .directive('entityTalkRevisionSummary', entityTalkRevisionSummary)
    .controller('EntityTalkRevisionSummaryController', EntityTalkRevisionSummaryController);

  // @ngInject
  function entityTalkRevisionSummary() {
    var directive = {
      restrict: 'E',
      replace: true,
      require: '^^entityTalkRevisionsView',
      scope: {
        revisionData: '='
      },
      templateUrl: 'app/views/events/common/entityTalkRevisionSummary.tpl.html',
      link: entityTalkRevisionsSummaryLink,
      controller: 'EntityTalkRevisionSummaryController'
    };
    return directive;
  }

  // @ngInject
  function entityTalkRevisionsSummaryLink(scope, element, attributes, entityTalkRevisionsView) {
    scope.ctrl.entityTalkRevisionsModel = entityTalkRevisionsView.entityTalkRevisionsModel;
  }

  // @ngInject
  function EntityTalkRevisionSummaryController($scope) {
    var ctrl = $scope.ctrl = {};
    ctrl.change= {};
    var unbind = $scope.$watch('ctrl.entityTalkRevisionsModel', function(entityTalkRevisionsModel) {
      console.log('ctrl.entityTalkRevisionsModel watch triggered.');
      ctrl.change = entityTalkRevisionsModel.data.currentRevision.change = $scope.revisionData.change;
      ctrl.comments = entityTalkRevisionsModel.data.currentRevision.comments = $scope.revisionData.changeComments;
      unbind();
    });
  }
})();
