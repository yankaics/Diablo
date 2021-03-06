/**
 * Created by xuyifei01 on 2015/3/29.
 */

function subjectList() {
    $.get("/restful/subject-list", function (result) {
        var prof = "暂未通过", college = "暂未通过", update_time;
        for (var i = 0; i < result.length; i++) {
            if (result[i].prof_audit == "true") {
                prof = "通过";
            }
            if (result[i].college_audit == "true") {
                college = "通过";
            }
            if (result[i].update_time != "null") {
                update_time = "暂未更新";
            }
            $("#subject-list").append("<tr><td>" + result[i].id + "</td> <td>" + result[i].subject_title + "</td>" +
            " <td>" + prof + "</td> <td>" + college + "</td> <td> " + result[i].create_time + "</td><td> " + update_time + "</td> </tr>");
            prof = "暂未通过", college = "暂未通过";
        }
    });
}
$(document).ready(function () {
    subjectList();

});

function ensureSelectList() {
    $.get("/restful/teacher/ensure/list", function (result) {
        for (var i = 0; i < result.length; i++) {
            $("#subject-enable").append("<tr><td>" + result[i].id + "</td> <td>" + result[i].subject_title + "</td>" +
            " <td>" + result[i].major + "</td> <td>" + result[i].student_id + "</td> <td> " + result[i].create_time + "</td><td><button type=\"button\" class=\"btn \" data-toggle=\"modal\" data-target=\"#myModal\" onclick='writeModal(\"" + result[i].subject_title + "\",\"" + result[i].student_id + "\",\"" + result[i].id + "\")'>" +
            "确认 </button></td></tr>");
        }
    });

}

function writeModal(title, id, subjectID) {
    $("#subject-title-modal").val(title);
    $("#subject-teacherid-modal").val(id);
    $("#subject-id-modal").val(subjectID);
}

function showStudentList() {
    $.get("/restful/teacher/student-list", function (result) {
        for (var i = 0; i < result.length; i++) {
            var flag = 0;
            if (result[i].task == null || result[i].task == "null" || result[i].task == "") {
                flag = "未填写";

                $("#student-list").append("<tr><td>" + result[i].id + "</td> <td>" + result[i].name + "</td>" +
                " <td>" + result[i].major + "</td> <td>" + result[i].title + "</td> <td> " + flag + "</td><td><button type=\"button\" class=\"btn \" data-toggle=\"modal\" " +
                "data-target=\"#myModal\" onclick='TaskModal(\"" + result[i].id + "\",\"" + result[i].name + "\",\"" + result[i].major + "\",\"" + result[i].college + "\")'>" +
                "填写 </button></td></tr>");
            } else {
                flag = "已完成"

                $("#student-list").append("<tr><td>" + result[i].id + "</td> <td>" + result[i].name + "</td>" +
                " <td>" + result[i].major + "</td> <td>" + result[i].title + "</td> <td> " + flag + "</td><td><button type=\"button\" class=\"btn \" " +
                "data-toggle=\"modal\" data-target=\"#myModal\" onclick='TaskModal2(\"" + result[i].id + "\",\"" + result[i].name + "\",\"" + result[i].major + "\",\"" + result[i].college + "\")'>" +
                "查看 </button></td></tr>");
            }

        }
    });
}

function TaskModal(id, name, major,college) {
    $("#studentNameInput").val(name);
    $("#studentIDInput").val(id);
    $("#exampleInput2").val(major);
    $("#collegeInput2").val(college);
}


