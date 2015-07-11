var adminurl = "http://130.211.118.86/";
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
    var navigation = [{
        name: "Dashboard",
        classis: "active",
        link: "#/home",
        subnav: []
    }, {
        name: "User",
        active: "",
        link: "#/user",
        subnav: []
    }];

    return {
        getnav: function () {
            return navigation;
        },
        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        getUser: function (callback) {
            $http.post(adminurl + "user/find").success(callback);
        },
        getlimitedUsers: function (data, callback) {
            console.log(data);
            $http({
                url: adminurl + "user/findlimited",
                method: "POST",
                data: {
                    "search": data.search,
                    "pagesize": parseInt(data.limit),
                    "pagenumber": parseInt(data.page)
                }
            }).success(callback);
        },
        getlimitedNotes: function (data, callback) {
            console.log(data);
            $http({
                url: adminurl + "note/findlimited",
                method: "POST",
                data: {
                    "user": data.user,
                    "search": data.search,
                    "pagesize": parseInt(data.limit),
                    "pagenumber": parseInt(data.page)
                }
            }).success(callback);
        },
        getFolder: function (callback) {
            $http.post(adminurl + "folder/find").success(callback);
        },
        getDevice: function (id, callback) {
            $http({
                url: adminurl + "device/find",
                method: "POST",
                data: {
                    "user": id
                }
            }).success(callback);
        },
        getFolder: function (id, callback) {
            $http({
                url: adminurl + "folder/find",
                method: "POST",
                data: {
                    "user": id
                }
            }).success(callback);
        },
        getFeeds: function (id, callback) {
            $http({
                url: adminurl + "feed/find",
                method: "POST",
                data: {
                    "user": id
                }
            }).success(callback);
        },
        getShare: function (id, callback) {
            $http({
                url: adminurl + "share/find",
                method: "POST",
                data: {
                    "user": id
                }
            }).success(callback);
        },
        getNote: function (id, callback) {
            $http({
                url: adminurl + "note/find",
                method: "POST",
                data: {
                    "user": id
                }
            }).success(callback);
        },
        deleteUser: function (callback) {
            //            $http.get(adminurl + "user/find?_id="+$.jStorage.get("deleteuser")).success(callback);
            $http({
                url: adminurl + "user/delete",
                method: "POST",
                data: {
                    //                    "id": $.jStorage.get("deleteuser")
                    "_id": $.jStorage.get("deleteuser")
                }
            }).success(callback);
        },
        countUsers: function (callback) {
            $http.post(adminurl + "user/countusers").success(callback);
        },
        countNotes: function (callback) {
            $http.post(adminurl + "user/countnotes").success(callback);
        },
        getOneUser: function (id, callback) {
            $http({
                url: adminurl + "user/findone",
                method: "POST",
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        getOneNote: function (id, user, callback) {
            $http({
                url: adminurl + "note/findone",
                method: "POST",
                data: {
                    "_id": id,
                    "user": user
                }
            }).success(callback);
        },
        getOneemail: function (myemail, callback) {
            $http({
                url: adminurl + "user/searchmail",
                method: "POST",
                data: {
                    "email": myemail
                }
            }).success(callback);
        },
        saveDevice: function (data, callback) {
            $http({
                url: adminurl + "device/save",
                method: "POST",
                data: {
                    "user": data.user,
                    "OS": data.os,
                    "pushid": data.pushid
                }
            }).success(callback);
        },
        editDevice: function (data, callback) {
            $http({
                url: adminurl + "device/save",
                method: "POST",
                data: {
                    "_id": data._id,
                    "user": data.user,
                    "os": data.os,
                    "pushid": data.pushid
                }
            }).success(callback);
        },
        deleteDevice: function (data, callback) {
            $http({
                url: adminurl + "device/delete",
                method: "POST",
                data: {
                    "_id": data._id,
                    "user": data.user
                }
            }).success(callback);
        },
        saveFolder: function (data, callback) {
            $http({
                url: adminurl + "folder/save",
                method: "POST",
                data: {
                    "user": data.user,
                    "name": data.name
                }
            }).success(callback);
        },
        editFolder: function (data, callback) {
            $http({
                url: adminurl + "folder/save",
                method: "POST",
                data: {
                    "user": data.user,
                    "_id": data.folder._id,
                    "name": data.folder.name
                }
            }).success(callback);
        },
        deleteFolder: function (data, callback) {
            $http({
                url: adminurl + "folder/delete",
                method: "POST",
                data: {
                    "_id": data.folder._id,
                    "user": data.user
                }
            }).success(callback);
        },
        saveFeeds: function (data, callback) {
            $http({
                url: adminurl + "feed/save",
                method: "POST",
                data: {
                    "user": data.user,
                    "title": data.title,
                    "text": data.text
                }
            }).success(callback);
        },
        editFeeds: function (data, callback) {
            $http({
                url: adminurl + "feed/save",
                method: "POST",
                data: {
                    "_id": data._id,
                    "user": data.user,
                    "title": data.title,
                    "text": data.text
                }
            }).success(callback);
        },
        deleteFeeds: function (data, callback) {
            $http({
                url: adminurl + "feed/delete",
                method: "POST",
                data: {
                    "_id": data._id,
                    "user": data.user
                }
            }).success(callback);
        },
        saveShare: function (data, callback) {
            $http({
                url: adminurl + "share/save",
                method: "POST",
                data: {
                    "user": data.user,
                    "userfrom": data.user,
                    "userto": data.userto,
                    "note": data.note,
                    "status": data.status
                }
            }).success(callback);
        },
        editShare: function (data, callback) {
            $http({
                url: adminurl + "share/save",
                method: "POST",
                data: {
                    "_id": data._id,
                    "user": data.user,
                    "userfrom": data.user,
                    "userto": data.userto,
                    "note": data.note,
                    "status": data.status
                }
            }).success(callback);
        },
        deleteShare: function (data, callback) {
            $http({
                url: adminurl + "share/delete",
                method: "POST",
                data: {
                    "_id": data._id,
                    "user": data.user
                }
            }).success(callback);
        },
        saveNote: function (data, callback) {
            $http({
                url: adminurl + "note/save",
                method: "POST",
                data: {
                    "user": data.user,
                    "title": data.title,
                    "tags": data.tags,
                    "noteelements": data.noteelements,
                    "color": data.color,
                    "folder": data.folder,
                    "remindertime": data.remindertime,
                    "timebomb": data.timebomb
                }
            }).success(callback);
        },
        editNote: function (data, callback) {

            $http({
                url: adminurl + "note/save",
                method: "POST",
                data: {
                    "user": data.user,
                    "_id": data._id,
                    "title": data.title,
                    "tags": data.tags,
                    "noteelements": data.noteelements,
                    "color": data.color,
                    "folder": data.folder,
                    "remindertime": data.remindertime,
                    "timebomb": data.timebomb
                }
            }).success(callback);
        },
        deleteNote: function (callback) {
            $http({
                url: adminurl + "note/delete",
                method: "POST",
                data: {
                    "_id": $.jStorage.get("deletenote"),
                    "user": $.jStorage.get("deleteuser")
                }
            }).success(callback);
        },
        saveUser: function (data, callback) {
            console.log(data);
            //            $http.get(adminurl + "user/find?_id="+$.jStorage.get("deleteuser")).success(callback);
            $http({
                url: adminurl + "user/save",
                method: "POST",
                data: {
                    "username": data.username,
                    "firstname": data.firstname,
                    "lastname": data.lastname,
                    "email": data.email,
                    "password": data.password,
                    "fbid": data.fbid,
                    "gid": data.gid,
                    "passcode": data.passcode
                }
            }).success(callback);
        },
        updateUser: function (data, callback) {
            //            $http.get(adminurl + "user/find?_id="+$.jStorage.get("deleteuser")).success(callback);
            $http({
                url: adminurl + "user/save",
                method: "POST",
                data: {
                    "_id": data.id,
                    "username": data.username,
                    "firstname": data.firstname,
                    "password": data.password,
                    "lastname": data.lastname,
                    "email": data.email,
                    "fbid": data.fbid,
                    "gid": data.gid,
                    "passcode": data.passcode
                }
            }).success(callback);
        }

    }
});