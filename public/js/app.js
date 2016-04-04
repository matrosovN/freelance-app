var App = angular.module('app', [])
    .directive("messageList", function() {
        return {
            link: function(scope,element,attrs) {
                var show = (message) => {
                    var mes = document.createElement("div");
                    mes.innerHTML = message.message;
                    mes.className="mes";
                    var author = document.createElement("a");
                    author.innerHTML = message.author.name;
                    author.href="/user/"+message.author._id;
                    var date = document.createElement("span");
                    date.innerHTML = message.date.toLocaleString();
                    mes.appendChild(document.createElement("br"));
                    mes.appendChild(author); mes.appendChild(date);
                    $(element[0]).prepend(mes);
                };
                var uniqueResultOne =(newVal,oldVal)=> {
                    return newVal.filter(function(obj) {
                        return !oldVal.some(function(obj2) {
                            return obj.id == obj2.id;
                        });
                    });
                };
                scope.$watch('messages', function(newVal,oldVal) {
                    if (newVal!==oldVal)
                    {

                        uniqueResultOne(newVal[attrs.messageList],oldVal[attrs.messageList]).forEach((mes)=> {
                            show(mes);
                        });
                    }

                },true);
            }
        }
    })
    .directive('notificationList', function() {
    return {
        link: function (scope, element, attrs) {
            var show = (notification)=> {
              var notify = document.createElement('div'); notify.className='notify';
                var task = document.createElement("span");
                task.className = "task";
                task.innerHTML = notification.task_name;
                var text = document.createElement("p");
                text.innerHTML = notification.text;
                var date = document.createElement("span");
                date.className = "date";
                date.innerHTML = notification.date.toLocaleString();
                notify.appendChild(task); notify.appendChild(text); notify.appendChild(date);
                $(element[0]).prepend(notify);

            };

            var uniqueResultOne =(newVal,oldVal)=> {
                return newVal.filter(function(obj) {
                    return !oldVal.some(function(obj2) {
                        return obj.id == obj2.id;
                    });
                });
            };
            scope.$watch('notifications', function(newVal, oldVal) {
                    uniqueResultOne(newVal,oldVal).forEach((note)=> {
                        show(note);
                    });



            },true)
        }
    }
});

App.filter('orders', function() {
    return function(items,field, greaterThan, lowerThan) {
        items = items.filter(function(item){
            return item[field] >= greaterThan && item[field] <= lowerThan;
        });
        return items;
    }
});

App.filter('requests', function() {
    return function(items,field, greaterThan, lowerThan) {
        items = items.filter(function(item){
            return item[field].length >= greaterThan && item[field].length <= lowerThan;
        });
        return items;
    }
});
App.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);