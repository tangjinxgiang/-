$(function(){
    // 物业缴费页面
    //交费明细
    //初始化默认选中
      var price = 0; //存储订单总额
        $('.pay_con_center label').find('input').each(function(index, el) { //循环所有单子 计算总金额
          var a = parseInt($(this).parent('.weui-cell__hd').prev('.weui-cell__bd').find('span').text());
          price += a;
          $(this).parents('.pay_con').prev('.pay_title').find('.pay_con_right').children('p').text(price+'.00'); //将总金额赋值过去
      });
      var init = 0;//存储选中的总金额
      $('.pay_con_center label').find('input').prop('checked','checked'); //默认订单全部选中
      $('.pay_con_bottom').find('input').prop('checked','checked');//全选按钮为选中
      $('.pay_con_center label').find('input:checked').each(function(index, el) {//循环选中的input
          var a = parseInt($(this).parent('.weui-cell__hd').prev('.weui-cell__bd').find('span').text()); //计算价格
          init += a;
          $(this).parents('.pay_con_center').next('.pay_con_bottom').find('.num').text(init + '.00');//赋值得到的价格
      });
    //点击其中一个 从新循环 计算价格
     $('.pay_con_center label').each(function(index) {//循环所有的订单
        var all_len = $('.pay_con_center label').length; //3 所有订单数量
        $(this).find('input').click(function(event) {
            var check_len = 0; //每次点击重新计算 存选中的个数
            var all = 0; //存储选中的总金额
            var arrears = 0;//存储欠费的金额
            $(this).parents('.pay_list_con').find('input:checked').each(function(index) {//循环选中的所有订单
              check_len = $(this).parents('.pay_list_con').find('input:checked').length; //选中的个数
              var  num = parseInt($(this).parent('.weui-cell__hd').prev('.weui-cell__bd').find('span').text());//计算价格
              all += num;
            });
            $(this).parents('.pay_con_center').next().find('.num').text(all + '.00')//赋值
            arrears = price - all; //订单总额 - 选中的订单总和 = 欠交费用
            $(this).parents('.pay_con').prev('.pay_title').find('.pay_con_left').children('p').text(arrears + '.00');
            //如果列表全部选中 全选按钮为true ,如果全部为不选中，那全选按钮为false
            if(all_len == check_len){ //判断总长度是否等于选中的个数，是否为true 是则为全部选中
                // alert('全选')
                $(this).parents('.pay_con_center').next('.pay_con_bottom').find('input').prop('checked','checked');//全选按钮为选中
            }
            if(check_len == 0){ //判断选中的个数是否为0 是则为全不选
                // alert('全不选')
                $(this).parents('.pay_con_center').next('.pay_con_bottom').find('input').prop('checked',false); //全选按钮不选中
            }
        });
      })
        //点击全选按钮 为true 列表全部选中 为false 列表为全部不选中
    $('.pay_con_bottom input').click(function(event) {
        var This = $(this)//存储$(this) input
        var arrears = 0;//存储欠费的金额
        function check_pic(){ //点击全选 全不选计算价格 函数
          var check = 0;//储存选中的价格
          $('.pay_con_bottom input').parents('.pay_con_bottom').prev('.pay_con_center').children('.pay_list_con').find('input:checked').each(function(index, el) {
            check += parseInt($(this).parent('.weui-cell__hd').prev('.weui-cell__bd').find('span').text());//计算所有选中的总金额
          });
          $('.pay_con_bottom input').parent('div').next().find('.num').text(check+'.00'); //赋值支付金额
          arrears = price - check; //订单总额 - 选中的订单总和 = 欠交费用
          This.parents('.pay_con').prev('.pay_title').find('.pay_con_left').children('p').text(arrears + '.00'); //赋值欠费金额
        }
        if($(this).prop('checked')){//如果为true
          $('.pay_con_center label').find('input').prop('checked','checked');// 列表全部选中
          check_pic(); //更新计算价格
        } else{ //否则
          $('.pay_con_center label').find('input').prop('checked',false);//列表全部不选中
          check_pic();//更新计算价格
        }
    });
    // 缴费历史页面
    $('.record_box li').first().find('img').addClass('tr90');
    $('.record_list_top>p:nth-child(3)').stop().click(function(event) {
        if($(this).parent('.record_list_top').next('.record_list_bottom').children('ul').css('display') =='block'){
            $(this).children('img').stop().removeClass('tr90');
        } else{
            $(this).children('img').stop().addClass('tr90');
        }
        $(this).parent('.record_list_top').next('.record_list_bottom').children('ul').stop().slideToggle(250);
    });
})
