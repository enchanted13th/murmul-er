<%--
  Created by IntelliJ IDEA.
  User: seokjung
  Date: 18/08/2019
  Time: 9:08 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>ADMIN - Reports</title>

    <!-- Custom fonts for this template -->
    <link href="/resources/bootstrap-sb-admin/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/resources/bootstrap-sb-admin/css/sb-admin-2.min.css" rel="stylesheet">

    <!-- Custom styles for this page -->
    <link href="/resources/bootstrap-sb-admin/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">

    <link rel="stylesheet" href="/resources/sweetalert2/sweetalert2.css"/>
    <link rel="stylesheet" href="/resources/css/admin/list.css"/>
    <script>
        let isadmin = ('${admin}' == 'true' ? true : false);
        if(isadmin === false){
            location.href = "/";
        }
    </script>
</head>

<body id="page-top">

<div id="wrapper">
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary" style="display: inline">List of Report about Room</h6>
            <button id="banbtn" class="btn btn-danger btn-icon-split" style="float: right; margin-right: 20px;" >
                    <span class="icon text-white-50">
                      <i class="fas fa-ban"></i>
                    </span>
                <span class="text">게시금지</span>\
            </button>
            <a href="/admin" class="btn btn-primary btn-icon-split" style="float: right; margin-right: 20px;">
                    <span class="icon text-white-50">
                      <i class="fas fa-arrow-left"></i>
                    </span>
                <span class="text">뒤로가기</span>
            </a>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                    <tr>
                        <td align="center"><input type="checkbox" id="check_all"></td>
                        <th>ID</th>
                        <th>방번호</th>
                        <th>신고유형</th>
                        <th>내용</th>
                        <th>처리상태</th>
                        <th>상태변경</th>
                    </tr>
                    </thead>

                    <tbody>
                    <c:forEach var="report" items="${reports}">
                        <tr>
                            <td align="center">
                                <input type="checkbox" name="ban_chk" onchange="$(this).checkOnOff(${report.id},${report.roomId})">
                                <input type="hidden" id="ct${report.id}" value="${report.content}">
                            </td>
                            <td class="align-center" id="id${report.id}">${report.id}</td>
                            <td class="align-center room-id underline" onclick="$.openDetail(${report.roomId})">${report.roomId}</td>
                            <td class="report-type align-center" id="rt${report.id}">${report.reportType}</td>
                            <td class="content underline" onclick="$.showContent(${report.id})">${report.content}</td>
                            <td class="align-center" id="ps${report.id}" >${report.processStatus}</td>
                            <td class="align-center">
                                <button class="btns underline" id="btn${report.id}" onclick="$(this).selectStatus()">변경</button>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap core JavaScript-->
<script src="/resources/bootstrap-sb-admin/vendor/jquery/jquery.min.js"></script>
<script src="/resources/bootstrap-sb-admin/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Core plugin JavaScript-->
<script src="/resources/bootstrap-sb-admin/vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- Custom scripts for all pages-->
<script src="/resources/bootstrap-sb-admin/js/sb-admin-2.min.js"></script>

<!-- Page level plugins -->
<script src="/resources/bootstrap-sb-admin/vendor/datatables/jquery.dataTables.min.js"></script>
<script src="/resources/bootstrap-sb-admin/vendor/datatables/dataTables.bootstrap4.min.js"></script>

<!-- Page level custom scripts -->
<script src="/resources/bootstrap-sb-admin/js/demo/datatables-demo.js"></script>
<!-- 내가 추가한거 -->
<script>var fromWhere = "report";</script>
<script src="/resources/sweetalert2/sweetalert2.min.js"></script>
<script src="/resources/js/admin/admin.js"></script>
<script src="/resources/js/admin/list.js"></script>
<script src="/resources/js/admin/reports.js"></script>

</body>

</html>