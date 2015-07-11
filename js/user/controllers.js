var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngDialog']);

phonecatControllers.controller('home', function ($scope, TemplateService, NavigationService, $routeParams) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = "";
    TemplateService.content = "views/dashboard.html";
    TemplateService.list = 1;
    $scope.navigation = NavigationService.getnav();
    NavigationService.countUsers(function (data, status) {
        if(data.value==false)
        {
            data=0;
        }
        $scope.user = data;
    });
    NavigationService.countNotes(function (data, status) {
        if(data.value==false)
        {
            data=0;
        }
        $scope.notes = data;
    });
});

phonecatControllers.controller('login', function ($scope, TemplateService, NavigationService, $routeParams) {
    $scope.template = TemplateService;
//    TemplateService.menu = "";
//    TemplateService.header = "";
//    TemplateService.submenu = "";
//    TemplateService.footer = "";
    TemplateService.content = "views/login.html";
    TemplateService.list = 3;
});
phonecatControllers.controller('signup', function ($scope, TemplateService, NavigationService, $routeParams) {
    $scope.template = TemplateService;
//    TemplateService.menu = "";
//    TemplateService.header = "";
//    TemplateService.submenu = "";
//    TemplateService.footer = "";
    TemplateService.content = "views/signup.html";
    TemplateService.list = 3;
});

phonecatControllers.controller('user', function ($scope, TemplateService, NavigationService, ngDialog, $location) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("User");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = 2;
    TemplateService.content = "views/user/user.html";
    $scope.navigation = NavigationService.getnav();

    //DEVELOPMENT
    $scope.user = [];
    $scope.userid = 0;
    $scope.pagedata = {};
    $scope.pagedata.page = 1;
    $scope.pagedata.limit = "20";
    $scope.pagedata.search = "";
    $scope.number = 100;
    $scope.getNumber = function (num) {
        return new Array(num);
    }

    //    NavigationService.getUser().success(function(data, status) {
    //        console.log(data);
    //        $scope.user = data;
    //    });

    $scope.reload = function (pagedata) {
        $scope.pagedata = pagedata;
        NavigationService.getlimitedUsers(pagedata, function (data, status) {
            console.log(data);
            $scope.user = data;
            $scope.pages = [];
            var newclass = "";
            for (var i = 1; i <= data.totalpages; i++) {
                if (pagedata.page == i) {
                    newclass = "active";
                } else {
                    newclass = "";
                }
                $scope.pages.push({
                    pageno: i,
                    class: newclass
                });
            }
        });
    }

    $scope.reload($scope.pagedata);


    //DELETE USER
    $scope.confDelete = function () {
        NavigationService.deleteUser(function (data, status) {
            console.log(data);
            //            reload();
            ngDialog.close();
            window.location.reload();

        });
    }

    $scope.getallusers = function () {
        console.log("in get all users");

    }

    //OPENDELETE DIALOG BOX
    $scope.deletefun = function (id) {
        $.jStorage.set("deleteuser", id);
        ngDialog.open({
            template: 'views/delete.html',
            closeByEscape: false,
            controller: 'user',
            closeByDocument: false
        });
    }
});
phonecatControllers.controller('edituser', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams, $location) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Update User");
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = "views/submenu.html";
    TemplateService.list = 1;
    TemplateService.content = "views/user/edituser.html";
    $scope.navigation = NavigationService.getnav();
    $scope.usr = $routeParams.id;

    console.log($routeParams.id);

    //DEVELOPMENT
    $scope.user = [];

    //get one user
    NavigationService.getOneUser($routeParams.id, function (data, status) {
        console.log(data);
        $scope.user = data;
        $scope.notecount = 0;
        $scope.devicecount = data.device.length;
        $scope.foldercount = 0;
        $scope.feedcount = data.feed.length;
        $scope.sharecount = data.share.length;
        for (var i = 0; i < data.note.length; i++) {
            if (data.note[i].title) {
                $scope.notecount++;
            }
        }
        for (var i = 0; i < data.folder.length; i++) {
            if (data.folder[i].name) {
                $scope.foldercount++;
            }
        }
    });

    //DELETE USER
    $scope.confDelete = function () {
        NavigationService.deleteUser(function (data, status) {
            console.log(data);
        });
    }

    //save user
    $scope.submitForm = function () {
        $scope.user.id = $scope.usr;
        console.log($scope.user);
        NavigationService.updateUser($scope.user, function (data, status) {
            console.log(data);
            $location.url("/user");
        });
    }
});
phonecatControllers.controller('createuser', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams, $location) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Create User");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = 1;
    TemplateService.content = "views/user/createuser.html";
    $scope.navigation = NavigationService.getnav();
    $scope.isValidEmail = 1;

    $scope.email = function (myemail) {
        NavigationService.getOneemail(myemail, function (data, status) {
            console.log(data);
            if (data.value == true) {
                console.log("if");
                $scope.isValidEmail = 0;
            } else {
                console.log("else");
                $scope.isValidEmail = 1;
            }
        });
    }

    console.log($routeParams.id);

    //DEVELOPMENT
    $scope.user = [];

    //save user
    $scope.submitForm = function () {
        console.log($scope.user);
        if ($scope.isValidEmail == 1) {
            NavigationService.saveUser($scope.user, function (data, status) {
                console.log(data);
                $location.url("/user");
            });
        } else {
            console.log("not valid");
        }
    }

});


phonecatControllers.controller('headerctrl', ['$scope', 'TemplateService',
    function ($scope, TemplateService) {
        $scope.template = TemplateService;
    }
]);