//windows.addEventListener
//scrollTop:pc(document.documentElement.scrollTop)-app(document.body.scrollTop)
<script>
var logs = '';
window.addEventListener('scroll', function () {
    logs += '\ndocument.documentElement.scrollTop是：' + document.documentElement.scrollTop + '\ndocument.body.scrollTop是：' + document.body.scrollTop;
    result.innerHTML = logs;
    result.scrollTop = 9999999;
});
</script>
