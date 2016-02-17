import Vue from 'vue'

Vue.directive('sui-picker', {
    twoWay: true,
    params: ['options','displayOptions'],
    bind: function () {

        setTimeout(()=>{
            let value = {
                textAlign: 'center',
                values: this.vm[this.params.options]
            };
            if(this.params.displayOptions && this.vm[this.params.displayOptions] && this.vm[this.params.displayOptions].length > 0){
                value.displayValues = this.vm[this.params.displayOptions]
            }
            $(this.el).picker({
                toolbarTemplate: `<header class="bar bar-nav">
                      <button class="button button-link pull-left"></button>
                      <button class="button button-link pull-right close-picker">确定</button>
                      <h1 class="title"></h1>
                    </header>`,
                cols: [
                    value
                ],
                onOpen : ()=>{

                },
                onClose : ()=>{
                    if(value.displayValues){
                        let displayOptions = this.vm[this.params.displayOptions];
                        let index = $.inArray(parseInt(this.el.value),this.vm[this.params.options]);
                        $(this.el).find('div[displayValue]').html(displayOptions[index]);
                    }else{
                        $(this.el).find('div[displayValue]').html(this.el.value)
                    }
                    this.vm[this.expression] = this.el.value
                }
            });
        },1e2)

    },
    update: function (newValue, oldValue) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
        //console.log('update',newValue,oldValue);
    },
    unbind: function () {
        $(this.el).unbind();
        $('.close-picker').unbind();
    }
})

Vue.directive('sui-city-picker', {
    twoWay: true,
    params: ['options','displayOptions'],
    bind: function () {

        setTimeout(()=>{
            let province,city;
            $(this.el).find('input').cityPicker({
                toolbarTemplate: `<header class="bar bar-nav">
                    <button class="button button-link pull-right close-picker">确定</button>
                    <h1 class="title">选择城市</h1>
                    </header>`,
                onChanged : (newProvince,newCity)=>{
                    province = newProvince;
                    city = newCity;
                    console.log('onChanged',newProvince,newCity);
                },
                onOpen : ()=>{
                    console.log('打开了',province,city)
                },
                onClose : ()=>{
                    $(this.el).find('div[displayValue]').html(city)
                    console.log('选择了',province,city);
                }
            });
        },1e2)

    },
    update: function (newValue, oldValue) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
        //console.log('update',newValue,oldValue);
    },
    unbind: function () {
        $(this.el).unbind();
        $('.close-picker').unbind();
    }
})