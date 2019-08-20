<%--
  Created by IntelliJ IDEA.
  User: seokjung
  Date: 01/08/2019
  Time: 7:53 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ADMIN 페이지</title>
  <!-- Custom fonts for this template -->
  <link href="/resources/bootstrap-sb-admin/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
  <!-- Custom styles for this template -->
  <link href="/resources/bootstrap-sb-admin/css/sb-admin-2.min.css" rel="stylesheet">
  <link href="/resources/css/admin/home.css" rel="stylesheet">
<script>
  let isadmin = ('${admin}' == 'true' ? true : false);
  if(isadmin === false){
      location.href = "/";
  }
</script>
</head>

<body id="page-top">

<div id="wrapper" align="center">
  <div class="col-lg-6" >
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Admin page</h6>
      </div>
      <div class="card-body">
        <a href="/admin/members" class="btn btn-primary btn-icon-split">
                    <span class="icon text-white-50">
                      <i class="fas fa-user-friends"></i>
                    </span>
          <span class="text">Show Member list</span>
        </a>
        <div class="my-2"></div>
        <a href="/admin/cs/faq" class="btn btn-success btn-icon-split">
                    <span class="icon text-white-50">
                      <i class="fas fa-list-alt"></i>
                    </span>
          <span class="text">Show Notice & FAQ list</span>
        </a>
        <div class="my-2"></div>
        <a href="/admin/cs/inquiry" class="btn btn-inquiry btn-icon-split">
                    <span class="icon text-white-50">
                      <i class="fas fa-question-circle"></i>
                    </span>
          <span class="text">Show 1:1 Inquiry list</span>
        </a>
        <div class="my-2"></div>
        <a href="/admin/reviews" class="btn btn-info btn-icon-split">
                    <span class="icon text-white-50">
                      <i class="fas fa-star-half-alt"></i>
                    </span>
          <span class="text">Show Review list</span>
        </a>
        <div class="my-2"></div>
        <a href="/admin/report" class="btn btn-report btn-icon-split">
                    <span class="icon text-white-50">
                      <i class="fas fa-exclamation-circle"></i>
                    </span>
          <span class="text">Show Report list</span>
        </a>
        <div class="my-2"></div>
        <a href="/admin/logout" class="btn btn-icon-split btn-logout">
                    <span class="icon text-white-50">
                      <i class="fas fa-backspace"></i>
                    </span>
          <span class="text">Log out</span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Bootstrap core JavaScript-->
<script src="/resources/bootstrap-sb-admin/vendor/jquery/jquery.min.js"></script>
<script src="/resources/js/admin/admin.js"></script>
<script>
    $(document).ready(function(){
        $.setCenter();
    })
</script>
</body>
</html>
