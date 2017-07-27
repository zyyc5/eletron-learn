/**
 * Created by win8 on 2016-04-27.
 */
$.extend({
    myconfirm: function (content,okfunc) {
        if ($('.confirm-wrap')){
            $('.confirm-wrap').remove();
            $('.confirm-mask').remove();
        }

        var c = "<div class='confirm-wrap' tabindex='1'>" +
            "<div class='confirm-head'>提示</div>" +
            "<div class='confirm-body'>" +
            "<h4 style='line-height: 25px;'>" + content + "</h4>" +
            "</div>" +
            "<div class='confirm-footer'>" +
            "<p><button type='button' class='btn btn-success btn-lg confirm-btn' tabindex='1' autofocus='autofocus'>确定</button></p>" +
            "</div>" +
            "</div>" +
            "<div class='confirm-mask'></div>";
        $('body').append(c);
        $('.confirm-btn').on('click', function () {
            $('.confirm-wrap').hide();
            $('.confirm-mask').hide();
            $('.confirm-mask').remove();
            $('.confirm-wrap').remove();
            if(okfunc){
                okfunc();
            }

        });
        $('.confirm-btn').focus();
    },
    myconfirm2: function (content,okfunc,cancelfuc) {
        if ($('#confirm-one')){
            $('#confirm-one').remove();
            $('.confirm-mask').remove();
        }
        var c = "<div class='confirm-wrap' id='confirm-one' tabindex='1'>" +
            "<div class='confirm-head'>提示</div>" +
            "<div class='confirm-body'>" +
            "<h4 style='line-height: 25px;'>" + content + "</h4>" +
            "</div>" +
            "<div class='confirm-footer'>" +
            "<p><button type='button' id='confirm-one-ok' class='btn btn-success btn-lg confirm-btn'  tabindex='1'>确定</button>" +
            "<button type='button' id='confirm-one-cancel' class='btn btn-lg btn-toolbar' data-dismiss='modal' style='margin-left: 10px' tabindex='2'>取消</button></p>" +
            "</div>" +
            "</div>" +
            "<div class='confirm-mask'></div>";
        $('body').append(c);
        $('#confirm-one-ok').on('click', function () {
            $('#confirm-one').hide();
            $('.confirm-mask').hide();
            $('#confirm-one').remove();
            $('.confirm-mask').remove();
            okfunc();
        });
        $('#confirm-one-cancel').on('click', function () {
            $('#confirm-one').hide();
            $('.confirm-mask').hide();
            $('#confirm-one').remove();
            $('.confirm-mask').remove();
            if (cancelfuc)
                cancelfuc();
        });
        $('#confirm-one-ok').focus();
        //$('.confirm-btn').on('click', function () {
        //    $('.confirm-wrap').hide();
        //    $('.confirm-mask').hide();
        //})
    },

    impowerDialog: function(something, impName, okfun, service, userInfo){
        var c = "<div class='modal' id='impdialog' tabindex='-1' role='dialog' data-backdrop='static'"+
        "aria-labelledby='myModalLabel' aria-hidden='true'>"+
        "<div class='modal-dialog'>"+
        "<div class='modal-content my-modal-content' style='width:738px'>"+
        "<div class='text-center modal-header my-modal-header'>"+
        "授权"+
        "</div>"+
        "<div class='modal-body auth-modal-body' style='padding: 30px 10px 10px;'>"+
        "<p class='text-center text-org'>"+
        "当前账号没有"+ impName +"权限，请输入有权限的账号！"+
        "</p>"+
        "<div class='form-group col-xs-6'>"+
        "<label class='control-label col-xs-2'>工号：</label>"+
        "<div class='input-group col-xs-10'>"+
        "<input type='text' class='form-control imp_name'/>"+
        "</div>"+
        "</div>"+
        "<div class='form-group col-xs-6'>"+
        "<label class='control-label col-xs-2'>密码：</label>"+
        "<div class='input-group col-xs-10'>"+
        "<input type='password' class='form-control imp_psw'/>"+
        "</div>"+
        "</div>"+

            '<div class="ys-login-keyboard keyboard"><span class="kbb_btn imp_btn">0</span><span class="kbb_btn imp_btn">1</span>' +
            '<span class="kbb_btn imp_btn">2</span><span class="kbb_btn imp_btn">3</span><span class="kbb_btn imp_btn">4</span>' +
            '<span class="kbb_btn imp_btn">5</span><span class="kbb_btn imp_btn">6</span><span class="kbb_btn imp_btn">7</span>' +
            '<span class="kbb_btn imp_btn">8</span><span class="kbb_btn imp_btn">9</span><span class="kbb_btn imp_btn">q</span>' +
            '<span class="kbb_btn imp_btn">w</span><span class="kbb_btn imp_btn">e</span><span class="kbb_btn imp_btn">r</span>' +
            '<span class="kbb_btn imp_btn">t</span><span class="kbb_btn imp_btn">y</span><span class="kbb_btn imp_btn">u</span>' +
            '<span class="kbb_btn imp_btn">i</span><span class="kbb_btn imp_btn">o</span><span class="kbb_btn imp_btn">p</span>' +
            '<span class="kbb_btn imp_btn">a</span><span class="kbb_btn imp_btn">s</span><span class="kbb_btn imp_btn">d</span>' +
            '<span class="kbb_btn imp_btn">f</span><span class="kbb_btn imp_btn">g</span><span class="kbb_btn imp_btn">h</span>' +
            '<span class="kbb_btn imp_btn">j</span><span class="kbb_btn imp_btn">k</span><span class="kbb_btn imp_btn">l</span>' +
            '<span class="kbb_btn imp_del">删除</span><span class="kbb_btn imp_btn">z</span><span class="kbb_btn imp_btn">x</span>' +
            '<span class="kbb_btn imp_btn">c</span><span class="kbb_btn imp_btn">v</span><span class="kbb_btn imp_btn">b</span>' +
            '<span class="kbb_btn imp_btn">n</span><span class="kbb_btn imp_btn">m</span><span class="kbb_btn imp_btn">.</span>' +
            '<span class="kbb_btn imp_enter">回车</span><span class="kbb_btn imp_clear">清空</span></div>'+

        "</div>"+
        "<div class='modal-footer my-modal-footer'>"+
        "<button type='button' class='btn btn-success okAuth' >确定</button>"+
        "<button type='button' class='btn btn-toolbar cancelAuth' data-dismiss='modal'>取消</button>"+
        "</div>"+
        "</div>"+
        "</div>"+
        "</div>";

        $('body').append(c);

        //显示dailog
        $("#impdialog").modal("show");

        //当前操作的输入框
        var currentInput = $(".imp_name");
        currentInput.val();
        currentInput.focus();

        $(".imp_name").focus(function () {
            currentInput = $(".imp_name");
        });

        $(".imp_psw").focus(function () {
            currentInput = $(".imp_psw");
        });

        $('.imp_btn').on('click', function (e) {
            currentInput.val(currentInput.val()+""+e.currentTarget.innerText);
        });

        //确定
        $('.okAuth').on('click', function () {
            if($(".imp_name").val().length ==0){
                Utils.showFailureInfo("用户名不能为空");
                return
            }

            if($(".imp_psw").val().length ==0){
                Utils.showFailureInfo("密码不能为空");
                return
            }

            service.wxlogin($(".imp_name").val(), $(".imp_psw").val()).then(function(user){
                var bufferUser = user;
                if(something == null){
                    service.getZkAmount(user.guid,function(e,r){
                        if(e){
                            return Utils.showFailureInfo(e.message);
                        }

                        var zkObj = {
                            maxYouhui:null,
                            minZhekou:null
                        };

                        if(r.length>0){
                            for(var x in r){
                                if(r[x].dataName == 'zuidayouhui'){
                                    zkObj.maxYouhui = r[x].dataValue == '0' ? null : r[x].dataValue;
                                }
                                if(r[x].dataName == 'zuidizhekou'){
                                    zkObj.minZhekou = r[x].dataValue == '0' ? null : r[x].dataValue;
                                }
                            }

                            if(!zkObj.maxYouhui && !zkObj.minZhekou){
                                zkObj = null;
                            }

                            $('#impdialog').remove();
                            $('.modal-backdrop').remove();
                            okfun(bufferUser,zkObj);
                        }else{
                            //第二个为null时，为最高权限

                            $('#impdialog').remove();
                            $('.modal-backdrop').remove();
                            okfun(bufferUser,null)
                        }
                    })
                } else{
                    service.getFuncPermissions(user.guid).then(function (roles) {
                        if (roles.indexOf(ROLE_POWER[something]) >= 0 || roles.indexOf(something) >=0){
                            if(okfun){

                                $('#impdialog').remove();
                                $('.modal-backdrop').remove();
                                okfun(bufferUser);
                            }
                        }else{
                            Utils.showFailureInfo("此工号没有"+ impName +"的权限");
                        }

                    },function (err) {
                        Utils.showFailureInfo(err.message);
                    })
                }

            },function (err) {
                Utils.showFailureInfo(err.message);
            })
        });

        //取消
        $('.cancelAuth').on('click', function () {
            $(".imp_name").val("");
            $(".imp_psw").val("");
            //$("#impdialog").modal("hide");
            $('#impdialog').remove();
            $('.modal-backdrop').remove();


        });

        //清空
        $('.imp_clear').on('click', function () {
            currentInput.val("");
        });

        //删除
        $('.imp_del').on('click', function () {
            currentInput.val(currentInput.val().substr(0,currentInput.val().length-1));
        });

        //回车
        $('.imp_enter').on('click', function () {
            $(".imp_psw").focus();
        });

        //如果传入USER直接执行
        if(userInfo){
            $(".imp_name").val(userInfo.personNo);
            $(".imp_psw").val(userInfo.password);
            $('.okAuth').click();
        }
    }
});