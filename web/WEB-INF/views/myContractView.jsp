<%--
  Created by IntelliJ IDEA.
  User: seokjung
  Date: 17/08/2019
  Time: 2:39 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>

</style>
<script src="/resources/js/jquery-3.4.1.min.js"></script>
<script>
    let islogin = ('${loginMember.memberId}' == '' ? false : true);
    if (islogin === false) {
        location.href = "/";
        window.close();
    }
    $(document).ready(function(){
        let value = $('#uploadValue').val().split(',');
        let middlePath = value[0];
        let fileName = value[1];
        let src = '/contract/download?middlePath=' + encodeURI(middlePath) + '&imageFileName=' + encodeURI(fileName);
        console.log(src);
        $('#contractImage').attr('src', src);
    })
</script>
<div align="center">
    <c:set var="middlePath" value="/contract/${contractId}"/>
    <img id="contractImage" src="" style="width:1000px;" align="middle"/>
    <input type="hidden" id="uploadValue" value="${middlePath},${image}">
</div>