function TaskModal2(id, name, major,college) {
    console.log(college);
    $("#studentNameInput").val(name);
    $("#studentIDInput").val(id);
    $("#exampleInput2").val(major);
    $("#collegeInput2").val(college);
    $.get("/restful/show/taskdetail/" + id + "/", function (result) {
        $("#taskInput").val(result[0].student_task_name);
        $("#exampleInputPassword1").val(result[0].student_task_content);
        $("#submitBtn").css("display","none");
    })
}
function initEnv(i) {
    $("#category").children().eq(i).addClass("active");
}
function showStartRList(){
    $.get("/restful/teacher/ensure/startr",function(result) {
        for (var i = 0; i < result.length; i++) {
            var flag = 0;
            if (result[i].ensure == null || result[i].ensure == "null" || result[i].ensure == "") {
                flag = "未审查";

                $("#startr-list").append("<tr><td>" + result[i].id + "</td> <td>" + result[i].report + "</td>" +
                " <td>" + result[i].student + "</td> <td><a href='"+result[i].addr+"'>下载</a></td> <td> " + flag + "</td><td><button type=\"button\" class=\"btn \" data-toggle=\"modal\" data-target=\"#myModal\" onclick='StartRModal(\"" + result[i].id + "\",\"" + result[i].report + "\",\"" + result[i].student + "\")'>" +
                "审查 </button></td></tr>");
            } else {
                flag = "审查完成"
                $("#startr-list").append("<tr><td>" + result[i].id + "</td> <td>" + result[i].report + "</td>" +
                " <td>" + result[i].student + "</td><td><a href='"+result[i].addr+"'>下载</a></td><td> " + flag + "</td><td><button type=\"button\" class=\"btn disabled\" data-toggle=\"modal\" data-target=\"#myModal\" onclick='StartRModal(\"" + result[i].id + "\",\"" + result[i].report + "\",\"" + result[i].student + "\")'>" +
                "审查 </button></td></tr>");
            }

        }
    });
}

function showPracticeList() {
    $.get("/restful/teacher/ensure/practice",function(result) {
        for (var i = 0; i < result.length; i++) {
            var flag = 0;
            if (result[i].ensure == null || result[i].ensure == "null" || result[i].ensure == "") {
                flag = "未审查";

                $("#startr-list").append("<tr><td>" + result[i].id + "</td> <td>" + result[i].report + "</td>" +
                " <td>" + result[i].student + "</td> <td><a href='"+result[i].addr+"'>下载</a></td> <td> " + flag + "</td><td><button type=\"button\" class=\"btn \" data-toggle=\"modal\" data-target=\"#myModal\" onclick='StartRModal(\"" + result[i].id + "\",\"" + result[i].report + "\",\"" + result[i].student + "\")'>" +
                "审查 </button></td></tr>");
            } else {
                flag = "审查完成"
                $("#startr-list").append("<tr><td>" + result[i].id + "</td> <td>" + result[i].report + "</td>" +
                " <td>" + result[i].student + "</td><td><a href='"+result[i].addr+"'>下载</a></td><td> " + flag + "</td><td><button type=\"button\" class=\"btn disabled\" data-toggle=\"modal\" data-target=\"#myModal\" onclick='StartRModal(\"" + result[i].id + "\",\"" + result[i].report + "\",\"" + result[i].student + "\")'>" +
                "审查 </button></td></tr>");
            }

        }
    });
}

function StartRModal(id,report,name){
    $("#startr-id-modal").val(id);
    $("#startr-title-modal").val(report);
    $("#startr-student-modal").val(name);
}

function showPaperList() {
    $.get("/restful/teacher/ensure/paper",function(result) {
        for (var i = 0; i < result.length; i++) {
            var flag = 0;
            if (result[i].ensure == null || result[i].ensure == "null" || result[i].ensure == "") {
                flag = "未审查";

                $("#paper-list").append("<tr><td>" + result[i].id + "</td> <td>" + result[i].report + "</td>" +
                " <td>" + result[i].student + "</td> <td><a href='"+result[i].addr+"'>下载</a></td> <td> " + flag + "</td><td><button type=\"button\" class=\"btn \" data-toggle=\"modal\" data-target=\"#myModal\" onclick='PaperModal(\"" + result[i].id + "\",\"" + result[i].report + "\",\"" + result[i].student + "\")'>" +
                "审查 </button></td></tr>");
            } else {
                flag = "审查完成"
                $("#paper-list").append("<tr><td>" + result[i].id + "</td> <td>" + result[i].report + "</td>" +
                " <td>" + result[i].student + "</td><td><a href='"+result[i].addr+"'>下载</a></td><td> " + flag + "</td><td><button type=\"button\" class=\"btn disabled\" data-toggle=\"modal\" data-target=\"#myModal\" onclick='PaperModal(\"" + result[i].id + "\",\"" + result[i].report + "\",\"" + result[i].student + "\")'>" +
                "审查 </button></td></tr>");
            }

        }
    });
}
function PaperModal(id,report,name){
    $("#paper-id-modal").val(id);
    $("#paper-title-modal").val(report);
    $("#paper-student-modal").val(name);
}