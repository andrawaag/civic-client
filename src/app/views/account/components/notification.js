(function() {
  'use strict';
  angular.module('civic.common')
    .directive('notification', notification);

  // @ngInject
  function notification() {
    return {
      restrict: 'E',
      scope: {
        notification: '=',
        theme: '='
      },
      templateUrl: 'app/views/account/components/notification.tpl.html',
      controller: notificationController
    };
  }

  // @ngInject
  function notificationController($scope, $state, CurrentUser, _) {
    console.log('notificationController called.');
    var vm = $scope.vm = {};
    var params = $scope.notification.event.state_params;

    vm.seen = $scope.notification.seen;

    vm.entityNames = [];

    if(_.has(params, 'gene')) {vm.entityNames.push(params.gene.name);}
    if(_.has(params, 'variant')) {vm.entityNames.push(params.variant.name);}
    if(_.has(params, 'evidence_item')) {vm.entityNames.push(params.evidence_item.name);}

    vm.entityName = _.compact(vm.entityNames).join(' / ');

    vm.eventClick = function(event) {
      var subjectStates = {
        genes: 'events.genes',
        variants: 'events.genes.summary.variants',
        variantgroups: 'events.genes.summary.variantGroups',
        evidenceitems: 'events.genes.summary.variants.summary.evidence'
      };

      // revision comments require some more logic to determine the proper state
      if(notification.subject_type === 'suggestedchanges') {
        var state;
        var type = notification.state_params.suggested_change.subject_type;
        if(type === 'evidenceitems') {
          state = 'events.genes.summary.variants.summary.evidence';
        } else if (type === 'variantgroups') {
          state = 'events.genes.summary.variantGroups';
        } else if (type === 'variants') {
          state = 'events.genes.summary.variants';
        } else if (type === 'genes') {
          state = 'events.genes';
        }
        subjectStates.suggestedchanges = state;
      }


      var stateExtension = {
        'commented': '.talk.comments',
        'submitted': '.summary',
        'accepted': '.summary',
        'rejected': '.summary',
        'change suggested': '.talk.revisions.list.summary',
        'change accepted': '.talk.revisions.list.summary',
        'change rejected': '.talk.revisions.list.summary'
      };

      // revision comments are shown in their revision's summary view, override commented extension
      if(notification.subject_type === 'suggestedchanges') {
        stateExtension.commented = '.talk.revisions.list.summary';
      }

      var stateParams = {};
      _.each(notification.state_params, function(obj, entity) {
        var entityId;
        if(entity === 'suggested_change') {
          entityId = 'revisionId';
        } else if (entity === 'evidence_item') {
          entityId = 'evidenceId';
        } else if (entity === 'variant_group') {
          entityId = 'variantGroupId';
        } else {
          entityId = entity + 'Id';
        }
        stateParams[entityId] = obj.id;
      });

      $state.go(subjectStates[notification.subject_type]+stateExtension[notification.event_type], stateParams);

    };

    vm.markAsSeen = function() {
      CurrentUser.markAsRead($scope.notification.id);
    }
  }
})();
