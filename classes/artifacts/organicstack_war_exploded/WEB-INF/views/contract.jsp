<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>계약서 관리</title>
    <link rel="stylesheet" href="/resources/css/contract.css"/>

</head>
<body>
<jsp:include page="topbar.jsp"/>

<div class="wrap">
    <jsp:include page="mypageSubtitle.jsp"/>
    <div class="content">
        <div>
            <div class="divNotify">총 <span class="recentCnt"><span id="recentCnt">${totalCnt}</span>개</span>의 계약서가 있습니다.
            </div>
        </div>
        <c:forEach var="contract" items="${jsonInfo}">
            <table class="tbContract">
                <tr>
                    <td class="tdAddr" colspan="2">${contract.address}</td>
                </tr>
                <tr>
                    <td class="tdPrice" colspan="2">${contract.rentType} ${contract.deposit}
                        / ${contract.monthlyCost}</td>
                    <td class="tdDetail" rowspan="2">
                        <button id="detail" class="btnDetail">상세보기</button>
                    </td>
                </tr>
                <tr>
                    <td class="tdPeriod">계약기간 ${contract.startPeriod} ~ ${contract.endPeriod} (${contract.livingDay})
                    </td>
                        <%-- <td class="tdPeriod">${contract.contractPeriod}</td> --%>
                    <td></td>
                </tr>
            </table>
            <br/>
        </c:forEach>
    </div>
</div>
<script src="/resources/js/contract.js"></script>
</body>
</html>