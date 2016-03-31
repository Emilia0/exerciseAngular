(function () {
    var app = angular.module('Planer', []);

    app.controller('ToDoList', function ($scope) {
            $scope.taskList = [
                {date: '2016-01-14', task: 'Sprzedać 300 USD', status: "isDone", itemStyle: {"color": "#3C763D", "background-color": "#DFF0D8"}},
                {
                    date: '2016-02-01',
                    task: 'Sprzedać 1000 JPY, kupić 200 USD',
                    status: "isDone",
                    itemStyle: {"color": "#3C763D", "background-color": "#DFF0D8"}
                },
                {
                    date: '2016-02-01',
                    task: 'Sprzedać 2000 JPY, kupić 1500 USD',
                    status: "isPlanned",
                    itemStyle: {"color": "#31708F", "background-color": "#D9EDF7"}
                },
                {
                    date: '2016-02-01',
                    task: 'Sprzedać 1000 JPY, kupić 700 USD',
                    status: "isPlanned",
                    itemStyle: {"color": "#31708F", "background-color": "#D9EDF7"}
                },
                {
                    date: '2016-02-01',
                    task: 'Sprzedać 200 JPY, kupić 500 USD',
                    status: "isAnnuled",
                    itemStyle: {"color": "#8A6D3B", "background-color": "#FCF8E3"}
                },
                {date: '2016-02-20', task: 'Kupić 2000 EUR 300 USD', status: "isAnnuled", itemStyle: {"color": "#8A6D3B", "background-color": "#FCF8E3"}}
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
                //endDate: new.Date(),
                startDate: today
            });

            $datepicker.on('changeDate', function(){
                $(this).datepicker('hide');
                date = $("#data1").val();


            });


            $scope.newItem = {date: '', task: '', status: "isPlanned", itemStyle: {"color": "#31708F", "background-color": "#D9EDF7"}};

            $scope.addItem = function (item) {
                item.date = item.date || today;
                if (item.task) {
                    var newItem = angular.copy(item);
                    //newItem.status=statuses.isPlanned;
                    $scope.taskList.unshift(newItem);
                    console.log($scope.taskList)
                }
            };
            $scope.removeItem = function (item) {
                var idx = $scope.taskList.indexOf(item);
                $scope.taskList.splice(idx, 1);
            };

            $scope.statusIntoDone = function (item) {
                item.status = "isDone";
                item.itemStyle = {"color": "#3C763D", "background-color": "#DFF0D8"}
            };
            $scope.statusIntoPlanned = function (item) {
                item.status = "isPlanned";
                item.itemStyle = {"color": "#31708F", "background-color": "#D9EDF7"};
                item.date = today;
            };
            $scope.statusIntoAnnuled = function (item) {
                item.status = "isAnnuled";
                item.itemStyle = {"color": "#8A6D3B", "background-color": "#FCF8E3"}
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
    }).filter('annuledTasks', function () {
        return function (items) {
            return items.filter(function (item) {
                return item.status === "isAnnuled";
            });
        }
    });


})();