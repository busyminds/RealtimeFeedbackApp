// 'use strict';

// Declare app level module which depends on filters, and services
angular.module('PeerRatingApp', ['PeerRatingApp.controllers']);

angular.module('PeerRatingApp.controllers', [])
    .controller('PeerRatingController', ['$scope', function($scope) {
        $scope.groups = []

        for (var i = 0; i < 1; i++){
            $scope.groups.push({
                groupNumber: i + 1,
                scoreContent: 0,
                scorePresentation: 0,
                scoreDelivery: 0,
                readOnly: false
            });
        }


        $scope.submitScores = function(index) {
            socket.emit('submitScores', $scope.groups[index]);
            $scope.groups[index].readOnly = true;
        };

        $scope.getScoreOfGroup = function(index) {
            var score = 0;

            score += parseInt($scope.groups[index].scoreContent);
            score += parseInt($scope.groups[index].scorePresentation);
            score += parseInt($scope.groups[index].scoreDelivery);

            return score;
        };
    }])
    .controller('ScoresDisplayController', ['$scope', function($scope) {
        $scope.total_scores = window.total_scores;

        $scope.score_descriptions = {
            content: [
                'Does not seem to understand the topic very well.',
                'Shows a good understanding of some parts of the topic.',
                'Shows a good understanding of the topic.',
                'Shows a full understanding of the topic.'
            ],
            presentation: [
                'Poor choice of graphics and text. Many parts are not clear and can be confusing.',
                'Graphics and text are present but not very appealing. Many parts are not clear.',
                'Good choice of graphics, and text. A few parts are not so clear.',
                'Great choice of visual aids, graphics, pictures, and text. Everything is clear and organized.'
            ],
            delivery: [
                'Mumbles often and cannot be understood.',
                'Mumbles sometimes and hard to understand.',
                'Speaks clearly and distinctly most of the time.',
                'Speaks clearly and distinctly all the time.',
            ]
        };

        $scope.groups = [1];

        $scope.getScoreDescription = function (category, score) {
            score = parseInt(score);
            if (score === 4) {
                score = 3
            }
            return $scope.score_descriptions[category][score];
        };
    }]);
