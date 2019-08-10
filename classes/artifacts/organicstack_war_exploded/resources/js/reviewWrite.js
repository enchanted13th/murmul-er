var ps = new kakao.maps.services.Places();

$(document).ready(function () {
//   if(islogin === false){
//      location.href="/orgarnic_stack/";
//   }
    starRating();

    $('#btnCancel').click(function () {
        var delcheck = confirm("리뷰작성을 취소하시겠습니까?");
        if (delcheck == true) {
            alert('리뷰작성이 취소되었습니다.');
            history.go(-1);
        } else {
            ;
        }

    });


    $('#btnUpdate').click(function () {
        if (isEmpty($('#inputTitle').val())) {
            alert('건물 설명을 입력해주세요.');
            $('#inputTitle').focus();
            return;
        }
        if (isEmpty($('#inputAddr').val())) {
            alert('주소를 입력해주세요.');
            $('#inputAddr').focus();
            return;
        }
        if (isEmpty($('#inputDetail').val())) {
            alert('상세주소를 입력해주세요.');
            $('#inputDetail').focus();
            return;
        }
        if (isEmpty($('#inputPeriod').val())) {
            alert('거주기간을 입력해주세요.');
            $('#inputPeriod').focus();
            return;
        }
        if (isEmpty($('#txtExplain').val())) {
            alert('총 평가를 입력해주세요.');
            $('#txtExplain').focus();
            return;
        }
        if (isEmpty($('#txtGood').val())) {
            alert('장점을 입력해주세요.');
            $('#txtGood').focus();
            return;
        }
        if (isEmpty($('#txtBad').val())) {
            alert('단점을 입력해주세요.');
            $('#txtBad').focus();
            return;
        }
        if (isEmpty($('#fileName').text())) {
            alert('사진을 등록 해주세요.');
            return;
        }

        document.reviewForm.submit();
    })


    $('#inputPeriod').keyup(function () {

        var onlyNum = /^[0-9]*$/;
        var pUnit = $('body').find('#selPeriod').val();
        let on1 = $('#inputPeriod').val();

        if (!onlyNum.test(on1)) {
            alert('숫자만 입력가능합니다.');
            $('#inputPeriod').val('');
            $('#inputPeriod').focus();
        }

        switch (pUnit) {
            case "Y":
                validate(on1);
                break;
            case "M":
                validate(on1);
                break;
            case "W":
                validate(on1);
                break;
        }
    })

    $('#btnAddr').click(function () {
        var getAddress = function () {
            new daum.Postcode({
                oncomplete: function (data) {
                    totAddr = data;
                    console.log(totAddr);
                    $('#inputAddr').attr("value", data.roadAddress);
                }
            }).open();
        };
        getAddress();
    })
})

var isEmpty = function (str) {
    if (str == "undefined" || str == null || str == "")
        return true;
    else
        return false;
}

var validate = function (on1) {
    if (on1 <= 0) {
        alert('유효하지 않은 범위입니다. 다시 입력해 주세요');
        $('#inputPeriod').val('');
        $('#inputPeriod').focus();
    }
}
var readFile = function () {
    $('#imgUpload').trigger('click');
}
var readName = function () {
    $('#fileName').text($('#imgUpload')[0].files[0].name);
}

var starRating = function () {
    var $star = $(".star-input"),
        $result = $star.find("output>b");

    $(document)
        .on("focusin", ".star-input>.input",
            function () {
                $(this).addClass("focus");
            })

        .on("focusout", ".star-input>.input", function () {
            var $this = $(this);
            setTimeout(function () {
                if ($this.find(":focus").length === 0) {
                    $this.removeClass("focus");
                }
            }, 100);
        })

        .on("change", ".star-input :radio", function () {

            console.log($result.text($(this).next().text()));
        })
        .on("mouseover", ".star-input label", function () {
            $result.text($(this).text());
        })
        .on("mouseleave", ".star-input>.input", function () {
            var $checked = $star.find(":checked");
            if ($checked.length === 0) {
                $result.text("0");
            } else {
                $result.text($checked.next().text());
            }
        });
};


function good_b() {
    document.getElementById("normal_b").src = "img/etc/normal_b.png";
    document.getElementById("bad_b").src = "img/etc/bad_b.png";
    document.getElementById("good_b").src = "img/etc/good_a.png";
}

function normal_b() {
    document.getElementById("bad_b").src = "img/etc/bad_b.png";
    document.getElementById("good_b").src = "img/etc/good_b.png";
    document.getElementById("normal_b").src = "img/etc/normal_a.png";
}

function bad_b() {
    document.getElementById("good_b").src = "img/etc/good_b.png";
    document.getElementById("normal_b").src = "img/etc/normal_b.png";
    document.getElementById("bad_b").src = "img/etc/bad_a.png";
}

function good_b2() {
    document.getElementById("normal_b2").src = "img/etc/normal_b.png";
    document.getElementById("bad_b2").src = "img/etc/bad_b.png";
    document.getElementById("good_b2").src = "img/etc/good_a.png";
}

function normal_b2() {
    document.getElementById("bad_b2").src = "img/etc/bad_b.png";
    document.getElementById("good_b2").src = "img/etc/good_b.png";
    document.getElementById("normal_b2").src = "img/etc/normal_a.png";
}

function bad_b2() {
    document.getElementById("good_b2").src = "img/etc/good_b.png";
    document.getElementById("normal_b2").src = "img/etc/normal_b.png";
    document.getElementById("bad_b2").src = "img/etc/bad_a.png";
}