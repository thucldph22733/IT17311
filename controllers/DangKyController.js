window.DangKyController = function ($scope, $http, $location) {
    $scope.a = "Trang Đăng Ký Khóa Học"
    // $scope.DSKhachHang2 = [
    //     {
    //         stt: 1, name: "Lê Đăng Thực", day: "16/10/2002", gender: "Nam", cmnd: "038202022508",
    //         sdt: "0867699841", email: "dangthuc@gmail.com", chude: "Tư duy lập trình và nền tảng", goi: "3 Tháng"
    //     },
    // ];
    var apiURL = "http://localhost:3000/DSKhachHang2";
    $scope.getData = function () {
        $http.get(apiURL)
            .then(function (response) {
                $scope.DSKhachHang2 = response.data;
            })
    };
    $scope.check = {
        name: false,
        day: false,
        cmnd: false,
        sdt: false,
        email: false,
        sdt2: false,
        email2: false,
        cmnd2:false
    }
    $scope.setText = function () {

        $scope.inputValue = {
            name: '',
            day: '',
            gender: '',
            cmnd: '',
            sdt: '',
            email: '',
            chude: '',
            goi: ''
        }
        $scope.editID = 0;
    }


    $scope.onSB = function () {
        var checkSdt = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        var checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var flag = false;

        if (!$scope.inputValue || !$scope.inputValue.name) {
            $scope.check.name = true;
            flag = true;
        }
        else {
            $scope.check.name = false;

        }

        if (!$scope.inputValue || !$scope.inputValue.day) {
            $scope.check.day = true;
            flag = true;
        }
        else {
            $scope.check.day = false;

        }

        if (!$scope.inputValue || !$scope.inputValue.cmnd) {
            $scope.check.cmnd = true;
            flag = true;
        }
        else if ($scope.inputValue != undefined && 
            isNaN($scope.inputValue.cmnd)) {
                $scope.check.cmnd = false;
                $scope.check.cmnd2 = true;
                flag = true;    
        }
        else {
            $scope.check.cmnd = false;
            $scope.check.cmnd2 = false;
        }

        if (!$scope.inputValue || !$scope.inputValue.sdt) {
            $scope.check.sdt = true;
            flag = true;
        }
        else if ($scope.inputValue != undefined && 
            checkSdt.test($scope.inputValue.sdt) == false) {
                $scope.check.sdt = false;
                $scope.check.sdt2 = true;
                flag = true;   
        }
        else {
            $scope.check.sdt = false;
            $scope.check.sdt2 = false;

        }

        if (!$scope.inputValue || !$scope.inputValue.email) {
            $scope.check.email = true;
            flag = true;
        }
        else if ($scope.inputValue != undefined && 
            checkEmail.test($scope.inputValue.email) == false) {
                $scope.check.email = false;
                $scope.check.email2 = true;
                flag = true;   
        }
        else {
            $scope.check.email = false;
            $scope.check.email2 = false;
        }

        if (flag == false) {
            var editID = $scope.editID;
            if (editID) {
                var updateItem = {
                    chude: document.getElementById("chude").value,
                    gender: document.getElementById("gender").value,
                    goi: document.getElementById("goi").value,
                    name: $scope.inputValue.name,
                    day: $scope.inputValue.day,
                    cmnd: $scope.inputValue.cmnd,
                    sdt: $scope.inputValue.sdt,
                    email: $scope.inputValue.email,
                };
                $http.put(`${apiURL}/${editID}`, updateItem,).then(function (response) {
                    if (response.status == 200) {
                        $location.path('dang-ky');
                        $scope.getData();
                    }
                }
                )
                swal("Á Đù!", "Sửa Thành Công", "success");
                $scope.setText();
                return;
            }
            /////////////////////////////////////////////////////////////////////////////////////////
            var newItem = {
                chude: document.getElementById("chude").value,
                gender: document.getElementById("gender").value,
                goi: document.getElementById("goi").value,
                name: $scope.inputValue.name,
                day: $scope.inputValue.day,
                cmnd: $scope.inputValue.cmnd,
                sdt: $scope.inputValue.sdt,
                email: $scope.inputValue.email,
            }
            $scope.setText();
            $http.post(
                apiURL, newItem
            ).then(
                function (response) {
                    $location.path("dang-ky")
                    $scope.getData();
                })
            swal("Á Đù!", "Thêm Thành Công!", "success");
            $scope.setText();

        }
    }
    $scope.onSua = function (editID) {
        $scope.editID = editID;
        $http.get(`${apiURL}/${editID}`).then(function (response) {
                document.getElementById("chude").value = response.data.chude,
                document.getElementById("goi").value = response.data.goi,
                document.getElementById("gender").value = response.data.gender,
                $scope.inputValue = {
                    name: response.data.name,
                    day: response.data.day,
                    cmnd: response.data.cmnd,
                    sdt: response.data.sdt,
                    email: response.data.email,
                    goi: response.data.email,
                    chude: response.data.chude,
                    gender: response.data.gender,
                };
        });

    }
    $scope.getData();
    //////
    $scope.onXoa = function (deleteID) {
        var confirm = window.confirm("Bạn Muốn xóa không!");
        if (confirm) {
            $http.delete(`${apiURL}/${deleteID}`).then(function (response) {
                $location.path("dang-ky");
                $scope.getData();
            });
            swal("Á Đù!", "Xoá Thành Công!", "success");
        }
    };
//     function thanhtien() {
//       if(document.getElementById("chude")=="Tư duy lập trình và nền tảng" 
//       && document.getElementById("goi")== "3 Tháng"){
//         document.getElementById("ttt").innerHTML = "1200000" 
//       }
// }
}