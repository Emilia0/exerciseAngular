(function () {
    var app = angular.module('Planner', []);

    app.controller('ToDoList', function ($scope) {

            var plannedColor = "#31708F",
                plannedBackgroundColor = "#D9EDF7",
                doneColor = "#3C763D",
                doneBackgroundColor = "#DFF0D8",
                annulledColor = "#8A6D3B",
                annulledBackgroundColor = "#FCF8E3";

            $scope.taskList = [
                {
                    date: '2015-01-14',
                    task: 'Test done task',
                    status: "isDone",
                    itemStyle: {"color": doneColor, "background-color": doneBackgroundColor}
                },
                {
                    date: '2015-05-01',
                    task: 'Another test done task',
                    status: "isDone",
                    itemStyle: {"color": doneColor, "background-color": doneBackgroundColor}
                },
                {
                    date: '2015-06-01',
                    task: 'Test planned task',
                    status: "isPlanned",
                    itemStyle: {"color": plannedColor, "background-color": plannedBackgroundColor}
                },
                {
                    date: '2015-08-01',
                    task: 'Another test planned task',
                    status: "isPlanned",
                    itemStyle: {"color": plannedColor, "background-color": plannedBackgroundColor}
                },
                {
                    date: '2015-09-01',
                    task: 'Test annulled task',
                    status: "isAnnulled",
                    itemStyle: {"color": annulledColor, "background-color": annulledBackgroundColor}
                },
                {
                    date: '2015-02-20',
                    task: 'Another test annuled task',
                    status: "isAnnulled",
                    itemStyle: {"color": annulledColor, "background-color": annulledBackgroundColor}
                }
            ];

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }
            today = yyyy + '-' + mm + '-' + dd;

            var $datepicker = $('.datepicker').datepicker({
                weekStart: 1,
                format: "yyyy-mm-dd",
                startDate: today
            });

            $datepicker.on('changeDate', function () {
                $(this).datepicker('hide');
                date = $("#date1").val();
            });

            $scope.newItem = {
                date: '',
                task: '',
                status: "isPlanned",
                itemStyle: {"color": plannedColor, "background-color": plannedBackgroundColor}
            };

            $scope.addItem = function (item) {
                item.date = date || today;
                if (item.task) {
                    var newItem = angular.copy(item);
                    $scope.taskList.unshift(newItem);
                }
            };
            $scope.removeItem = function (item) {
                var idx = $scope.taskList.indexOf(item);
                $scope.taskList.splice(idx, 1);
            };

            $scope.statusIntoDone = function (item) {
                item.status = "isDone";
                item.itemStyle = {"color": doneColor, "background-color": doneBackgroundColor}
            };
            $scope.statusIntoPlanned = function (item) {
                item.status = "isPlanned";
                item.itemStyle = {"color": plannedColor, "background-color": plannedBackgroundColor};
                item.date = today;
            };
            $scope.statusIntoAnnulled = function (item) {
                item.status = "isAnnulled";
                item.itemStyle = {"color": annulledColor, "background-color": annulledBackgroundColor}
            };

        }
    ).directive('changeList', function () {
        return {
            templateUrl: 'changeList.html',
            restrict: 'ACE'
        }
    }).filter('doneTasks', function () {
        return function (items) {
            return items.filter(function (item) {
                return item.status === "isDone";
            });
        }
    }).filter('plannedTasks', function () {
        return function (items) {
            return items.filter(function (item) {
                return item.status === "isPlanned";
            });
        }
    }).filter('annulledTasks', function () {
        return function (items) {
            return items.filter(function (item) {
                return item.status === "isAnnulled";
            });
        }
    });


})();